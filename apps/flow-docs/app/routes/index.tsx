import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";
import {Attribution } from '@flow-docs/ui'

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">       
        <div className="w-full">
          <Attribution 
            updatedDate='23/3/2022'
            authorIcon= 'https://avatars.githubusercontent.com/u/62387156?s=64&v=4'
            authorName= '@maxxP'
            otherAuthorsCount={12}
            readMinutes={4}
            difficulty="Beginners" 
          />
      </div>
    </main>
  );
}
