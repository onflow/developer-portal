import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

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
    return {"isNFTContract": false};
  }
}

export async function retrieveMetadataInformation(sampleAddress: string, publicPath: string): Promise<any> {
  try {
    const scriptResult = await fcl.send([
      fcl.script(`
        import MetadataViews from 0x631e88ae7f1d7c20

        pub let RECOMMENDED_METADATA_VIEWS: [Type] = [Type<MetadataViews.Display>()]

        pub fun main(ownerAddress: Address, pubPath: String): {String: Bool} {
            let owner = getAccount(ownerAddress)
            let collectionPublicPath = PublicPath(identifier: pubPath)!
            let collectionCap = owner.getCapability<&AnyResource{MetadataViews.ResolverCollection}>(collectionPublicPath)
            assert(collectionCap.check(), message: "MetadataViews Collection is not set up properly, ensure the Capability was created/linked correctly.")
            let collection = collectionCap.borrow()!
            assert(collection.getIDs().length > 0, message: "No NFTs exist in this collection, ensure the provided account has at least 1 NFTs.")
            let testNftId = collection.getIDs()[0]
            let nftResolver = collection.borrowViewResolver(id: testNftId)
            let views: {String: Bool} = {}
            // Initialize map to all falses for recommended views.
            for view in RECOMMENDED_METADATA_VIEWS {
                views.insert(key: view.identifier, false)
            }
            // Set to true if supported.
            for view in nftResolver.getViews() {
                if views.containsKey(view.identifier) {
                    views.insert(key: view.identifier, true)
                }
            }
            return views
        }
      `),
      fcl.args([
        fcl.arg(fcl.withPrefix(sampleAddress), t.Address),
        fcl.arg(publicPath.replace('\/public\/', ''), t.String)
      ])
    ])
    .then(fcl.decode)

    return scriptResult
  } catch (e) {
    return null;
  }
}
