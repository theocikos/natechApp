import { Redirect } from "expo-router";

import { AppRoutes } from "@/enums/misc";

export default function Index() {
  const session = null; // TODO: Replace with actual session logic

  if (session === null) {
    return <Redirect href={AppRoutes.WELCOME.build()} />;
  }
}
