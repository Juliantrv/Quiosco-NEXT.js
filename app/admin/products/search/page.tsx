import { ProductsWhitCategory } from "@/app/admin/products/page"
import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import prisma from "@/src/lib/prisma";

async function searchProducts(searchTerm: string) {
   const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive"
      },
    },
    include: {
      category: true
    }
  });

  return products as ProductsWhitCategory
}

export default async function SearchPage({
  searchParams,
}: Readonly<{ searchParams: Promise<{ search: string }> }>) {
  const search = (await searchParams).search;
  const products = await searchProducts(search);
  return (
    <>
      <Heading>Resultados de la búsqueda: {search}</Heading>

      <div className="flex flex-col lg:flex-row gap-5 justify-end">
        <ProductSearchForm />
      </div>

      {products.length ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-center text-lg">
          No se encontraron resultados para la búsqueda: {search}
        </p>
      )}
    </>
  );
}
