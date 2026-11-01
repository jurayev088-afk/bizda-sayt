const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getBanners = async () => {
    try {
        const response = await fetch(`${API_URL}/banners`, {
            next: { revalidate: 60 }
        })
        if (!response.ok) throw new Error("Bannerlarni yuklab bo'lmadi");
        const result = await response.json();
        return result.data ?? [];
    } catch (error) {
        console.error("getBanners xatolik:", error);
        return [];
    }
}
