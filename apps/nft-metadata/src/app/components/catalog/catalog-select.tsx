import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

export function CatalogSelect({
  type,
  selected
}: {
  type: "Catalog" | "Proposals",
  selected: string|undefined
}) {
  const history = useHistory()
  const [items, setItems] = useState<null|Array<any>>(null)
  const loading = !items

  useEffect(() => {
    // retrieve list of proposals or 
    if (type === 'Proposals') {
      setItems([
        {
          name: "Proposal 1",
          subtext: "This is proposal item 1",
          id: "proposal1"
        },
        {
          name: "Proposal 2",
          subtext: "This is proposal item 2",
          id: "proposal2"
        }
      ])
    } else if (type === 'Catalog') {
      setItems([
        {
          name: "Schmoes Prelaunch Token",
          subtext: "0x123456654321.SchmoesPrelaunchToken",
          id: "schmoes"
        }
      ])
    }
  }, [type])

  return (
    <a className="border-t-1 my-4">
      {
        items && items.map((item) => {
          const selectedStyle = selected && item.id === selected ? 'border-x-blue-500 border-l-4' : ''
          return (
            <div className={`flex-col p-8 hover:bg-gray-300 cursor-pointer border-t-2 text-left ${selectedStyle}`} onClick={
              () => {
                history.push(type === 'Proposals' ? `/proposals/${item.id}` : `/catalog/${item.id}`)
              }
            }>
              <div className="font-semibold">{item.name}</div>
              <div className="">{item.subtext}</div>
            </div>
          )
        })
      }

      {
        loading && [0,0,0,0,0,0,0,0,0].map((item) => {
          return (
            <div className={`flex-col p-8 cursor-pointer border-t-2`}>
              <div className="font-semibold">{" "}</div>
              <div className="">{" "}</div>
            </div>
          )
        })
      }
    </a>
  )
}