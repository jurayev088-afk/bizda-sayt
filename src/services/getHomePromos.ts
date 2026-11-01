export const getHomePromos = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home-promos`, {
        next: { revalidate: 6 }
    }).then(res => res.json())
        .then(data => data.data)
    return response

}

