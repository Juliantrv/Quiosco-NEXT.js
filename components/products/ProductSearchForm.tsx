"use client"

import { SearchSchema } from "@/src/schema"
import { toast } from "react-toastify"
import { redirect } from "next/navigation"

export default function ProductSearchForm() {
    const handleSearchForm = (formData: FormData) => {
        const {success, data, error} = SearchSchema.safeParse({
            search: formData.get('search')
        })

        if(!success) {
            error.issues.forEach( issue => toast.error(issue.message))
            return
        }

        redirect(`/admin/products/search?search=${data.search}`)
    }
  return (
    <form
        action={handleSearchForm}
        className="flex items-center gap-1.5"
    >
        <input 
            type="text"
            placeholder="Buscar Producto"
            className="p-2 placeholder-gray-400 bg-white w-full"
            name="search"
        />
        <input 
            type="submit"
            value="Buscar"
            className="bg-indigo-600 text-white p-2 uppercase rounded-md"
        />
    </form>
  )
}
