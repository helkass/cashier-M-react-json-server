import { publicRequest } from "../api/publicRequest";

export const getProducts = async () => {
   const response = await publicRequest.get("/products");
   return response.data;
};

export const addProduct = async (data) => {
   const response = await publicRequest.post(
      "/products",
      JSON.stringify(data),
      {
         headers: { "Content-Type": "application/json" },
      }
   );
   return response.data;
};

export const deleteProduct = async ({ id }) => {
   return await publicRequest.delete(`/products/${id}`, id);
};

export const updateProduct = async (data) => {
   return await publicRequest.patch(`/products/${data.id}`, data);
};
