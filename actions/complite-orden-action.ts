"use server"

import { revalidatePath } from "next/cache"
import Prisma from "@/src/lib/prisma"
import { OrderIdSchema } from "@/src/schema"

export async function completeOrder(formData: FormData){
    try {
        const { success, data, error } = OrderIdSchema.safeParse({
            orderId: formData.get('order_id')
        })

        if(!success) {
            throw new Error(error.issues[0].message)
        }

        await Prisma.order.update({ 
            where: { 
                id: data.orderId
            },
            data: {
                status: true,
                orderReadyAt: new Date(Date.now())
            }
        })

        revalidatePath('/admin/orders')
    } catch (error) {
        console.log(error)
    }
}