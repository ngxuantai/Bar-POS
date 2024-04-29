import { createStore } from "vuex";
import { AttributeWithQuantity, OrderDetail, OrderInfor } from "../types";

const store = createStore({
  state: {
    list_order_detail: [] as OrderDetail[],
    order_infor: {
      discount: 0,
      total_quantity: 0,
      total_price: 0,
    } as OrderInfor,
  },
  mutations: {
    addOrder(state, orderPayload) {
      if (state.list_order_detail.length === 0) {
        state.list_order_detail.push(orderPayload);
      } else {
        state.list_order_detail.map((orderDetail) => {
          if (orderDetail.infor_product.id === orderPayload.infor_product.id) {
            orderPayload.infor_product.attributes.map(
              (attribute: AttributeWithQuantity) => {
                orderDetail.infor_product.attributes.map((orderAttribute) => {
                  if (attribute.id === orderAttribute.id) {
                    orderAttribute.quantity += attribute.quantity;
                  }
                });
              }
            );
            orderDetail.total_quantity += orderPayload.total_quantity;
            orderDetail.total_price_product += orderPayload.total_price_product;
          } else {
            state.list_order_detail.push(orderPayload);
          }
        });
      }
      state.order_infor.total_quantity += orderPayload.total_quantity;
      state.order_infor.total_price += orderPayload.total_price;
    },
  },
  actions: {
    addCart({ commit }, orderPayload) {
      commit("addOrder", orderPayload);
    },
  },
});

export default store;
