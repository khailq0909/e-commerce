import React, { useState } from 'react'

function ProductItem(product) {
    const [item, setItem] = useState(product.product)
  return (
    <div className='w-[]'>
        {/* {
            item?.images && item?.images.map((img,i)=>{
                return(
                    <img src={img?.path} alt='img' key={i} className='w-[200px]'/>
                )
            })
        } */}
        <h1>{item?.title}</h1>
        <span>{item?.quantity}</span>
        <p>{item?.color}</p>
        <p>{item?.price}</p>
        <p>{item?.des}</p>
        <button>Add to cart</button>
    </div>
  )
}

export default ProductItem