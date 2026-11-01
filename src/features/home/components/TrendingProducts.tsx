import ProductCard from '@/src/components/Card'
import { getTrendingProducts } from '@/src/services/getTrendingProduct'
import Link from 'next/link'
import React from 'react'
import { ProductType } from '../../categories/types/products'

export default async function TrendingProducts() {
    const data = await getTrendingProducts()

    if (!data?.length) return null

    return (
        <section className='mx-auto flex w-full max-w-310 flex-col justify-center gap-8 px-4 pb-25'>
            <div className='flex items-center justify-between'>
                <p className='text-[28px] font-bold sm:text-[32px]'>Top mahsulotlar</p>
                <Link href="/products" className='cursor-pointer rounded-full border border-black p-[10px_22px] text-sm font-medium transition-all duration-300 hover:bg-black hover:text-white'>
                    Barchasi
                </Link>
            </div>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4'>
                {
                    data?.map((item: ProductType) => <ProductCard key={item?.id} product={item} />)
                }
            </div>
        </section>
    )
}
