import { OrderStatus, OrderType } from 'generated/prisma'
import { z } from 'zod'

export const addOrderSchema = z.object({
  userId: z.number().nonoptional(),
  productId: z.number().nonoptional(),
  quantity: z.number().nonoptional(),
  order_type: z.enum(OrderType),
  order_status: z.enum(OrderStatus).optional()
})

export type addOrderDto = z.infer<typeof addOrderSchema>
