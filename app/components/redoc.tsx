import { RedocStandalone } from "redoc"
export const RedocYep = () => (
  <RedocStandalone
    options={{}}
    specUrl="https://raw.githubusercontent.com/onflow/flow/master/openapi/access.yaml"
  />
)
