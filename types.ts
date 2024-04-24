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
}

interface AttributeWithQuantity extends Attribute {
  quantity: number;
}

interface ProductWithQuantity extends Product {
  attributes: AttributeWithQuantity[];
}

interface Order {
  listProducts: ProductWithQuantity[];
  notes: string;
  discount: number;
  total_quantity: number;
  total_price: number;
}

export type { Product, ProductWithAttributes, Attribute, AttributeWithQuantity, ProductWithQuantity, Order };
