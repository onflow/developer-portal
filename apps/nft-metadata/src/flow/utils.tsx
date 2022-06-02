import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import * as json from "./c2j.json";

export async function getAccount(address: string): Promise<any> {
  try {
    const account = await fcl.account(address);
    return account
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function retrieveContractInformation(address: string, name: string, code: string): Promise<any> {
  try {
    const publicPath = code.search(/\s+\/public\/.*\s+/gi)
    const scriptResult = await fcl.query({
      // mainnet nft and metadata address is 0x1d7e57aa55817448
      cadence: `
        import NonFungibleToken from 0x631e88ae7f1d7c20
        import MetadataViews from 0x631e88ae7f1d7c20
        import ${name} from ${fcl.withPrefix(address)}

        pub fun main(): {String: AnyStruct} {
          var isNFTContract = false
          var collectionConformsToMetadata = false
          var nftConformsToMetadata = false

          isNFTContract = Type<${name}>().isSubtype(of: Type<NonFungibleToken>())
          if (isNFTContract == true) {
            collectionConformsToMetadata = Type<&${name}.Collection>().isSubtype(of: Type<&{MetadataViews.ResolverCollection}>())
            nftConformsToMetadata = Type<&${name}.NFT>().isSubtype(of: Type<&{MetadataViews.Resolver}>())
          }

          return {
            "isNFTContract": isNFTContract,
            "collectionConformsToMetadata": collectionConformsToMetadata,
            "nftConformsToMetadata": nftConformsToMetadata
          }
        }
      `
    })
    return scriptResult
  } catch (e) {
    // If this isn't an NFT contract, the templated types in the script will fail.
    // We can assume an error from the script likely means the selected contract
    // is not of type `NonFungibleToken`
    return { "isNFTContract": false };
  }
}

export async function retrieveMetadataInformation(sampleAddress: string, publicPath: string): Promise<any> {
  try {
    const scriptResult = await fcl.send([
      fcl.script(json.scripts.check_for_recommended_v1_views),
      fcl.args([
        fcl.arg(sampleAddress, t.Address),
        fcl.arg({ domain: "public", identifier: publicPath.replace('/public/', '') }, t.Path)
      ])
    ])
      .then(fcl.decode)
    return scriptResult
  } catch (e) {
    return null;
  }
}

// TODO: Move to C2J
export async function getNFTInAccount(sampleAddress: string, publicPath: string): Promise<any> {
  const cadence = `
    import MetadataViews from 0x631e88ae7f1d7c20
    import NFTRetrieval from 0x0cb698d1315f5fa0
    
    pub struct DisplayView {
      pub let name : String
      pub let description : String
      pub let thumbnail : String
  
      init (
        name : String,
        description : String,
        thumbnail : String,
      ) {
        self.name = name
        self.description = description
        self.thumbnail = thumbnail
      }
    }
    
    pub struct ExternalURLView {
      pub let externalURL : String
    
      init (
        externalURL : String
      ) {
        self.externalURL = externalURL
      }
    }
    
    pub struct NFTCollectionDataView {
      pub let storagePath : StoragePath
      pub let publicPath : PublicPath
      pub let privatePath: PrivatePath
      pub let publicLinkedType: Type
      pub let privateLinkedType: Type
    
      init (
        storagePath : StoragePath,
        publicPath : PublicPath,
        privatePath : PrivatePath,
        publicLinkedType : Type,
        privateLinkedType : Type,
      ) {
        self.storagePath = storagePath
        self.publicPath = publicPath
        self.privatePath = privatePath
        self.publicLinkedType = publicLinkedType
        self.privateLinkedType = privateLinkedType
      }
    }
    
    pub struct NFTCollectionDisplayView {
      pub let collectionName : String
      pub let collectionDescription: String
      pub let collectionSquareImage : String
      pub let collectionBannerImage : String
    
      init (
        collectionName : String,
        collectionDescription : String,
        collectionSquareImage : String,
        collectionBannerImage : String,
      ) {
        self.collectionName = collectionName
        self.collectionDescription = collectionDescription
        self.collectionSquareImage = collectionSquareImage
        self.collectionBannerImage = collectionBannerImage
      }
    }
    
    pub struct RoyaltiesView {
      pub let royalties: [MetadataViews.Royalty]
    
      init (
        royalties : [MetadataViews.Royalty]
      ) {
        self.royalties = royalties
      }
    }
    
    pub struct NFT {
      pub let id : UInt64
      pub let display : DisplayView?
      pub let externalURL : ExternalURLView?
      pub let nftCollectionData : NFTCollectionDataView?
      pub let nftCollectionDisplay : NFTCollectionDisplayView?
      pub let royalties : RoyaltiesView?
    
      init(
          id: UInt64,
          display : DisplayView?,
          externalURL : ExternalURLView?,
          nftCollectionData : NFTCollectionDataView?,
          nftCollectionDisplay : NFTCollectionDisplayView?,
          royalties : RoyaltiesView?
      ) {
        self.id = id
        self.display = display
        self.externalURL = externalURL
        self.nftCollectionData = nftCollectionData
        self.nftCollectionDisplay = nftCollectionDisplay
        self.royalties = royalties
    }
    
    pub fun getMapping() : {String : AnyStruct} {
      return {
        "Display" : self.display,
        "ExternalURL" : self.externalURL,
        "NFTCollectionData" : self.nftCollectionData,
        "NFTCollectionDisplay" : self.nftCollectionDisplay,
        "Royalties" : self.royalties
      }
    }
    
    }
    
    pub fun main(ownerAddress: Address, publicPathIdentifier: String): {String : AnyStruct}  {
      let owner = getAccount(ownerAddress)
      let collectionCap = owner.getCapability<&AnyResource{MetadataViews.ResolverCollection}>(PublicPath(identifier: publicPathIdentifier)!)
      assert(collectionCap.check(), message: "MetadataViews Collection is not set up properly, ensure the Capability was created/linked correctly.")
      let collection = collectionCap.borrow()!
      assert(collection.getIDs().length > 0, message: "No NFTs exist in this collection, ensure the provided account has at least 1 NFTs.")
      let testNftId = collection.getIDs()[0]
      let nftResolver = collection.borrowViewResolver(id: testNftId)
      let nftViews = NFTRetrieval.BaseNFTViewsV1(
        id : testNftId,
        display: nftResolver.resolveView(Type<MetadataViews.Display>()) as! MetadataViews.Display?,
        externalURL : nftResolver.resolveView(Type<MetadataViews.ExternalURL>()) as! MetadataViews.ExternalURL?,
        collectionData : nftResolver.resolveView(Type<MetadataViews.NFTCollectionData>()) as! MetadataViews.NFTCollectionData?,
        collectionDisplay : nftResolver.resolveView(Type<MetadataViews.NFTCollectionDisplay>()) as! MetadataViews.NFTCollectionDisplay?,
        royalties : nftResolver.resolveView(Type<MetadataViews.Royalties>()) as! MetadataViews.Royalties?
      )
    
      let displayView = nftViews.display
      let externalURLView = nftViews.externalURL
      let collectionDataView = nftViews.collectionData
      let collectionDisplayView = nftViews.collectionDisplay
      let royaltyView = nftViews.royalties
    
      var display : DisplayView? = nil
      if displayView != nil {
        display = DisplayView(
          name : displayView!.name,
          description : displayView!.description,
          thumbnail : displayView!.thumbnail.uri()
        )
      }
    
      var externalURL : ExternalURLView? = nil
      if displayView != nil {
        externalURL = ExternalURLView(
          externalURL : externalURLView!.url,
        )
      }
    
      var nftCollectionData : NFTCollectionDataView? = nil
      if collectionDataView != nil {
        nftCollectionData = NFTCollectionDataView(
          storagePath : collectionDataView!.storagePath,
          publicPath : collectionDataView!.publicPath,
          privatePath : collectionDataView!.providerPath,
          publicLinkedType : collectionDataView!.publicLinkedType,
          privateLinkedType : collectionDataView!.providerLinkedType,
        )
      }
    
      var nftCollectionDisplay : NFTCollectionDisplayView? = nil
      if collectionDisplayView != nil {
        nftCollectionDisplay = NFTCollectionDisplayView(
          collectionName : collectionDisplayView!.name,
          collectionDescription : collectionDisplayView!.description,
          collectionSquareImage : collectionDisplayView!.squareImage.file.uri(),
          collectionBannerImage : collectionDisplayView!.bannerImage.file.uri(),
        )
      }
    
      var royalties : RoyaltiesView? = nil
      if royaltyView != nil {
        royalties = RoyaltiesView(
          royalties : royaltyView!.getRoyalties()
        )
      }
    
      return NFT(
        id: testNftId,
        display : display,
        externalURL : externalURL,
        nftCollectionData : nftCollectionData,
        nftCollectionDisplay : nftCollectionDisplay,
        royalties : royalties
      ).getMapping()
    
    }
  `
  try {
    const scriptResult = await fcl.send([
      fcl.script(cadence),
      fcl.args([
        fcl.arg(sampleAddress, t.Address),
        fcl.arg(publicPath.replace('/public/', ''), t.String)
      ])
    ])
      .then(fcl.decode)
    return scriptResult
  } catch (e) {
    return null;
  }
}