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
      let orderAdded = false;
      if (state.list_order_detail.length === 0) {
        state.list_order_detail.push(orderPayload);
      } else {
        state.list_order_detail.forEach((orderDetail) => {
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
            orderAdded = true;
          }
        });
        if (!orderAdded) {
          state.list_order_detail.push(orderPayload);
        }
      }
      state.order_infor.total_quantity += orderPayload.total_quantity;
      state.order_infor.total_price += orderPayload.total_price_product;
    },
    deleteOrder(state, { productId, attributeId }) {
      state.list_order_detail.forEach((orderDetail: OrderDetail) => {
        if (orderDetail.infor_product.id === productId) {
          orderDetail.infor_product.attributes.map((attribute) => {
            if (attribute.id === attributeId) {
              orderDetail.total_quantity -= attribute.quantity;
              orderDetail.total_price_product -=
                attribute.price * attribute.quantity;
              attribute.quantity = 0;
            }
          });
        }
      });
      state.order_infor.total_quantity = state.list_order_detail.reduce(
        (acc, orderDetail) => {
          return acc + orderDetail.total_quantity;
        },
        0
      );
      state.order_infor.total_price = state.list_order_detail.reduce(
        (acc, orderDetail) => {
          return acc + orderDetail.total_price_product;
        },
        0
      );
      state.list_order_detail = state.list_order_detail.filter(
        (orderDetail) => {
          return orderDetail.total_quantity > 0;
        }
      );
    },
    clearOrder(state) {
      state.list_order_detail = [];
      state.order_infor = {
        notes: "",
        discount: 0,
        total_quantity: 0,
        total_price: 0,
      };
    },
  },
  actions: {
    addCart({ commit }, orderPayload) {
      commit("addOrder", orderPayload);
    },
    clearCart({ commit }) {
      commit("clearOrder");
    },
    deleteOrder({ commit }, { productId, attributeId }) {
      commit("deleteOrder", { productId, attributeId });
    },
  },
});

export default store;
