import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { selectCartlistCount, selectCartlistData, deleteItemCartlist } from "../../app/store/slices/single";
import Link from "next/link";

export default function Cart() {

  const dispatch = useDispatch();
  const count = useSelector(selectCartlistCount);
  const list = useSelector(selectCartlistData);
  const [allPrice, setAllPrice] = useState(0);
  const [discount, setDiscount] = useState(3500);
  const [total, setTotal] = useState(0);
  

  useEffect(() => {
    const price = 0;
    list.map((item) => {
      price += Number(item.amount) * Number(item.quantity);
    })
    setAllPrice(price);
    setTotal(price - discount);
  }, [list])

  const deleteItem = (id) => {
    dispatch(deleteItemCartlist(id));
  }
 
return (
    <MainLayout title="cart">
      <div className="cart_page">
        <div className={list.length > 0 ? "cart_content": "cart_content_none"}>
          <div className="cart_page_left">
            <h1 className="cart_title">Cart ({count} items)</h1>
            {list?.map((item, index) => {
              return (
                  <div className="cart_item" key={index}>
                    <div>
                      <Link href={`/collections/single-product/${item.id}`}>
                        <a>
                          <div className="cart_item_img">
                            <img src={item.imageURL} />
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div>
                      <div className="cart_item_info">
                        <h3 className="cart_item_brand">{item.brand}</h3>
                        <h3 className="cart_item_name">{item.name}</h3>
                        <div className="cart_actions">
                          <button className="cart_item_size">Size: {item.size}</button>
                          <button className="cart_quantity">
                            <span>Quantity: 1</span><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="6 9 12 15 18 9"></polyline></svg>
                          </button>
                        </div>
                        <span className="cart_item_price">
                          {item.quantity} 
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          Rs.{item.amount?.slice(0, 1) + "," + item.amount?.slice(1, 4)}
                        </span>
                      </div>
                      <button className="cart_item_delete" onClick={() => deleteItem(item.cart_id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line> </svg>
                      </button>
                    </div>
                  </div>
              );
            })}
          </div>
          <div className="cart_page_right">
            <div className="cart_page_right_price_datails">
              Price details
            </div>
            <div className="cart_page_right_basic">
              <div className="cart_page_right_price">
                <div className="cart_page_right_title">Price</div>
                <div className="cart_page_right_amount">Rs. {allPrice}</div>
              </div>
              <div className="cart_page_right_price">
                <div className="cart_page_right_title">Discount</div>
                <div className="cart_page_right_amount">- Rs. {discount}</div>
              </div>
              <div className="cart_page_right_price">
                <div className="cart_page_right_title">Shipping</div>
                <div className="cart_page_right_amount">FREE</div>
              </div>
            </div>
            <div className="cart_page_right_total">
              <div className="cart_page_right_final">
                <div className="cart_page_right_title">Total Amount</div>
                <div className="cart_page_right_amount">Rs. {total}</div>
              </div>
              <button className="cart_page_right_order">Place Order</button>
            </div>
          </div>
        </div>
        <div className={list.length > 0 ? "cart_no_empty":"cart_empty"}>
          <div className="cart_is_empty">
            <div className="round">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>  </svg>
            </div>
            <p className="text">Your cart is empty</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
