import { useQuery } from "@tanstack/react-query";
import api from "../services/api/api";

const hasToken = () =>
    typeof window !== "undefined" && !!localStorage.getItem("bizdaAccessTokin");

export const useGetWishlist = () => {
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ["get-wishlist"],
        queryFn: () => api.get("/wishlist").then(res => res?.data),
        enabled: hasToken(),
        retry: false,
    })
    return { data, isLoading, isError, error }
}
