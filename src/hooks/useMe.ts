import { useQuery } from "@tanstack/react-query";
import api from "../services/api/api";

const hasToken = () =>
    typeof window !== "undefined" && !!localStorage.getItem("bizdaAccessTokin");

export const useMe = () => {
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ["me"],
        queryFn: () => api.get("/auth/me").then(res => res?.data),
        enabled: hasToken(),
        retry: false,
        staleTime: 5 * 60 * 1000,
    })
    return { data, isLoading, isError, error }
}
