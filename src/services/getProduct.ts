const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProduct = async (params: string | null | undefined) => {
    try {
        const response = await fetch(`${API_URL}/products${params ? "?" + params : ""}`, {
            next: { revalidate: 60 },
        });
        if (response.status === 401) return [];
        if (!response.ok) throw new Error("Mahsulotni yuklab bo'lmadi");

        const result = await response.json();
        return result.data ?? result ?? [];
    } catch (error) {
        console.error("getProduct xatolik:", error);
        return [];
    }
}
