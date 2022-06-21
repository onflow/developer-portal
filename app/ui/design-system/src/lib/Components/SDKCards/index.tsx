import { SDKCard, SDKCardProps } from "../SDKCard"

export type SDKCardsProps = {
  header?: string
  cards: SDKCardProps[]
  description?: string
}

export function SDKCards({
  header = "SDK's",
  cards,
  description,
}: SDKCardsProps) {
  return (
    <div className="container">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-h2">{header}</h2>
          {description && (
            <p className="mt-2 max-w-[480px] text-primary-gray-400 dark:text-primary-gray-100">
              {description}
            </p>
          )}
        </div>
        {/* hidden for now */}
        {/* <ButtonLink
          rightIcon="right"
          variant="secondary"
          className="hidden md:inline-flex"
          href="#"
        >
          View All SDKs
        </ButtonLink> */}
      </div>
      <div className="mb-4 grid grid-cols-1 grid-rows-5 gap-4 md:grid-cols-2 md:grid-rows-3 md:gap-8">
        {cards.map((sdkCard, i) => (
          <SDKCard key={i} {...sdkCard} />
        ))}
      </div>
      {/* hidden for now */}
      {/* <ButtonLink variant="primary" className="w-full md:hidden" href="#">
        View All SDKs
      </ButtonLink> */}
    </div>
  )
}
