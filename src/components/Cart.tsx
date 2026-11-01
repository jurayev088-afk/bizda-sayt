import { SlBasket } from "react-icons/sl";
import Link from "next/link";
import { useGetCart } from "../hooks/useGetCart";

export default function Cart() {
  const { data } = useGetCart();
  const count = data?.data?.items?.length;
  console.log(count);


  return (
    <Link
      href="/cart"
      aria-label="Savat"
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:border-[#4caf7d] hover:text-[#399765]"
    >
      <SlBasket size={17} />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4caf7d] px-1 text-[11px] font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
