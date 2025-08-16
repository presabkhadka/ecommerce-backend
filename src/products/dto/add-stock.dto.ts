import { z } from 'zod'

export const addStockSchema = z.object({
  stock: z.number().nonoptional()
})

export type addStockDto = z.infer<typeof addStockSchema>
