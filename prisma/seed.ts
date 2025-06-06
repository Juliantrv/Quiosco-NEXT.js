import { categories } from "./data/categories";
import { products } from "./data/products";
import { PrismaClient } from '../app/generated/prisma/client'
const prisma = new PrismaClient()

async function main(){
    try {
        await prisma.category.createMany({
            data: categories
        })
        await prisma.product.createMany({
            data: products
        })
    } catch (error) {
        console.log(error)
    }
}

main().then(async ()=>{
    await prisma.$disconnect()
}).catch(async (e)=>{
    console.log(e)
    process.exit(1)
})