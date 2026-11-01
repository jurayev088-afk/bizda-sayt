
"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";

type Props = {
  productId: string;
  productName: string;
  stock: number;
  price: number;
};

export default function ProductActions({
  productId,
  productName,
  stock,
  price,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    if (stock < 1) return;

    // Hozircha namoyish uchun holat o'zgaradi.
    // Keyingi bosqichda loyihadagi cart store/API bilan ulaymiz.
    console.log("Savatga qo'shish:", {
      productId,
      productName,
      price,
      quantity,
    });

    setAdded(true);
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <span className="text-sm font-medium text-gray-600">
          Miqdor:
        </span>

        <div className="flex items-center rounded-xl border border-gray-200 bg-white p-1">
          <button
            type="button"
            aria-label="Miqdorni kamaytirish"
            disabled={quantity <= 1 || stock < 1}
            onClick={() => {
              setQuantity((q) => Math.max(1, q - 1));
              setAdded(false);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 disabled:opacity-30"
          >
            <Minus size={16} />
          </button>

          <span className="min-w-10 text-center text-sm font-semibold text-gray-900">
            {quantity}
          </span>

          <button
            type="button"
            aria-label="Miqdorni oshirish"
            disabled={quantity >= stock}
            onClick={() => {
              setQuantity((q) => Math.min(stock, q + 1));
              setAdded(false);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 disabled:opacity-30"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <button
        type="button"
        disabled={stock < 1}
        onClick={addToCart}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#4caf7d] px-6 py-4 font-semibold text-white shadow-lg shadow-green-100 transition hover:bg-[#399765] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
      >
        {stock < 1 ? (
          <>
            <ShoppingCart size={20} />
            Sotuvda mavjud emas
          </>
        ) : added ? (
          <>
            <Check size={20} />
            Tanlov tasdiqlandi
          </>
        ) : (
          <>
            <ShoppingCart size={20} />
            Savatga qo'shish
          </>
        )}
      </button>

      <p className="mt-3 text-center text-xs text-gray-400">
        Jami:{" "}
        {(price * quantity).toLocaleString("en-US").replace(/,/g, " ")} so'm
      </p>
    </div>
  );
}
