"use client"
import { useStore } from '@/src/store'
import ProductDetils from './ProductDetils'
import { useMemo, useState } from 'react'
import { formatCurrency } from '@/src/utils'
import { createOrder } from '@/actions/create-order-action'
import { OrderSchema } from '@/src/schema'
import { toast } from 'react-toastify'
import SubmitButton from '@/components/ui/SubmitButton'

export default function OrderSummary() {
  const order = useStore( state => state.order)
  const clearOrder = useStore( state => state.clearOrder)
  const total = useMemo( () => order.reduce((total, item) => total + item.subTotal, 0) ,[order])
  const [disabledSubmit, setDisabledSubmit] = useState(false)

  const hadelCreateOrder = async (formData: FormData) => {
    setDisabledSubmit(true)
    const data = {
      name: formData.get('name'),
      total,
      order
    }
    const { success, data: validFormData, error } = OrderSchema.safeParse(data)
    if (!success) {
      setDisabledSubmit(false)
      error.issues.forEach( issue => 
        toast.error(issue.message)
      )
      return
    }
    const response = await createOrder(validFormData)
    if (response?.errors) {
      setDisabledSubmit(false) 
      response.errors.forEach( issue => toast.error(issue.message) )
      return 
    }

    clearOrder()
    toast.success('Pedido realizado correctamente')
    setDisabledSubmit(false)

  }

  return (
    <aside className="h-screen md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi pedido</h1>
      
      <div className='max-h-[70%] lg:max-h-3/4  mt-5 overflow-y-auto'>
        { order.length === 0 ? <p className='text-center my-10'>El pedido esta vacio</p>:
          <div className='space-y-1'>
            { order.map( item => <ProductDetils key={`summary_${item.id}`} item={item}  />) }
          </div>
        }
      </div>

      <p className='text-2xl mt-3 text-center'> 
        Total a pagar: {''}
        <span className='font-bold'>{ formatCurrency(total) }</span>
      </p>

      <form noValidate
        className="w-full mt-3 space-y-5"
        // action={hadelCreateOrder}
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await hadelCreateOrder(formData);
        }}
      >
        <input 
          type="text"
          className='bg-white border border-gray-100 p-2 w-full'
          placeholder='Tu nombre'
          name='name'  
        />
        <SubmitButton 
          styles='py-2 rounded uppercase text-white bg-black w-full text-center font-bold'
          disabled={disabledSubmit}
          value="Confirmar Pedido"
          disabledValue="Enviando..."
        />
      </form>
    </aside>
  )
}