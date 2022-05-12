import React from "react";

import { Link } from "react-router-dom";

const footerLinks = {
  documentation: [
    {
      link: "/#", // TODO: replace with actual links
      text: "Getting Started",
    },
    {
      link: "/#",
      text: "SDK's",
    },
    {
      link: "/#",
      text: "Tutorials",
    },
    {
      link: "/#",
      text: "Guides",
    },
    {
      link: "/#",
      text: "Concepts",
    },
    {
      link: "/#",
      text: "Walkthroughs",
    },
    {
      link: "/#",
      text: "How-To",
    },
    {
      link: "/#",
      text: "FAQ",
    },
    {
      link: "/#",
      text: "Tools",
    },
  ],
  community: [
    {
      link: "/#",
      text: "Ecosystem",
    },
    {
      link: "/#",
      text: "GitHub",
    },
    {
      link: "/#",
      text: "Discord",
    },
    {
      link: "/#",
      text: "Flowverse",
    },
    {
      link: "/#",
      text: "Forum",
    },
  ],
  startBuilding: [
    {
      link: "/#",
      text: "Flow Playground",
    },
    {
      link: "/#",
      text: "Crypto Kitties",
    },
  ],
  network: [
    {
      link: "/#",
      text: "Network Status",
    },
    {
      link: "/#",
      text: "Mainnet",
    },
    {
      link: "/#",
      text: "Testnet",
    },
    {
      link: "/#",
      text: "Canary",
    },
    {
      link: "/#",
      text: "Sporks FAQ",
    },
  ],
};

const iconLinks = [
  "/assets/github.svg",
  "/assets/discord.svg",
  "/assets/chat.svg",
  "/assets/flow.svg",
];

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6">
      <div className="container mx-auto">
        <div className="block lg:flex lg:justify-between lg:items-center pt-8 lg:pt-16 pb-6">
          <div>
            <img src="/assets/flow_docs.svg" />
          </div>
          <div className="flex sm:justify-start lg:justify-center items-center">
            {iconLinks.map((iconLink, i) => (
              <div key={i} className="py-8 lg:py-0 px-3 shrink-0">
                <img src={iconLink} />
              </div>
            ))}
            <div>
              <div  className="pl-3">
                <Link to="#">Eng</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 pt-9 pb-12 border-y border-y-grey-2">
          <section>
            <div className="pb-3">
              <h3 className="text-2xl font-bold">Documentation</h3>
            </div>
            <ul>
              {footerLinks.documentation.map((footerLink, i) => (
                <li className="py-1" key={i}>
                  <Link className="text-base text-grey-3" to={footerLink.link}>
                    {footerLink.text}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <div className="pb-3">
              <h3 className="text-2xl font-bold">Community</h3>
            </div>
            <ul>
              {footerLinks.community.map((footerLink, i) => (
                <li key={i} className="py-1">
                  <Link className="text-base text-grey-3" to={footerLink.link}>
                    {footerLink.text}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <div className="pb-3">
              <h3 className="text-2xl font-bold">Start Building</h3>
            </div>
            <ul>
              {footerLinks.startBuilding.map((footerLink, i) => (
                <li key={i} className="py-1">
                  <Link className="text-base text-grey-3" to={footerLink.link}>
                    {footerLink.text}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <div className="pb-3">
              <h3 className="text-2xl font-bold">Network</h3>
            </div>
            <ul>
              {footerLinks.network.map((footerLink, i) => (
                <li key={i} className="py-1">
                  <Link className="text-base text-grey-3" to={footerLink.link}>
                    {footerLink.text}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="pt-4 pb-16">@2022 Flow</div>
      </div>
    </footer>
  );
}
