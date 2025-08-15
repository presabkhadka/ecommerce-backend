import { ProductType } from 'generated/prisma'
import { z } from 'zod'

export const addProductSchema = z.object({
  name: z.string().min(1, "Name cannot be left empty"),
  type: z.enum(ProductType),
  stock: z.number().nonnegative().nonoptional(),
  available: z.boolean(),
  discount: z.float64().optional(),
  ratings: z.float64().optional()
})

export type addProductDto = z.infer<typeof addProductSchema>
