import React from 'react';
import ContentTopBar from '../../../components/ContentTopBar/ContentTopBar';
// import styles from './PromoCodes.module.css';
import { Route, Switch } from 'react-router-dom';
import CreatePromoCode from './CreatePromoCode/CreatePromoCode';
import PromoCodeDetails from './PromoCodeDetails/PromoCodeDetails';
import PromoCodeList from './PromoCodeList/PromoCodeList';

export default function PromoCodes() {
    return (
        <>
            <ContentTopBar title="Promo Codes" redirectLink="/admin/promo-codes/create" />

            <Switch>
                <Route path="/admin/promo-codes/create"> <CreatePromoCode /> </Route>
                <Route path="/admin/promo-codes/:id"> <PromoCodeDetails /> </Route>
                <Route path="/admin/promo-codes" exact> <PromoCodeList /> </Route>
            </Switch>
        </>
    )
}