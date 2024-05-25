import React from 'react'
import ProductImg from '../assets/images/muagi.webp'

function ProductToday() {
    const products = [
        {
            name: 'Sweetest Posrt',
            img: ProductImg
        },
        {
            name: 'Sweetest Posrt',
            img: ProductImg
        },
        {
            name: 'Sweetest Posrt',
            img: ProductImg
        },
        {
            name: 'Sweetest Posrt',
            img: ProductImg
        },
        {
            name: 'Sweetest Posrt',
            img: ProductImg
        },
        {
            name: 'Sweetest Posrt',
            img: ProductImg
        },
        {
            name: 'Sweetest Posrt',
            img: ProductImg
        },
        {
            name: 'Sweetest Posrt',
            img: ProductImg
        },
        {
            name: 'Sweetest Posrt',
            img: ProductImg
        },
        {
            name: 'Sweetest Posrt',
            img: ProductImg
        },
        {
            name: 'Sweetest Posrt',
            img: ProductImg
        },
        {
            name: 'Sweetest Posrt',
            img: ProductImg
        },
    ]
    return (
        <div className='flex justify-center flex-col items-center pt-16'>
            <h1 className='text-main uppercase text-[24px] font-semibold mb-[24px]'>what to buy to day?</h1>
            <div className='grid grid-cols-6 gap-14'>
                {
                    products && products.map((product, i) => {
                        return (
                            <div className='flex items-center flex-col cursor-pointer' key={i}>
                                <img src={product.img} alt='img' className='w-[200px] rounded-[50%] mb-4' />
                                <p className='text-black font-normal text-[16px]'>{product.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProductToday