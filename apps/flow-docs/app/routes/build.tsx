import { LoaderFunction } from "@remix-run/server-runtime";
import { Outlet } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
  return {}
};

export default function Build() {
  return (
    <div>
      <Outlet/>
    </div>
  );
}