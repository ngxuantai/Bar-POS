import { projectFirestore } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { OrderInfor } from "types";
function createOrder(orderInfor: OrderInfor) {
  const orderData = {
    ...orderInfor,
    time_create: new Date(),
  };
  return orderData;
}

async function addOrder(orderInfor: OrderInfor) {
  try {
    const orderRef = await addDoc(
      collection(projectFirestore, "orders"),
      createOrder(orderInfor)
    );
    return orderRef;
  } catch (err) {
    console.error(err);
  }
}

export { addOrder };
