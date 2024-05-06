import { ref } from "vue";
import { projectFirestore } from "../config/firebase";
import {
  DocumentData,
  getDoc,
  doc,
  query,
  where,
  collection,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { Product, OrderDetail } from "types";
import {
  PRODUCTS,
  ID_PRODUCT,
  ATTRIBUTES,
  ID_ATTRIBUTE,
  PRODUCT_ATTRIBUTES,
} from "@/constants";

async function getProduct(id: string) {
  const product = ref<Product>();

  try {
    const res: DocumentData = await getDoc(doc(projectFirestore, PRODUCTS, id));
    product.value = {
      id: res.id,
      ...res.data(),
    };
    if (!res.exists) {
      throw new Error("That product does not exist");
    }
  } catch (err) {
    console.error(err);
  }

  return product;
}

async function updateNumberProduct(
  orderDetail: OrderDetail,
  attributeId: string,
  attributeQuantity: number
) {
  const productRef = doc(
    projectFirestore,
    PRODUCTS,
    orderDetail.infor_product.id
  );
  const attributeRef = doc(projectFirestore, ATTRIBUTES, attributeId);
  const productAttributeQuery = query(
    collection(projectFirestore, PRODUCT_ATTRIBUTES),
    where(ID_PRODUCT, "==", productRef),
    where(ID_ATTRIBUTE, "==", attributeRef)
  );
  await getDocs(productAttributeQuery).then(
    async (productAttributeQuerySnapshot) => {
      const productAttributeDoc = productAttributeQuerySnapshot.docs[0];
      const productAttributeData = productAttributeDoc.data();
      if (productAttributeData.number_product > 0) {
        await updateDoc(productAttributeDoc.ref, {
          number_product:
            productAttributeData.number_product - attributeQuantity,
        });
      }
    }
  );
}

export { getProduct, updateNumberProduct };
