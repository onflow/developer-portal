import cadence from "./cadence.json"
import mobile from "./mobile.json"
import cadence__styleguide from "./cadence__styleguide.json"
import flow__core_contracts from "./flow__core-contracts.json"
import flow__developer_portal from "./flow__developer-portal.json"
import flow__dapp_development from "./flow__dapp-development.json"
import flow__faq from "./flow__faq.json"
import flow__flow_ft from "./flow__flow-ft.json"
import flow__flow_nft from "./flow__flow-nft.json"
import flow__flow_token from "./flow__flow-token.json"
import flow__fusd from "./flow__fusd.json"
import flow__nft_marketplace from "./flow__nft-marketplace.json"
import flow from "./flow.json"
import learn__concepts from "./learn__concepts.json"
import learn__kitty_items from "./learn__kitty-items.json"
import nodes__flow_port from "./nodes__flow-port.json"
import nodes__node_operation from "./nodes__node-operation.json"
import nodes__staking from "./nodes__staking.json"
import nodes from "./nodes.json"
import testing__mock_developer_doc_json_manifest_schema_error from "./testing__mock-developer-doc-json-manifest-schema-error.json"
import testing__mock_developer_doc_json_valid from "./testing__mock-developer-doc-json-valid.json"
import testing__mock_developer_doc_syntax_error from "./testing__mock-developer-doc-syntax-error.json"
import testing__webhook from "./testing__webhook.json"
import tools__emulator from "./tools__emulator.json"
import tools__fcl_dev_wallet from "./tools__fcl-dev-wallet.json"
import tools__fcl_js from "./tools__fcl-js.json"
import tools__flow_cadut from "./tools__flow-cadut.json"
import tools__flow_cli from "./tools__flow-cli.json"
import tools__flow_go_sdk from "./tools__flow-go-sdk.json"
import tools__flow_js_testing from "./tools__flow-js-testing.json"
import tools__vscode_extension from "./tools__vscode-extension.json"
import tools__unity_sdk from "./tools__unity-sdk.json"
import account_linking from "./account-linking.json"
import learn from "./learn.json"
import quickstart from "./quickstart.json"
import documentation from "./documentation.json"
import tools from "./tools.json"

const includeTestingDocCollections =
  process.env.TESTING_DOC_COLLECTIONS === "include" ||
  process.env.NODE_ENV === "test" ||
  process.env.NODE_ENV === "development"

export const testCollections = {
  "testing/mock_developer_doc_json_manifest_schema_error":
    testing__mock_developer_doc_json_manifest_schema_error,
  "testing/mock_developer_doc_json_valid":
    testing__mock_developer_doc_json_valid,
  "testing/mock_developer_doc_syntax_error":
    testing__mock_developer_doc_syntax_error,
  "testing/webhook": testing__webhook,
}

export const docCollections = {
  ...(includeTestingDocCollections ? testCollections : {}),
  cadence,
  mobile: mobile,
  "style-guide": cadence__styleguide,
  "core-contracts": flow__core_contracts,
  "developer-portal": flow__developer_portal,
  "dapp-development": flow__dapp_development,
  faq: flow__faq,
  "flow-ft": flow__flow_ft,
  "flow-nft": flow__flow_nft,
  "flow-token": flow__flow_token,
  fusd: flow__fusd,
  "nft-marketplace": flow__nft_marketplace,
  flow: flow,
  concepts: learn__concepts,
  "kitty-items": learn__kitty_items,
  "flow-port": nodes__flow_port,
  "node-operation": nodes__node_operation,
  staking: nodes__staking,
  nodes: nodes,
  emulator: tools__emulator,
  "fcl-dev-wallet": tools__fcl_dev_wallet,
  "fcl-js": tools__fcl_js,
  "flow-cadut": tools__flow_cadut,
  "flow-cli": tools__flow_cli,
  "flow-go-sdk": tools__flow_go_sdk,
  "flow-js-testing": tools__flow_js_testing,
  "vscode-extension": tools__vscode_extension,
  "unity-sdk": tools__unity_sdk,
  "account-linking": account_linking,
  learn: learn,
  quickstart: quickstart,
  tools: tools,
  documentation: documentation,
}
