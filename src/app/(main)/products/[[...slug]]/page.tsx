import ProductDetail from "@/src/features/products/components/ProductDetail";
import Products from "@/src/features/products/components/Products";
import { getProduct } from "@/src/services/getProduct";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<
    Record<string, string | string[] | undefined>
  >;
};

export default async function Page({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const searchParam = await searchParams;
  const query = new URLSearchParams();

  Object.entries(searchParam).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item));
    } else if (value !== undefined) {
      query.append(key, value);
    }
  });

  const queryString = query.toString();

  if (!slug || slug.length === 0) {
    const data = await getProduct(queryString || null);
    return <Products slug="" data={data} />;
  }

  if (slug.length === 1) {
    const category = `category=${encodeURIComponent(slug[0])}`;
    const finalQuery = [category, queryString]
      .filter(Boolean)
      .join("&");
    const data = await getProduct(finalQuery);

    return <Products slug={slug[0]} data={data} />;
  }
  if(slug?.length==2){
    return <ProductDetail id={slug[1]}/>
  }

  return notFound();
}