"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/Cart";

const amounts = [25, 50, 100, 200];

export function GiftCardForm() {
  const { add } = useCart();
  const router = useRouter();
  const [amount, setAmount] = useState(50);
  return (
    <form className="container-content max-w-[40rem] space-y-8 pb-32 md:pb-40"
      onSubmit={(e) => {
        e.preventDefault();
        const to = new FormData(e.currentTarget).get("to") as string;
        add({ id: `gift-${amount}-${to}`, href: "/gift-cards", name: `Gift card €${amount}`, price: amount, image: "posterMobile", option: `To ${to}` });
        router.push("/cart");
      }}>
      <fieldset>
        <legend className="label">Amount</legend>
        <div className="flex flex-wrap gap-2">
          {amounts.map((a) => (
            <label key={a} className="cursor-pointer">
              <input type="radio" name="amount" value={a} checked={amount === a} onChange={() => setAmount(a)} className="peer sr-only" />
              <span className="flex h-12 min-w-20 items-center justify-center rounded-full border border-muted px-4 transition-colors duration-150 peer-checked:bg-primary peer-checked:text-background peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:border-text">€{a}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div><label className="label" htmlFor="to">Recipient email</label><input id="to" name="to" type="email" required className="field" /></div>
      <div><label className="label" htmlFor="msg">Message (optional)</label><textarea id="msg" name="msg" rows={3} maxLength={200} className="field" /></div>
      <button type="submit" className="btn btn-primary w-full sm:w-auto">Add to bag</button>
    </form>
  );
}
