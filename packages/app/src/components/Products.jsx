import React, { useEffect, useRef, useState } from 'react';
import Product from './Product';
import { useInfiniteQuery, useQuery } from 'react-query'
import getProducts from '../fetching/getProducts';



const Products = ({ inStockOnly,...props }) => {
  
  const itemsPerPage = 10;

  const { isLoading,data:productData,isError,error,fetchNextPage,hasNextPage } = useInfiniteQuery("products",getProducts,
    {
      select: (data) => {
        return data.pages.map((a) => a.data.products)
      },
      getNextPageParam: (lastPage,pages) => {
        return (pages.length*itemsPerPage) < lastPage.data.productCount?(pages.length*itemsPerPage):undefined
      },
      meta: {
        limit: itemsPerPage
      }
    }
  );


  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error! {error.message}</div>
  }


  const handleScroll = ({target}) => {
    const bottom = target.scrollHeight - target.scrollTop === target.clientHeight
    if (bottom && hasNextPage) fetchNextPage()
  }

  return <>{
    <div className="bg-blue-200 overflow-scroll" onScroll={handleScroll}>
      {productData.map((details) => {
        return details.map(({ sku: id,...product }) => <Product key={id} details={product} inStockOnly={inStockOnly}/>)
      })}
      </div>
  }</>
}


export default Products