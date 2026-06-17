"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhotoPlaceholder } from "@/components/commerce/photo-placeholder";
import { useCart } from "@/store/cart";
import { naira } from "@/lib/utils";

const DELIVERY_FEE = 3500;
const VAT_RATE = 0.075;

export default function CartPage() {
  const { items, removeItem, updateQty, total } = useCart();
  const subtotal = total();
  const vat = subtotal * VAT_RATE;
  const grandTotal = subtotal + DELIVERY_FEE + vat;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 text-center px-6">
        <div className="h-20 w-20 rounded-full bg-brand-light flex items-center justify-center text-brand">
          <ShoppingCart size={36} />
        </div>
        <h2 className="font-display font-bold text-2xl text-ink">Your cart is empty</h2>
        <p className="text-ink-500 font-sans text-base max-w-xs">
          You haven't added anything yet. Browse the marketplace to find something you love.
        </p>
        <Link href="/shop">
          <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>Browse Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-ink-100 min-h-screen py-10">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <h1 className="font-display font-bold text-3xl text-ink mb-8 tracking-tight">Your Cart</h1>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Line items */}
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-ink-200 shadow-[var(--shadow-sm)] p-5 flex gap-5 items-center">
                <div className="h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
                  <PhotoPlaceholder seed={item.seed} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-ink font-sans line-clamp-2">{item.name}</h3>
                  <p className="text-xs text-ink-500 font-sans mt-0.5">{item.vendor} · per {item.unit}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center border border-ink-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="h-8 w-8 flex items-center justify-center text-ink-600 hover:bg-ink-100 transition-colors"
                      ><Minus size={14} /></button>
                      <span className="w-9 text-center text-sm font-semibold font-sans">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="h-8 w-8 flex items-center justify-center text-ink-600 hover:bg-ink-100 transition-colors"
                      ><Plus size={14} /></button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-ink-400 hover:text-error transition-colors"
                      aria-label="Remove item"
                    ><Trash2 size={16} /></button>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-display font-bold text-lg text-brand">{naira(item.price * item.quantity)}</span>
                  <p className="text-xs text-ink-500 font-sans mt-0.5">{naira(item.price)} × {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-xl border border-ink-200 shadow-[var(--shadow-sm)] p-6 sticky top-24">
            <h2 className="font-sans font-bold text-lg text-ink mb-5">Order Summary</h2>
            <div className="flex flex-col gap-3 text-sm font-sans">
              <div className="flex justify-between text-ink-600">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-semibold text-ink">{naira(subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink-600">
                <span>Delivery estimate</span>
                <span className="font-semibold text-ink">{naira(DELIVERY_FEE)}</span>
              </div>
              <div className="flex justify-between text-ink-600">
                <span>VAT (7.5%)</span>
                <span className="font-semibold text-ink">{naira(Math.round(vat))}</span>
              </div>
              <div className="border-t border-ink-200 pt-3 flex justify-between">
                <span className="font-bold text-ink">Total</span>
                <span className="font-display font-bold text-xl text-brand">{naira(Math.round(grandTotal))}</span>
              </div>
            </div>
            <Link href="/checkout" className="block mt-6">
              <Button variant="gold" size="lg" fullWidth trailingIcon={<ArrowRight size={18} />}>
                Proceed to Checkout
              </Button>
            </Link>
            <Link href="/shop" className="block mt-3">
              <Button variant="ghost" size="md" fullWidth>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
