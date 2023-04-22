import React from 'react';
// import styles from './ProductCategories.module.css';
import ContentTopBar from '../../../components/ContentTopBar/ContentTopBar';
import { Route, Switch } from 'react-router-dom';
import CreateProductCategory from './CreateProductCategory/CreateProductCategory';
import ProductCategoryDetails from './ProductCategoryDetails/ProductCategoryDetails';
import ProductCategoryList from './ProductCategoryList/ProductCategoryList';

export default function ProductCategories() {
    return (
        <>
            <ContentTopBar title="Product Categories" redirectLink="/admin/product-categories/create" />
            <Switch>
                <Route path="/admin/product-categories/create"> <CreateProductCategory /> </Route>
                <Route path="/admin/product-categories/:id"> <ProductCategoryDetails /> </Route>
                <Route path="/admin/product-categories" exact> <ProductCategoryList /> </Route>
            </Switch>
        </>
    )
}   