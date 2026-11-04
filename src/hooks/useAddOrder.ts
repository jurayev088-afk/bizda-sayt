import { useMutation, useQueryClient } from "@tanstack/react-query"
import { App } from "antd"
import api from "../services/api/api"
import { AddressType } from "../types"
import { useRouter } from "next/navigation"



export const useAddOrder = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { message } = App.useApp()
    const { isPending, mutate } = useMutation({
        mutationKey: ['add-order'],
        mutationFn: (data: AddressType) =>
            api.post(`/orders`, data).then(res => res?.data),
        onError: (error) => {
           console.log(error);
           message.error("jo'natishda xatolik");
        },
        onSuccess:()=> {
            message.success("Buyurtmangiz qabul qilindi");
            router.push("/cart")
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["get-cart"] })
        }
    })
    return { mutate, isPending }
}
