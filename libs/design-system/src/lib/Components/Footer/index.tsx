import FlowDocsLogo from '../../../../images/logos/flow-docs-logo-light.svg';
import { ReactComponent as OnFlowIcon } from '../../../../images/logos/flow-icon-bw-light.svg';
import { ReactComponent as DiscordIcon } from '../../../../images/social/discord-light.svg';
import { ReactComponent as ForumIcon } from '../../../../images/social/forum-light.svg';
import { ReactComponent as GithubIcon } from '../../../../images/social/github-light.svg';

// reduce repetition of the section layout in Footer component
const footerSections = [
  {
    header: 'Documentation',
    links: [
      {
        link: '#', // TODO: replace with actual links
        text: 'Getting Started',
      },
      {
        link: '#',
        text: "SDK's",
      },
      {
        link: '#',
        text: 'Tutorials',
      },
      {
        link: '#',
        text: 'Guides',
      },
      {
        link: '#',
        text: 'Concepts',
      },
      {
        link: '#',
        text: 'Walkthroughs',
      },
      {
        link: '#',
        text: 'How-To',
      },
      {
        link: '#',
        text: 'FAQ',
      },
      {
        link: '#',
        text: 'Tools',
      },
    ],
  },
  {
    header: 'Community',
    links: [
      {
        link: '#',
        text: 'Ecosystem',
      },
      {
        link: '#',
        text: 'GitHub',
      },
      {
        link: '#',
        text: 'Discord',
      },
      {
        link: '#',
        text: 'Flowverse',
      },
      {
        link: '#',
        text: 'Forum',
      },
    ],
  },
  {
    header: 'Start Building',
    links: [
      {
        link: '#',
        text: 'Flow Playground',
      },
      {
        link: '#',
        text: 'Crypto Kitties',
      },
    ],
  },
  {
    header: 'Network',
    links: [
      {
        link: '#',
        text: 'Network Status',
      },
      {
        link: '#',
        text: 'Mainnet',
      },
      {
        link: '#',
        text: 'Testnet',
      },
      {
        link: '#',
        text: 'Canary',
      },
      {
        link: '#',
        text: 'Sporks FAQ',
      },
    ],
  },
];

export const Footer = ({ sections = footerSections }) => {
  return (
    <footer className="bg-black px-6 text-white">
      <div className="container mx-auto">
        <div className="block items-center justify-between px-2 pt-8 pb-6 md:flex md:px-4 md:pt-16">
          <img src={FlowDocsLogo} alt="Flow Docs" width="150" />
          <div className="flex items-center gap-6 pt-8 md:pt-0">
            <a href="#">
              <GithubIcon fill="red" height={32} width={32} />
            </a>
            <a href="#">
              <DiscordIcon fill="white" height={28} width={28} />
            </a>
            <a href="#">
              <ForumIcon fill="white" height={24} width={24} />
            </a>
            <a href="#">
              <OnFlowIcon height={28} width={28} />
            </a>
            <a href="#">Eng</a>
          </div>
        </div>
        <div className="grid auto-cols-min border-y border-y-primary-gray-400 px-2 pb-6 pt-9 xs:grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-x-12 md:grid-cols-[fit-content(25%)_fit-content(25%)_fit-content(25%)_fit-content(25%)] md:gap-x-20 md:px-4">
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
                      className="whitespace-nowrap text-xs text-primary-gray-200 lg:text-base"
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
  );
};
