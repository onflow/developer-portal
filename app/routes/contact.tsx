// This route is only for tracking events for Google Analytics. This page should not be discoverable by the navigation.
import type {
  ActionFunction,
  LinkDescriptor,
  LoaderFunction,
} from "@remix-run/node"
import { json } from "@remix-run/node"
import { Form } from "@remix-run/react"
import type { SyntheticEvent } from "react"
import { DynamicLinksFunction } from "remix-utils"
import * as gtag from "~/utils/gtags.client"
import { getCanonicalLinkDescriptor } from "../utils/seo.server"

export const action: ActionFunction = () => {
  return json({})
}

export const handle: {
  dynamicLinks: DynamicLinksFunction<LoaderData>
} = { dynamicLinks: ({ data }) => data.links }

export type LoaderData = {
  links: LinkDescriptor[]
}

export const loader: LoaderFunction = (): LoaderData => {
  return {
    links: [getCanonicalLinkDescriptor("/contact")],
  }
}

export default function Contact() {
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      message: { value: string }
    }

    console.log(`event.target.message value is: '${target.message.value}'`)
    console.log(`event object is:`, e)

    gtag.event({
      action: "submit_form",
      category: "Contact",
      label: target.message.value,
    })
  }

  return (
    <main>
      <h1>This is the Contact page</h1>
      <Form onSubmit={handleSubmit} replace={false} id="contact-form">
        <label>
          <span>Message:</span>
          <textarea name="message" />
        </label>
        <button type="submit">submit</button>
      </Form>

      {/* Fun fact: if you want to use your button outside the form element you can as long as you associate the button with a form attribute targeting the id of the form */}
      {/* <button type="submit" form="contact-form">submit</button> */}
    </main>
  )
}
