import { redirect } from "next/navigation";
import ProductTable from "@/components/products/ProductTable";
import ProductsPagination from "@/components/products/ProductsPagination";
import Heading from "@/components/ui/Heading";
import Prisma from "@/src/lib/prisma"
import Link from "next/link";
import ProductSearchForm from "@/components/products/ProductSearchForm";

async function productCount() {
  return await Prisma.product.count()
}

async function getProducts(page: number, pageSize: number){
  return await Prisma.product.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
    include: {
      category: true
    }
  })
}

export type ProductsWhitCategory = Awaited<ReturnType<typeof getProducts>>

export default async function Page({ searchParams }: Readonly<{ searchParams: Promise<{ page: string }>}>) {
  const page = +(await searchParams).page || 1;
  const pageSize = 10
  
  if(page < 0) redirect('/admin/products')

  const productsDta = getProducts(page, pageSize)
  const totalProductsData = productCount()

  const [products, totalProducts] = await Promise.all([productsDta, totalProductsData])

  const totalPages = Math.ceil(totalProducts/pageSize)

  if(page > totalPages) redirect('/admin/products')
  
  return (
    <>
      <Heading>Administrar productos</Heading>

      <div className="flex flex-col lg:flex-row gap-5 justify-between">
        <Link
          href={'/admin/products/new'}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer rounded-md"
        >
          Crear Producto
        </Link>

        <ProductSearchForm />
      </div>

      <ProductTable 
        products={products}
      />

      <ProductsPagination
        page={page}
        totalPages={totalPages}
      />
    </>
  )
}
