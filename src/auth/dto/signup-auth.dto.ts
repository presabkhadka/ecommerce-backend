import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string()
    .min(4, "Name must be minimum of 4 letters"),
  address: z.string().nonempty(),
  email: z.email()
    .min(4, 'Email must be minimum of 4 letters')
    .nonempty(),
  password: z.string()
    .min(8, "Password must be minimum of 8 letters")
    .max(144, "Password must be maximum of 144 letters"),
  contactNumber: z.string()
    .min(10, "Contact number cannot exceed more than 10 letters")
})

export type signupDto = z.infer<typeof signupSchema>
