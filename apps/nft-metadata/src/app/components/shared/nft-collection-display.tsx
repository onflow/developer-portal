export function NFTCollectionDisplay({ display } : { display: any }) {
  return (
    <>
      <div>
        <span className="text-2xl">{display.name}</span>
        <a className="ml-2 text-xs hover:underline text-blue-600" href={display.externalURL} target="_blank">Visit Website</a>
      </div>
      <div className="text-md mt-2">
        {display.description}
      </div>
      {
        display && display.socials && Object.keys(display.socials).map((social) => {
          return (
            <div>
              {social} : {display.socials[social]}
            </div>
          )
        })
      }
    </>
  )
}