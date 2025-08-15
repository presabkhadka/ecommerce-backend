import { z } from 'zod'

export const fetchProductSchema = z.number().nonoptional()

export type fetchProductDto = z.infer<typeof fetchProductSchema>
