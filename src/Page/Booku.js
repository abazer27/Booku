import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Categories from '../Components/Categories';
import Header from '../Components/Header';

function Booku() {
  const [categories, setCategories] =useState([])
  useEffect(()=> {
    axios.get(`/fee-assessment-categories`)
      .then(response => { 
        setCategories(response.data)
      })
      .catch(error => {
          console.log(error.response)
      });
  },[])
  return (
    <div className='font-poppins'>
      <Header />
      <Categories categories={categories}/>
    </div>
  )
}

export default Booku