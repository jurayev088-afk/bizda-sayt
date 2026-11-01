const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const allCategoryes = async () => {
    try {
        const response = await fetch(`${API_URL}/categories`, {
            next: { revalidate: 60 * 60 }
        })
        if (!response.ok) throw new Error("Kategoriyalarni yuklab bo'lmadi");
        const result = await response.json();
        return result.data ?? [];
    } catch (error) {
        console.error("allCategoryes xatolik:", error);
        return [];
    }
}
