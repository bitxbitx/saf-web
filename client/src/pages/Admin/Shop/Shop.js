import React from 'react';
import styles from './Shop.module.css';
import ContentTopBar from '../../../components/ContentTopBar/ContentTopBar';
import { Route, Switch } from 'react-router-dom';
import CreateShop from './CreateShop/CreateShop';
import ShopDetails from './ShopDetails/ShopDetails';
import ShopList from './ShopList/ShopList';

export default function Shop() {
    return (
        <>
            <ContentTopBar title="Shop" redirectLink="/admin/shop/create" />
            <Switch>
                <Route path="/admin/shop/create"> <CreateShop /> </Route>
                <Route path="/admin/shop/:id"> <ShopDetails /> </Route>
                <Route path="/admin/shop" exact> <ShopList /> </Route>
            </Switch>
        </>
    )
}