import { Logtail } from "@logtail/browser";

export const logtail = new Logtail(process.env.NEXT_PUBLIC_LOGTAIL_TOKEN!, {
  endpoint: process.env.NEXT_PUBLIC_LOGTAIL_ENDPOINT!,
});
