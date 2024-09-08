// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import Header from "../components/Header";
// import { Link } from "react-router-dom";

// import React, { useContext } from 'react';
// import { CartContext } from '../components/CartContext';
// function ProductsDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate(); // Use navigate hook for navigation
//   const [product, setProduct] = useState({});
//   const [loadingProducts, setLoadingProducts] = useState(true);
//   const [notfound, setNotfound] = useState(false);

//   useEffect(() => {
//     setNotfound(false);
//     axios
//       .get(`https://dummyjson.com/products/${id}`)
//       .then((res) => {
//         setProduct(res.data);
//         setLoadingProducts(false);
//       })
//       .catch((err) => {
//         setNotfound(true);
//         setLoadingProducts(false);
//       });
//   }, [id]);

//   const handleBackClick = () => {
//     navigate("/products"); // Adjust the path to where your products list is located
//   };
//   const { addItemToCart, cart } = useContext(CartContext);

//   const handleAddToCart = () => {
//     addItemToCart(product);
//   };

//   const handleRemoveFromCart = () => {
//     // We'll implement this function later
//   };


//   return (
//     <div className="container mx-auto">
//       {loadingProducts ? (
//         <div className="loader-container">
//           <div className="dot"></div>
//           <div className="dot"></div>
//           <div className="dot"></div>
//           <div className="dot"></div>
//           <style>
//             {`
//               .loader-container {
//                 position: fixed;
//                 top: 0;
//                 left: 0;
//                 right: 0;
//                 bottom: 0;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 background-color: rgba(255, 255, 255, 0.8);
//                 z-index: 1000;
//               }

//               .dot {
//                 position: relative;
//                 width: 20px;
//                 height: 20px;
//                 margin: 5px;
//                 border-radius: 50%;
//                 background-color: black;
//                 animation: bounce 1.2s infinite ease-in-out;
//               }

//               .dot:nth-child(2) {
//                 animation-delay: -0.4s;
//               }

//               .dot:nth-child(3) {
//                 animation-delay: -0.8s;
//               }

//               @keyframes bounce {
//                 0%, 20%, 50%, 80%, 100% {
//                   transform: translateY(0);
//                 }
//                 40% {
//                   transform: translateY(-30px);
//                 }
//                 60% {
//                   transform: translateY(-15px);
//                 }
//               }
//             `}
//           </style>
//         </div>
//       ) : notfound ? (
//         <>
//           <Header />
//           <Link to={"/main"}>
//             {" "}
//             <button
//               className="flex items-center mt-5 text-gray-800 dark:text-black ml-2 mb-4"
//               onClick={handleBackClick}
//             >
//               <svg
//                 className="w-6 h-6 mr-2"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="m15 19-7-7 7-7"
//                 />
//               </svg>
//             </button>
//           </Link>
//           <style
//             dangerouslySetInnerHTML={{
//               __html: `
//                 body {
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     height: 100vh;
//                     background-color: #f2f2f2;
//                     margin: 0;
//                     font-family: Arial, sans-serif;
//                 }

//                 .container {
//                     text-align: center;
//                 }

//                 h1 {
//                     font-size: 2em;
//                     color: #333;
//                     margin-bottom: 20px;
//                 }

//                 .message {
//                     position: relative;
//                     display: inline-block;
//                 }

//                 .spinner {
//                     border: 5px solid #f3f3f3;
//                     border-top: 5px solid #3498db;
//                     border-radius: 50%;
//                     width: 50px;
//                     height: 50px;
//                     animation: spin 1s linear infinite;
//                     margin: 0 auto;
//                 }

//                 @keyframes spin {
//                     0% { transform: rotate(0deg); }
//                     100% { transform: rotate(360deg); }
//                 }

//                 .fade-bg {
//                     position: absolute;
//                     top: 0;
//                     left: 0;
//                     right: 0;
//                     bottom: 0;
//                     background: rgba(255, 255, 255, 0.8);
//                     animation: fadeInOut 3s infinite;
//                 }

//                 @keyframes fadeInOut {
//                     0% { opacity: 0.8; }
//                     50% { opacity: 0.2; }
//                     100% { opacity: 0.8; }
//                 }
//               `,
//             }}
//           />
//           <div className="container">
//             <div className="message">
//               <img
//                 src="https://th.bing.com/th/id/OIP.5m7WTZOic_ntpvVlXxeNLwAAAA?w=360&h=360&rs=1&pid=ImgDetMain"
//                 alt=""
//               />
//               <h1>Data Not Found</h1>
//               <div className="" />
//             </div>
//             <div className="fade-bg" />
//           </div>
//         </>
//       ) : (
//         <>
//         <Header/>
//           <section className="text-gray-600 body-font overflow-hidden">
//             <div className="container px-5 py-24 mx-auto">
//               <div className="lg:w-4/5 mx-auto flex flex-wrap">
//                 <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
//                   <h2 className="text-sm title-font text-gray-500 tracking-widest">
//                     {product.category}
//                   </h2>
//                   <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
//                     {product.title}
//                   </h1>
//                   <div className="flex mb-4">
//                     <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
//                       Description
//                     </a>
//                     <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
//                       Reviews
//                     </a>
//                     <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
//                       Details
//                     </a>
//                   </div>
//                   <p className="leading-relaxed mb-4">{product.description}</p>
//                   <div className="flex border-t border-gray-200 py-2">
//                     <span className="text-gray-500">Color</span>
//                     <span className="ml-auto text-gray-900">Blue</span>
//                   </div>
//                   <div className="flex border-t border-gray-200 py-2">
//                     <span className="text-gray-500">Size</span>
//                     <span className="ml-auto text-gray-900">Medium</span>
//                   </div>
//                   <div className="flex border-t border-b mb-6 border-gray-200 py-2">
//                     <span className="text-gray-500">Quantity</span>
//                     <span className="ml-auto text-gray-900">4</span>
//                   </div>
//                   <div className="flex">
//                     <span className="title-font font-medium text-2xl text-gray-900">
//                       ${product.price}
//                     </span>
//                     <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
//                       Button
//                     </button>
//                     <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
//                       <svg
//                         fill="currentColor"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         className="w-5 h-5"
//                         viewBox="0 0 24 24"
//                       >
//                         <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//                 <img
//                   alt="ecommerce"
//                   className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
//                   src={product.thumbnail}
//                 />
//               </div>
//             </div>
//           </section>
//         </>
//       )}
//     </div>
//   );
// }

// export default ProductsDetail;


// function ProductsDetail() {
//   // ...

//   const { addItemToCart, cart } = useContext(CartContext);

//   const handleAddToCart = () => {
//     addItemToCart(product);
//   };

//   const handleRemoveFromCart = () => {
//     // We'll implement this function later
//   };

//   return (
//     // ...
//     <div className="flex">
//       <span className="title-font font-medium text-2xl text-gray-900">
//         ${product.price}
//       </span>
//       {cart.items.find((item) => item.id === product.id) ? (
//         <button
//           className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
//           onClick={handleRemoveFromCart}
//         >
//           Remove from Cart
//         </button>
//       ) : (
//         <button
//           className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
//           onClick={handleAddToCart}
//         >
//           Add to Cart
//         </button>
//       )}
//       // ...
//     </div>
//   );
// }








import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { CartContext } from "../components/CartContext";

function ProductsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [notfound, setNotfound] = useState(false);

  useEffect(() => {
    setNotfound(false);
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoadingProducts(false);
      })
      .catch(() => {
        setNotfound(true);
        setLoadingProducts(false);
      });
  }, [id]);

  const handleBackClick = () => {
    navigate("/products");
  };

  const { addItemToCart, removeItemFromCart, cart } = useContext(CartContext);

  const isInCart = cart.items.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addItemToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeItemFromCart(product.id);
  };

  return (
    <div className="container mx-auto">
      {loadingProducts ? (
        <div className="loader-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <style>
            {`
              .loader-container {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgba(255, 255, 255, 0.8);
                z-index: 1000;
              }

              .dot {
                position: relative;
                width: 20px;
                height: 20px;
                margin: 5px;
                border-radius: 50%;
                background-color: black;
                animation: bounce 1.2s infinite ease-in-out;
              }

              .dot:nth-child(2) {
                animation-delay: -0.4s;
              }

              .dot:nth-child(3) {
                animation-delay: -0.8s;
              }

              @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                  transform: translateY(0);
                }
                40% {
                  transform: translateY(-30px);
                }
                60% {
                  transform: translateY(-15px);
                }
              }
            `}
          </style>
        </div>
      ) : notfound ? (
        <>
          <Header />
          <Link to={"/main"}>
            <button
              className="flex items-center mt-5 text-gray-800 dark:text-black ml-2 mb-4"
              onClick={handleBackClick}
            >
              <svg
                className="w-6 h-6 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m15 19-7-7 7-7"
                />
              </svg>
            </button>
          </Link>
          <style
            dangerouslySetInnerHTML={{
              __html: `
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f2f2f2;
                    margin: 0;
                    font-family: Arial, sans-serif;
                }

                .container {
                    text-align: center;
                }

                h1 {
                    font-size: 2em;
                    color: #333;
                    margin-bottom: 20px;
                }

                .message {
                    position: relative;
                    display: inline-block;
                }

                .spinner {
                    border: 5px solid #f3f3f3;
                    border-top: 5px solid #3498db;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .fade-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(255, 255, 255, 0.8);
                    animation: fadeInOut 3s infinite;
                }

                @keyframes fadeInOut {
                    0% { opacity: 0.8; }
                    50% { opacity: 0.2; }
                    100% { opacity: 0.8; }
                }
              `,
            }}
          />
          <div className="container">
            <div className="message">
              <img
                src="https://th.bing.com/th/id/OIP.5m7WTZOic_ntpvVlXxeNLwAAAA?w=360&h=360&rs=1&pid=ImgDetMain"
                alt=""
              />
              <h1>Data Not Found</h1>
            </div>
            <div className="fade-bg" />
          </div>
        </>
      ) : (
        <>
          <Header />
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    {product.category}
                  </h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                    {product.title}
                  </h1>
                  <div className="flex mb-4">
                    <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                      Description
                    </a>
                    <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                      Reviews
                    </a>
                    <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                      Details
                    </a>
                  </div>
                  <p className="leading-relaxed mb-4">{product.description}</p>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Color</span>
                    <span className="ml-auto text-gray-900">Blue</span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Size</span>
                    <span className="ml-auto text-gray-900">Medium</span>
                  </div>
                  <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                    <span className="text-gray-500">Quantity</span>
                    <span className="ml-auto text-gray-900">4</span>
                  </div>
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900">
                      ${product.price}
                    </span>
                    {isInCart ? (
                      <button
                        className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                        onClick={handleRemoveFromCart}
                      >
                        Remove from Cart
                      </button>
                    ) : (
                      <button
                        className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
                <img
                  alt="ecommerce"
                  className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                  src={product.thumbnail}
                />
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default ProductsDetail;
