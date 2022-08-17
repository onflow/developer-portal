export async function loader({ request }: any) {
  const url = new URL(request.url)
  const gaTrackingId = url.searchParams.get("gaTrackingId")

  const code = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaTrackingId}', {
      page_path: window.location.pathname,
    });
    `
  console.log("Init GA:", code)

  return new Response(code, {
    status: 200,
    headers: {
      "Content-Type": "text/javascript",
    },
  })
}
