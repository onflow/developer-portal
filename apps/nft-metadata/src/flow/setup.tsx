import { config } from "@onflow/fcl";
import { send as httpSend} from "@onflow/transport-http";

config({
    "accessNode.api": "https://rest-testnet.onflow.org",
    "discovery.wallet": "https://staging.accounts.meetdapper.com/fcl/authn-restricted",
    "sdk.transport": httpSend
})
