"use client";

import useDeleteCart from "@/src/hooks/useDeleteCart";
import useDeleteCartId from "@/src/hooks/useDeleteCartId";
import { useGetCart } from "@/src/hooks/useGetCart";
import usePatchCart from "@/src/hooks/usePatchCart";

import { Spin } from "antd";
import {
  ShoppingCart,
  ArrowRight,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  ShoppingBag,
  CreditCard,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  // API hooks
  const { data, isLoading } = useGetCart();

  const { mutate: patchCart } = usePatchCart();

  const { CartDelete, isPending: cartDeletePending } = useDeleteCart();

  const { CartDeleteId } = useDeleteCartId();

  // Loading states
  const [pendingQuantityId, setPendingQuantityId] = useState<string | null>(
    null,
  );
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  // Cart items
  const items = data?.data?.items || [];
  const [cartCounter, setCartCounter] = useState<
    { id: string; quantity: number }[]
  >([]);

  // Total price
  const totalPrice = items.reduce(
    (total: number, item: any) =>
      total + (item.lineTotal ?? item.price * item.quantity),
    0,
  );

  // Quantity changes are stored locally until "Save changes" is clicked.

  // Delete one product
  const handleDeleteItem = (id: string) => {
    if (pendingDeleteId) return;

    setPendingDeleteId(id);

    (CartDeleteId as unknown as (id: string) => void)(id);
    setPendingDeleteId(null);
  };

  // Delete all products
  const handleDeleteAll = () => {
    if (cartDeletePending) return;

    CartDelete();
  };

  const handleSaveItem = (id: string) => {
    if (pendingQuantityId) return;

    setPendingQuantityId(id);
    patchCart([{ id, quantity: getCartQuantity(id) }], {
      onSettled: () => setPendingQuantityId(null),
    });
  };

  // const handleAllClick = () => {
  //   handleSave();
  // };

  const handleSave = () => {
    const payload = items.map((item: { id: string; quantity: number }) => ({
      id: item.id,
      quantity: getCartQuantity(item.id),
    }));

    patchCart(payload);
  };

  const getCartQuantity = (id: string) =>
    cartCounter.find((item) => item.id === id)?.quantity ??
    items.find((item: { id: string }) => item.id === id)?.quantity ?? 1;

  const updateCartQuantity = (id: string, change: 1 | -1) => {
    setCartCounter((prev) => {
      const currentItem = prev.find((item) => item.id === id);
      const apiQuantity =
        items.find((item: { id: string; quantity: number }) => item.id === id)
          ?.quantity ?? 1;
      const quantity = currentItem?.quantity ?? apiQuantity;
      const nextQuantity = Math.max(1, quantity + change);

      return currentItem
        ? prev.map((item) =>
            item.id === id ? { ...item, quantity: nextQuantity } : item,
          )
        : [...prev, { id, quantity: nextQuantity }];
    });
  };

  // Page loading
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  // Empty cart
  if (!items.length) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-310 flex-col items-center justify-center px-4 py-16 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#edf8ee]">
          <ShoppingCart className="h-11 w-11 text-[#4caf7d]" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          Savatingiz hozircha bo'sh
        </h1>

        <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
          Mahsulotlarni ko'rib chiqing va yoqtirganlaringizni savatga qo'shing.
        </p>

        <Link
          href="/products"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#4caf7d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#399765]"
        >
          Xaridni boshlash
          <ArrowRight size={17} />
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8faf9] px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto max-w-310">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-[#4caf7d]">
                Bosh sahifa
              </Link>

              <span>/</span>
              <span className="text-gray-900">Savat</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Mening savatim
              <span className="ml-3 text-lg font-medium text-gray-400">
                ({items.length} ta)
              </span>
            </h1>
          </div>

          {/* Delete all */}
          <button
            onClick={handleDeleteAll}
            disabled={cartDeletePending}
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-red-100 bg-white px-4 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cartDeletePending ? <Spin size="small" /> : <Trash2 size={16} />}

            {cartDeletePending ? "O'chirilmoqda..." : "Barchasini o'chirish"}
          </button>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_360px]">
          {/* Cart products */}
          <section className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="mb-5 text-lg font-bold text-gray-900">
                Savatdagi mahsulotlar
              </h2>

              {items.map((item: any) => {
                const isQuantityLoading = pendingQuantityId === item.id;

                const isDeleteLoading = pendingDeleteId === item.id;

                return (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 border-b border-gray-100 py-5 last:border-0 last:pb-0 sm:flex-row sm:items-center"
                  >
                    {/* Image */}
                    <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl bg-[#f8faf9] sm:w-28">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={110}
                        height={110}
                        className="h-24 w-24 object-contain"
                      />
                    </div>

                    {/* Product info */}
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#4caf7d]">
                        {item.product.brand}
                      </p>

                      <Link
                        href={`/products/${item.product.slug}`}
                        className="line-clamp-2 text-sm font-bold leading-6 text-gray-900 transition hover:text-[#399765]"
                      >
                        {item.product.name}
                      </Link>

                      <p className="mt-2 text-xs text-gray-400">
                        SKU: {item.product.sku}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        {/* Quantity */}
                        <div className="flex h-9 items-center overflow-hidden rounded-lg border border-gray-200">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            disabled={getCartQuantity(item.id) <= 1 || !!pendingQuantityId}
                            type="button"
                            className="flex h-full w-9 cursor-pointer items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="flex w-9 items-center justify-center text-sm font-semibold text-gray-900">
                            {isQuantityLoading ? (
                              <Spin size="small" />
                            ) : (
                              getCartQuantity(item.id)
                            )}
                          </span>

                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            disabled={!!pendingQuantityId}
                            type="button"
                            className="flex h-full w-9 cursor-pointer items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Delete product */}
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          disabled={!!pendingDeleteId || !!pendingQuantityId}
                          type="button"
                          className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-red-400 transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isDeleteLoading ? (
                            <Spin size="small" />
                          ) : (
                            <Trash2 size={15} />
                          )}

                          {isDeleteLoading ? "O'chirilmoqda..." : "O'chirish"}
                        </button>

                        {/* Save product quantity */}
                        <button
                          onClick={() => handleSaveItem(item.id)}
                          disabled={pendingQuantityId !== null}
                          type="button"
                          className="rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-[#399765] transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isQuantityLoading ? "Saqlanmoqda..." : "Saqlash"}
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="shrink-0 sm:min-w-32 sm:text-right">
                      <p className="text-xs text-gray-400">
                        {item.price.toLocaleString("uz-UZ")} so'm / dona
                      </p>

                      <p className="mt-1 text-lg font-extrabold text-gray-900">
                        {item.lineTotal.toLocaleString("uz-UZ")} so'm
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-[#4caf7d]">
                  <Truck size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Tez yetkazib berish
                  </p>

                  <p className="text-xs text-gray-400">
                    Ishonchli yetkazib berish
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-[#4caf7d]">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Xavfsiz xarid
                  </p>

                  <p className="text-xs text-gray-400">Ishonchli to'lov</p>
                </div>
              </div>
            </div>
          </section>

          {/* Order summary */}
          <aside className="sticky top-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">
              Buyurtma xulosasi
            </h2>

            <div className="mt-6 space-y-4 border-b border-gray-100 pb-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Mahsulotlar ({items.length})
                </span>

                <span className="font-semibold text-gray-900">
                  {totalPrice.toLocaleString("uz-UZ")} so'm
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Yetkazib berish</span>

                <span className="font-semibold text-[#4caf7d]">Keyinroq</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-5">
              <span className="text-sm font-semibold text-gray-600">Jami:</span>

              <span className="text-xl font-extrabold text-gray-900">
                {totalPrice.toLocaleString("uz-UZ")} so'm
              </span>
            </div>

            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#4caf7d] text-sm font-bold text-white shadow-sm transition hover:bg-[#399765]"
            >
              Buyurtma berish
              <ArrowRight size={17} />
            </button>

            <Link
              href="/products"
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              <ShoppingBag size={16} />
              Xaridni davom ettirish
            </Link>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
              <CreditCard size={15} />
              Xavfsiz to'lov tizimi
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

const deleteCartItem: never = null as never;
deleteCartItem;

