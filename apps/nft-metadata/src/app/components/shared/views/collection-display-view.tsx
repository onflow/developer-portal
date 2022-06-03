import { GenericViewToggle } from "./generic-view-toggle"

type GenericViewProps = {
  view: any
}

export function CollectionDisplayView({ view }: GenericViewProps) {
  return (
    <>
      <div className="text-2xl">{view.collectionName}</div>
      <a className="text-xs hover:underline text-blue-600" href={view.externalURL} target="_blank">Visit Website</a>
      <div className="text-md mt-2">
        {view.collectionDescription}
      </div>
      <img src={view.collectionSquareImage} width="80" height="80"></img>
      <img src={view.collectionBannerImage} width="200" height="50"></img>      {
        view && view.socials && Object.keys(view.socials).map((social) => {
          return (
            <div>
              {social} : {view.socials[social]}
            </div>
          )
        })
      }
      <hr className="my-2" />
      <GenericViewToggle view={view} />
    </>
  )
}