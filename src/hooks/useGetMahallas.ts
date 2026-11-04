import { useQuery } from "@tanstack/react-query";
import api from "../services/api/api";

export const useGetMahallas = (regionId:string | undefined, districtId:string | undefined) => {
    const { isLoading, data:mahallas } = useQuery({
        queryKey: ["get-mahallas", regionId, districtId],
        queryFn: () => api.get(`/geo/regions/${regionId}/districts/${districtId}/mahallas`).then(res => res?.data?.data),
        enabled:!!districtId
    })
    return { mahallas, isLoading }
}
