import React from "react";

import App, { Container } from "next/app";

import { NextIntlProvider } from "next-intl";

import { DefaultSeo } from "next-seo";

import "../configs/flags.config";
import SEO from "../configs/seo.config";
import "../styles/globals.css";
import TinaProvider from "../../.tina/components/TinaDynamicProvider.js";

if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  const ReactDOM = require("react-dom");
  const axe = require("@axe-core/react").default;
  axe(React, ReactDOM, 1000);
}

export function reportWebVitals(metric) {
  console.log(metric);
}

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <DefaultSeo {...SEO} />
        <TinaProvider>
          <NextIntlProvider messages={pageProps.messages}>
            <Component {...pageProps} />
          </NextIntlProvider>
        </TinaProvider>
      </>
    );
  }
}
