import { useQuery } from "@tanstack/react-query";
import api from "../services/api/api";

export const useProfile = () => {
    const { isLoading, data } = useQuery({
        queryKey: ["profile-me"],
        queryFn: () => api.get("/auth/profile")
    })
    return { data, isLoading }
}
