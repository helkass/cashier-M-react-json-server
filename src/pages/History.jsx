import React from "react";
import { Alert, Container, Spinner, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { getOrders } from "../helper/useFetchOrders";

const History = () => {
   const { data, isLoading, isError } = useQuery("orders", getOrders);
   return (
      <Container>
         <Table striped bordered hover size="sm" className="my-3">
            <thead>
               <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>Order name</th>
                  <th>Status</th>
                  <th>Amount</th>
               </tr>
            </thead>
            {isError && (
               <div className="loading-container">
                  <Alert variant="danger">
                     Error fetching data orders history
                  </Alert>
               </div>
            )}
            <tbody>
               {isLoading ? (
                  <div className="loading-container">
                     <Spinner animation="border" variant="primary" />
                  </div>
               ) : (
                  data?.map((order, idx) => (
                     <tr className="small">
                        <td>{parseInt(idx + 1)}</td>
                        <td>{order.id}</td>
                        <td>{order.orderName}</td>
                        <td
                           className={
                              order.status === "pending" && "bg-warning"
                           }>
                           {order.status}
                        </td>
                        <td>{order?.total}</td>
                     </tr>
                  ))
               )}
            </tbody>
         </Table>
      </Container>
   );
};

export default History;
