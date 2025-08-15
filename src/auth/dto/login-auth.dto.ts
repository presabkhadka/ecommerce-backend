import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email().min(5, "Email must be minimum of 5 letters"),
  password: z.string()
    .min(8, "Password must be minimum of 8 letters")
    .max(144, "Password can be maximum of 144 letters")
})

export type loginDto = z.infer<typeof loginSchema>
