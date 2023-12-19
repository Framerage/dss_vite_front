import {OrderCreatingRequest, OrderRequestResult} from "typings/orders";
import instance from "./api";

export const createOrderRequest = async ({
  order,
  auth,
}: {
  order: OrderCreatingRequest;
  auth: string;
}) => {
  return instance
    .post("create-order", {...order}, {headers: {Authorization: auth}})
    .then(res => res.data)
    .catch(err => {
      return {...err.response.data, status: err.response.status};
    });
};
export const getAllOrders = async ({
  auth,
  email,
}: {
  auth: string;
  email: string;
}) => {
  return instance
    .post(
      "/orders",
      {email},
      {
        headers: {Authorization: auth},
      },
    )
    .then(res => res.data)
    .catch(err => {
      return {...err.response.data, status: err.response.status};
    });
};
export const getUserOrders = async ({
  auth,
  email,
}: {
  auth: string;
  email: string;
}) => {
  return instance
    .post(
      "/user-orders",
      {email},
      {
        headers: {Authorization: auth},
      },
    )
    .then(res => res.data)
    .catch(err => {
      return {...err.response.data, status: err.response.status};
    });
};

export const deleteOrder = async ({id, auth}: {id: string; auth: string}) => {
  return instance
    .delete(`/orders/${id}`, {headers: {Authorization: auth}})
    .then(res => res.data)
    .catch(err => {
      return {...err.response.data, status: err.response.status};
    });
};
export const editOrderCard = async ({
  order,
  auth,
}: {
  order: OrderRequestResult;
  auth: string;
}) => {
  return instance
    .patch(`/orders/${order._id}`, order, {headers: {Authorization: auth}})
    .then(res => res.data)
    .catch(err => {
      return {...err.response.data, status: err.response.status};
    });
};
