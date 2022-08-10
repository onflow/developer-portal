export const getCommunitySections = (hasEvents: boolean) => {
  let sections = [
    { title: "FLIPs", elementId: "flips" },
    { title: "Featured Initiatives", elementId: "featured-initiatives" },
    {
      title: "Tools",
      elementId: "tools",
    },
    { title: "From the Forum", elementId: "from-the-forum" },
    {
      title: "Explore More Content",
      elementId: "explore-more-content",
    },
  ]

  if (hasEvents)
    sections.unshift({ title: "Upcoming Events", elementId: "upcoming-events" })

  return sections
}
