import React, { useState, useEffect  } from 'react'
import MainLayout from "../../../components/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { default as dataAll } from "../../../utils/data.json";
import { useRouter } from 'next/router';
import { addWishList, addToCart, selectWishlistData } from "../../../app/store/slices/single";


import storage from "redux-persist/lib/storage";

export default function SingleProduct() {

  const router = useRouter();
  const data = dataAll.clothes;

  const wishlistData = useSelector(selectWishlistData);

  const dispatch = useDispatch();
  const [item, setItem] = useState({});
  const [size, setSize] = useState();
  const [wishlisted, setWishlisted] = useState({});

  const [isActive, setIsActive] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loader, setLoader] = useState(false);
  const sizes = [
    {id: 1, size: "S"},
    {id: 2, size: "M"},
    {id: 3, size: "L"},
    {id: 4, size: "XM"}
  ]

  useEffect(() => {
    const id = router.query.id;
    const elem = data.filter((item) => item.id === id);
    const product = {...elem[0], quantity: 0};
    const wishlistElem = wishlistData.filter((item) => item.id === id);
    setItem(product);
    setWishlisted(wishlistElem.length);
  }, [router.query]);


  const addWish = (item) => {
    item = {...item, size:size}
    dispatch(addWishList(item));
    setWishlisted(1);
  }

  const addActive = (el) => {
    setIsActive(el.id);
    setSize(el.size);
  }
  
  const addCart = (item) => {
    item = {...item, size:size}
    if(size === undefined) {
      setHasError(true);
    } else {
      setHasError(false);
      dispatch(addToCart(item));
      setLoader(true);

      setTimeout(function() {
        setLoader(false)
      }, 600)
    }
  }
  

  return (
    <MainLayout title="collections">
      <div className="single_product">
        <div className="single_left">
          <img src={item?.imageURL}/>
        </div>
        <div className="single_right">
          <h2 className="single_brand">{item?.brand}</h2>
          <h3 className="single_name">{item?.name}</h3>
          <span>Rs.{item?.amount}</span>
          <div className="size_box">
            <div className="head">
              <div className="title">Select Size</div>
              <div className={hasError ? "error": "noError"}>Please select a size</div>
            </div>
            <div className="sizes">
              { 
                sizes.map((item) => {
                  return <button key={item.id} className={isActive === item.id ? "border_for_size" : null } onClick={() => addActive(item)}>{item.size}</button>
              })}
            </div>
          </div>
          <div className="single_btns">
            <button className="single_wishlist_btn" onClick={() => addWish(item)}>{wishlisted ? 'Wishlisted' : 'Wishlist'}</button>
            <button className="cart_wishlist_btn" onClick={() => addCart(item)}>
              <div className={loader ? "display_none" : "display_block"}> Add to cart</div>
              <div className={loader ? "loader" : "loader_none"}></div>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
