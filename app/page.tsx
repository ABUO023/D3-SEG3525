'use client';

import { type FormEvent, useMemo, useState } from 'react';

type Category =
  | 'Bundle'
  | 'Bedding'
  | 'Desk'
  | 'Kitchen'
  | 'Bathroom'
  | 'Winter'
  | 'Cleaning'
  | 'Laundry'
  | 'Food'
  | 'Decor';

type RoomType = 'Dorm' | 'Shared apartment' | 'Studio';
type DeliverySpeed = 'Standard' | 'Express' | 'Move-in day';
type Popularity = 'Popular' | 'New' | 'Best value';
type ColorStyle = 'Neutral' | 'Blue' | 'Green' | 'Warm';
type SortMode = 'Most Popular' | 'Price: Low to High' | 'Price: High to Low';

type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  roomType: RoomType;
  color: ColorStyle;
  deliverySpeed: DeliverySpeed;
  popularity: Popularity;
  description: string;
  tags: string[];
  imageGradient: string;
  imageLabel: string;
  bestFor: string;
  includes: string[];
};

type CartItem = {
  productId: string;
  quantity: number;
};

type FilterState = {
  category: Category | '';
  price: '' | 'under-40' | '40-80' | '80-plus';
  roomType: RoomType | '';
  deliverySpeed: DeliverySpeed | '';
  popularity: Popularity | '';
  color: ColorStyle | '';
};

type StudentDetails = {
  fullName: string;
  email: string;
  university: string;
  residence: string;
  moveInDate: string;
  notes: string;
};

type PaymentDetails = {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  billingPostalCode: string;
};

type SurveyState = {
  rating: string;
  ease: string;
  confidence: string;
  comment: string;
};

type OrderSnapshot = {
  orderNumber: string;
  items: Array<{ product: Product; quantity: number }>;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
};

const products: Product[] = [
  {
    id: 'dorm-starter-bundle',
    name: 'Complete Dorm Starter Bundle',
    category: 'Bundle',
    price: 149,
    roomType: 'Dorm',
    color: 'Neutral',
    deliverySpeed: 'Move-in day',
    popularity: 'Popular',
    description:
      'A polished all-in-one starter set for students who want bedding, desk basics, shower gear, and snack-ready essentials in one cart.',
    tags: ['Best seller', 'Residence ready', 'Student essential'],
    imageGradient: 'from-orange-200 via-amber-100 to-rose-100',
    imageLabel: 'Dorm starter bundle',
    bestFor: 'Students who want one order to cover the first week without building a cart from scratch.',
    includes: ['Sheet set', 'Desk organizer', 'Shower caddy', 'Starter snacks'],
  },
  {
    id: 'cozy-bedding-kit',
    name: 'Cozy Bedding Kit',
    category: 'Bedding',
    price: 79,
    roomType: 'Dorm',
    color: 'Warm',
    deliverySpeed: 'Express',
    popularity: 'Best value',
    description:
      'Soft layers and practical bedding pieces designed to make a small dorm bed feel warm, calm, and finished.',
    tags: ['Soft touch', 'Warm layers', 'Comfort focused'],
    imageGradient: 'from-amber-200 via-orange-100 to-stone-100',
    imageLabel: 'Bedding kit',
    bestFor: 'Students who want a cozy sleep setup that works well in colder Canadian weather.',
    includes: ['Duvet cover', 'Pillowcases', 'Throw blanket', 'Mattress protector'],
  },
  {
    id: 'desk-focus-pack',
    name: 'Desk Focus Pack',
    category: 'Desk',
    price: 45,
    roomType: 'Shared apartment',
    color: 'Blue',
    deliverySpeed: 'Standard',
    popularity: 'New',
    description:
      'A compact study setup with organizers and desk tools that turn a corner into a clean, productive workspace.',
    tags: ['Study zone', 'Focus friendly', 'Compact'],
    imageGradient: 'from-sky-200 via-blue-100 to-indigo-100',
    imageLabel: 'Desk setup',
    bestFor: 'Students balancing classes, labs, and late-night assignments in a small space.',
    includes: ['Notebook stand', 'Cable clips', 'Pen tray', 'Mouse pad'],
  },
  {
    id: 'mini-kitchen-essentials',
    name: 'Mini Kitchen Essentials',
    category: 'Kitchen',
    price: 59,
    roomType: 'Shared apartment',
    color: 'Neutral',
    deliverySpeed: 'Standard',
    popularity: 'Popular',
    description:
      'Simple kitchen basics for microwave meals, quick breakfasts, and easy cleanup in a shared student kitchen.',
    tags: ['Meal prep', 'Shared kitchen', 'Easy care'],
    imageGradient: 'from-stone-200 via-neutral-100 to-emerald-50',
    imageLabel: 'Kitchen kit',
    bestFor: 'Students who cook lightly and want a straightforward setup for daily meals.',
    includes: ['Plate set', 'Mug', 'Cutlery set', 'Food containers'],
  },
  {
    id: 'bathroom-caddy-kit',
    name: 'Bathroom Shower Caddy Kit',
    category: 'Bathroom',
    price: 35,
    roomType: 'Dorm',
    color: 'Green',
    deliverySpeed: 'Express',
    popularity: 'Popular',
    description:
      'A portable bathroom set with shower storage and toiletries organization for communal washroom routines.',
    tags: ['Portable', 'Shower ready', 'Fast ship'],
    imageGradient: 'from-emerald-200 via-green-100 to-lime-100',
    imageLabel: 'Bathroom kit',
    bestFor: 'Students using shared bathrooms who want toiletries sorted and easy to carry.',
    includes: ['Shower caddy', 'Toiletry pouch', 'Towel hook', 'Soap case'],
  },
  {
    id: 'winter-ready-pack',
    name: 'Winter Ready Pack',
    category: 'Winter',
    price: 89,
    roomType: 'Dorm',
    color: 'Warm',
    deliverySpeed: 'Move-in day',
    popularity: 'Popular',
    description:
      'Canadian winter essentials with practical layers and comfort items so students arrive ready for cold weather.',
    tags: ['Cold weather', 'Layered comfort', 'Canada ready'],
    imageGradient: 'from-sky-100 via-cyan-50 to-stone-100',
    imageLabel: 'Winter essentials',
    bestFor: 'Students arriving in colder provinces or anyone who wants to be prepared before the first snowfall.',
    includes: ['Beanie', 'Gloves', 'Thermal blanket', 'Reusable mug'],
  },
  {
    id: 'cleaning-basics-kit',
    name: 'Cleaning Basics Kit',
    category: 'Cleaning',
    price: 29,
    roomType: 'Studio',
    color: 'Neutral',
    deliverySpeed: 'Standard',
    popularity: 'Best value',
    description:
      'Everyday cleaning essentials for keeping a studio or residence room tidy without buying full-size supplies.',
    tags: ['Budget friendly', 'Everyday clean', 'Starter set'],
    imageGradient: 'from-zinc-200 via-stone-100 to-slate-50',
    imageLabel: 'Cleaning kit',
    bestFor: 'Students who want a small, affordable reset kit for weekly cleaning.',
    includes: ['Microfiber cloths', 'Sponge pack', 'Spray bottle', 'Scrub brush'],
  },
  {
    id: 'premium-study-lamp',
    name: 'Premium Study Lamp',
    category: 'Desk',
    price: 39,
    roomType: 'Studio',
    color: 'Warm',
    deliverySpeed: 'Express',
    popularity: 'New',
    description:
      'A sleek task lamp with a soft glow that gives late-night reading and assignment work a better atmosphere.',
    tags: ['Warm glow', 'Task lighting', 'Compact design'],
    imageGradient: 'from-amber-100 via-yellow-50 to-orange-100',
    imageLabel: 'Study lamp',
    bestFor: 'Students who want a nicer desk setup and a more focused study environment.',
    includes: ['LED lamp', 'USB cable', 'Touch controls', 'Reading mode'],
  },
  {
    id: 'compact-laundry-set',
    name: 'Compact Laundry Set',
    category: 'Laundry',
    price: 32,
    roomType: 'Shared apartment',
    color: 'Blue',
    deliverySpeed: 'Standard',
    popularity: 'Best value',
    description:
      'A small laundry kit with carry-and-sort basics that help make shared laundry room trips simpler and faster.',
    tags: ['Laundry day', 'Compact carry', 'Shared space'],
    imageGradient: 'from-blue-200 via-cyan-100 to-slate-100',
    imageLabel: 'Laundry set',
    bestFor: 'Students who do laundry off-site or in shared laundry rooms and want a simple system.',
    includes: ['Laundry bag', 'Mesh delicates pouch', 'Stain stick', 'Drying clips'],
  },
  {
    id: 'healthy-snack-box',
    name: 'Healthy Snack Box',
    category: 'Food',
    price: 25,
    roomType: 'Dorm',
    color: 'Green',
    deliverySpeed: 'Express',
    popularity: 'New',
    description:
      'A grab-and-go snack mix for busy class days, late study sessions, and the first week of move-in chaos.',
    tags: ['Grab and go', 'Study fuel', 'Fresh start'],
    imageGradient: 'from-lime-200 via-emerald-100 to-green-50',
    imageLabel: 'Snack box',
    bestFor: 'Students who need quick fuel between classes or after a long move-in day.',
    includes: ['Protein bars', 'Trail mix', 'Fruit bites', 'Tea sachets'],
  },
  {
    id: 'minimalist-room-decor',
    name: 'Minimalist Room Decor Set',
    category: 'Decor',
    price: 49,
    roomType: 'Studio',
    color: 'Neutral',
    deliverySpeed: 'Standard',
    popularity: 'Popular',
    description:
      'Soft decor pieces that bring warmth and personality into small rooms without making the space feel crowded.',
    tags: ['Calm space', 'Soft style', 'Easy to layer'],
    imageGradient: 'from-stone-200 via-amber-50 to-rose-50',
    imageLabel: 'Decor set',
    bestFor: 'Students who want their room to feel more personal, calm, and move-in ready fast.',
    includes: ['Wall prints', 'Desk frame', 'Candle holder', 'Accent tray'],
  },
  {
    id: 'international-arrival-kit',
    name: 'International Student Arrival Kit',
    category: 'Bundle',
    price: 129,
    roomType: 'Dorm',
    color: 'Blue',
    deliverySpeed: 'Move-in day',
    popularity: 'Best value',
    description:
      'A practical arrival bundle for students settling into Canada for the first time, with essentials for day one and the first week.',
    tags: ['Arrival support', 'First week ready', 'Student-first'],
    imageGradient: 'from-indigo-200 via-sky-100 to-cyan-50',
    imageLabel: 'Arrival kit',
    bestFor: 'International students who need a reliable first purchase that covers the biggest move-in needs.',
    includes: ['Bedding basics', 'Shower kit', 'Desk tools', 'Pantry starter pack'],
  },
];

const categoryOptions: Category[] = [
  'Bundle',
  'Bedding',
  'Desk',
  'Kitchen',
  'Bathroom',
  'Winter',
  'Cleaning',
  'Laundry',
  'Food',
  'Decor',
];

const roomOptions: RoomType[] = ['Dorm', 'Shared apartment', 'Studio'];
const deliveryOptions: DeliverySpeed[] = ['Standard', 'Express', 'Move-in day'];
const popularityOptions: Popularity[] = ['Popular', 'New', 'Best value'];
const colorOptions: ColorStyle[] = ['Neutral', 'Blue', 'Green', 'Warm'];
const sortOptions: SortMode[] = ['Most Popular', 'Price: Low to High', 'Price: High to Low'];
const stepLabels = ['Cart', 'Student Details', 'Payment', 'Confirmation'] as const;

const formatCurrency = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
});

const initialStudentDetails: StudentDetails = {
  fullName: '',
  email: '',
  university: '',
  residence: '',
  moveInDate: '',
  notes: '',
};

const initialPaymentDetails: PaymentDetails = {
  cardholderName: '',
  cardNumber: '',
  expiryDate: '',
  cvc: '',
  billingPostalCode: '',
};

const initialSurvey: SurveyState = {
  rating: '5',
  ease: 'Very Easy',
  confidence: 'Fully Prepared',
  comment: '',
};

function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="grid grid-cols-4 gap-2 text-center sm:gap-3">
      {stepLabels.map((label, index) => {
        const isActive = currentStep === index;
        const isComplete = currentStep > index;

        return (
          <div
            key={label}
            aria-current={isActive ? 'step' : undefined}
            className={`rounded-2xl border px-2 py-3 sm:px-3 ${
              isComplete
                ? 'border-blue-200 bg-blue-50 text-blue-800'
                : isActive
                  ? 'border-orange-300 bg-orange-500 text-white shadow-lg shadow-orange-200'
                  : 'border-stone-200 bg-white text-stone-400'
            }`}
          >
            <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold">
              {isComplete ? '✓' : index + 1}
            </div>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] sm:text-[12px]">{label}</p>
          </div>
        );
      })}
    </div>
  );
}

function FilterGroup({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: readonly string[] | readonly { value: string; label: string }[];
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <section className="space-y-3 rounded-[1.35rem] border border-orange-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">{title}</h3>
        <button type="button" onClick={() => onChange('')} className="text-xs font-semibold text-slate-500 hover:text-slate-900">
          Reset
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const optionValue = typeof option === 'string' ? option : option.value;
          const label = typeof option === 'string' ? option : option.label;
          const active = value === optionValue;

          if (title === 'Color / style') {
            const colorDot: Record<string, string> = {
              Neutral: 'bg-amber-100',
              Blue: 'bg-blue-200',
              Green: 'bg-emerald-200',
              Warm: 'bg-orange-200',
            };

            return (
              <button
                key={optionValue}
                type="button"
                aria-pressed={active}
                onClick={() => onChange(active ? '' : optionValue)}
                className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${
                  active ? 'border-orange-500 ring-4 ring-orange-100' : 'border-stone-200 hover:border-stone-400'
                }`}
                aria-label={label}
                title={label}
              >
                <span className={`h-5 w-5 rounded-full ${colorDot[optionValue] ?? 'bg-stone-200'}`} />
              </button>
            );
          }

          return (
            <button
              key={optionValue}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active ? '' : optionValue)}
              className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                active
                  ? 'border-orange-500 bg-orange-500 text-white shadow-sm'
                  : 'border-stone-200 bg-white text-slate-700 hover:border-stone-400 hover:bg-stone-50'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    price: '',
    roomType: '',
    deliverySpeed: '',
    popularity: '',
    color: '',
  });
  const [sortMode, setSortMode] = useState<SortMode>('Most Popular');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [studentDetails, setStudentDetails] = useState<StudentDetails>(initialStudentDetails);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>(initialPaymentDetails);
  const [orderSnapshot, setOrderSnapshot] = useState<OrderSnapshot | null>(null);
  const [surveyOpen, setSurveyOpen] = useState(false);
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [survey, setSurvey] = useState<SurveyState>(initialSurvey);

  const productMap = useMemo(() => new Map(products.map((product) => [product.id, product])), []);

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

    const popularityWeight: Record<Popularity, number> = {
      Popular: 3,
      New: 2,
      'Best value': 1,
    };

    const sorted = [...results].sort((left, right) => {
      if (sortMode === 'Price: Low to High') return left.price - right.price;
      if (sortMode === 'Price: High to Low') return right.price - left.price;
      return popularityWeight[right.popularity] - popularityWeight[left.popularity] || left.price - right.price;
    });

    return sorted;
  }, [filters, searchQuery, sortMode]);

  const cartDetails = useMemo(
    () =>
      cartItems
        .map((item) => {
          const product = productMap.get(item.productId);
          return product ? { product, quantity: item.quantity } : null;
        })
        .filter(Boolean) as Array<{ product: Product; quantity: number }>,
    [cartItems, productMap],
  );

  const subtotal = useMemo(() => cartDetails.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [cartDetails]);
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 120 ? 0 : 12;
  const tax = Number((subtotal * 0.13).toFixed(2));
  const total = Number((subtotal + deliveryFee + tax).toFixed(2));
  const activeFilterCount = [searchQuery.trim(), filters.category, filters.price, filters.roomType, filters.deliverySpeed, filters.popularity, filters.color].filter(Boolean).length;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function addToCart(productId: string) {
    setCartItems((current) => {
      const existing = current.find((item) => item.productId === productId);

      if (existing) {
        return current.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...current, { productId, quantity: 1 }];
    });
  }

  function updateQuantity(productId: string, delta: number) {
    setCartItems((current) =>
      current
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeItem(productId: string) {
    setCartItems((current) => current.filter((item) => item.productId !== productId));
  }

  function clearFilters() {
    setSearchQuery('');
    setFilters({
      category: '',
      price: '',
      roomType: '',
      deliverySpeed: '',
      popularity: '',
      color: '',
    });
    setSortMode('Most Popular');
  }

  function startBundles() {
    setFilters((current) => ({ ...current, category: 'Bundle' }));
    scrollToSection('shop');
  }

  function continueToCheckout() {
    if (cartDetails.length > 0) {
      setCheckoutStep(1);
      setSurveyOpen(false);
      setSurveySubmitted(false);
      scrollToSection('checkout');
    }
  }

  function handleStudentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCheckoutStep(2);
    scrollToSection('checkout');
  }

  function handlePaymentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const orderNumber = `DD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderSnapshot({
      orderNumber,
      items: cartDetails.map((item) => ({ ...item })),
      subtotal,
      deliveryFee,
      tax,
      total,
    });
    setCartItems([]);
    setCheckoutStep(3);
    setSurveyOpen(false);
    setSurveySubmitted(false);
    scrollToSection('checkout');
  }

  function handleSurveySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSurveySubmitted(true);
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-28 pt-3 sm:px-6 lg:px-8 lg:pb-8">
      <header className="sticky top-0 z-30 -mx-4 border-b border-stone-200/70 bg-[#f8fbff]/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => scrollToSection('top')}
            className="flex items-center gap-3 text-left"
            aria-label="DormDash home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white shadow-md shadow-orange-200">
              DD
            </span>
            <div>
              <p className="font-heading text-2xl font-bold tracking-tight text-orange-700">DormDash</p>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">Move in ready, stress free.</p>
            </div>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('shop')}
              className="hidden rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-slate-300 hover:bg-stone-50 sm:inline-flex"
            >
              Shop
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('cart')}
              className="relative inline-flex items-center justify-center rounded-full border border-orange-200 bg-white px-3 py-2 text-sm font-semibold text-orange-700 shadow-sm hover:border-orange-300 hover:bg-orange-50"
              aria-label={`Cart contains ${cartCount} items`}
            >
              Cart
              <span className="ml-2 rounded-full bg-orange-500 px-2 py-0.5 text-[11px] font-bold text-white">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      <div id="top" className="space-y-6 pt-5 sm:pt-6">
        <section className="overflow-hidden rounded-4xl border border-stone-200/80 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="border-b border-orange-100 bg-orange-500 px-4 py-2 text-center text-[11px] font-semibold tracking-wide text-white sm:text-sm">
            Limited back-to-school bundles available — save up to 20% when you build your move-in cart today.
          </div>

          <div className="grid gap-6 px-5 py-6 md:px-8 md:py-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div className="space-y-5">
              <div className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-orange-700">
                Student lifestyle e-commerce for Canada
              </div>

              <div className="space-y-3">
                <h1 className="max-w-xl font-heading text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  Everything you need for move-in day.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  Shop curated dorm bundles, campus essentials, and student starter kits delivered before classes begin.
                </p>
                <p className="max-w-2xl text-sm font-semibold text-slate-700 sm:text-base">
                  Save up to 20% on curated move-in bundles this week.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => scrollToSection('shop')}
                  className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(249,115,22,0.35)] transition hover:-translate-y-0.5 hover:bg-orange-600"
                >
                  Shop essentials
                </button>
                <button
                  type="button"
                  onClick={startBundles}
                  className="inline-flex items-center justify-center rounded-full border border-blue-400 bg-white px-6 py-3 text-sm font-bold text-blue-700 transition hover:border-blue-500 hover:bg-blue-50"
                >
                  View bundles
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { value: '12+', label: 'curated kits' },
                  { value: 'Canada', label: 'student delivery focus' },
                  { value: 'Fast', label: 'move-in friendly timing' },
                ].map((item) => (
                  <div key={item.label} className="rounded-[1.35rem] border border-stone-200 bg-stone-50 p-4 shadow-sm">
                    <p className="font-heading text-2xl font-bold text-slate-950">{item.value}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-sky-100 bg-linear-to-br from-white to-sky-50 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Why DormDash works</p>
                <h2 className="mt-2 font-heading text-2xl font-bold text-slate-950">Warm, clean, and built for student life.</h2>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  The experience follows the mockups: bold hero, easy discovery cards, a direct cart, and a guided checkout flow that feels lightweight on mobile.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-amber-100 bg-amber-50 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-800">Informational copy</p>
                <p className="mt-2 text-base leading-7 text-amber-950">
                  Each kit lists what is included, who it is best for, and when it can be delivered.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Exploration process: faceted product search',
              text: 'Search by name, category, or description, then combine filters to narrow the catalog quickly.',
            },
            {
              title: 'Follow-instructions process: guided checkout',
              text: 'Move through cart, student details, fake payment, and confirmation with a visible progress stepper.',
            },
            {
              title: 'Communication process: post-purchase survey',
              text: 'A short feedback flow asks how the experience felt and closes the loop in friendly student language.',
            },
          ].map((card) => (
            <article key={card.title} className="rounded-[1.35rem] border border-stone-200/80 bg-white/90 p-5 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">{card.title}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{card.text}</p>
            </article>
          ))}
        </section>

        <section id="shop" className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="space-y-6">
            <section className="rounded-4xl border border-stone-200/80 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Discovery</p>
                  <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950">Search, filter, and compare essentials</h2>
                  <p className="max-w-2xl text-sm leading-6 text-slate-600">
                    Faceted search updates the visible products immediately so the prototype feels like a real shopping flow.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <div className="rounded-full bg-orange-500 px-4 py-2 font-bold text-white">Showing {filteredProducts.length} products</div>
                  <div className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 font-bold text-slate-600">Active filters: {activeFilterCount}</div>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="space-y-2">
                  <label htmlFor="search" className="text-sm font-bold text-slate-700">
                    Search products
                  </label>
                  <input
                    id="search"
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search bedding, kitchen kits, and more"
                    className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                <div className="flex gap-3">
                  <div className="space-y-2">
                    <label htmlFor="sort" className="text-sm font-bold text-slate-700">
                      Sort
                    </label>
                    <select
                      id="sort"
                      value={sortMode}
                      onChange={(event) => setSortMode(event.target.value as SortMode)}
                      className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100"
                    >
                      {sortOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="h-14.5 rounded-full border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm hover:border-slate-400 hover:bg-stone-50"
                  >
                    Clear filters
                  </button>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <FilterGroup
                  title="Category"
                  options={categoryOptions}
                  value={filters.category}
                  onChange={(next) => setFilters((current) => ({ ...current, category: next as FilterState['category'] }))}
                />
                <FilterGroup
                  title="Price range"
                  options={[
                    { value: 'under-40', label: 'Under $40' },
                    { value: '40-80', label: '$40-$80' },
                    { value: '80-plus', label: '$80+' },
                  ]}
                  value={filters.price}
                  onChange={(next) => setFilters((current) => ({ ...current, price: next as FilterState['price'] }))}
                />
                <FilterGroup
                  title="Room type"
                  options={roomOptions}
                  value={filters.roomType}
                  onChange={(next) => setFilters((current) => ({ ...current, roomType: next as FilterState['roomType'] }))}
                />
                <FilterGroup
                  title="Delivery speed"
                  options={deliveryOptions}
                  value={filters.deliverySpeed}
                  onChange={(next) => setFilters((current) => ({ ...current, deliverySpeed: next as FilterState['deliverySpeed'] }))}
                />
                <FilterGroup
                  title="Popularity"
                  options={popularityOptions}
                  value={filters.popularity}
                  onChange={(next) => setFilters((current) => ({ ...current, popularity: next as FilterState['popularity'] }))}
                />
                <FilterGroup
                  title="Color / style"
                  options={colorOptions}
                  value={filters.color}
                  onChange={(next) => setFilters((current) => ({ ...current, color: next as FilterState['color'] }))}
                />
              </div>
            </section>

            {filteredProducts.length === 0 ? (
              <div className="rounded-4xl border border-stone-200 bg-white/90 p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                <p className="font-heading text-2xl font-bold text-slate-950">No products match your filters. Try removing one filter.</p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
                {filteredProducts.map((product) => {
                  const isExpanded = selectedProductId === product.id;

                  return (
                    <article
                      key={product.id}
                      className="overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.1)]"
                    >
                      <div className={`relative h-48 bg-linear-to-br ${product.imageGradient}`}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.65),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(15,23,42,0.03))]" />
                        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                          <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-800 backdrop-blur">
                            {product.category}
                          </span>
                          <span className="rounded-full bg-slate-950/85 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                            {product.popularity}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                          <div className="rounded-2xl bg-white/85 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-700 backdrop-blur">
                            {product.imageLabel}
                          </div>
                          <div className="rounded-2xl bg-slate-950/85 px-3 py-2 text-xs font-bold text-white backdrop-blur">
                            {product.deliverySpeed}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-heading text-2xl font-bold tracking-tight text-slate-950">{product.name}</h3>
                            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                              {product.category} • {product.roomType}
                            </p>
                          </div>
                          <p className="font-heading text-2xl font-bold text-orange-600">{formatCurrency.format(product.price)}</p>
                        </div>

                        <p className="text-sm leading-6 text-slate-600">{product.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag) => (
                            <span key={tag} className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-semibold text-slate-600">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-2xl bg-stone-50 p-4">
                            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Best for</p>
                            <p className="mt-2 text-sm leading-6 text-slate-700">{product.bestFor}</p>
                          </div>
                          <div className="rounded-2xl bg-stone-50 p-4">
                            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Delivery</p>
                            <p className="mt-2 text-sm font-semibold text-slate-700">{product.deliverySpeed}</p>
                          </div>
                        </div>

                        {isExpanded ? (
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">What is included</p>
                            <ul className="mt-3 space-y-2">
                              {product.includes.map((item) => (
                                <li key={item} className="flex items-center gap-2">
                                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => addToCart(product.id)}
                            className="inline-flex flex-1 items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-700"
                          >
                            Add to cart
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedProductId(isExpanded ? null : product.id)}
                            className="inline-flex flex-1 items-center justify-center rounded-full border border-orange-200 bg-white px-5 py-3 text-sm font-bold text-orange-700 transition hover:border-orange-300 hover:bg-orange-50"
                          >
                            {isExpanded ? 'Hide details' : 'View details'}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          <aside id="cart" className="space-y-6 self-start lg:sticky lg:top-24">
            <section className="rounded-4xl border border-stone-200/80 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Your Cart</p>
                  <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-slate-950">Your Cart ({cartCount} items)</h2>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToSection('checkout')}
                  className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700 hover:border-orange-300"
                >
                  Checkout
                </button>
              </div>

              <div className="mt-5 space-y-4">
                {cartDetails.length === 0 ? (
                  <div className="rounded-[1.35rem] border border-dashed border-orange-200 bg-orange-50/70 p-5 text-center">
                    <p className="font-heading text-2xl font-bold text-slate-950">Your cart is empty</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Add a bundle or kit to begin the guided checkout flow.</p>
                  </div>
                ) : (
                  cartDetails.map(({ product, quantity }) => (
                    <article key={product.id} className="rounded-[1.35rem] border border-orange-200 bg-white p-4 shadow-sm">
                      <div className="flex gap-4">
                        <div className={`h-24 w-24 shrink-0 rounded-2xl bg-linear-to-br ${product.imageGradient}`} />
                        <div className="min-w-0 flex-1">
                          <p className="font-heading text-xl font-bold leading-7 text-slate-950">{product.name}</p>
                          <p className="mt-1 text-sm text-stone-500">{product.category} • {product.roomType}</p>
                          <p className="mt-2 text-lg font-bold text-orange-600">{formatCurrency.format(product.price * quantity)}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center rounded-full bg-slate-100 p-1">
                          <button type="button" onClick={() => updateQuantity(product.id, -1)} className="flex h-9 w-9 items-center justify-center rounded-full text-xl font-bold text-slate-700 hover:bg-white" aria-label={`Decrease quantity for ${product.name}`}>
                            −
                          </button>
                          <span className="min-w-10 px-3 text-center text-sm font-bold text-slate-900">{quantity}</span>
                          <button type="button" onClick={() => updateQuantity(product.id, 1)} className="flex h-9 w-9 items-center justify-center rounded-full text-xl font-bold text-slate-700 hover:bg-white" aria-label={`Increase quantity for ${product.name}`}>
                            +
                          </button>
                        </div>

                        <button type="button" onClick={() => removeItem(product.id)} className="text-sm font-bold text-red-600 hover:text-red-700">
                          Remove
                        </button>
                      </div>
                    </article>
                  ))
                )}
              </div>

              <div className="mt-5 rounded-3xl bg-slate-100 p-5">
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-950">{formatCurrency.format(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Delivery fee</span>
                    <span className="font-bold text-blue-700">{deliveryFee === 0 ? 'FREE' : formatCurrency.format(deliveryFee)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Estimated tax</span>
                    <span className="font-bold text-slate-950">{formatCurrency.format(tax)}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-end justify-between border-t border-stone-200 pt-4">
                  <span className="text-lg font-bold text-slate-950">Total</span>
                  <span className="font-heading text-3xl font-bold text-orange-600">{formatCurrency.format(total)}</span>
                </div>

                <button
                  type="button"
                  onClick={continueToCheckout}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-5 py-4 text-base font-bold text-white shadow-[0_16px_36px_rgba(249,115,22,0.3)] transition hover:bg-orange-600"
                >
                  Continue to checkout →
                </button>

                <p className="mt-3 text-center text-xs font-medium text-slate-500">
                  Prototype only — no real payment is processed.
                </p>
              </div>
            </section>
          </aside>
        </section>

        <section id="checkout" className="space-y-6 rounded-4xl border border-stone-200/80 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Checkout</p>
              <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-slate-950">Guided move-in purchase</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Follow the instructions: add an item, enter personal details, use fake payment information, and finish with confirmation.
            </p>
          </div>

          <Stepper currentStep={checkoutStep} />

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-5">
              {checkoutStep === 0 ? (
                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-800">Cart step</p>
                  <p className="mt-2 text-base leading-7 text-blue-950">Use the cart on the right to review items, then continue to checkout when you are ready.</p>
                </div>
              ) : null}

              {checkoutStep >= 1 && checkoutStep <= 2 ? (
                <div className="space-y-5">
                  <form onSubmit={handleStudentSubmit} className={`space-y-4 rounded-3xl border p-5 shadow-sm ${checkoutStep === 1 ? 'border-orange-200 bg-orange-50/40' : 'border-stone-200 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-700">✦</div>
                      <div>
                        <h3 className="font-heading text-2xl font-bold text-slate-950">Student Details</h3>
                        <p className="text-sm text-slate-600">Enter personal information for the move-in order.</p>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2 md:col-span-2">
                        <label htmlFor="fullName" className="text-sm font-bold text-slate-700">Full name</label>
                        <input
                          id="fullName"
                          required
                          value={studentDetails.fullName}
                          onChange={(event) => setStudentDetails((current) => ({ ...current, fullName: event.target.value }))}
                          className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-bold text-slate-700">Email</label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={studentDetails.email}
                          onChange={(event) => setStudentDetails((current) => ({ ...current, email: event.target.value }))}
                          className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="university" className="text-sm font-bold text-slate-700">University</label>
                        <input
                          id="university"
                          required
                          value={studentDetails.university}
                          onChange={(event) => setStudentDetails((current) => ({ ...current, university: event.target.value }))}
                          className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label htmlFor="residence" className="text-sm font-bold text-slate-700">Residence / address</label>
                        <input
                          id="residence"
                          required
                          value={studentDetails.residence}
                          onChange={(event) => setStudentDetails((current) => ({ ...current, residence: event.target.value }))}
                          className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="moveInDate" className="text-sm font-bold text-slate-700">Move-in date</label>
                        <input
                          id="moveInDate"
                          type="date"
                          required
                          value={studentDetails.moveInDate}
                          onChange={(event) => setStudentDetails((current) => ({ ...current, moveInDate: event.target.value }))}
                          className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="notes" className="text-sm font-bold text-slate-700">Notes</label>
                        <input
                          id="notes"
                          value={studentDetails.notes}
                          onChange={(event) => setStudentDetails((current) => ({ ...current, notes: event.target.value }))}
                          className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep(0)}
                        className="inline-flex flex-1 items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-stone-50"
                      >
                        Back to cart
                      </button>
                      <button
                        type="submit"
                        className="inline-flex flex-1 items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_14px_26px_rgba(37,99,235,0.2)] hover:bg-blue-700"
                      >
                        Continue to payment
                      </button>
                    </div>
                  </form>

                  {checkoutStep === 2 ? (
                    <form onSubmit={handlePaymentSubmit} className="space-y-4 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">▣</div>
                        <div>
                          <h3 className="font-heading text-2xl font-bold text-slate-950">Payment</h3>
                          <p className="text-sm text-blue-700">Prototype only — no real payment is processed.</p>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                          <label htmlFor="cardholderName" className="text-sm font-bold text-slate-700">Cardholder name</label>
                          <input
                            id="cardholderName"
                            required
                            value={paymentDetails.cardholderName}
                            onChange={(event) => setPaymentDetails((current) => ({ ...current, cardholderName: event.target.value }))}
                            className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label htmlFor="cardNumber" className="text-sm font-bold text-slate-700">Card number</label>
                          <input
                            id="cardNumber"
                            required
                            inputMode="numeric"
                            placeholder="4242 4242 4242 4242"
                            value={paymentDetails.cardNumber}
                            onChange={(event) => setPaymentDetails((current) => ({ ...current, cardNumber: event.target.value }))}
                            className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="expiryDate" className="text-sm font-bold text-slate-700">Expiry date</label>
                          <input
                            id="expiryDate"
                            required
                            placeholder="MM/YY"
                            value={paymentDetails.expiryDate}
                            onChange={(event) => setPaymentDetails((current) => ({ ...current, expiryDate: event.target.value }))}
                            className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="cvc" className="text-sm font-bold text-slate-700">CVC</label>
                          <input
                            id="cvc"
                            required
                            inputMode="numeric"
                            placeholder="123"
                            value={paymentDetails.cvc}
                            onChange={(event) => setPaymentDetails((current) => ({ ...current, cvc: event.target.value }))}
                            className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label htmlFor="billingPostalCode" className="text-sm font-bold text-slate-700">Billing postal code</label>
                          <input
                            id="billingPostalCode"
                            required
                            placeholder="M5V 2T6"
                            value={paymentDetails.billingPostalCode}
                            onChange={(event) => setPaymentDetails((current) => ({ ...current, billingPostalCode: event.target.value }))}
                            className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setCheckoutStep(1)}
                          className="inline-flex flex-1 items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-stone-50"
                        >
                          Back to details
                        </button>
                        <button
                          type="submit"
                          className="inline-flex flex-1 items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-[0_14px_26px_rgba(249,115,22,0.22)] hover:bg-orange-600"
                        >
                          Place order →
                        </button>
                      </div>
                    </form>
                  ) : null}
                </div>
              ) : null}

              {checkoutStep >= 3 && orderSnapshot ? (
                <div className="space-y-5">
                  <section className="overflow-hidden rounded-3xl border border-orange-200 bg-linear-to-b from-blue-50 to-white shadow-sm">
                    <div className="px-5 py-6 text-center sm:px-8">
                      <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-blue-500 text-3xl text-white shadow-lg shadow-blue-200">
                        ✓
                      </div>
                      <h3 className="mt-4 font-heading text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                        Order confirmed — your move-in kit is on its way!
                      </h3>
                      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
                        Sit back and relax. We are coordinating the delivery so everything arrives before classes begin.
                      </p>
                    </div>

                    <div className="border-t border-orange-100 bg-white p-5 sm:p-6">
                      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="rounded-3xl bg-slate-50 p-5">
                          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Order number</p>
                          <p className="mt-2 font-heading text-3xl font-bold text-orange-600">{orderSnapshot.orderNumber}</p>
                          <div className="mt-5 space-y-3">
                            <p className="text-lg font-bold text-slate-950">Purchased items</p>
                            {orderSnapshot.items.map(({ product, quantity }) => (
                              <div key={product.id} className="flex items-center justify-between gap-4 border-b border-stone-200 pb-3 last:border-0 last:pb-0">
                                <div>
                                  <p className="font-semibold text-slate-900">{product.name}</p>
                                  <p className="text-sm text-slate-500">{product.category} • Qty: {quantity}</p>
                                </div>
                                <p className="font-bold text-slate-900">{formatCurrency.format(product.price * quantity)}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-3xl bg-blue-50 p-5">
                          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Delivery message</p>
                          <p className="mt-2 text-base leading-7 text-slate-700">
                            We’ve saved your selected items, and the delivery is planned for the earliest student-friendly window before move-in day.
                          </p>

                          <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between py-1 text-sm text-slate-700">
                              <span>Subtotal</span>
                              <span className="font-bold text-slate-950">{formatCurrency.format(orderSnapshot.subtotal)}</span>
                            </div>
                            <div className="flex items-center justify-between py-1 text-sm text-slate-700">
                              <span>Delivery fee</span>
                              <span className="font-bold text-blue-700">{orderSnapshot.deliveryFee === 0 ? 'FREE' : formatCurrency.format(orderSnapshot.deliveryFee)}</span>
                            </div>
                            <div className="flex items-center justify-between py-1 text-sm text-slate-700">
                              <span>Estimated tax</span>
                              <span className="font-bold text-slate-950">{formatCurrency.format(orderSnapshot.tax)}</span>
                            </div>
                            <div className="mt-3 flex items-end justify-between border-t border-stone-200 pt-3">
                              <span className="text-lg font-bold text-slate-950">Total</span>
                              <span className="font-heading text-3xl font-bold text-orange-600">{formatCurrency.format(orderSnapshot.total)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {!surveyOpen && !surveySubmitted ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSurveyOpen(true);
                        scrollToSection('survey');
                      }}
                      className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-5 py-4 text-base font-bold text-white shadow-[0_16px_30px_rgba(37,99,235,0.22)] hover:bg-blue-700"
                    >
                      Complete 30-second survey
                    </button>
                  ) : null}

                  {surveyOpen && !surveySubmitted ? (
                    <form id="survey" onSubmit={handleSurveySubmit} className="rounded-3xl border border-orange-200 bg-white p-5 shadow-sm md:p-6">
                      <div className="max-w-2xl">
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Communication process: post-purchase survey</p>
                        <h3 className="mt-2 font-heading text-4xl font-bold tracking-tight text-slate-950">Help us improve the move-in experience</h3>
                        <p className="mt-3 text-base leading-7 text-slate-600">Tell us how your experience felt — we read every response.</p>
                      </div>

                      <div className="mt-6 space-y-6">
                        <div className="space-y-3">
                          <label className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Overall rating</label>
                          <div className="flex flex-wrap gap-2">
                            {['1', '2', '3', '4', '5'].map((rating) => {
                              const active = survey.rating === rating;

                              return (
                                <button
                                  key={rating}
                                  type="button"
                                  aria-pressed={active}
                                  onClick={() => setSurvey((current) => ({ ...current, rating }))}
                                  className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-bold transition ${
                                    active
                                      ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-200'
                                      : 'border-orange-200 bg-white text-slate-700 hover:bg-orange-50'
                                  }`}
                                >
                                  {rating}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="grid gap-5 lg:grid-cols-2">
                          <div className="space-y-3">
                            <p className="text-2xl font-heading font-bold text-slate-950">How easy was it to find what you needed?</p>
                            <div className="space-y-3">
                              {['Very Easy', 'Just Right', 'Needs Work'].map((option) => {
                                const active = survey.ease === option;

                                return (
                                  <button
                                    key={option}
                                    type="button"
                                    aria-pressed={active}
                                    onClick={() => setSurvey((current) => ({ ...current, ease: option }))}
                                    className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                                      active
                                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                                        : 'border-orange-200 bg-white text-slate-700 hover:bg-stone-50'
                                    }`}
                                  >
                                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${active ? 'border-blue-600 bg-blue-600' : 'border-stone-300 bg-white'}`}>
                                      <span className="h-2.5 w-2.5 rounded-full bg-white" />
                                    </span>
                                    <span className="font-medium">{option}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <p className="text-2xl font-heading font-bold text-slate-950">How confident do you feel about move-in day?</p>
                            <div className="space-y-3">
                              {['Fully Prepared', 'Still a Bit Anxious'].map((option) => {
                                const active = survey.confidence === option;

                                return (
                                  <button
                                    key={option}
                                    type="button"
                                    aria-pressed={active}
                                    onClick={() => setSurvey((current) => ({ ...current, confidence: option }))}
                                    className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                                      active
                                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                                        : 'border-orange-200 bg-white text-slate-700 hover:bg-stone-50'
                                    }`}
                                  >
                                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${active ? 'border-blue-600 bg-blue-600' : 'border-stone-300 bg-white'}`}>
                                      <span className="h-2.5 w-2.5 rounded-full bg-white" />
                                    </span>
                                    <span className="font-medium">{option}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="comment" className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">
                            Anything else we should know?
                          </label>
                          <textarea
                            id="comment"
                            rows={5}
                            value={survey.comment}
                            onChange={(event) => setSurvey((current) => ({ ...current, comment: event.target.value }))}
                            placeholder="Your experience matters to us..."
                            className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100"
                          />
                        </div>

                        <button
                          type="submit"
                          className="inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-5 py-4 text-base font-bold text-white shadow-[0_16px_36px_rgba(249,115,22,0.28)] hover:bg-orange-600"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  ) : null}

                  {surveySubmitted ? (
                    <section className="rounded-[1.75rem] border border-blue-200 bg-blue-50 px-5 py-8 text-center shadow-sm">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 text-4xl text-white shadow-lg shadow-blue-200">
                        ✓
                      </div>
                      <h3 className="mt-5 font-heading text-4xl font-bold text-slate-950">Thank you</h3>
                      <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-600">
                        Your feedback helps DormDash support more students and make their move-in experience stress-free.
                      </p>
                      <button
                        type="button"
                        onClick={() => scrollToSection('top')}
                        className="mt-6 inline-flex items-center justify-center rounded-full border border-blue-500 bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
                      >
                        Return to Dashboard
                      </button>
                    </section>
                  ) : null}
                </div>
              ) : null}
            </div>

            <aside className="space-y-5 xl:sticky xl:top-24">
              <section className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Quick notes</p>
                <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                  <div className="rounded-2xl bg-stone-50 p-4">Friendly tone for student move-in planning.</div>
                  <div className="rounded-2xl bg-stone-50 p-4">High-contrast cards, clear hierarchy, and responsive layout.</div>
                  <div className="rounded-2xl bg-stone-50 p-4">Amazon and IKEA are the report inspiration references.</div>
                </div>
              </section>

              <section className="rounded-3xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue-800">Connection copy</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">Tell us how your experience felt — we read every response.</p>
              </section>
            </aside>
          </div>
        </section>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 px-3 py-2 backdrop-blur sm:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-2 text-center text-xs font-bold text-slate-600">
          <button type="button" onClick={() => scrollToSection('shop')} className="rounded-2xl px-2 py-2 hover:bg-stone-50">
            Shop
          </button>
          <button type="button" onClick={startBundles} className="rounded-2xl px-2 py-2 hover:bg-stone-50">
            Bundles
          </button>
          <button type="button" onClick={() => scrollToSection('cart')} className="rounded-2xl px-2 py-2 hover:bg-stone-50">
            Cart
          </button>
          <button type="button" onClick={() => scrollToSection('checkout')} className="rounded-2xl px-2 py-2 hover:bg-stone-50">
            Survey
          </button>
        </div>
      </nav>
    </main>
  );
}
