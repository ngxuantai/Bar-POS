import { ref } from "vue";
import { projectFirestore } from "../config/firebase";
import {
  doc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { Product, ProductWithAttributes, Attribute } from "../../types";

async function getAllProducts(id_sub_category: string) {
  const products = ref<ProductWithAttributes[]>([]);

  try {
    const productQuery = collection(projectFirestore, "products");
    const productQuerySnapshot = await getDocs(productQuery);

    for (const productDoc of productQuerySnapshot.docs) {
      const productData = productDoc.data() as Product;
      const productWithAttributes: ProductWithAttributes = {
        ...productData,
        attributes: [],
      };

      const productAttributeQuery = query(
        collection(projectFirestore, "product_attributes"),
        where("id_product", "==", productDoc.ref)
      );

      const productAttributeQuerySnapshot = await getDocs(
        productAttributeQuery
      );
      for (const productAttributeDoc of productAttributeQuerySnapshot.docs) {
        const productAttributeData = productAttributeDoc.data();
        const attributeDoc = await getDoc(productAttributeData.id_attribute);
        const attribute: Attribute = {
          id: attributeDoc.id,
          name: (attributeDoc.data() as Attribute).name,
          value: productAttributeData.value,
          price: productAttributeData.price,
        };
        productWithAttributes.attributes.push(attribute);
      }

      products.value.push(productWithAttributes);
    }

    console.log("products", products.value);
    return { products };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

// async function getProductById(id: string) {
//   try {
//     const docRef = doc(projectFirestore, "products", id);
//     const docSnap: DocumentData = await getDoc(docRef);

//     const productData: Product = {
//       ...(docSnap.data() as Product), // casting to Product type
//     };
//     console.log("productData", productData);

//     const product: ProductWithAttributes = {
//       ...productData,
//       attributes: [],
//     };

//     const productAttributeQuery = query(
//       collection(projectFirestore, "product_attributes"),
//       where("id_product", "==", id) // using id directly
//     );
//     const productAttributeQuerySnapshot = await getDocs(productAttributeQuery);
//     productAttributeQuerySnapshot.forEach((productAttributeDoc) => {
//       const productAttributeData = productAttributeDoc.data();
//       const attribute: Attribute = {
//         id: productAttributeDoc.id,
//         name: productAttributeData.name,
//         value: productAttributeData.value,
//         price: productAttributeData.price,
//       };
//       product.attributes.push(attribute);
//     });

//     console.log("product", product);
//     return { product };
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     throw error;
//   }
// }

async function getAttributeById(id: string) {
  try {
    const docRef = doc(projectFirestore, "attributes", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const attributeData: DocumentData = docSnap.data();
      return attributeData.name;
    } else {
      console.log("No such attribute exists!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching attribute:", error);
    throw error;
  }
}

async function getProductsBySubCategory(id_sub_category: string) {
  const products = ref<DocumentData[]>([]);
  const q = query(
    collection(projectFirestore, "product"),
    where("id_sub_category", "==", id_sub_category)
  );
  try {
    const querySnapshot = await getDocs(q);
    console.log("querySnapshot", querySnapshot);
    querySnapshot.forEach((doc: DocumentData) => {
      console.log("doc", doc.id);
      products.value.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  } catch (error) {
    console.log("Error getting documents: ", error);
  }
  return { products };
}

export { getAllProducts, getAttributeById, getProductsBySubCategory };
