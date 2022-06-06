import { config } from "@onflow/fcl";
import { send as httpSend } from "@onflow/transport-http";
import * as json from "./c2j.json";
import * as catalogJson from "./catalog_c2j.json"

if (process.env["FLOW_ENVIRONMENT"] === "mainnet") {
  // TODO: Set correct endpoints.
  config({
    "accessNode.api": "https://rest-testnet.onflow.org",
    "discovery.wallet": "https://staging.accounts.meetdapper.com/fcl/authn-restricted",
    "sdk.transport": httpSend
  })
  Object.keys(json.vars["mainnet"]).forEach(
    (contractAddressKey) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        config.put(
            contractAddressKey,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            json.vars["mainnet"][contractAddressKey]
        );
    }
  );
  Object.keys(catalogJson.vars["mainnet"]).forEach(
    (contractAddressKey) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        config.put(
            contractAddressKey,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            json.vars["testnet"][contractAddressKey]
        );
    }
  );
} else {
  config({
    "accessNode.api": "https://rest-testnet.onflow.org",
    "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn"
  })
  Object.keys(json.vars["testnet"]).forEach(
    (contractAddressKey) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        config.put(
            contractAddressKey,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            json.vars["testnet"][contractAddressKey]
        );
    }
  );
  Object.keys(catalogJson.vars["testnet"]).forEach(
    (contractAddressKey) => {
        // @ts-ignore
        if (contractAddressKey.indexOf("0xNFTCatalog") === -1) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          config.put("0xNFTCatalogAdmin", json.vars["testnet"][contractAddressKey])
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        config.put(
            contractAddressKey,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            json.vars["testnet"][contractAddressKey]
        );
    }
  );
}
