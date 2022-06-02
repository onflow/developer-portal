import { RoyaltiesView, RoyaltiesViewType } from "./royalties-view";

type RoyaltiesWrapperProps = {
  cadenceView: any
}

export function RoyaltiesViewWrapper({ cadenceView }: RoyaltiesWrapperProps) {
  return <RoyaltiesView view={ConvertCadenceToDisplayView(cadenceView)} />;
}


export function ConvertCadenceToDisplayView(cadenceView: any): RoyaltiesViewType {
  let royaltiesCadenceView = cadenceView['Royalties'];
  return {
    royalties: royaltiesCadenceView ? royaltiesCadenceView['royalties'] : null
  }
}