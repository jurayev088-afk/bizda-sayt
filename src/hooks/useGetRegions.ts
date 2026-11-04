import { useQuery } from "@tanstack/react-query";
import api from "../services/api/api";

export const useGetRegions = () => {
    const { isLoading, data:regions } = useQuery({
        queryKey: ["get-regions"],
        queryFn: () => api.get("/geo/regions").then(res => res?.data?.data),
    })
    return { regions, isLoading }
}
