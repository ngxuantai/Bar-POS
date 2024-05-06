import {
  AttributeItem,
  AttributeWithQuantity,
  ProductWithQuantity,
} from "../../types";
import { ATTRIBUTE_ERROR_EMPTY, ATTRIBUTE_ERROR_NOT_ENOUGH } from "@/constants";

export function changeQuantity(
  attributes: AttributeItem[],
  delta: number,
  attributeId: string,
  event?: Event
) {
  const newValue = parseInt((event?.target as HTMLInputElement)?.value);
  attributes.map((attribute: AttributeItem) => {
    if (attribute.id === attributeId) {
      if (newValue !== undefined && newValue >= 0 && !isNaN(newValue)) {
        attribute.quantity = newValue;
      } else {
        attribute.quantity += delta;
      }

      if (attribute.quantity > attribute.number_product) {
        attribute.error = ATTRIBUTE_ERROR_NOT_ENOUGH;
      } else {
        attribute.error = "";
      }
    }
  });
}

export function checkAttribute(attributes: {
  value: AttributeItem[];
}): boolean {
  let hasQuantityGreaterThanZero = false;
  let allQuantityEqualZero = true;

  attributes.value.map((attribute: AttributeItem) => {
    if (attribute.quantity > 0) {
      hasQuantityGreaterThanZero = true;
    }
    if (attribute.quantity !== 0) {
      allQuantityEqualZero = false;
    }
    if (attribute.error !== "") {
      return false;
    }
  });

  if (allQuantityEqualZero) {
    for (const attribute of attributes.value) {
      attribute.error = ATTRIBUTE_ERROR_EMPTY;
    }
    return false;
  }

  return (
    hasQuantityGreaterThanZero &&
    attributes.value.every((attribute) => attribute.error === "")
  );
}

export function getTextAttribute(product: ProductWithQuantity) {
  let text = "";
  let count = 0;

  product.attributes.forEach((attr: AttributeWithQuantity) => {
    if (attr.quantity > 0) {
      if (count >= 1) {
        text += ", ";
      }
      text += `${attr.value} ml ${attr.name} x ${attr.quantity}`;
      count++;
    }
  });

  return text;
}

export function getTotalPriceOrderDetail(product: ProductWithQuantity) {
  let total = 0;
  product.attributes.forEach((attr: AttributeWithQuantity) => {
    total += attr.price * attr.quantity;
  });
  return total;
}

export function resetAttributes(
  attributes: { value: AttributeItem[] },
  notes?: { value: string },
  promoCode?: { value: string }
) {
  attributes.value.map((attribute: AttributeItem) => {
    attribute.check = false;
    attribute.quantity = 0;
    attribute.error = "";
  });
  if (notes) {
    notes.value = "";
  }
  if (promoCode) {
    promoCode.value = "";
  }
}
