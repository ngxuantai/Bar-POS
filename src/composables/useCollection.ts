import { ref } from "vue";
import { projectFirestore } from "../config/firebase";
import {
  doc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  addDoc,
  DocumentData,
  updateDoc,
} from "firebase/firestore";
import { Product, ProductWithAttributes, Attribute } from "../../types";
import store from "../store";

const loading = ref(false);

async function getAllProducts(id_sub_category: string) {
  const products = ref<ProductWithAttributes[]>([]);

  try {
    //get list products
    const productQuery = collection(projectFirestore, "products");
    const productQuerySnapshot = await getDocs(productQuery);

    //loop through list products
    productQuerySnapshot.forEach(async (productDoc) => {
      console.log(productDoc.data());
      const productData = {
        id: productDoc.id,
        ...productDoc.data(),
      } as Product;
      const productWithAttributes: ProductWithAttributes = {
        ...productData,
        attributes: [],
      };

      //get table product_attributes
      const productAttributeQuery = query(
        collection(projectFirestore, "product_attributes"),
        where("id_product", "==", productDoc.ref)
      );
      const productAttributeQuerySnapshot = await getDocs(
        productAttributeQuery
      );

      //loop through list product_attributes
      for (const productAttributeDoc of productAttributeQuerySnapshot.docs) {
        const productAttributeData = productAttributeDoc.data();
        console.log(productAttributeData);

        //get list attributes
        const attributeDoc = await getDoc(productAttributeData.id_attribute);
        const attribute: Attribute = {
          id: attributeDoc.id,
          name: (attributeDoc.data() as Attribute).name,
          value: productAttributeData.value,
          price: productAttributeData.price,
          number_product: productAttributeData.number_product,
        };
        productWithAttributes.attributes.push(attribute);
      }
      console.log(productWithAttributes);
      products.value.push(productWithAttributes);
    });

    return { products };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

async function getProductById(id: string) {
  const product = ref<ProductWithAttributes>({} as ProductWithAttributes);
  try {
    //get product
    const docRef = doc(projectFirestore, "products", id);
    const docSnap: DocumentData = await getDoc(docRef);
    product.value = {
      ...docSnap.data(),
      attributes: [],
    };

    //get table product_attributes
    const productAttributeQuery = query(
      collection(projectFirestore, "product_attributes"),
      where("id_product", "==", docRef)
    );
    const productAttributeQuerySnapshot = await getDocs(productAttributeQuery);

    //loop through list product_attributes
    for (const productAttributeDoc of productAttributeQuerySnapshot.docs) {
      const productAttributeData = productAttributeDoc.data();

      //get list attributes
      const attributeDoc = await getDoc(productAttributeData.id_attribute);
      const attribute: Attribute = {
        id: attributeDoc.id,
        name: (attributeDoc.data() as Attribute).name,
        value: productAttributeData.value,
        price: productAttributeData.price,
        number_product: productAttributeData.number_product,
      };
      product.value.attributes.push(attribute);
    }
    return { product };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

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
    querySnapshot.forEach((doc: DocumentData) => {
      products.value.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
  return { products };
}

async function addOrder() {
  loading.value = true;
  try {
    //create order
    const docOrderRef = await addDoc(collection(projectFirestore, "orders"), {
      notes: "test",
      discount: store.state.order_infor.discount,
      total_quantity: store.state.order_infor.total_quantity,
      total_price: store.state.order_infor.total_price,
    });
    console.log("Document written with ID: ", docOrderRef.id);

    //create order_details
    store.state.list_order_detail.forEach(async (orderDetail) => {
      orderDetail.infor_product.attributes.forEach(async (attribute) => {
        if (attribute.quantity > 0) {
          const orderDetailData = {
            id_order: docOrderRef.id,
            id_product: orderDetail.infor_product.id,
            name_product: orderDetail.infor_product.name,
            id_attribute: attribute.id,
            quantity: attribute.quantity,
            price: attribute.price,
            discount: orderDetail.discount,
            total_price: attribute.price * attribute.quantity,
          };
          const docOrderDetailRef = await addDoc(
            collection(projectFirestore, "order_details"),
            orderDetailData
          );
          console.log("Document written with ID: ", docOrderDetailRef.id);

          //update number_product in table product_attributes
          const productRef = doc(
            projectFirestore,
            "products",
            orderDetail.infor_product.id
          );
          const attributeRef = doc(
            projectFirestore,
            "attributes",
            attribute.id
          );
          const productAttributeQuery = query(
            collection(projectFirestore, "product_attributes"),
            where("id_product", "==", productRef),
            where("id_attribute", "==", attributeRef)
          );
          const productAttributeQuerySnapshot = await getDocs(
            productAttributeQuery
          );
          productAttributeQuerySnapshot.forEach(async (productAttributeDoc) => {
            const productAttributeData = productAttributeDoc.data();
            if (productAttributeData.number_product > 0) {
              await updateDoc(productAttributeDoc.ref, {
                number_product:
                  productAttributeData.number_product - attribute.quantity,
              });
            }
          });
        }
      });
    });
    // loading.value = false;
  } catch (error) {
    // loading.value = false;
    console.error("Error adding order: ", error);
  } finally {
    loading.value = false;
  }
}

export {
  getAllProducts,
  getAttributeById,
  getProductById,
  getProductsBySubCategory,
  loading,
  addOrder,
};
