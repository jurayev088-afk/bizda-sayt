import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function CategoriDetail({ params }: Props) {
  const { slug } = await params
  redirect(`/products/${slug}`)
}
