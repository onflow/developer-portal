import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import * as json from "./c2j.json";
import * as catalogJson from "./catalog_c2j.json";

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
    console.error(e);
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
    console.error(e);
    return null;
  }
}

export async function getProposals(): Promise<any> {
  try {
    const scriptResult = await fcl.send([
      fcl.script(catalogJson.scripts.get_nft_catalog_proposals),
      fcl.args([])
    ]).then(fcl.decode)
    return scriptResult
  } catch (e) {
    console.error(e)
    return null;
  }
}

export async function getProposal(proposalID: string): Promise<any> {
  try {
    const scriptResult = await fcl.send([
      fcl.script(catalogJson.scripts.get_nft_proposal_for_id),
      fcl.args([
        fcl.arg(proposalID, t.UInt64)
      ])
    ]).then(fcl.decode)
    return scriptResult
  } catch (e) {
    console.error(e)
    return null;
  }
}

export async function getNFTInAccount(sampleAddress: string, publicPath: string): Promise<any> {
  try {
    const scriptResult = await fcl.send([
      fcl.script(catalogJson.scripts.get_nft_in_account_from_path),
      fcl.args([
        fcl.arg(sampleAddress, t.Address),
        fcl.arg(publicPath.replace('/public/', ''), t.String)
      ])
    ]).then(fcl.decode)
    return scriptResult
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getNFTMetadataForCollectionName(collectionName: string): Promise<any> {
  try {
    const scriptResult = await fcl.send([
      fcl.script(catalogJson.scripts.get_nft_metadata_for_collection_name),
      fcl.args([
        fcl.arg(collectionName, t.String),
      ])
    ]).then(fcl.decode)
    return scriptResult
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getAccountHasAdminProxy(address: string) {
  try {
    const scriptResult = await fcl.send([
      fcl.script(catalogJson.scripts.has_admin_proxy),
      fcl.args([
        fcl.arg(address, t.Address),
      ])
    ]).then(fcl.decode)
    return scriptResult
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getIsAdmin(address: string) {
  try {
    const scriptResult = await fcl.send([
      fcl.script(catalogJson.scripts.is_catalog_admin),
      fcl.args([
        fcl.arg(address, t.Address),
      ])
    ]).then(fcl.decode)
    return scriptResult
  } catch (e) {
    console.error(e);
    return null;
  }
}


export async function proposeNFTToCatalog(
  collectionName: string,
  sampleAddress: string,
  publicPath: string,
  contractName: string,
  contractAddress: string,
  message: string
): Promise<any> {
  const cadence = `
  import MetadataViews from 0x631e88ae7f1d7c20
  import NFTCatalog from 0x0cb698d1315f5fa0
  import ${contractName} from ${fcl.withPrefix(contractAddress)} 

  transaction(
    collectionName : String,
    contractName: String,
    contractAddress: Address,
    addressWithNFT: Address,
    publicPathIdentifier: String,
    message: String
  ) {

    let nftCatalogProposalResourceRef : &NFTCatalog.NFTCatalogProposalManager
    
    prepare(acct: AuthAccount) {
      
      if acct.borrow<&NFTCatalog.NFTCatalogProposalManager>(from: NFTCatalog.ProposalManagerStoragePath) == nil {
        let proposalManager <- NFTCatalog.createNFTCatalogProposalManager()
        acct.save(<-proposalManager, to: NFTCatalog.ProposalManagerStoragePath)
        acct.link<&NFTCatalog.NFTCatalogProposalManager{NFTCatalog.NFTCatalogProposalManagerPublic}>(NFTCatalog.ProposalManagerPublicPath, target: NFTCatalog.ProposalManagerStoragePath)
      }

      self.nftCatalogProposalResourceRef = acct.borrow<&NFTCatalog.NFTCatalogProposalManager>(from: NFTCatalog.ProposalManagerStoragePath)!
    }
    
    execute {
      let nftAccount = getAccount(addressWithNFT)
      let pubPath = PublicPath(identifier: publicPathIdentifier)!
      let collectionCap = nftAccount.getCapability<&AnyResource{MetadataViews.ResolverCollection}>(pubPath)
      assert(collectionCap.check(), message: "MetadataViews Collection is not set up properly, ensure the Capability was created/linked correctly.")
      let collectionRef = collectionCap.borrow()!
      assert(collectionRef.getIDs().length > 0, message: "No NFTs exist in this collection, ensure the provided account has at least 1 NFTs.")
      let testNftId = collectionRef.getIDs()[0]
      let nftResolver = collectionRef.borrowViewResolver(id: testNftId)
      
      let metadataCollectionData = nftResolver.resolveView(Type<MetadataViews.NFTCollectionData>())! as! MetadataViews.NFTCollectionData
      
      let collectionData = NFTCatalog.NFTCollectionData(
        storagePath: metadataCollectionData.storagePath,
        publicPath: metadataCollectionData.publicPath,
        privatePath: metadataCollectionData.providerPath,
        publicLinkedType : metadataCollectionData.publicLinkedType,
        privateLinkedType : metadataCollectionData.providerLinkedType
      )

      let collectionDisplay = nftResolver.resolveView(Type<MetadataViews.NFTCollectionDisplay>())! as! MetadataViews.NFTCollectionDisplay

      let catalogData = NFTCatalog.NFTCatalogMetadata(
        contractName: contractName,
        contractAddress: contractAddress,
        nftType: Type<@${contractName}.NFT>(),
        collectionData: collectionData,
        collectionDisplay : collectionDisplay
      )

      self.nftCatalogProposalResourceRef.setCurrentProposalEntry(name : collectionName)

      NFTCatalog.proposeNFTMetadata(collectionName : collectionName, metadata : catalogData, message: message, proposer: self.nftCatalogProposalResourceRef.owner!.address)

      self.nftCatalogProposalResourceRef.setCurrentProposalEntry(name : nil)
    }
  }
`
  try {
    const txId = await fcl.mutate({
      cadence: cadence,
      limit: 9999,
      args: (arg: any, t: any) => [
        fcl.arg(collectionName, t.String),
        fcl.arg(contractName, t.String),
        fcl.arg(contractAddress, t.Address),
        fcl.arg(sampleAddress, t.Address),
        fcl.arg(publicPath.replace('/public/', ''), t.String),
        fcl.arg(message, t.String)
      ]
    });

    const transaction = await fcl.tx(txId).onceSealed()
    return transaction;

  } catch (e) {
    console.error(e);
    throw e;
  }
}