"use server"

import prisma from "@/src/lib/prisma";
import { CreateProduct, ProductSchema } from "@/src/schema";

export async function createProduct(formData: CreateProduct){
    try {
        const { success, error, data } = ProductSchema.safeParse(formData)

        if (!success) return { errors: error.issues }

        await prisma.product.create({ data: data })
    } catch (error) {
        console.log(error)
    }
}