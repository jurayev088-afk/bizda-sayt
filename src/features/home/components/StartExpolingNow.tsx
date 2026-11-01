import { getBrands } from '@/src/services/getBrands'
import React from 'react'
import BrandsList from './BrandsList'

export default async function StartExpolingNow() {
    const data = await getBrands()

    if (!data?.length) return null

    return (
        <section className='mx-auto flex w-full max-w-310 flex-col justify-center gap-8 px-4 pb-25'>
            {/* Sarlavha */}
            <div className='flex items-center justify-between'>
                <p className='text-[28px] font-bold sm:text-[32px]'>Barcha brendlar</p>
            </div>
            <div>
                <BrandsList brands={data} />
            </div>
        </section>
    )
}
