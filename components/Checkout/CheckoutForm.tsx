"use client";

import type { ShippingInfo } from "@/lib/types";

type FieldProps = {
  label: string;
  name: keyof ShippingInfo;
  value: string;
  onChange: (name: keyof ShippingInfo, value: string) => void;
  type?: string;
  autoComplete?: string;
};

function Field({ label, name, value, onChange, type = "text", autoComplete }: FieldProps) {
  return (
    <label className="block">
      <span className="checkout-input mb-1.5 block">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(name, e.target.value)}
        className="checkout-input w-full rounded-md border border-black/15 bg-white px-3.5 py-2.5 focus:border-black focus:outline-none"
      />
    </label>
  );
}

type CheckoutFormProps = {
  info: ShippingInfo;
  onChange: (name: keyof ShippingInfo, value: string) => void;
  createAccount: boolean;
  onCreateAccountChange: (checked: boolean) => void;
};

export default function CheckoutForm({
  info,
  onChange,
  createAccount,
  onCreateAccountChange,
}: CheckoutFormProps) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="sub-header">Personal Information</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="First Name" name="firstName" value={info.firstName} onChange={onChange} />
          <Field label="Last Name" name="lastName" value={info.lastName} onChange={onChange} />
          <Field
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            value={info.email}
            onChange={onChange}
          />
          <Field
            label="Phone Number"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={info.phone}
            onChange={onChange}
          />
        </div>
      </div>

      <div>
        <h2 className="sub-header">Shipping Address</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Street Address" name="street" value={info.street} onChange={onChange} />
          </div>
          <Field label="City" name="city" value={info.city} onChange={onChange} />
          <Field label="State" name="state" value={info.state} onChange={onChange} />
          <Field label="Zip Code" name="zip" value={info.zip} onChange={onChange} />
          <Field label="Country" name="country" value={info.country} onChange={onChange} />
        </div>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={createAccount}
          onChange={(e) => onCreateAccountChange(e.target.checked)}
          className="h-4 w-4 accent-black"
        />
        <span className="sidebar-black !text-[#0E1422] text-[#000000]">Create an account?</span>
      </label>
    </div>
  );
}
