"use server"

import prisma from "@/src/lib/prisma"
import { UpdateProduct, UpdateProductSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"

export async function updateProduct(formData: UpdateProduct){
    try {
        const { success, error, data } = UpdateProductSchema.safeParse(formData)

        if (!success) return { errors: error.issues }

        await prisma.product.update({
            where: {
                id: data.id
            },
            data
        })

        revalidatePath('admin/products')
    } catch (error) {
        console.log(error)
    }
}