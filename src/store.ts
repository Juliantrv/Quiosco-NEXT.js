import { create } from "zustand"
import { OrderItem } from "./types"
import { Product } from "@/app/generated/prisma"

interface Store {
    order: OrderItem[],
    addToCard: (product: Product) => void,
    increaseQuantity: ( id: Product['id']) => void,
    decreaseQuantity: ( id: Product['id']) => void,
    removeItem: ( id: Product['id']) => void,
    clearOrder: () => void,
}

export const useStore = create<Store>( (set, get) => ({
    order: [],
    addToCard: (product) => {
        const { id, name, price } = product
        let order: OrderItem[] = []

        if(get().order.find( order => order.id === product.id )) {
            order = get().order.map( item => 
                item.id === product.id ? {
                    ...item,  
                    quantity: item.quantity + 1,
                    subTotal: (item.quantity + 1) * item.price
                }: 
                item 
            )
        } else {
            order =[ ...get().order, {
                id, name, price,
                quantity: 1,
                subTotal: 1 * product.price
            }]
        }
        set(()=>({ order }))
    },
    increaseQuantity: (id) => {
        set(()=>({ order: get().order.map( 
            item => item.id === id ? {
                ...item,  
                quantity: item.quantity + 1,
                subTotal: (item.quantity + 1) * item.price
            }: 
            item 
        )}))
    },
    decreaseQuantity: (id) => {
        set(()=>({ order: get().order.map( 
            item => item.id === id && item.quantity > 1  ? {
                ...item,  
                quantity: item.quantity - 1,
                subTotal: (item.quantity - 1) * item.price
            }: 
            item 
        )}))
    },
    removeItem: (id) => {
        set(()=>({ order: get().order.filter( item => item.id !== id )}))
    },
    clearOrder: () => {
        set({ order: [] })
    }
}))