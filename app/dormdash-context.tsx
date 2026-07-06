'use client';

import { createContext, useContext, useEffect, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import {
  formatCurrency,
  initialPaymentDetails,
  initialStudentDetails,
  initialSurvey,
  products,
  type CartItem,
  type OrderSnapshot,
  type PaymentDetails,
  type StudentDetails,
  type SurveyState,
} from './dormdash-data';

type StoredState = {
  cartItems: CartItem[];
  checkoutStep: number;
  studentDetails: StudentDetails;
  paymentDetails: PaymentDetails;
  orderSnapshot: OrderSnapshot | null;
  survey: SurveyState;
  surveyOpen: boolean;
  surveySubmitted: boolean;
};

type DormDashContextValue = StoredState & {
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  setCheckoutStep: Dispatch<SetStateAction<number>>;
  setStudentDetails: Dispatch<SetStateAction<StudentDetails>>;
  setPaymentDetails: Dispatch<SetStateAction<PaymentDetails>>;
  setOrderSnapshot: Dispatch<SetStateAction<OrderSnapshot | null>>;
  setSurvey: Dispatch<SetStateAction<SurveyState>>;
  setSurveyOpen: Dispatch<SetStateAction<boolean>>;
  setSurveySubmitted: Dispatch<SetStateAction<boolean>>;
  addToCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  goToStudentDetails: () => void;
  submitStudentDetails: () => void;
  submitPayment: () => string;
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
};

const STORAGE_KEY = 'dormdash-state-v2';
const DormDashContext = createContext<DormDashContextValue | null>(null);

function emptyState(): StoredState {
  return {
    cartItems: [],
    checkoutStep: 0,
    studentDetails: initialStudentDetails,
    paymentDetails: initialPaymentDetails,
    orderSnapshot: null,
    survey: initialSurvey,
    surveyOpen: false,
    surveySubmitted: false,
  };
}

function readStoredState(): StoredState {
  if (typeof window === 'undefined') {
    return emptyState();
  }

  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return emptyState();
    const parsed = JSON.parse(stored) as Partial<StoredState>;
    return {
      cartItems: parsed.cartItems ?? [],
      checkoutStep: parsed.checkoutStep ?? 0,
      studentDetails: parsed.studentDetails ?? initialStudentDetails,
      paymentDetails: parsed.paymentDetails ?? initialPaymentDetails,
      orderSnapshot: parsed.orderSnapshot ?? null,
      survey: parsed.survey ?? initialSurvey,
      surveyOpen: parsed.surveyOpen ?? false,
      surveySubmitted: parsed.surveySubmitted ?? false,
    };
  } catch {
    return emptyState();
  }
}

export function DormDashProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => readStoredState().cartItems);
  const [checkoutStep, setCheckoutStep] = useState<number>(() => readStoredState().checkoutStep);
  const [studentDetails, setStudentDetails] = useState<StudentDetails>(() => readStoredState().studentDetails);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>(() => readStoredState().paymentDetails);
  const [orderSnapshot, setOrderSnapshot] = useState<OrderSnapshot | null>(() => readStoredState().orderSnapshot);
  const [survey, setSurvey] = useState<SurveyState>(() => readStoredState().survey);
  const [surveyOpen, setSurveyOpen] = useState<boolean>(() => readStoredState().surveyOpen);
  const [surveySubmitted, setSurveySubmitted] = useState<boolean>(() => readStoredState().surveySubmitted);

  const productMap = useMemo(() => new Map(products.map((product) => [product.id, product])), []);

  const cartDetails = useMemo(
    () =>
      cartItems
        .map((item) => {
          const product = productMap.get(item.productId);
          return product ? { product, quantity: item.quantity } : null;
        })
        .filter(Boolean) as Array<{ product: (typeof products)[number]; quantity: number }>,
    [cartItems, productMap],
  );

  const subtotal = useMemo(() => cartDetails.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [cartDetails]);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 120 ? 0 : 12;
  const tax = Number((subtotal * 0.13).toFixed(2));
  const total = Number((subtotal + deliveryFee + tax).toFixed(2));

  useEffect(() => {
    const state: StoredState = {
      cartItems,
      checkoutStep,
      studentDetails,
      paymentDetails,
      orderSnapshot,
      survey,
      surveyOpen,
      surveySubmitted,
    };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [cartItems, checkoutStep, studentDetails, paymentDetails, orderSnapshot, survey, surveyOpen, surveySubmitted]);

  function addToCart(productId: string) {
    setCartItems((current) => {
      const existing = current.find((item) => item.productId === productId);
      return existing ? current.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item)) : [...current, { productId, quantity: 1 }];
    });
  }

  function updateQuantity(productId: string, delta: number) {
    setCartItems((current) =>
      current
        .map((item) => (item.productId === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0),
    );
  }

  function removeItem(productId: string) {
    setCartItems((current) => current.filter((item) => item.productId !== productId));
  }

  function clearCart() {
    setCartItems([]);
  }

  function goToStudentDetails() {
    setCheckoutStep(1);
  }

  function submitStudentDetails() {
    setCheckoutStep(2);
  }

  function submitPayment() {
    const orderNumber = `DD-${Math.floor(100000 + Math.random() * 900000)}`;
    const items = cartDetails.map((item) => ({ ...item }));
    const finalSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const finalDeliveryFee = finalSubtotal === 0 ? 0 : finalSubtotal >= 120 ? 0 : 12;
    const finalTax = Number((finalSubtotal * 0.13).toFixed(2));
    const finalTotal = Number((finalSubtotal + finalDeliveryFee + finalTax).toFixed(2));

    setOrderSnapshot({ orderNumber, items, subtotal: finalSubtotal, deliveryFee: finalDeliveryFee, tax: finalTax, total: finalTotal });
    setCheckoutStep(3);
    return orderNumber;
  }

  const value: DormDashContextValue = {
    cartItems,
    checkoutStep,
    studentDetails,
    paymentDetails,
    orderSnapshot,
    survey,
    surveyOpen,
    surveySubmitted,
    setCartItems,
    setCheckoutStep,
    setStudentDetails,
    setPaymentDetails,
    setOrderSnapshot,
    setSurvey,
    setSurveyOpen,
    setSurveySubmitted,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    goToStudentDetails,
    submitStudentDetails,
    submitPayment,
    cartCount,
    subtotal,
    deliveryFee,
    tax,
    total,
  };

  return <DormDashContext.Provider value={value}>{children}</DormDashContext.Provider>;
}

export function useDormDash() {
  const context = useContext(DormDashContext);
  if (!context) {
    throw new Error('useDormDash must be used within DormDashProvider');
  }
  return context;
}

export { formatCurrency } from './dormdash-data';
