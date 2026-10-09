export type ProductColor = {
  name: string;
  hex: string;
};

// One purchasable SKU. id is what the orders API calls variant_id. 
export type ProductVariant = {
  id: number;
  color: string | null; 
  size: string | null; 
  stock: number;
  allowBackorders: boolean;
  price: number; 
  image: string; 
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  description: string;
  specs: string[];
  inStock: boolean;
  createdAt: string; 
  variants: ProductVariant[];
};

export type CartLine = {
  variantId: number; 
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  color: ProductColor;
  size: string;
  quantity: number;
};

export type ShippingMethod = {
  id: string;
  label: string;
  eta: string;
  price: number;
};

export type ShippingInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};