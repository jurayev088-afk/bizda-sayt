import { useMutation, useQueryClient } from "@tanstack/react-query"
import { App } from "antd"
import api from "../services/api/api"

type AddCartPayload = {
    productId: string
    variantId: string
    quantity: number
}

export const useAddCart = () => {
    const queryClient = useQueryClient()
    const { message } = App.useApp()
    const { isPending, mutate } = useMutation({
        mutationKey: ['add-cart'],
        mutationFn: (product: AddCartPayload) =>
            api.post(`/cart/items`, product).then(res => res?.data),
        onError: (error) => {
           console.log(error);
           message.error("Savatga qo'shishda xatolik!");
        },
        onSuccess:()=> {
            message.success("Mahsulot savatga qo'shildi!");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["get-cart"] })
        }
    })
    return { mutate, isPending }
}
