import React, { useEffect, useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
// import { setUserDetails } from '../../../../../Downloads/Compressed/Full-Stack-E-Commerce-MERN-APP-main/Full-Stack-E-Commerce-MERN-APP-main/frontend/src/store/userSlice';
const token = localStorage.getItem("token");  
function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async()=>{
    const token = localStorage.getItem("token");
    if (!token) return;
    console.log("Token in fetchUserDetails HOOOOOOOOOOOOOOOOOOOOO:", token);
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      // credentials : 'include',
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // <-- send token here
      },
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
}
// Add this test to your App.js
useEffect(() => {
  const testCookieSend = async () => {
    console.log("Testing cookie transmission...");
    
    // Make a simple test request to see if cookies are sent
    try {
      const response = await fetch(
        'https://amit-shop-back-end-1.onrender.com/api/test-auth',
        {
          method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
         
        }
      );
      
      console.log("Test response status:", response.status);
      const data = await response.json();
      console.log("Test response data:", data);
      
    } catch (error) {
      console.error("Test request failed:", error);
    }
  };
  
  testCookieSend();
}, []);
const fetchUserAddToCart = async()=>{
   const token = localStorage.getItem("token");
   if (!token) return;
  const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
    method : SummaryApi.addToCartProductCount.method,
    // credentials : 'include',
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // <-- send token here
      },
  })

  const dataApi = await dataResponse.json()

  setCartProductCount(dataApi?.data?.count)
}


useEffect(() => {
  fetchUserDetails();
  fetchUserAddToCart();
}, []);

  return (
    <>
      <Context.Provider value={{
          fetchUserDetails, // user detail fetch 
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart
      }}>
        <ToastContainer 
          position='top-center'
        />
        
        <Header/>
        <main className='min-h-[calc(100vh-120px)] '>
          <Outlet/>
        </main>
        <Footer/>
      </Context.Provider>
    </>
  );
}

export default App;
