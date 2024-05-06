import store from "@/store";
import { projectFirestore } from "../config/firebase";
import { collection, DocumentData, addDoc } from "firebase/firestore";
import { updateNumberProduct } from "@/services/ProductService";
import { addOrder } from "./OrderService";
import { OrderDetail, OrderInfor, OrderDetailData } from "types";

function createListOrderDetail(
  orderRef: DocumentData,
  orderDetail: OrderDetail
) {
  const listOrderDetail = [] as OrderDetailData[];
  orderDetail.infor_product.attributes.forEach((attribute) => {
    listOrderDetail.push({
      time_create: new Date(),
      id_order: orderRef.id,
      id_product: orderDetail.infor_product.id,
      name_product: orderDetail.infor_product.name,
      id_attribute: attribute.id,
      name_attribute: attribute.name,
      value_attribute: attribute.value,
      quantity: attribute.quantity,
      price: attribute.price,
      discount: orderDetail.discount,
      total_price: attribute.price * attribute.quantity,
    });
  });
  return listOrderDetail;
}

async function addOrderWithoutCart(
  orderDetail: OrderDetail,
  orderInfor: OrderInfor
) {
  try {
    const orderRef = await addOrder(orderInfor);
    if (orderRef) {
      const listOrderDetail = createListOrderDetail(orderRef, orderDetail);
      listOrderDetail.forEach(async (orderDetailData) => {
        await addDoc(
          collection(projectFirestore, "order_details"),
          orderDetailData
        );
        await updateNumberProduct(
          orderDetail,
          orderDetailData.id_attribute,
          orderDetailData.quantity
        );
      });
    }
  } catch (err) {
    console.error(err);
  }
}

async function addOrderWithCart() {
  try {
    const orderRef = await addOrder(store.state.order_infor);
    if (orderRef) {
      store.state.list_order_detail.forEach(async (orderDetail) => {
        const listOrderDetail = createListOrderDetail(orderRef, orderDetail);
        listOrderDetail.forEach(async (orderDetailData) => {
          await addDoc(
            collection(projectFirestore, "order_details"),
            orderDetailData
          );
          await updateNumberProduct(
            orderDetail,
            orderDetailData.id_attribute,
            orderDetailData.quantity
          );
        });
      });
    }
  } catch (err) {
    console.error(err);
  }
}

export { addOrderWithoutCart, addOrderWithCart };
