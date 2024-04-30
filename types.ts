interface Product {
  id: string;
  name: string;
  description: string;
  about: string;
  id_category: string;
}

interface ProductWithAttributes extends Product {
  attributes: Attribute[];
}

interface Attribute {
  id: string;
  name: string;
  value: number;
  price: number;
  number_product: number;
}

interface AttributeWithQuantity extends Attribute {
  quantity: number;
}

interface ProductWithQuantity extends Product {
  attributes: AttributeWithQuantity[];
}

interface OrderDetail {
  infor_product: ProductWithQuantity;
  notes: string;
  discount: number;
  total_quantity: number;
  total_price_product: number;
}

interface OrderInfor {
  discount: number;
  total_quantity: number;
  total_price: number;
}

interface Category {
  id: string;
  name: string;
  check: boolean;
  children?: Category[];
}

export type { Product, ProductWithAttributes, Attribute, AttributeWithQuantity, ProductWithQuantity, OrderDetail, OrderInfor, Category };
