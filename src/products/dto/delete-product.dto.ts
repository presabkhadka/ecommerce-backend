import { z } from 'zod'

export const deleteProductSchema = z.number().nonoptional()
export type deleteProductDto = z.infer<typeof deleteProductSchema>
