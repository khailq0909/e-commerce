import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiGetAllCategories } from '../apis/index'
function CategoriesOverview({ title, param, link, banner }) {
  const navigate = useNavigate();
  const [Categ, setCateg] = useState();
  const [CustomerType, setCustomerType] = useState();
  const [Products, setProducts] = useState();

  let [index, setIndex] = useState(0);
  const fetchCategory = async () => {
    const rs = await apiGetAllCategories(param)
    if (rs.success) setCateg(...rs.data)
  }
  useEffect(() => {
    fetchCategory();
  }, [])
  useEffect(() => {
    setCustomerType(Categ?.customerTypes?.map(category => category))
    setProducts(Categ?.customerTypes[0]?.products.slice(0, 4) || []);
  }, [Categ])
  const handleCateg = (e, id) => {
    const products = CustomerType?.find(type => type._id === id)
    setProducts(products?.products.slice(0, 4))
    if (e.target.id === "0") {
      setIndex(0)
    }
    else if (e.target.id === "1") {
      setIndex(90)
    } else if (e.target.id === "2") {
      setIndex(180)
    }
  }
  const handleProduct = (id) =>{
    navigate(`/product/${id}`)
  }
  console.log(Categ)
  return (
    <div className='w-main mt-16 flex flex-col justify-center items-center'>
      <h1 className='text-main uppercase text-[24px] font-semibold mb-[24px]'>{title}</h1>
      <div className="content flex flex-col justify-center items-center">
        <div className="categ_header relative  w-main flex items-center justify-center before:content-[''] before:w-main before:h-[4px] before:bg-[#E3E3E3] before:absolute before:bottom-0 before:left-0 ">
          <div className="relative flex">
            {
              CustomerType && CustomerType?.map((c, i) => {
                return (
                  <div
                    key={i}
                    id={i}
                    className={`categ_type relative text-[14px] text-black font-semibold text-center cursor-pointer uppercase pt-4 pb-4 ps-4 pe-4 w-[90px] h-[48px]`}
                    onClick={(e) => handleCateg(e, c?._id)}
                  >
                    {c.type}
                  </div>
                )
              })
            }
            <div className={`animation absolute bottom-0 bg-main w-[90px] h-1 left-[${index}px]`}></div>
          </div>
        </div>
        <div className="categ_baner mb-6 mt-6">
          <img src={banner} alt="" />
        </div>
        <div className="categ_product w-main grid grid-cols-4 gap-10">
          {
            Products && Products?.map((p, i) => {
              return (
                <div key={i} className="product_item flex flex-col cursor-pointer" onClick={()=>handleProduct(p?._id)}>
                  <div className="product_img">
                    <img src={p.images} alt="" className='' />
                  </div>
                  <div className="product_name font-light mt-3 text-[16px]">
                    {p.title}
                  </div>
                  <div className="product_price mt-3 font-medium text-main text-[14px]">
                    {p.price} $
                  </div>
                  <div className="product_des mt-3 text-[#c3c3c3] text-[12px] italic w-[100%] overflow-hidden">
                    {p.des}
                  </div>
                </div>
              )
            })
          }
          <Link to={`/category/${Categ?._id}`}>
            <div className="show_more text-center w-main mt-12">
              <span className='pt-2 pb-2 ps-10 pe-10 bg-main text-white cursor-pointer rounded-sm'>
                Show all
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CategoriesOverview