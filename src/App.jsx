import { useState } from "react";
// import Header from './components/Header'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductsDetail from "./pages/ProductsDetail";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        
        <Route path="/" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* <Route path="/home" element={<Home />}></Route> */}
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/main/footer" element={<MainPage />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:id" element={<ProductsDetail/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
