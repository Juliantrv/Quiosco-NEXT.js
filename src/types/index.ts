import { Order, OrderProducts, Product } from "@/app/generated/prisma"

export type OrderItem = Pick<Product, 'id'|'name'|'price'> & {
    quantity: number,
    subTotal: number
}

export type OrderWhitProducts = Order & {
    orderProducts: (OrderProducts & {
        product: Product
    })[]
}