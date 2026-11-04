import { useGetCart } from "@/src/hooks/useGetCart";
import { ArrowRight, CreditCard, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  showButton?: boolean;
};

export default function OrderSumma({ showButton = true }: Props) {
  const { data, isLoading } = useGetCart();

  const items = data?.data?.items || [];
  const router = useRouter();
  const totalPrice = items.reduce(
    (total: number, item: any) =>
      total + (item.lineTotal ?? item.price * item.quantity),
    0,
  );
  return (
    <aside className="sticky top-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900">Buyurtma xulosasi</h2>

      <div className="mt-6 space-y-4 border-b border-gray-100 pb-5">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Mahsulotlar ({items.length})</span>

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

      {
        showButton && <button
        onClick={() => router.push("/cart/chekout")}
        type="button"
        className="flex cursor-pointer h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#4caf7d] text-sm font-bold text-white shadow-sm transition hover:bg-[#399765]"
      >
        Buyurtma berish
        <ArrowRight size={17} />
      </button>
      }

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
  );
}
