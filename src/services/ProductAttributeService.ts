import { ref } from "vue";
import { projectFirestore } from "../config/firebase";
import {
  query,
  collection,
  where,
  doc,
  getDocs,
  DocumentData,
  Query,
} from "firebase/firestore";
import { getProduct } from "@/services/ProductService";
import { getAttribute } from "@/services/AttributeService";
import { getCategoryById } from "@/services/CategoryService";
import { ProductWithAttributes, Attribute, Product } from "types";
import {
  PRODUCTS,
  ID_PRODUCT,
  CATEGORIES,
  ID_CATEGORY,
  PRODUCT_ATTRIBUTES,
} from "@/constants";

async function getProductWithAttributes(id: string) {
  const product = ref<ProductWithAttributes>();

  try {
    const productData = await getProduct(id);
    product.value = {
      ...(productData.value as Product),
      attributes: [],
    };
    const productAttributeQuery = query(
      collection(projectFirestore, PRODUCT_ATTRIBUTES),
      where(ID_PRODUCT, "==", doc(projectFirestore, PRODUCTS, id))
    );
    const productAttributeQuerySnapshot = await getDocs(productAttributeQuery);
    for (const doc of productAttributeQuerySnapshot.docs) {
      const docData = doc.data();
      const attributeData = await getAttribute(docData.id_attribute.id);
      const attribute: Attribute = {
        ...(attributeData.value as Attribute),
        value: docData.value,
        price: docData.price,
        number_product: docData.number_product,
      };
      product.value?.attributes.push(attribute);
    }
  } catch (err) {
    console.error(err);
  }

  return { product };
}

async function createQuery(id_category?: string, id_child_category?: string) {
  let productQuery: Query<DocumentData> = collection(
    projectFirestore,
    PRODUCTS
  );
  if (id_category) {
    const childCategories = await getCategoryById(id_category);
    const childCategoryRef = childCategories?.map((childCategory) =>
      doc(projectFirestore, CATEGORIES, childCategory.id)
    );

    productQuery = query(
      productQuery,
      where(ID_CATEGORY, "in", childCategoryRef)
    );
  }
  if (id_child_category) {
    productQuery = query(
      productQuery,
      where(
        ID_CATEGORY,
        "==",
        doc(projectFirestore, CATEGORIES, id_child_category)
      )
    );
  }
  return productQuery;
}

async function getAllProductAttributes(
  id_category?: string,
  id_child_category?: string
) {
  const products = ref<ProductWithAttributes[]>([]);
  try {
    const productQuery = await createQuery(id_category, id_child_category);
    const productQuerySnapshot = await getDocs(productQuery);
    productQuerySnapshot.forEach(async (doc: DocumentData) => {
      const productData = await getProductWithAttributes(doc.id as string);
      if (productData.product.value) {
        products.value.push(productData.product.value);
      }
    });
    return { products };
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

async function getSimilarProductWithAttributes(
  id: string,
  id_category: string
) {
  const products = ref<ProductWithAttributes[]>([]);
  try {
    const productsData = await getAllProductAttributes("", id_category);
    if (productsData) {
      products.value = productsData.products.value;
    }
    return { products };
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

export {
  getProductWithAttributes,
  getAllProductAttributes,
  getSimilarProductWithAttributes,
};
