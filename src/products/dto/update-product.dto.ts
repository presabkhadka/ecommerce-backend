import { ProductType } from 'generated/prisma'
import { z } from 'zod'

export const updateProductSchema = z.object({
  name: z.string().min(1, "Name cannot be left empty").optional(),
  type: z.enum(ProductType).optional(),
  stock: z.number().nonnegative().optional(),
  available: z.boolean().optional(),
  discount: z.float64().optional(),
  ratings: z.float64().optional()
})

export type updateProductDto = z.infer<typeof updateProductSchema>
