/*
  Used from https://tailwind-elements.com/docs/standard/components/accordion/ as a base
*/

import { useState } from "react"

function Collapsible({item}: {item: any}) {
  const [expand, setExpand] = useState(false)
  const statusColor = item.isValid ? "green" : "red"
  return (
    <>
      <div className="accordion-item bg-white border border-gray-200">
        <h2 className="accordion-header mb-0" id="headingOne">
          <button className="
            relative
            flex
            items-center
            w-full
            py-4
            px-5
            text-base text-gray-800 text-left
            bg-white
            border-0
            rounded-none
            transition
            focus:outline-none
          " type="button"
            onClick={() => {
              setExpand(!expand)
            }}
          >
            <svg height="20" width="20">
              <circle cx="10" cy="10" r="8" stroke="black" strokeWidth="3" fill={statusColor} />
            </svg>
            <span className="ml-4">
              {item.title}
            </span>
            <span className="ml-auto blue underline text-xs">
              { !expand ? 'Show Details' : 'Hide Details' }
            </span>
          </button>
        </h2>
        {
          expand && (
            <div className="py-4 px-5">
                {item.content}
            </div>
          )
        }
      </div>
    </>
  )
}

export function Accordian({items}: {items: Array<any>}) {
  return (
    <div className="accordion" id="accordionExample">
      {
        items && items.map((item, i) => {
          return <Collapsible key={i} item={item} />
        })
      }
    </div>
  )
}
