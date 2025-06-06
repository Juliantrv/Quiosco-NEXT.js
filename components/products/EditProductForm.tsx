"use client"

import { updateProduct } from "@/actions/update-product-action";
import { UpdateProductSchema } from "@/src/schema";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function EditProductForm({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter()
    const params = useParams()
    const id = +params.id!

  const handleSubmit = async (formData: FormData) => {
    const { success, data, error} = UpdateProductSchema.safeParse({
      id,
      name: formData.get('name'),
      price: formData.get('price'),
      categoryId: formData.get('categoryId'),
      image: formData.get('image')
    })

    if(!success) { 
      error.issues.forEach( issue => toast.error(issue.message) )
      return
    }

    const response = await updateProduct(data)
    if (response?.errors){
      response.errors.forEach( issue => toast.error(issue.message) )
      return
    }
    
    toast.success('Producto Actualizado Correctamente')
    router.push('/admin/products')
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form action={handleSubmit} className="space-y-5">
        { children }
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold rounded-md"
          value="Guardar cambios"
        />
      </form>
    </div>
  );
}
