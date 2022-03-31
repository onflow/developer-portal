import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("404");

  return (
    <main>
      <h1>{t("message")}</h1>
    </main>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../i18n/${locale}.json`)).default,
    },
  };
}
