import * as fcl from "@onflow/fcl"

export async function getContractsForAccount(address: string) {
    const account = await fcl.getAccount(fcl.withPrefix(address))
    console.log('Account is', account);
}
