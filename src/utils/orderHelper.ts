import { ProductWithAttributes, AttributeItem, OrderDetail } from "types";

export function createOrderDetail(
  product: ProductWithAttributes,
  attributes: { value: AttributeItem[] },
  notes?: { value: string },
  discount?: { value: number }
) {
  const orderDetail = {
    infor_product: {
      id: product.id,
      name: product.name,
      description: product.description,
      about: product.about,
      id_category: product.id_category,
      attributes: attributes.value.map((attribute: AttributeItem) => {
        return {
          id: attribute.id,
          name: attribute.name,
          value: attribute.value,
          price: attribute.price,
          quantity: attribute.quantity,
        };
      }),
    },
    notes: notes?.value || "",
    discount: discount?.value || 0,
    total_quantity: attributes.value.reduce(
      (total, attribute) => total + attribute.quantity,
      0
    ),
    total_price_product: attributes.value.reduce(
      (total, attribute) => total + attribute.price * attribute.quantity,
      0
    ),
  } as OrderDetail;
  return orderDetail;
}
