import { z } from "zod"

export const userSchema = z.object({
  username: z
    .string()
    .min(5, {
      message: "Username must be at least 5 characters."
    })
    .max(20, {
      message: "Username maximum of 20 characters are allowed."
    })
})
