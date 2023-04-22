import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MySideBar from '../../components/MySideBar/MySideBar';
import styles from './Admin.module.css';
import { useMediaQuery } from '@mui/material';

// Pages
import AdminAccounts from './AdminAccounts/AdminAccounts';
import Analytics from './Analytics/Analytics';
import CustomerAccounts from './CustomerAccounts/CustomerAccounts';
import Dashboard from './Dashboard/Dashboard';
import LiveChat from './LiveChat/LiveChat';
import ProductCategories from './ProductCategories/ProductCategories';
import Products from './Products/Products';
import Profile from './Profile/Profile';
import Shop from './Shop/Shop';
import PromoCodes from './PromoCodes/PromoCodes';

export default function Admin() {
    const isMobile = useMediaQuery('(max-width: 600px)');

    return (
        <div className={styles.container}>
            {!isMobile && <MySideBar />}
            <div className={styles.content}>
                {isMobile && <MySideBar />}
                <Switch>
                    <Route path="/admin" exact><Dashboard /></Route>
                    <Route path="/admin/shop"><Shop /></Route>
                    <Route path="/admin/products"><Products /></Route>
                    <Route path="/admin/product-categories"><ProductCategories /></Route>
                    <Route path="/admin/promo-codes"><PromoCodes /></Route>
                    <Route path="/admin/analytics"><Analytics /></Route>
                    <Route path="/admin/live-chat"><LiveChat /></Route>
                    <Route path="/admin/customer-accounts"><CustomerAccounts /></Route>
                    <Route path="/admin/admin-accounts"><AdminAccounts /></Route>
                    <Route path="/admin/profile"><Profile /></Route>
                </Switch>

            </div>
        </div>
    )
}
