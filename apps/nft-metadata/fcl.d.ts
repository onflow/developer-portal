// There are separate efforts making real typescript support for FCL.
// This is just a placeholder for when those come to fruition, and we can
// plug it in here.

declare module "@onflow/fcl" {
  function currentUser(): any
  function authenticate(): any
  function getAccount(address: any): any
  function account(address: any): any
  function script(): any
  function transaction(): any
  function withPrefix(addr): any
  function sansPrefix(addr): any
  function config(args): any
  function query(args): any
}

declare module "@onflow/transport-http" {
  function send(): any
}