import React from 'react'

function Product({ details, inStockOnly, ...props }) {
  
  const { name,description,category,color,price,inStock } = details
  return (
    <div className="flex flex-col
    bg-blue-100 rounded-lg m-3 p-3">
      <span className="">{category}</span>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold my-4">{name}</h1>
        {inStockOnly ? <></> : <span>{inStock ? "In stock!" : "Out of stock!"}</span>}
      </div>
      <span className="text-sm mb-2">{description}</span>
        <span className="justify-self-start">{color}</span>
      <div className="m-2 text-xl italic flex justify-end">
        <span className="justify-self-center">£{price}</span>
      </div>
    </div>
  )
}

export default Product