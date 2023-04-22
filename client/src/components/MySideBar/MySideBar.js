import { IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { Menu, MenuItem, Sidebar, useProSidebar } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import styles from './MySideBar.module.css';
import { useLogoutMutation } from '../../feature/services/auth/auth.services';
import { useHistory } from 'react-router-dom';

// Logo
import logoSvg from '../../assets/img/logo.svg';

// Icons
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';

// Potentially use this for the sidebar for posts
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';

const MySideBar = ({ children, ...rest }) => {
    const location = useLocation();
    const { collapseSidebar, toggleSidebar } = useProSidebar();
    const theme = useTheme();
    const [collapse, setCollapse] = React.useState(true);
    const [toggle, setToggle] = React.useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [logout] = useLogoutMutation();
    const history = useHistory();

    const handleCollapseSidebar = () => {
        setCollapse(!collapse);
        collapseSidebar(collapse);
    }

    const handleLogout = () => {
        logout();
        history.push('/login');
    }

    const handleToggleSidebar = () => {
        setToggle(!toggle);
        toggleSidebar(toggle);
    }

    return (
        <div className={styles.container}>
            <div className={styles.topSideBar}>
                {isMobile && <div className={styles.toggleButton}><IconButton onClick={handleToggleSidebar}><MenuIcon /></IconButton> </div>}
                <Sidebar
                    transitionDuration={1000}
                    breakPoint='sm'
                    backgroundColor="black"
                    rootStyles={{
                        borderColor: 'black',
                        display: 'flex',
                        flexDirection: 'column',
                        // justifyContent: 'space-between',
                        height: '100vh',
                        paddingTop: '20px',
                    }}
                >
                    <div className={styles.logo}><img src={logoSvg} alt="logo" /> </div>
                    <Menu
                        menuItemStyles={{
                            button: ({ level, active, disabled, hover }) => {
                                // only apply styles on first level elements of the tree
                                if (level === 0)
                                    return {
                                        color: active ? "black" : theme.palette.primary.main,
                                        backgroundColor: active ? theme.palette.primary.main : undefined,
                                        borderRadius: '15px',
                                        '&:hover': {
                                            color: "black",
                                            backgroundColor: theme.palette.primary.main,
                                        },
                                    };
                            },

                        }}
                    >

                        {/* <MenuItem active={location.pathname === "/admin/"} icon={<GridViewOutlinedIcon />} component={<Link to="/admin" />}>Dashboard</MenuItem> */}
                        {/* <MenuItem active={location.pathname === "/admin/posts"} icon={<DynamicFeedOutlinedIcon />} component={<Link to="/admin/posts" />}>Posts</MenuItem> */}
                        <MenuItem active={location.pathname === "/admin/admin-accounts"} icon={<SupervisorAccountOutlinedIcon />} component={<Link to="/admin/admin-accounts" />}>Admin Accounts</MenuItem>
                        <MenuItem active={location.pathname === "/admin/customer-accounts"} icon={<ManageAccountsOutlinedIcon />} component={<Link to="/admin/customer-accounts" />}>Customer Accounts</MenuItem>
                        <MenuItem active={location.pathname === "/admin/products"} icon={<Inventory2OutlinedIcon />} component={<Link to="/admin/products" />}>Products</MenuItem>
                        <MenuItem active={location.pathname === "/admin/product-categories"} icon={<CategoryOutlinedIcon />} component={<Link to="/admin/product-categories" />}>Product Categories</MenuItem>
                        <MenuItem active={location.pathname === "/admin/promo-codes"} icon={<LocalOfferOutlinedIcon />} component={<Link to="/admin/promo-codes" />}>Promo Codes</MenuItem>
                        <MenuItem active={location.pathname === "/admin/shop"} icon={<StorefrontOutlinedIcon />} component={<Link to="/admin/shop" />}>Shop</MenuItem>
                        <MenuItem active={location.pathname === "/admin/live-chat"} icon={<ChatOutlinedIcon />} component={<Link to="/admin/live-chat" />}>Live Chat</MenuItem>
                        <MenuItem active={location.pathname === "/admin/analytics"} icon={<AnalyticsOutlinedIcon />} component={<Link to="/admin/analytics" />}>Analytics</MenuItem>
                        <MenuItem active={location.pathname === "/admin/profile"} icon={<AccountCircleOutlinedIcon />} component={<Link to="/admin/profile" />}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout} icon={<LogoutOutlinedIcon />}>Logout</MenuItem>
                        <MenuItem onClick={handleCollapseSidebar} icon={<ExpandCircleDownOutlinedIcon style={{ transform: collapse ? 'rotate(90deg)' : 'rotate(270deg)' }} />}>Collapse Menu</MenuItem>
                    </Menu>
                </Sidebar>
            </div>
        </div>
    );
};

export default MySideBar;