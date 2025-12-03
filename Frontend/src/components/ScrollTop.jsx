import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const ScrollTop = () => {
const {pathname}=useLocation();
useEffect(()=>{
    window.scrollTo({top:0,behavior:'smooth'})
},[pathname])
  return (
    <>
    </>
  )
}

export default ScrollTop