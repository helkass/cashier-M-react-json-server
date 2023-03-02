import React, { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
   addProduct,
   deleteProduct,
   getProducts,
} from "../helper/useFetchProducts";

import "../styles/products.css";

import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { FlexWrapper } from "../templates/Flex";
import { publicRequest } from "../api/publicRequest";

import { currencyFormater } from "../func/currencyFormater";

function Products() {
   const [cats, setCats] = useState([]);
   const [img, setImg] = useState("");
   const [productName, setProductName] = useState("");
   let [selectedCategories, setSelectedCategories] = useState([]);
   const { data, isLoading, isError } = useQuery("products", getProducts);
   const queryClient = useQueryClient();

   const addProductMutation = useMutation(addProduct, {
      onSuccess: () => {
         queryClient.invalidateQueries("products");
      },
   });
   const deleteProductMutation = useMutation(deleteProduct, {
      onSuccess: () => {
         queryClient.invalidateQueries("products");
      },
   });

   // encode image to base 64
   const setFileToBase = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
         setImg(reader.result);
      };
   };
   // handle convert it in base64
   const handleImage = (e) => {
      const file = e.target.files[0];
      setFileToBase(file);
   };

   const [priceDefault, setPrice] = useState(0);

   // custom price and size
   const [pricing, setPricing] = useState("default");
   const [sizes, setSizes] = useState([]);
   const [priceCustom, setPriceCustom] = useState([]);
   const [addSize, setAddSize] = useState("");
   const [addPriceCustom, setAddPriceCustom] = useState("");

   const handleAddSize = () => {
      setSizes([...sizes, addSize]);
      setPriceCustom([...priceCustom, addPriceCustom]);
      setAddSize("");
      setAddPriceCustom("");
   };

   const handleSelectOptions = (event) => {
      let params = event.target.value;

      if (params === "default") {
         setPricing("default");
      } else {
         setPricing("custom");
      }
   };

   // checkbox crontroller
   const handleCheckboxCategory = (e) => {
      if (e.target.checked) {
         if (!selectedCategories.includes(e.target.id)) {
            setSelectedCategories([...selectedCategories, e.target.id]);
         }
      } else {
         let newResult = selectedCategories.filter(
            (cat) => cat !== e.target.id
         );
         setSelectedCategories(newResult);
      }
   };

   // form post data
   const formData = {
      name: productName,
      image: img,
      category: selectedCategories,
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      let price;
      let size;

      if (pricing === "default") {
         price = priceDefault;
      } else if (pricing === "custom") {
         price = priceCustom;
         size = sizes;
      }
      addProductMutation.mutate({ ...formData, size, price });

      // reset
      setSizes([]);
      e.target.reset();
   };

   useEffect(() => {
      const fetchCategories = async () => {
         await publicRequest.get("/category").then((res) => setCats(res.data));
      };
      fetchCategories();
   }, []);

   return (
      <main id="products">
         <div className="products">
            {/* product card */}
            {data?.map((product) => (
               <div className="product-card shadow" key={product.id}>
                  <button
                     onClick={() =>
                        deleteProductMutation.mutate({ id: product.id })
                     }
                     className="btn-delete border-danger border rounded-md d-flex align-items-center justify-content-center p-1">
                     <AiFillDelete size={19} />
                  </button>
                  <FlexWrapper className="product-card-header">
                     <Image
                        src={product.image}
                        fluid
                        alt="alt"
                        className="product-image"
                     />
                     <div>
                        <p>{product.name}</p>
                        {product.size === undefined && (
                           <p>
                              Harga :{" "}
                              <span>Rp.{currencyFormater(product.price)}</span>
                           </p>
                        )}
                     </div>
                  </FlexWrapper>
                  {/* if prices is condition size*/}
                  {product.size !== undefined && (
                     <div className="product-card-sizes">
                        {/* size */}
                        {product.size?.map((size, idx) => (
                           <FlexWrapper start key={idx}>
                              <span className="w-3">{size}</span> :
                              <span className="w-3">
                                 Rp.{currencyFormater(product.price[idx])}
                              </span>
                           </FlexWrapper>
                        ))}
                     </div>
                  )}
               </div>
            ))}
         </div>
         {/* add product */}
         <div className="products-right bg-gray">
            <h5>Add Product</h5>
            <Form
               onSubmit={handleSubmit}
               className="d-flex gap-2 justify-content-end flex-column">
               <Form.Group>
                  <Form.Label>Product name</Form.Label>
                  <Form.Control
                     type="text"
                     onChange={(e) => setProductName(e.target.value)}
                  />
               </Form.Group>
               <Form.Label>Category</Form.Label>
               <Form.Group
                  className="mb-3 d-flex gap-2 flex-wrap"
                  controlId="formBasicCheckbox">
                  {cats.map((cat, idx) => (
                     <Form.Check
                        type="checkbox"
                        key={idx}
                        name={cat}
                        id={cat}
                        label={cat}
                        onChange={(e) => handleCheckboxCategory(e)}
                     />
                  ))}
               </Form.Group>
               {/* image */}
               <Form.Group>
                  <Form.Control
                     type="file"
                     name="image"
                     size="sm"
                     onChange={handleImage}
                  />
               </Form.Group>
               {/* option pirces */}
               <Form.Group className="mb-3">
                  <Form.Label htmlFor="price">Price setting</Form.Label>
                  <Form.Select
                     id="price"
                     name="price"
                     onChange={(e) => handleSelectOptions(e)}>
                     <option>default</option>
                     <option>custom</option>
                  </Form.Select>
               </Form.Group>
               {/* default price */}
               {pricing === "default" && (
                  <Form.Group>
                     <Form.Label>Price</Form.Label>
                     <Form.Control
                        type="text"
                        name="price"
                        placeholder="exp:20000"
                        onChange={(e) => setPrice(e.target.value)}
                     />
                  </Form.Group>
               )}
               {/* conditional binding custom size */}
               {pricing === "custom" && (
                  <>
                     <Form.Group className="d-flex gap-2">
                        <Form.Control
                           type="text"
                           name="addSize"
                           placeholder="size"
                           onChange={(e) => setAddSize(e.target.value)}
                        />
                        <Form.Control
                           type="text"
                           name="priceCustom"
                           placeholder="20000"
                           onChange={(e) => setAddPriceCustom(e.target.value)}
                        />
                        <Button
                           className="align-self-end"
                           onClick={handleAddSize}>
                           <AiOutlinePlus />
                        </Button>
                     </Form.Group>
                     {sizes.length >= 0 &&
                        pricing === "custom" &&
                        sizes.map((a, idx) => (
                           <Form.Group
                              key={idx}
                              className="d-flex gap-1 text-small">
                              <Form.Control
                                 type="text"
                                 name="size"
                                 value={a}
                                 readOnly
                              />
                              <Form.Control
                                 type="text"
                                 name={a}
                                 placeholder="exp:20000"
                                 value={priceCustom[idx]}
                                 readOnly
                              />
                           </Form.Group>
                        ))}
                  </>
               )}
               <Button
                  variant="primary"
                  type="submit"
                  className="align-self-end my-2"
                  disabled={
                     productName == "" &&
                     (priceDefault < 0 || sizes.length <= 0)
                  }>
                  Add
               </Button>
            </Form>
         </div>
      </main>
   );
}

export default Products;
