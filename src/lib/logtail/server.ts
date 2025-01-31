import "server-only";

import { Logtail } from "@logtail/node";

export const logtail = new Logtail(process.env.LOGTAIL_SERVER_TOKEN!, {
  endpoint: process.env.LOGTAIL_SERVER_ENDPOINT!,
});
