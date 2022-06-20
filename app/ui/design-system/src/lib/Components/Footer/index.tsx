import FlowDocsLogo from "../../../../images/logos/flow-docs-logo-light.svg"
import OnFlowIcon from "../../../../images/logos/flow-icon-bw-light.svg"
import DiscordIcon from "../../../../images/social/discord-light.svg"
import ForumIcon from "../../../../images/social/forum-light.svg"
import GithubIcon from "../../../../images/social/github-light.svg"

// reduce repetition of the section layout in Footer component
const footerSections = [
  {
    header: "Documentation",
    links: [
      {
        link: "/builders",
        text: "Getting Started",
      },
      {
        link: "/tools",
        text: "SDK's & Tools",
      },
      {
        link: "/learn",
        text: "Learning Resources",
      },
      {
        link: "https://docs.onflow.org/cadence/",
        text: "Cadence",
      },
      {
        link: "https://docs.onflow.org/fcl/",
        text: "FCL",
      },
      {
        link: "https://docs.onflow.org/flow-js-testing/",
        text: "JS Testing Library",
      },
      {
        link: "https://docs.onflow.org/flow-cli/",
        text: "CLI",
      },
      {
        link: "https://docs.onflow.org/emulator/",
        text: "Emulator",
      },
      {
        link: "https://github.com/onflow/fcl-dev-wallet",
        text: "Dev Wallet",
      },
      {
        link: "https://docs.onflow.org/vscode-extension/",
        text: "VS Code Extension",
      },
    ],
  },
  {
    header: "Community",
    links: [
      {
        link: "/community",
        text: "Ecosystem",
      },
      {
        link: "https://port.onflow.org/",
        text: "Flow Port",
      },
      {
        link: "/community",
        text: "Developer Grants",
      },
      {
        link: "/community",
        text: "Bug Bounties",
      },
      {
        link: "https://forum.onflow.org/",
        text: "Forum",
      },
      {
        link: "https://www.flowverse.co/",
        text: "Flowverse",
      },
      {
        link: "https://academy.ecdao.org/",
        text: "Emerald Academy",
      },
      {
        link: "https://floats.city/",
        text: "FLOATs (Attendance NFTs)",
      },
    ],
  },
  {
    header: "Start Building",
    links: [
      {
        link: "https://play.onflow.org/local-project",
        text: "Flow Playground",
      },
      {
        link: "https://docs.onflow.org/kitty-items/",
        text: "Kitty Items",
      },
      {
        link: "https://docs.onflow.org/cadence/tutorial/01-first-steps/",
        text: "Cadence Tutorials",
      },
      {
        link: "https://academy.ecdao.org/",
        text: "Emerald DAO Bootcamp",
      },
    ],
  },
  {
    header: "Network",
    links: [
      {
        link: "https://docs.onflow.org/status/",
        text: "Network Status",
      },
      {
        link: "https://flowscan.org/",
        text: "Flowscan Mainnet",
      },
      {
        link: "https://testnet.flowscan.org/",
        text: "Flowscan Testnet",
      },
      {
        link: "https://docs.onflow.org/node-operation/past-sporks/",
        text: "Past Sporks",
      },
      {
        link: "https://docs.onflow.org/node-operation/upcoming-sporks/",
        text: "Upcoming Sporks",
      },
      {
        link: "https://docs.onflow.org/node-operation/",
        text: "Node Operation",
      },
      {
        link: "https://docs.onflow.org/node-operation/spork/",
        text: "Spork Information",
      },
    ],
  },
]

export const Footer = ({ sections = footerSections }) => {
  return (
    <footer className="bg-black px-6 text-white">
      <div className="container mx-auto">
        <div className="block items-center justify-between px-2 pt-8 pb-6 md:flex md:px-4 md:pt-16">
          <img src={FlowDocsLogo} alt="Flow Docs" width="150" />
          <div className="flex items-center gap-6 pt-8 md:pt-0">
            <a href="#" className="hover:opacity-75">
              <img src={GithubIcon} height={32} width={32} />
            </a>
            <a href="#" className="hover:opacity-75">
              <img src={DiscordIcon} height={28} width={28} />
            </a>
            <a href="#" className="hover:opacity-75">
              <img src={ForumIcon} height={24} width={24} />
            </a>
            <a href="#" className="hover:opacity-75">
              <img src={OnFlowIcon} height={28} width={28} />
            </a>
            <a href="#" className="hover:text-primary-gray-100">
              Eng
            </a>
          </div>
        </div>
        <div className="grid auto-cols-min gap-y-4 border-y border-y-primary-gray-400 px-2 pb-6 pt-9 xs:grid-cols-1 sm:grid-cols-2 sm:gap-x-12 md:grid-cols-[fit-content(25%)_fit-content(25%)_fit-content(25%)_fit-content(25%)] md:gap-x-20 md:px-4">
          {sections.map((section, i) => (
            <section key={i} className="w-fit pb-12 md:pb-0">
              <div className="pb-3">
                <h3 className="whitespace-nowrap text-base font-bold lg:text-2xl">
                  {section.header}
                </h3>
              </div>
              <ul>
                {section.links.map((link, j) => (
                  <li className="py-1 pl-0" key={j}>
                    <a
                      className="whitespace-nowrap text-xs text-primary-gray-200 hover:text-primary-gray-100 lg:text-base"
                      href={link.link}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="px-2 pt-4 pb-16 lg:px-4">@2022 Flow</div>
      </div>
    </footer>
  )
}
