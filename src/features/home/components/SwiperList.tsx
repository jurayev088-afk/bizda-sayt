"use client"
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function SwiperList({data}:{data:[]}) {
    return (
        <section className="mx-auto w-full max-w-310 overflow-hidden rounded-2xl">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={data && data.length > 1}
                observer={true}             // <--- Qo'shing
                observeParents={true}       // <--- Qo'shing
                watchOverflow={true}
                className="h-100 w-full"
            >
                {data?.map((item: any) => (
                    <SwiperSlide key={item.id}>
                        <div className="relative h-full w-full rounded-2xl">
                            {/* Banner image */}
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                priority
                                className="object-cover rounded-2xl"
                            />

                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-black/30 rounded-2xl" />

                            {/* Text */}
                            <div className="absolute inset-0 flex items-center ">
                                <div className="container mx-auto px-6">
                                    <div className="max-w-xl text-white m-20">
                                        <h2 className="mb-3 text-4xl font-bold md:text-5xl">
                                            {item.title}
                                        </h2>

                                        <p className="mb-6 text-lg md:text-xl">
                                            {item.subtitle}
                                        </p>

                                        <a
                                            href={item.link}
                                            className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-100"
                                        >
                                            {item.buttonText}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
