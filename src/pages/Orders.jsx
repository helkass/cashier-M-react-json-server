import React from "react";
import { Alert, Container, Row, Spinner } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import CardProduct from "../components/CardProduct";
import { getOrders, updateOrder } from "../helper/useFetchOrders";
import { FlexWrapper } from "../templates/Flex";

const Orders = () => {
   const { data, isLoading, isError } = useQuery("orders", getOrders);
   const queryClient = useQueryClient();
   const updateOrderMutation = useMutation(updateOrder, {
      onSuccess: () => {
         // refetch
         queryClient.invalidateQueries("orders");
      },
   });

   return (
      <Container className="h-100">
         {isError && (
            <div className="loading-container">
               <Alert variant="danger">something went wrong!</Alert>
            </div>
         )}
         {isLoading ? (
            <div className="loading-container">
               <Spinner animation="border" variant="primary" />
            </div>
         ) : data.length >= 0 ? (
            <Row className="d-flex flex-wrap gap-2 mt-3">
               {data
                  ?.filter((item) => item.status === "pending")
                  .map((order) => (
                     <div
                        key={order.id}
                        className="md-col-3 sm-col-4 w-25 card h-100 py-2">
                        <FlexWrapper between>
                           <h6>{order.orderName}</h6>
                           <h6>{order._id}</h6>
                        </FlexWrapper>
                        {order.products?.map((product, idx) => (
                           <CardProduct
                              key={idx}
                              image={product.image}
                              title={product.name}
                              quantity={product.quantity}
                           />
                        ))}
                        {/* onclick update status pending to success */}
                        <button
                           onClick={() =>
                              updateOrderMutation.mutate({
                                 ...order,
                                 status: "success",
                              })
                           }
                           className={`w-50 rounded-md text-white ${
                              order.status === "pending"
                                 ? "bg-warning"
                                 : "bg-blue"
                           } py-1 mx-auto`}>
                           {order.status}
                        </button>
                     </div>
                  ))}
            </Row>
         ) : (
            <div className="loading-container">
               <Alert variant="danger">order not found!</Alert>
            </div>
         )}
      </Container>
   );
};

export default Orders;
