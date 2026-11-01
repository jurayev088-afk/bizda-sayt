import { useQuery } from "@tanstack/react-query";
import api from "../services/api/api";

export const useGetCart = () => {
    const { isLoading, data } = useQuery({
        queryKey: ["get-cart"],
        queryFn: () => api.get("/cart").then(res => res?.data),
        retry: false,
    })
    return { data, isLoading }
}
