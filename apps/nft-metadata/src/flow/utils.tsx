import * as fcl from "@onflow/fcl"

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
    const res = await fcl.query({
      cadence: `
        import FlowToken from 0x7e60df042a9c0868

        pub fun main(): UFix64 { 
          return FlowToken.totalSupply
        }
      `
    })
    return res
  } catch(e) {
    console.error(e);
    return null;
  }
}
