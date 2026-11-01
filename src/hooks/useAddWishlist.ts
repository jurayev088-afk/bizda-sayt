import { useMutation, useQueryClient } from "@tanstack/react-query"
import { App } from "antd"
import api from "../services/api/api"

type ToggleArgs = {
    productId: string
    // Hozir wishlist'da bormi — bo'lsa DELETE, bo'lmasa POST qilamiz
    inWishlist: boolean
}

export const useAddWishlist = () => {
    const queryClient = useQueryClient()
    const { message } = App.useApp()
    const { isPending, mutate: toggleWishlist } = useMutation({
        mutationKey: ['toggle-wishlist'],
        mutationFn: ({ productId, inWishlist }: ToggleArgs) =>
            inWishlist
                ? api.delete(`/wishlist/${productId}`).then(res => res?.data)
                : api.post(`/wishlist/${productId}`).then(res => res?.data),
        onError: (error: any) => {
            if (error?.response?.status === 401) {
                message.warning("Sevimlilarga qo'shish uchun tizimga kiring")
            } else {
                message.error("Xatolik yuz berdi, qaytadan urinib ko'ring")
            }
        },
        onSettled: () => {
            // Muvaffaqiyat xabarini chaqiruvchi komponent ko'rsatadi
            // (qo'shildi/olib tashlandi deb farqlashi uchun)
            queryClient.invalidateQueries({ queryKey: ["get-wishlist"] })
        }
    })
    return { toggleWishlist, isPending }
}
