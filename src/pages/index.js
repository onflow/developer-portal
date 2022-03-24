import { useFlags } from "@happykit/flags/client";
import { useTranslations } from "next-intl";

export default function Home() {
  const { flags } = useFlags();
  const t = useTranslations("Home");

  return (
    <main>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      {flags && flags.hello && <p>Flagged: Local</p>}
    </main>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../i18n/${locale}.json`)).default
    }
  };
}
