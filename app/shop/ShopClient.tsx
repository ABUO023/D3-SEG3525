'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BottomNav, FilterGroup, PageTitle, ProductCard, SectionCard, SiteHeader, SiteShell } from '../dormdash-ui';
import { useDormDash } from '../dormdash-context';
import { categoryOptions, colorOptions, deliveryOptions, popularityOptions, products, roomOptions, type FilterState, type SortMode } from '../dormdash-data';

const sortOptions: SortMode[] = ['Most Popular', 'Price: Low to High', 'Price: High to Low'];

export default function ShopClient({ initialCategory = '' }: { initialCategory?: string }) {
  const router = useRouter();
  const { cartCount, addToCart } = useDormDash();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('Most Popular');
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(() => ({
    category: (initialCategory as FilterState['category']) ?? '',
    price: '',
    roomType: '',
    deliverySpeed: '',
    popularity: '',
    color: '',
  }));

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const results = products.filter((product) => {
      const searchMatch =
        !query ||
        [product.name, product.category, product.description, product.tags.join(' ')]
          .join(' ')
          .toLowerCase()
          .includes(query);
      const categoryMatch = !filters.category || product.category === filters.category;
      const priceMatch =
        !filters.price ||
        (filters.price === 'under-40' && product.price < 40) ||
        (filters.price === '40-80' && product.price >= 40 && product.price <= 80) ||
        (filters.price === '80-plus' && product.price > 80);
      const roomMatch = !filters.roomType || product.roomType === filters.roomType;
      const deliveryMatch = !filters.deliverySpeed || product.deliverySpeed === filters.deliverySpeed;
      const popularityMatch = !filters.popularity || product.popularity === filters.popularity;
      const colorMatch = !filters.color || product.color === filters.color;
      return searchMatch && categoryMatch && priceMatch && roomMatch && deliveryMatch && popularityMatch && colorMatch;
    });

    const popularityWeight = { Popular: 3, New: 2, 'Best value': 1 } as const;
    return [...results].sort((left, right) => {
      if (sortMode === 'Price: Low to High') return left.price - right.price;
      if (sortMode === 'Price: High to Low') return right.price - left.price;
      return popularityWeight[right.popularity] - popularityWeight[left.popularity] || left.price - right.price;
    });
  }, [filters, searchQuery, sortMode]);

  const activeFilterCount = [searchQuery.trim(), filters.category, filters.price, filters.roomType, filters.deliverySpeed, filters.popularity, filters.color].filter(Boolean).length;

  function clearFilters() {
    setSearchQuery('');
    setFilters({ category: '', price: '', roomType: '', deliverySpeed: '', popularity: '', color: '' });
    setSortMode('Most Popular');
  }

  return (
    <>
      <SiteHeader cartCount={cartCount} />
      <SiteShell>
        <div className="space-y-6 pt-5">
          <SectionCard className="p-5 md:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <PageTitle eyebrow="Discovery" title="Search, filter, and compare essentials" description="Faceted search updates the visible products immediately so the prototype feels like a real shopping flow." />
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <div className="rounded-lg bg-orange-500 px-4 py-2 font-bold text-white">Showing {filteredProducts.length} products</div>
                <div className="rounded-lg border border-stone-300 bg-stone-50 px-4 py-2 font-bold text-slate-600">Active filters: {activeFilterCount}</div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="space-y-2">
                <label htmlFor="search" className="text-sm font-bold text-slate-700">Search products</label>
                <input id="search" type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search bedding, kitchen kits, and more" className="w-full rounded-lg border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100" />
              </div>
              <div className="flex gap-3">
                <div className="space-y-2">
                  <label htmlFor="sort" className="text-sm font-bold text-slate-700">Sort</label>
                  <select id="sort" value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)} className="rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100">
                    {sortOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>
                <button type="button" onClick={clearFilters} className="h-14 rounded-lg border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm hover:bg-stone-50">Clear filters</button>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <FilterGroup title="Category" options={categoryOptions} value={filters.category} onChange={(next) => setFilters((current) => ({ ...current, category: next as FilterState['category'] }))} />
              <FilterGroup title="Price range" options={[{ value: 'under-40', label: 'Under $40' }, { value: '40-80', label: '$40-$80' }, { value: '80-plus', label: '$80+' }]} value={filters.price} onChange={(next) => setFilters((current) => ({ ...current, price: next as FilterState['price'] }))} />
              <FilterGroup title="Room type" options={roomOptions} value={filters.roomType} onChange={(next) => setFilters((current) => ({ ...current, roomType: next as FilterState['roomType'] }))} />
              <FilterGroup title="Delivery speed" options={deliveryOptions} value={filters.deliverySpeed} onChange={(next) => setFilters((current) => ({ ...current, deliverySpeed: next as FilterState['deliverySpeed'] }))} />
              <FilterGroup title="Popularity" options={popularityOptions} value={filters.popularity} onChange={(next) => setFilters((current) => ({ ...current, popularity: next as FilterState['popularity'] }))} />
              <FilterGroup title="Color / style" options={colorOptions} value={filters.color} onChange={(next) => setFilters((current) => ({ ...current, color: next as FilterState['color'] }))} />
            </div>
          </SectionCard>

          {filteredProducts.length === 0 ? (
            <SectionCard className="p-8 text-center">
              <p className="font-display text-2xl font-bold text-slate-950">No products match your filters. Try removing one filter.</p>
            </SectionCard>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} expanded={expandedProductId === product.id} onToggle={() => setExpandedProductId(expandedProductId === product.id ? null : product.id)} onAddToCart={() => { addToCart(product.id); router.push('/cart'); }} />
              ))}
            </div>
          )}
        </div>
      </SiteShell>
      <BottomNav />
    </>
  );
}
