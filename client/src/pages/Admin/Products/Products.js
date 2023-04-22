import React from 'react';
import ContentTopBar from '../../../components/ContentTopBar/ContentTopBar';
// import styles from './Products.module.css';
import { Route, Switch } from 'react-router-dom';
import CreateProduct from './CreateProduct/CreateProduct';
import ProductDetails from './ProductDetails/ProductDetails';
import ProductList from './ProductList/ProductList';

export default function Products() {
    return (
        <>
            <ContentTopBar title="Products" redirectLink="/admin/products/create" />
            <Switch>
                <Route path="/admin/products/create"> <CreateProduct /> </Route>
                <Route path="/admin/products/:id"> <ProductDetails /> </Route>
                <Route path="/admin/products" exact> <ProductList /> </Route>
            </Switch>
        </>
    )
}