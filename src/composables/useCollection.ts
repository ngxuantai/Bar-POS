import { ref } from "vue";
import { projectFirestore } from "../config/firebase";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  DocumentData,
} from "firebase/firestore";

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
  value: string;
  price: number;
}

async function getAllProducts(id_sub_category: string) {
  const products = ref<ProductWithAttributes[]>([]);

  try {
    const productQuery = collection(projectFirestore, "products");

    getDocs(productQuery).then((productQuerySnapshot) => {
      productQuerySnapshot.forEach(async (productDoc) => {
        const productData = productDoc.data() as Product;
        const productWithAttributes: ProductWithAttributes = {
          ...productData,
          attributes: [],
        };

        const productAttributeQuery = query(
          collection(projectFirestore, "product_attributes"),
          where("id_product", "==", productDoc.ref)
        );
        getDocs(productAttributeQuery).then((productAttributeQuerySnapshot) => {
          productAttributeQuerySnapshot.forEach((productAttributeDoc) => {
            const productAttributeData = productAttributeDoc.data();
            getDoc(productAttributeData.id_attribute).then((attributeDoc) => {
              const attribute: Attribute = {
                id: attributeDoc.id,
                name: (attributeDoc.data() as Attribute).name,
                value: productAttributeData.value,
                price: productAttributeData.price,
              };
              productWithAttributes.attributes.push(attribute);
            });
          });
        });

        products.value.push(productWithAttributes);
      });
    });

    console.log("products", products.value);
    return { products };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

async function getVolumeById(id: string) {
  let volume = null as DocumentData | null;
  try {
    const q = query(
      collection(projectFirestore, "volume"),
      where("__name__", "==", id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: DocumentData) => {
      volume = {
        id: doc.id,
        ...doc.data(),
      };
      console.log("volume", volume);
    });
  } catch (error) {
    console.log("Error getting documents: ", error);
  }
  return { volume };
}

async function getProductById(id: string) {
  const product = ref<DocumentData | null>(null);
  const q = query(
    collection(projectFirestore, "product"),
    where("__name__", "==", id)
  );
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: DocumentData) => {
      product.value = {
        id: doc.id,
        ...doc.data(),
      };
    });
  } catch (error) {
    console.log("Error getting documents: ", error);
  }
  return { product };
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

export { getAllProducts, getProductById, getProductsBySubCategory };
