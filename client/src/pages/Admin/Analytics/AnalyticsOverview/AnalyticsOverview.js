import { Alert, FormControl, FormControlLabel, LinearProgress, Radio, RadioGroup, Snackbar, Typography } from '@mui/material';
import { BarElement, CategoryScale, Chart, LineElement, LinearScale, PointElement } from "chart.js";
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { useAnalyticsOverviewQuery } from '../../../../feature/services/statistics/statistics.services';
import styles from './AnalyticsOverview.module.css';

Chart.register(LinearScale);
Chart.register(CategoryScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(BarElement);


const AnalyticsOverview = () => {
  const [ timeFrame, setTimeFrame ] = React.useState("7d"); // ["7d", "30d", "90d", "365d"
  const { data, error, isLoading } = useAnalyticsOverviewQuery(timeFrame);


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
      {!isLoading && data && <div className={styles.container}>
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
        <div className={styles.row}>
          <Typography variant="h5" component="h5" gutterBottom>
            Sales
          </Typography>
          <div className={styles.chart}>

            <Line
              data={data.salesLineChartData}
              height={400}
              width={600}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
          <Typography variant="h5" component="h5" gutterBottom>
            Sales based on Price Point
          </Typography>
          <div className={styles.chart}>

            <Bar
              data={data.pricePointBarChartData}
              height={400}
              width={600}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>

          <Typography variant="h5" component="h5" gutterBottom>
            Number of Orders / Transactions

          </Typography>
          <div className={styles.chart}>
            <Bar
              data={data.numberOfOrdersBarChartData}
              height={400}
              width={600}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>
      </div>}

    </>
  )
}

export default AnalyticsOverview;