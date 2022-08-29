import MainLayout from "./../../components/MainLayout";
import React, { useState, useEffect  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { default as data } from "../../utils/data.json";
import { useRouter } from 'next/router';
import Link from "next/link";
 
import { 
  renderProduct,
  renderBrand, 
  renderCategory,
  filterBrand,
  selectProductBrand, 
  selectProductData, 
  selectProductCategory,
  saveItem 
} from "../../app/store/slices/filter";
   
export default function Collections() {
  const router = useRouter();
  const dispatch = useDispatch();
  const product = useSelector(selectProductData);
  const productBrand = useSelector(selectProductBrand);
  const productCategory= useSelector(selectProductCategory);

  useEffect(() => { 
    dispatch(renderProduct(data.clothes));
    dispatch(renderBrand(data.clothes));
    dispatch(renderCategory(data.clothes));  
  }, []);

  const filterAsBrand = (tags) => (e) => {
    const value = e.target.value;
    const thisChecked = e.target.checked;
    const dataForBrand = data.clothes;
    dispatch(filterBrand({value, thisChecked, dataForBrand, tags}));
  };

  const goSinplePage = (item) => {
    dispatch(saveItem({item}));
  }

  return (
    <MainLayout title="collections">
      <form className="products">
        <aside className="products_left">
          <p className="products_filter">Filters</p>
          <p className="products_filter_brand">Brand</p>
          <div className="filters_title">
            {productBrand?.map((item, index) => {
              return (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={item}
                    name={item}
                    className="brand"
                    value={item}
                    onChange={filterAsBrand("brand")}
                  />
                  <label htmlFor={item}>{item}</label>
                </div>
              );
            })}
          </div>
          <p className="products_filter_category">Category</p>
          <div className="filters_title">
            {productCategory?.map((item, index) => {
              return (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={item}
                    name={item}
                    className="category"
                    value={item}
                    onChange={filterAsBrand("category")}
                  />
                  <label htmlFor={item}>{item}</label>
                </div>
              );
            })}
          </div>
        </aside>
        <div className="products_right">
          <div className="products_right_top"></div>
          <div className="products_right_clothes">
            <div className="products_right_item">
              {product?.map((item, index) => {
                return (
                  <Link href={`/collections/single-product/${item.id}`} className="products_elem" key={index}>
                    <a onClick={() => goSinplePage(item)}>
                      <div>
                        <img src={item.imageURL} />
                      </div>
                      <div className="products_info">
                        <h3 className="products_brand">{item.brand}</h3>
                        <h2 className="products_name">{item.name}</h2>
                        <h2 className="products_name">{item.category}</h2>
                        <span className="products_amount">Rs.{item.amount.slice(0, 1) + "," + item.amount.slice(1, 4)}</span>
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </form>
    </MainLayout>
  );
}
