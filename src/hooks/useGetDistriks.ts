import { useQuery } from "@tanstack/react-query";
import api from "../services/api/api";

export const useGetDistricts = (regionId:string | undefined) => {
    const { isLoading, data:districts } = useQuery({
        queryKey: ["get-districts", regionId],
        queryFn: () => api.get(`/geo/regions/${regionId}/districts`).then(res => res?.data?.data),
        enabled:!!regionId
    })
    return { districts, isLoading }
}
