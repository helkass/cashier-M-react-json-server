import { publicRequest } from "../api/publicRequest";

export const getOrders = async () => {
   const response = await publicRequest.get("/orders");
   return response.data;
};

export const addOrder = async (data) => {
   const response = await publicRequest.post("/orders", JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
   });
   return response.data;
};

export const deleteOrder = async ({ id }) => {
   return await publicRequest.delete(`/orders/${id}`, id);
};

export const updateOrder = async (data) => {
   return await publicRequest.patch(`/orders/${data.id}`, data);
};
