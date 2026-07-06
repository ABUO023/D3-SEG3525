export type Category =
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

export type RoomType = 'Dorm' | 'Shared apartment' | 'Studio';
export type DeliverySpeed = 'Standard' | 'Express' | 'Move-in day';
export type Popularity = 'Popular' | 'New' | 'Best value';
export type ColorStyle = 'Neutral' | 'Blue' | 'Green' | 'Warm';
export type SortMode = 'Most Popular' | 'Price: Low to High' | 'Price: High to Low';

export type Product = {
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

export type CartItem = {
  productId: string;
  quantity: number;
};

export type FilterState = {
  category: Category | '';
  price: '' | 'under-40' | '40-80' | '80-plus';
  roomType: RoomType | '';
  deliverySpeed: DeliverySpeed | '';
  popularity: Popularity | '';
  color: ColorStyle | '';
};

export type StudentDetails = {
  fullName: string;
  email: string;
  university: string;
  residence: string;
  moveInDate: string;
  notes: string;
};

export type PaymentDetails = {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  billingPostalCode: string;
};

export type SurveyState = {
  rating: string;
  ease: string;
  confidence: string;
  comment: string;
};

export type OrderSnapshot = {
  orderNumber: string;
  items: Array<{ product: Product; quantity: number }>;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
};

export const products: Product[] = [
  {
    id: 'dorm-starter-bundle',
    name: 'Complete Dorm Starter Bundle',
    category: 'Bundle',
    price: 149,
    roomType: 'Dorm',
    color: 'Neutral',
    deliverySpeed: 'Move-in day',
    popularity: 'Popular',
    description: 'A polished all-in-one starter set for students who want bedding, desk basics, shower gear, and snack-ready essentials in one cart.',
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
    description: 'Soft layers and practical bedding pieces designed to make a small dorm bed feel warm, calm, and finished.',
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
    description: 'A compact study setup with organizers and desk tools that turn a corner into a clean, productive workspace.',
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
    description: 'Simple kitchen basics for microwave meals, quick breakfasts, and easy cleanup in a shared student kitchen.',
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
    description: 'A portable bathroom set with shower storage and toiletries organization for communal washroom routines.',
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
    description: 'Canadian winter essentials with practical layers and comfort items so students arrive ready for cold weather.',
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
    description: 'Everyday cleaning essentials for keeping a studio or residence room tidy without buying full-size supplies.',
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
    description: 'A sleek task lamp with a soft glow that gives late-night reading and assignment work a better atmosphere.',
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
    description: 'A small laundry kit with carry-and-sort basics that help make shared laundry room trips simpler and faster.',
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
    description: 'A grab-and-go snack mix for busy class days, late study sessions, and the first week of move-in chaos.',
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
    description: 'Soft decor pieces that bring warmth and personality into small rooms without making the space feel crowded.',
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
    description: 'A practical arrival bundle for students settling into Canada for the first time, with essentials for day one and the first week.',
    tags: ['Arrival support', 'First week ready', 'Student-first'],
    imageGradient: 'from-indigo-200 via-sky-100 to-cyan-50',
    imageLabel: 'Arrival kit',
    bestFor: 'International students who need a reliable first purchase that covers the biggest move-in needs.',
    includes: ['Bedding basics', 'Shower kit', 'Desk tools', 'Pantry starter pack'],
  },
];

export const categoryOptions: Category[] = ['Bundle', 'Bedding', 'Desk', 'Kitchen', 'Bathroom', 'Winter', 'Cleaning', 'Laundry', 'Food', 'Decor'];
export const roomOptions: RoomType[] = ['Dorm', 'Shared apartment', 'Studio'];
export const deliveryOptions: DeliverySpeed[] = ['Standard', 'Express', 'Move-in day'];
export const popularityOptions: Popularity[] = ['Popular', 'New', 'Best value'];
export const colorOptions: ColorStyle[] = ['Neutral', 'Blue', 'Green', 'Warm'];
export const formatCurrency = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' });

export const initialStudentDetails: StudentDetails = {
  fullName: '',
  email: '',
  university: '',
  residence: '',
  moveInDate: '',
  notes: '',
};

export const initialPaymentDetails: PaymentDetails = {
  cardholderName: '',
  cardNumber: '',
  expiryDate: '',
  cvc: '',
  billingPostalCode: '',
};

export const initialSurvey: SurveyState = {
  rating: '5',
  ease: 'Very Easy',
  confidence: 'Fully Prepared',
  comment: '',
};

export const stepLabels = ['Cart', 'Student Details', 'Payment', 'Confirmation'] as const;
