import ShopClient from './ShopClient';

export default function ShopPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  return <ShopClient initialCategory={searchParams?.category ?? ''} />;
}
