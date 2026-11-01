"use client";

import Link from "next/link";
import type { ProductType } from "../features/categories/types/products";
import { Heart, ShoppingCart, Sparkles, Zap } from "lucide-react";
import { App, Button } from "antd";
import { useAddWishlist } from "../hooks/useAddWishlist";
import { useGetWishlist } from "../hooks/useGetWishlist";
import { useMounted } from "../hooks/useMounted";
import { useAddCart } from "../hooks/useAddCart";

type ProductCardProps = {
  product: ProductType;
};

function formatPrice(price: number) {
  // Server va brauzerda bir xil natija berishi uchun en-US + probel
  return price.toLocaleString("en-US").replace(/,/g, " ") + " so'm";
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isPending } = useAddWishlist();
  const { data: wishlistData } = useGetWishlist();
  const { message } = App.useApp();
  const { mutate, isPending: addCartIsPending } = useAddCart();

  const mounted = useMounted();
  const wishlistItems = wishlistData?.data?.items ?? [];
  const inWishlist =
    mounted &&
    (product.inWishlist === true ||
      wishlistItems.some(
        (item: { productId?: string; product?: { id?: string } }) =>
          item.productId === product.id || item.product?.id === product.id,
      ));

  const mainImage =
    product.images?.find((image) => image.isMain) ?? product.images?.[0];

  // Ba'zi endpointlar (masalan, wishlist) images massiv o'rniga
  // bitta "image" string qaytaradi — ikkalasini ham qo'llaymiz
  const imageUrl =
    mainImage?.url ?? (product as unknown as { image?: string }).image ?? null;

  const brandName =
    typeof product.brand === "string" ? product.brand : product.brand?.name;

  const categoryName =
    typeof product.category === "string"
      ? product.category
      : product.category?.name;

  const href = `/products/${product?.category?.slug ?? "all"}/${product.id}`;

  const handleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isPending) return;
    toggleWishlist(
      { productId: product.id, inWishlist },
      {
        onSuccess: () => {
          message.success(
            inWishlist
              ? "Sevimlilardan olib tashlandi"
              : "Sevimlilarga qo'shildi",
          );
        },
      },
    );
  };

  const handleAddCart = (product: ProductType) => {
  console.log("Product ID:", product.id);
  console.log("Variants:", product.variants);
  console.log("First variant:", product.variants?.[0]);

  const data = {
    productId: product.id,
    variantId: product.variants?.[0]?.id,
    quantity: 1,
  };

  console.log("Request data:", data);

  mutate(data);
};

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg hover:shadow-gray-200/60">
      {/* Rasm */}
      <div className="relative">
        <Link href={href} className="relative block overflow-hidden">
          <div className="relative flex aspect-square items-center justify-center bg-gray-50/70 p-4">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={mainImage?.alt || product.name}
                className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-gray-300">
                Rasm mavjud emas
              </div>
            )}
          </div>

          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {product.discountPercent > 0 && (
              <span className="inline-flex -rotate-2 items-center gap-1 rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 py-1 pl-2 pr-2.5 text-[11px] font-extrabold tracking-wide text-white shadow-md shadow-rose-500/40 ring-1 ring-white/40">
                <Zap
                  size={11}
                  strokeWidth={2.5}
                  className="fill-yellow-300 text-yellow-300"
                />
                -{product.discountPercent}%
              </span>
            )}

            {product.isNew && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-400 to-green-600 py-1 pl-2 pr-2.5 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-md shadow-emerald-500/40 ring-1 ring-white/40">
                <Sparkles size={11} strokeWidth={2.5} />
                Yangi
              </span>
            )}
          </div>
        </Link>

        {/* Sevimlilar tugmasi — Link ichida emas (valid HTML) */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label="Sevimlilarga qo'shish"
          className={`absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full shadow-sm backdrop-blur transition-all duration-300 hover:scale-110 active:scale-90 ${
            inWishlist
              ? "bg-rose-50 shadow-rose-200 ring-1 ring-rose-200"
              : "bg-white/90 hover:bg-white"
          }`}
        >
          <Heart
            size={17}
            className={`transition-colors duration-300 ${
              inWishlist ? "fill-rose-500 text-rose-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Mahsulot ma'lumotlari */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="mb-1 truncate text-xs font-medium text-gray-400">
          {brandName || "Brendsiz"}
          {" · "}
          {categoryName || "Boshqa"}
        </p>

        <Link href={href}>
          <h2 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-gray-800 transition hover:text-[#399765]">
            {product.name}
          </h2>
        </Link>

        {/* Reyting */}
        <div className="mt-2 flex items-center gap-1 text-sm">
          <span className="text-amber-400">★</span>

          <span className="font-medium text-gray-700">
            {Number(product.averageRating || 0).toFixed(1)}
          </span>

          <span className="text-xs text-gray-400">
            ({product.reviewsCount || 0})
          </span>
        </div>

        {/* Narx — balandlik har doim bir xil bo'lishi uchun min-h */}
        <div className="mt-2 min-h-12">
          <p
            className={`text-base font-bold ${
              product.discountPercent > 0 ? "text-rose-600" : "text-gray-900"
            }`}
          >
            {formatPrice(product.price)}
          </p>

          {product.oldPrice != null && product.oldPrice > product.price && (
            <p className="mt-0.5 text-xs text-gray-400 line-through">
              {formatPrice(product.oldPrice)}
            </p>
          )}
        </div>

        <Button
          onClick={() => handleAddCart(product)}
          loading={addCartIsPending}
          disabled={addCartIsPending}
          className="mt-auto! flex! w-full! items-center! justify-center! gap-1.5! border-0! rounded-xl! bg-[#edf8ee]! px-3! py-2.5! text-sm! font-semibold! text-[#399765]! transition! hover:bg-[#4caf7d]! hover:text-white! disabled:opacity-70"
        >
          {!addCartIsPending && <ShoppingCart size={18} />}
          <span>{addCartIsPending ? "Qo'shilmoqda..." : "Savatga qo'shish"}</span>
        </Button>
      </div>
    </article>
  );
}
