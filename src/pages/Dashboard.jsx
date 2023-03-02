import React, { useEffect, useState } from "react";
import { currencyFormater } from "../func/currencyFormater";
import { idGenerator } from "../func/idGenerator";

import { Row, Col, Form, Image } from "react-bootstrap";
import CardProduct from "../components/CardProduct";
import NavCategory from "../components/NavCategory";
import CardSlideOrder from "../components/order/CardSlide";
import HeaderSection from "../templates/HeaderSection";
import SliderContainer from "../templates/SliderContainer";

import { publicRequest } from "../api/publicRequest";
import { useDispatch, useSelector } from "react-redux";
import { add, decrease, removeAll } from "../redux/cartReducer";
import HandleQuantity from "../templates/HandleQuantity";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addOrder, getOrders } from "../helper/useFetchOrders";
const Dashboard = () => {
   const [products, setProducts] = useState([]);
   const [category, setCategory] = useState([]);
   const [orderName, setOrderName] = useState("");

   const [selected, setSelected] = useState("makanan");
   const carts = useSelector((state) => state.cart);

   const dispatch = useDispatch();
   const queryClient = useQueryClient();

   // react query
   const { data, isLoading, isError } = useQuery("orders", getOrders);

   const fetchProducts = async () => {
      await publicRequest.get("/products").then((res) => setProducts(res.data));
      await publicRequest.get("/category").then((res) => setCategory(res.data));
   };

   // handle add to cart
   const handleAdd = (event) => {
      dispatch(add(event));
   };
   const decreaseCart = (event) => {
      dispatch(decrease(event));
   };

   const addOrderMutation = useMutation(addOrder, {
      onSuccess: () => {
         // refetch
         queryClient.invalidateQueries("orders");
      },
   });

   // order process func
   const postOrder = async () => {
      const data = {
         products: carts.items,
         _id: `ORD${idGenerator(6)}`,
         status: "pending",
         orderName,
      };
      addOrderMutation.mutate(data);
      setOrderName("");
      dispatch(removeAll());
   };

   useEffect(() => {
      fetchProducts();
      console.log("data", data);
   }, []);
   return (
      <main fluid="lg" className="d-flex container-fluid py-4 gap-2">
         <div className="w-7 bg-gray p-1 rounded position-relative gap-2 overflow-hidden vh-100">
            {/* order list */}
            <HeaderSection
               title="Order List"
               subtitleLink="see all"
               href="/order"
            />
            <SliderContainer>
               {data?.map((order) => (
                  <CardSlideOrder
                     key={order._id}
                     orderName={order.orderName}
                     orderStatus={order.status}
                     orderId={order._id}
                  />
               ))}
            </SliderContainer>
            {/* nav cat */}
            <NavCategory
               onSelect={(cat) => setSelected(cat)}
               isActive={selected}
               cats={category}
            />
            {/* menu sec */}
            <HeaderSection title="Menu" subtitle={`${products.length} items`} />
            <Row className="gap-5 justify-content-center">
               {products
                  ?.filter((cat) => cat.category.includes(selected))
                  .map((product) => (
                     <Col key={product._id} className="col-3 sm-col-2">
                        <CardProduct
                           title={product.name}
                           price={product.price}
                           image={product.image}
                           onClick={() => handleAdd(product)}
                        />
                     </Col>
                  ))}
            </Row>
         </div>
         {/* right content */}
         <div className="w-25 p-2 border rounded">
            <div className="border-bottom pb-4 mb-2">
               <h6 className="font-weight-bold">Customer Information</h6>
               <Form.Group>
                  <Form.Control
                     onChange={(e) => setOrderName(e.target.value)}
                     type="text"
                     placeholder="customer name"
                     value={orderName}
                  />
               </Form.Group>
            </div>
            <div className="d-flex flex-column gap-3">
               <h6 className="font-weight-bold">Order Details</h6>
               {carts.items?.map((cart) => (
                  <div
                     className="d-flex gap-2 align-items-center border-bottom py-2"
                     key={cart._id}>
                     <Image
                        src={cart.image}
                        alt="details-image"
                        fluid
                        rounded
                        className="w-3 h-100"
                     />
                     <div className="d-flex flex-column gap-2">
                        <Row>
                           <Col>{cart.name}</Col>
                        </Row>
                        <div className="d-flex gap-2">
                           <Col>
                              <HandleQuantity
                                 quantity={cart.quantity}
                                 onPlus={() => handleAdd(cart)}
                                 onMinus={() => decreaseCart(cart)}
                              />
                           </Col>
                           <Col>
                              <span>{currencyFormater(cart.subTotal)}</span>
                           </Col>
                        </div>
                     </div>
                  </div>
               ))}
               {/* order summary */}
               <div className="border-bottom border-2">
                  <h6>Order Summary</h6>
                  <div className="bg-gray rounded-md p-2 d-flex justify-content-between align-items-center">
                     <span>Total : </span>
                     <h5>{currencyFormater(carts.total)}</h5>
                  </div>
               </div>
               <button
                  onClick={postOrder}
                  className="bg-info text-white w-100 py-2 rounded-xl">
                  Process transaction
               </button>
            </div>
         </div>
      </main>
   );
};

export default Dashboard;
