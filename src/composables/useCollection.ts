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
  Query,
} from "firebase/firestore";
import {
  Category,
  Product,
  ProductWithAttributes,
  Attribute,
  OrderDetail,
  OrderInfor,
  AttributeWithQuantity,
} from "../../types";
import store from "../store";

const loading = ref(false);

async function getAllCategory() {
  const categories = ref<Category[]>([]);
  try {
    const parentCategoryQuery = query(
      collection(projectFirestore, "categories"),
      where("id_parent_category", "==", "0")
    );
    const parentCategoryQuerySnapshot = await getDocs(parentCategoryQuery);
    parentCategoryQuerySnapshot.forEach(async (doc: DocumentData) => {
      const childCategories = await getChildCategoryById(doc.id);
      categories.value.push({
        id: doc.id,
        name: doc.data().name,
        check: false,
        children: childCategories,
      });
    });
    return { categories };
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

async function getChildCategoryById(id: string) {
  try {
    const childCategories: Category[] = [];
    const docRef = doc(projectFirestore, "categories", id);
    const childrenCategoryQuery = query(
      collection(projectFirestore, "categories"),
      where("id_parent_category", "==", docRef)
    );
    const childrenCategoryQuerySnapshot = await getDocs(childrenCategoryQuery);
    childrenCategoryQuerySnapshot.forEach((doc: DocumentData) => {
      childCategories.push({
        id: doc.id,
        name: doc.data().name,
        check: false,
        children: [],
      });
    });
    return childCategories;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
}

async function getAllProducts(id_category?: string, id_sub_category?: string) {
  const products = ref<ProductWithAttributes[]>([]);

  try {
    //get list products
    let productQuery: Query<DocumentData> = collection(
      projectFirestore,
      "products"
    );

    if (id_category && id_category !== "") {
      const childCategories = await getChildCategoryById(id_category);
      const childCategoryRef = childCategories.map((childCategory) =>
        doc(projectFirestore, "categories", childCategory.id)
      );

      productQuery = query(
        productQuery,
        where("id_category", "in", childCategoryRef)
      );
    }

    if (id_sub_category) {
      productQuery = query(
        productQuery,
        where(
          "id_category",
          "==",
          doc(projectFirestore, "categories", id_sub_category)
        )
      );
    }
    const productQuerySnapshot = await getDocs(productQuery);

    //loop through list products
    productQuerySnapshot.forEach(async (productDoc) => {
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
      id: docSnap.id,
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

async function getSimilarProducts(id: string, id_sub_category: DocumentData) {
  const products = ref<ProductWithAttributes[]>([]);
  console.log(id_sub_category.id);
  try {
    const q = query(
      collection(projectFirestore, "products"),
      where("id_category", "==", id_sub_category)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (productDoc: DocumentData) => {
      console.log(productDoc.data());
      if (productDoc.id !== id) {
        console.log(productDoc.id);
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
        products.value.push(productWithAttributes);
      }
    });
    products.value = products.value.slice(0, 4);
    return { products };
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

async function addOrder(
  orderDetailAgru?: OrderDetail | null,
  orderInforArgu?: OrderInfor | null
) {
  loading.value = true;
  try {
    //create order form store data
    const docOrderRef = await addDoc(collection(projectFirestore, "orders"), {
      notes: "",
      discount: (orderInforArgu || store.state.order_infor).discount,
      total_quantity: (orderInforArgu || store.state.order_infor)
        .total_quantity,
      total_price: (orderInforArgu || store.state.order_infor).total_price,
    });

    if (orderDetailAgru) {
      //create order_details from orderDetailData
      orderDetailAgru.infor_product.attributes.forEach(async (attribute) => {
        if (attribute.quantity > 0) {
          const orderDetailData = {
            id_order: docOrderRef.id,
            id_product: orderDetailAgru.infor_product.id,
            name_product: orderDetailAgru.infor_product.name,
            id_attribute: attribute.id,
            quantity: attribute.quantity,
            price: attribute.price,
            discount: orderDetailAgru.discount,
            total_price: attribute.price * attribute.quantity,
          };
          await addDoc(
            collection(projectFirestore, "order_details"),
            orderDetailData
          );

          //update number product in table product_attributes
          updateNumberProduct(orderDetailAgru, attribute);
        }
      });
    } else {
      //create order_details from store data
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
            await addDoc(
              collection(projectFirestore, "order_details"),
              orderDetailData
            );

            //update number product in table product_attributes
            updateNumberProduct(orderDetail, attribute);
          }
        });
      });
    }
  } catch (error) {
    console.error("Error adding order: ", error);
  } finally {
    loading.value = false;
  }
}

async function updateNumberProduct(
  orderDetail: OrderDetail,
  attribute: AttributeWithQuantity
) {
  const productRef = doc(
    projectFirestore,
    "products",
    orderDetail.infor_product.id
  );
  const attributeRef = doc(projectFirestore, "attributes", attribute.id);
  const productAttributeQuery = query(
    collection(projectFirestore, "product_attributes"),
    where("id_product", "==", productRef),
    where("id_attribute", "==", attributeRef)
  );
  const productAttributeQuerySnapshot = await getDocs(productAttributeQuery);
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

export {
  getAllCategory,
  getAllProducts,
  getAttributeById,
  getProductById,
  getSimilarProducts,
  loading,
  addOrder,
};
