import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import prisma from "@/src/lib/prisma"
import { notFound } from "next/navigation"

async function getProductById(id: number){
    const product = await prisma.product.findUnique({
        where: {
            id
        },
        include: {
            category: true
        }
    })

    if (!product) notFound()

    return product
}

export default async function page({ params }: Readonly<{params: Promise<{ id: string }>}>) {
  const id = +(await params).id
  const product = await getProductById(id)
  return (
    <>
        <Heading>Editar Producto: {product.name}</Heading>
        
        <GoBackButton />

        <EditProductForm>
            <ProductForm 
                product={product}
            />
        </EditProductForm>
    </>
  )
}
