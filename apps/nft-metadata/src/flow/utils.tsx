import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import * as json from "./c2j.json";
import * as catalogJson from "./catalog_c2j.json";
import { changeFCLEnvironment } from "./setup";
import { Network } from "src/app/components/catalog/network-dropdown";

type AccountsMap = { [network in Network]: any }

export async function getAccounts(address: string): Promise<AccountsMap | null> {
  const testnetAccount = await getAccount(address, 'testnet');
  const mainnetAccount = await getAccount(address, 'mainnet');
  if (testnetAccount == null && mainnetAccount == null) {
    return null;
  }
  return {
    'mainnet': mainnetAccount,
    'testnet': testnetAccount
  };

}

export async function getAccount(address: string, network: Network): Promise<any> {
  changeFCLEnvironment(network)
  try {
    const account = await fcl.account(address);
    return account
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function retrieveContractInformation(address: string, name: string, code: string, network: Network): Promise<any> {
  const nftStandardAddress = network === 'mainnet' ? '0x1d7e57aa55817448' : '0x631e88ae7f1d7c20';
  try {
    const publicPath = code.search(/\s+\/public\/.*\s+/gi)
    const scriptResult = await fcl.query({
      // mainnet nft and metadata address is 0x1d7e57aa55817448
      cadence: `
        import NonFungibleToken from ${fcl.withPrefix(nftStandardAddress)}
        import MetadataViews from ${fcl.withPrefix(nftStandardAddress)}
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
    return null;
  }
}

export async function getCollections(): Promise<any> {
  try {
    const scriptResult = await fcl.send([
      fcl.script(catalogJson.scripts.get_nft_catalog),
      fcl.args([])
    ]).then(fcl.decode)
    return scriptResult
  } catch (e) {
    console.error(e)
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

export async function getNFTsInAccount(sampleAddress: string, publicPath: string): Promise<any> {
  try {
    const scriptResult = await fcl.send([
      fcl.script(catalogJson.scripts.get_nfts_in_account_from_path),
      fcl.args([
        fcl.arg(sampleAddress, t.Address),
        fcl.arg(publicPath.replace('/public/', ''), t.String),
      ])
    ]).then(fcl.decode)
    return scriptResult
  } catch (e) {
    return null;
  }
}

export async function getNFTInAccount(sampleAddress: string, publicPath: string, id: string): Promise<any> {
  try {
    const scriptResult = await fcl.send([
      fcl.script(catalogJson.scripts.get_nft_in_account),
      fcl.args([
        fcl.arg(sampleAddress, t.Address),
        fcl.arg(publicPath.replace('/public/', ''), t.String),
        fcl.arg(id, t.UInt64)
      ])
    ]).then(fcl.decode)
    return scriptResult
  } catch (e) {
    return null;
  }
}

export async function getNFTMetadataForCollectionIdentifier(collectionIdentifier: string): Promise<any> {
  try {
    const scriptResult = await fcl.send([
      fcl.script(catalogJson.scripts.get_nft_metadata_for_collection_identifier),
      fcl.args([
        fcl.arg(collectionIdentifier, t.String),
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

export async function getAreLinksSetup(address: string, publicPath: string) {
  try {
    const scriptResult = await fcl.send([
      fcl.script(json.scripts.check_for_links),
      fcl.args([
        fcl.arg(address, t.Address),
        fcl.arg(publicPath, t.String)
      ])
    ]).then(fcl.decode)
    return scriptResult
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function createAdminProxy() {
  try {
    const txId = await fcl.mutate({
      cadence: catalogJson.transactions.setup_nft_catalog_admin_proxy,
      limit: 9999,
      args: (arg: any, t: any) => []
    });
    const transaction = await fcl.tx(txId).onceSealed()
    return transaction
  } catch (e) {
    return null;
  }
}

export async function acceptProposal(proposalID: string) {
  try {
    const txId = await fcl.mutate({
      cadence: catalogJson.transactions.approve_nft_catalog_proposal,
      limit: 9999,
      args: (arg: any, t: any) => [
        fcl.arg(proposalID, t.UInt64)
      ]
    });
    const transaction = await fcl.tx(txId).onceSealed()
    return transaction
  } catch (e) {
    return null;
  }
}

export async function rejectProposal(proposalID: string) {
  try {
    const txId = await fcl.mutate({
      cadence: catalogJson.transactions.reject_nft_catalog_proposal,
      limit: 9999,
      args: (arg: any, t: any) => [
        fcl.arg(proposalID, t.UInt64)
      ]
    });
    const transaction = await fcl.tx(txId).onceSealed()
    return transaction
  } catch (e) {
    return null;
  }
}

export async function deleteProposal(proposalID: string) {
  try {
    const txId = await fcl.mutate({
      cadence: catalogJson.transactions.remove_nft_catalog_proposal,
      limit: 9999,
      args: (arg: any, t: any) => [
        fcl.arg(proposalID, t.UInt64)
      ]
    });
    const transaction = await fcl.tx(txId).onceSealed()
    return transaction
  } catch (e) {
    return null;
  }
}

export async function proposeNFTToCatalog(
  collectionIdentifier: string,
  sampleAddress: string,
  nftID: string,
  publicPath: string,
  contractName: string,
  contractAddress: string,
  message: string
): Promise<any> {
  const cadence = catalogJson.transactions.propose_nft_to_catalog
  try {
    const txId = await fcl.mutate({
      cadence: cadence,
      limit: 9999,
      args: (arg: any, t: any) => [
        fcl.arg(collectionIdentifier, t.String),
        fcl.arg(contractName, t.String),
        fcl.arg(contractAddress, t.Address),
        fcl.arg(`A.${fcl.sansPrefix(contractAddress)}.${contractName}.NFT`, t.String),
        fcl.arg(sampleAddress, t.Address),
        fcl.arg(nftID, t.UInt64),
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