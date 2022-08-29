import React, { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemWishlist, selectWishlistCount, selectWishlistData, addToCart } from "../../app/store/slices/single";
import { selectUserLogin, selectUserRegister, selectPleaseLogin, selectContinueAsGuest } from "../../app/store/slices/user";
import Link from "next/link";
import SignIn from "../../components/authentication/SignIn";
import PleaseSignIn from "../../components/authentication/PleaseSignIn";
import EmptyWishlist from "../../components/authentication/EmptyWishlist";
import SignUp from "../../components/authentication/SignUp";


export default function Wishlist() {

  const [showModal, setShowModal] = useState(false);
  const count = useSelector(selectWishlistCount);
  const list = useSelector(selectWishlistData); 

  const userLogin = useSelector(selectUserLogin);
  const userRegister = useSelector(selectUserRegister);
  const continueAsGuest = useSelector(selectContinueAsGuest);
  
  
  const [size, setSize] = useState();
  const [currentItem, setCurrentItem] = useState();
  const [pleaseLogin, setPleaseLogin] = useState(true);

  const [isActive, setIsActive] = useState(false);
  const [hasError, setHasError] = useState(false);

  const sizes = [
    {id: 1, size: "S"},
    {id: 2, size: "M"},
    {id: 3, size: "L"},
    {id: 4, size: "XM"}
  ] 


  const dispatch = useDispatch();

  const deleteItem = (id) => {
    dispatch(deleteItemWishlist(id));
  }


  const moveToCart = (item) => {
    setCurrentItem(item);
    setSize(size);

    if(item.size === undefined) {
      setShowModal(true)
    } else {
      dispatch(addToCart(item));
      dispatch(deleteItemWishlist(item.id));
    }
  } 

  const addActive = (el) => {
    setIsActive(el.id);
    setSize(el.size);
  }

  const moveToCartDone = () => {
    const item = currentItem;
    item = {...item, size:size};
    if(size === undefined) {
      setHasError(true);
    } else {
      setHasError(false);
      dispatch(addToCart(item));
      dispatch(deleteItemWishlist(currentItem.id));
      setShowModal(false);
    }
  }

  const handleClose = () => {
    setShowModal(false);
  }

  return (
    <MainLayout title="Wishlist">
      <div className="all_wish_list">
        <div className={list.length > 0 ? "wish_item_content": "wish_item_content_none"}>
          <h1 className="wish_title">Wishlist ({count} items)</h1>
          <div className="wish_list">
            {list?.map((item, index) => {
              return (
                <div className="wish_item" key={index}>
                  <button className="wish_item_delete" onClick={() => deleteItem(item.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line> </svg>
                  </button>
                  <Link href={`/collections/single-product/${item.id}`}>
                    <a>
                      <div className="wish_item_img">
                        <img src={item.imageURL} />
                      </div>
                    </a>
                  </Link>
                  <div className="wish_item_info">
                    <h3 className="wish_item_brand">{item.brand}</h3>
                    <h3 className="wish_item_name">{item.name}</h3>
                    <span className="wish_item_price">Rs.{item.amount.slice(0, 1) + "," + item.amount.slice(1, 4)}</span>
                  </div>
                  <button className="wish_item_btn" onClick={() => moveToCart(item)}>Move to Cart</button>
                </div>
              );
            })} 
          </div>
        </div>
          
        {/* { userLogin ? <SignIn /> : "" } */}
        {/* { userRegister ? <SignUp /> : "" } */}
        {/* { pleaseLogin ? <PleaseSignIn />  : ""} */}
        {/* { continueAsGuest ? <EmptyWishlist /> : "" } */}

        <div className={showModal ? "modal display-block" : "modal display-none"}>
          <section className="modal-main">
            <div className="close-size" onClick={handleClose}>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
            <div className="wish-select-box">
              <div className="size_box">
                <div className="">
                  <div className="wish-size-title">Select Size</div>
                  <div className={hasError ? "error": "noError"}>Please select a size</div>
                </div>
                <div className="sizes">
                  { 
                    sizes.map((el) => {
                      return <button key={el.id} className={isActive === el.id ? "border_for_size" : null } onClick={() => addActive(el)}>{el.size}</button>
                  })}
                </div>
              </div>
              <button className="wish-done-btn" onClick={() => moveToCartDone()}>Done</button>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}







  // const [count, setCount] = useState(0);
  // const [list, setList] = useState([]);

  // useEffect(() => {
  //   storage.getItem("list").then((a) => {
  //     if (a) {
  //       setList(JSON.parse(a))
  //     }
  //   })
  //   storage.getItem("count").then((a) => {
  //     if (a) {
  //       setCount((a))
  //     }
  //   })
  // }, []);


  // storage.getItem("list").then((a) => {
  //   if (a) {
  //     setList(JSON.parse(a))
  //   }
  // })
  // storage.getItem("count").then((a) => {
  //   if (a) {
  //     setCount((a))
  //   }
  // })