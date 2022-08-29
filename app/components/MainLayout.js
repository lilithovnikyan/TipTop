import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { selectWishlistCount, selectCartlistCount } from "../app/store/slices/single";
import { selectSuccessLogin, pleaseLogin } from "../app/store/slices/user";
import styles from "../styles/Main.module.scss";
import storage from 'redux-persist/lib/storage';

export default function MainLayout({ children, title = "Nex App" }) {
  
  const dispatch = useDispatch();

  const successLogin = useSelector(selectSuccessLogin); 

  const [breadcrumb, setBreadcrumb] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const wishCount = useSelector(selectWishlistCount);
  
  const cartCount = useSelector(selectCartlistCount);
  const router = useRouter();
  const path = router.asPath;
  const pathL = path.charAt(0) + " " + path.charAt(1).toUpperCase() + path.slice(2);

  const myRef = useRef();

  useEffect(() => {
    if(path === "/") {
      setBreadcrumb(true);
    };
  }, [])


  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpenMenu(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const openDropdownMenu = () => {
    setOpenMenu(true);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const handlePleaseLogin = () => {
    dispatch(pleaseLogin()); 
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap"></link>
      </Head>
      <div className={styles.container}>
        <nav className={styles.menu}>
          <div className={styles.header}>
            <Link href={"/"}>
              <a className="logo">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 240 240"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                >
                  <rect
                    width="240"
                    height="240"
                    rx="44"
                    fill="url(#paint0_linear_2_2)"
                  ></rect>
                  <path
                    d="M134.415 78.2608L175.976 144.738C183.055 156.061 174.915 170.75 161.561 170.75H78.4386C65.0852 170.75 56.945 156.061 64.024 144.738L105.585 78.2608C112.244 67.6102 127.756 67.6102 134.415 78.2608Z"
                    stroke="white"
                    strokeWidth="14"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_2_2"
                      x1="0"
                      y1="120"
                      x2="240"
                      y2="120"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#8E2DE2"></stop>
                      <stop offset="1" stopColor="#4A00E0"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span>tiptop</span>
              </a>
            </Link>
            <div className={styles.header_right}>
              <Link href={"/wishlist"}>    
                <a>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  <span className={wishCount ? "badge" : "display_none "}>{wishCount}</span>
                </a>
              </Link>
              <Link href={"/cart"}>
                <a>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                  <span className={cartCount ? "badge" : "display_none "}>{cartCount}</span>
                </a>
              </Link>
              <div className="user_box" ref={wrapperRef} onClick={openDropdownMenu}>
                <div className={`user_box_btn ${openMenu ? "active" : ""}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="26" height="27" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="10" r="3"></circle><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path></svg>
                </div>
                <div className={openMenu ? "user_box_dropdown" : "display_none"}>
                  <div>
                    {/* {successLogin ? */}
                      {/* <div className="special">
                        <p>Hello</p>
                        <p>lilit.hovnikyan18@gmail.com</p>
                      </div> */}
                      {/* : */}
                    {/* <div className="special">
                      <p>Welcome</p>
                      <p>To access wishlist or cart</p>
                      <a className="login-small-btn" href={"/signin"} onClick={() => handlePleaseLogin()}>Sign In</a>
                    </div> */}
                    {/* } */}

                    <div className="user_box_items">
                      <div className="item">
                        <Link href={"/collections"}>
                          <a>Collections</a>
                        </Link>
                      </div>
                      <div className="item">
                        <Link href={"/wishlist"}>
                          <a>Wishlist</a>
                        </Link>
                      </div>
                      <div className="item">
                        <Link href={"/cart"}>
                          <a>Cart</a>
                        </Link>
                      </div>
                      {/* { successLogin ?  :"" } */}
                      {/* <div className="item">Sign Out</div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className={styles.fiexedTop} style={{display: breadcrumb ? 'none' : 'block'}}>
          Home <span> {pathL}</span>
        </div>
        <main className={styles.content}>{children}</main>
      </div>
    </>
  );
}






  // useEffect(() => {
  //   storage.getItem("count").then((a) => {
  //     if (a) {
  //       setWishCount((a))
  //     }
  //   }) 
  // }, [wishCountInRedux])