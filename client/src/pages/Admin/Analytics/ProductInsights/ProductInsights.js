import React from 'react';
import styles from './ProductInsights.module.css';
import { useProductInsightsQuery } from '../../../../feature/services/statistics/statistics.services';
import { Typography, LinearProgress, Snackbar, Alert, FormControl, RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';
import { useGetProductCategoriesQuery } from '../../../../feature/services/ecom/productCategory.services';
import ProductStatsCard from './ProductStatsCard/ProductStatsCard';

const ProductInsights = () => {
  const [timeFrame, setTimeFrame] = React.useState("7d"); // ["7d", "30d", "90d", "365d"
  const { data, error, isLoading } = useProductInsightsQuery(timeFrame);
  const { data: categories, isLoading: categoriesIsLoading } = useGetProductCategoriesQuery();
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  console.log(categories)
  console.log("data", data)

  return (
    <>
      {/* Loading */}
      {isLoading && <LinearProgress color="primary" />}
      {/* Error Handling */}
      {error && <Snackbar open={true} autoHideDuration={6000}>
        <Alert severity="error">
          {error.message ? error.message : "Something went wrong! Please try again later."}
        </Alert>
      </Snackbar>}
      {/* Content */}
      {!isLoading && !categoriesIsLoading && data && <div className={styles.container}>
        <div>
          <Typography variant="h5" component="h5" gutterBottom>
            Time Frame
          </Typography>
          <FormControl variant='standard' sx={{ minWidth: 120 }}>
            <RadioGroup
              row
              aria-label="timeFrame"
              name="timeFrame"
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
            >
              <FormControlLabel value="7d" control={<Radio />} label="7 Days" />
              <FormControlLabel value="30d" control={<Radio />} label="30 Days" />
              <FormControlLabel value="90d" control={<Radio />} label="90 Days" />
              <FormControlLabel value="365d" control={<Radio />} label="365 Days" />
            </RadioGroup>
          </FormControl>
        </div>

        <div>
          <Typography variant="h5" component="h5" gutterBottom>
            Categories
          </Typography>
          <FormControl variant='standard' sx={{ minWidth: 120 }} className={styles.productCategories}>
            <FormControlLabel 
            label="All" 
            control={<Checkbox checked={selectedCategories.length === categories.productCategories?.length} 
            onChange={(e) => setSelectedCategories(e.target.checked ? categories.productCategories?.map((category) => category.id) : [])} />} 
            />
            {categories.productCategories && categories.productCategories.map((category) => (
              <FormControlLabel
                key={category.id}
                label={category.name}
                control={<Checkbox checked={selectedCategories.includes(category.id)} onChange={(e) => setSelectedCategories(e.target.checked ? [...selectedCategories, category.id] : selectedCategories.filter((id) => id !== category.id))} />}
              />
            ))}
          </FormControl>
        </div>

        <div className={styles.results}>
          {data.productData?.filter((product) => selectedCategories.length === 0 || selectedCategories.includes(product.categoryId)).map((product) => (
            <ProductStatsCard data={product} key={product._id} />
          ))}
        </div>
      </div>}
    </>
  )
}

export default ProductInsights
