"use client"

import  useSWR from "swr"
import Heading from "@/components/ui/Heading";
import OrderCard from "@/components/order/OrderCard";
import { OrderWhitProducts } from "@/src/types";

export default function OrdersPage() {
  const url = "/admin/orders/api"
  const fetcher = () => fetch(url).then( res => res.json()).then(data => data)
  const { data: orders, error, isLoading } = useSWR<OrderWhitProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false
  })

  if(isLoading) return <p>cargando...</p>
  
  if(orders) return (
    <>
      <Heading>Administrar Ordenes</Heading>

      {/* @ts-ingnore 
      // Metodo de Consulta manual de la ordenes
      
      const refreshOrders = async () => { // Esta logica va fuera del return
        "use server"
        revalidatePath('/admin/orders')
      } 

      <form action={refreshOrders}>
        <input 
          type="submit"
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold rounded-md"
          value="Actualizar ordenes"
        />
      </form> */}

      { orders.length ? ( 
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {
            orders.map( order => <OrderCard key={order.id} order={order} /> )
          }
        </div> 
        ): <p className='text-center'>No hay ordenes pendientes</p> 
      }
    </>
  )
}
