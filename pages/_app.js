import App from "next/app";

import { DefaultSeo } from "next-seo";

import "../configs/flags.config";
import SEO from "../configs/seo.config";
import "../styles/globals.css";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </>
    );
  }
}
