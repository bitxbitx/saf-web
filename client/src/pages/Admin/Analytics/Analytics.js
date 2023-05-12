import React from 'react';
import styles from './Analytics.module.css';
import ContentTopBar from '../../../components/ContentTopBar/ContentTopBar';
import { Typography, Box, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import AnalyticsOverview from './AnalyticsOverview/AnalyticsOverview';
import CustomerInsights from './CustomerInsights/CustomerInsights';
import ProductInsights from './ProductInsights/ProductInsights';

export default function Analytics() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Typography variant="h5" className={styles.title}>
        Analytics
      </Typography>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Analytics Overview" {...a11yProps(0)} />
            <Tab label="Product Insights" {...a11yProps(1)} />
            <Tab label="Customer Insights" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AnalyticsOverview />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProductInsights />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CustomerInsights />
        </TabPanel>
      </Box>
    </>
  );
}
