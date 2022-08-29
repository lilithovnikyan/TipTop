import { createSlice } from "@reduxjs/toolkit";
import { current } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    brand: [],
    category: [],
    newElem: [],
    brandList: [],
    categoryList: [],
    singleProduct: {},
    wishText: "Wishlist"
}

export const Filter = createSlice({
    name: 'filterData',
    initialState,
    reducers: {
        renderProduct: (state, action) => {
            state.data = action.payload;
            state.data = state.data?.slice().sort(function (a, b) {
                return a.amount > b.amount ? 1 : -1;
            });
        },
        renderBrand: (state, action) => {
            const productBrand = [];
            action.payload.map((item) => {
                if (productBrand.indexOf(item.brand) === -1) {
                    productBrand.push(item.brand);
                }
            });
            state.brand = productBrand;
        },
        renderCategory: (state, action) => {
            const productCategory = [];
            action.payload.map((item) => {
              if (productCategory.indexOf(item.category) === -1) {
                productCategory.push(item.category);
              }
            });
            state.category = productCategory;
        },
        filterBrand: (state, action) => {
            const value = action.payload.value;
            const checked = action.payload.thisChecked;
            const newList = action.payload.dataForBrand;
            const tags = action.payload.tags;
            const brandState = [];


            const currentBrandState = state.brandList;
            const currentcategoryState = state.categoryList;

            if(checked === true && currentBrandState.indexOf(value) === -1 && tags === "brand") {
                currentBrandState.push(value);
            } else if(checked === false && tags === "brand") {
                currentBrandState.splice(currentBrandState.indexOf(value), 1);
            }


            if(checked === true && currentcategoryState.indexOf(value) === -1 && tags === "category") {
                currentcategoryState.push(value);
            } else if(checked === false && tags === "category") {
                currentcategoryState.splice(currentcategoryState.indexOf(value), 1);
            }
        

            if(currentcategoryState.length === 0 && currentcategoryState.length === 0) {
                state.data = newList.slice().sort(function (a, b) {
                    return a.amount > b.amount ? 1 : -1;
                });
            }

            if(currentBrandState.length > 0) {
                state.newElem = [];
                currentBrandState.map((value) => {
                    const brand = newList.filter((item) => item.brand === value);
                    state.newElem = state.newElem.concat(brand).slice().sort(function (a, b) {
                        return a.amount > b.amount ? 1 : -1;
                    });
                })
                brandState = state.newElem;
                state.data = state.newElem;
            } else {
                brandState = newList;
            }

            if(currentcategoryState.length > 0) {
                state.newCategory = [];
                currentcategoryState.map((value) => {
                    const category = brandState.filter((item) => item.category === value);
                    state.newCategory = state.newCategory.concat(category).slice().sort(function (a, b) {
                        return a.amount > b.amount ? 1 : -1;
                    });
                })
    
                state.data = state.newCategory;
            }

        },
        saveItem:(state, action) => {
            state.singleProduct = action.payload.item;
        }
    }
})  

export const { 
    renderProduct, 
    renderBrand, 
    renderCategory,
    filterBrand,
    saveItem
} = Filter.actions;

export const selectProductData = (state) => state.filterData.data;
export const selectProductBrand = (state) => state.filterData.brand;
export const selectProductCategory = (state) => state.filterData.category;
export const selectSingleProduct = (state) => state.filterData.singleProduct;
export default Filter.reducer;




