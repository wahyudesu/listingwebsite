import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    CLOUDFLARE_ACCOUNT_ID: z.string().optional().default(""),
    CLOUDFLARE_API_TOKEN: z.string().optional().default(""),
  },
  experimental__runtimeEnv: {},
});