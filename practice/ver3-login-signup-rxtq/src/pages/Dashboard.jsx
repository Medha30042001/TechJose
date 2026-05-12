import React from 'react'
import useAuth from '../hooks/useAuth'
import { useQuery } from '@tanstack/react-query';
import { cartItems } from '../services/cartService';
import CartItems from '../components/CartItems';
import { authStyles } from '../styles/authStyles';
import { cartStyles } from '../styles/cartStyles';
import Navbar from '../layout/Navbar';

const Dashboard = () => {

  const {user} = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey : ["cartItems"],
    queryFn : cartItems,
  });

  if(isLoading) {
    return <p>Loading cart items...</p>
  }

  if(isError) {
    return <p>{error.message}</p>
  }

  return (
    <>
    <Navbar />
    <div className={cartStyles.pageWrapper}>
      <div className={cartStyles.pageContainer}>
        
        <h1 className={cartStyles.pageTitle}>Welcome, {user?.name}</h1>
        <p className={cartStyles.pageSubtitle}>Here are your Cart items</p>
        
        <div className={cartStyles.content}>
          {data.map((cart) => (
            <CartItems key={cart.id} cart={cart} />
          ))}
        </div>

      </div>  
    </div>
      
    </>
  )
}

export default Dashboard