import { DisplayView, DisplayViewType } from "./display-view";

type DisplayViewWrapperProps = {
  cadenceView: any
}

export function DisplayViewWrapper({ cadenceView }: DisplayViewWrapperProps) {
  return <DisplayView view={ConvertCadenceToDisplayView(cadenceView)} />;
}


export function ConvertCadenceToDisplayView(cadenceView: any): DisplayViewType {
  let displayCadenceView = cadenceView['Display'];
  return {
    name: displayCadenceView['name'],
    description: displayCadenceView['description'],
    thumbnail: displayCadenceView['thumbnail']
  }
}