"use server"

import Prisma from "@/src/lib/prisma"
import { Order, OrderSchema } from "@/src/schema";

export async function createOrder(formData: Order) {
    const { success, error, data } = OrderSchema.safeParse(formData)
    if (!success) return { errors: error.issues }

    try {
        await Prisma.order.create({
            data: {
                name: data.name,
                total: data.total,
                orderProducts: {
                    create: data.order.map( product => ({ productId: product.id, quantity: product.quantity }))
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}