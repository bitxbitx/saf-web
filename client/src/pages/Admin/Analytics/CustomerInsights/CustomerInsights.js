import { Alert, FormControl, FormControlLabel, LinearProgress, Radio, RadioGroup, Snackbar, Typography } from '@mui/material';
import { ArcElement, BarElement, CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { useCustomerInsightsQuery } from '../../../../feature/services/statistics/statistics.services';
import styles from './CustomerInsights.module.css';

Chart.register(LinearScale, CategoryScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Title);


const CustomerInsights = () => {
  const [timeFrame, setTimeFrame] = React.useState("7d");
  const { data, error, isLoading } = useCustomerInsightsQuery(timeFrame);

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
          <div className={styles.column}>
            <Typography variant="h5" component="h5" gutterBottom>
              New vs Returning
            </Typography>
            <div className={styles.chart}>

              <Pie
                data={{
                  labels: ['New', 'Returning'],
                  datasets: [
                    {
                      label: 'Count',
                      data: [1, 2],
                      backgroundColor: [
                        'rgba(139, 213, 248, 1)',
                        'rgba(180, 156, 254, 1)',
                      ],
                      borderColor: [
                        'rgba(139, 213, 248, 1)',
                        'rgba(180, 156, 254, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                  legend: {
                    position: 'bottom'
                  }
                }}
                height={200}
                width={300}
              />
            </div>
          </div>
          <div className={styles.column}>

            <Typography variant="h5" component="h5" gutterBottom>
              Ethinicity
            </Typography>
            <div className={styles.chart}>
              <Pie
                data={{
                  labels: [...data.ethnicityDistribution].sort((a, b) => a._id.localeCompare(b._id)).map((item) => item._id),
                  datasets: [
                    {
                      label: 'Count',
                      data: [...data.ethnicityDistribution].sort((a, b) => a._id.localeCompare(b._id)).map((item) => item.count),
                      backgroundColor: [
                        'rgba(182, 36, 79, 1)',
                        'rgba(139, 213, 248, 1)',
                        'rgba(180, 156, 254, 1)',
                        'rgba(202, 255, 208, 1)',
                        'rgba(95, 0, 186, 1)',
                      ],
                      borderColor: [
                        'rgba(182, 36, 79, 1)',
                        'rgba(139, 213, 248, 1)',
                        'rgba(180, 156, 254, 1)',
                        'rgba(202, 255, 208, 1)',
                        'rgba(95, 0, 186, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                height={200}
                width={300}
              />
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.column}>
            <Typography variant="h5" component="h5" gutterBottom>
              Age Distribution
            </Typography>
            <div className={styles.chart}>
              <Bar
                data={{
                  labels: [...data.customerAgeDistribution].sort((a, b) => {
                    if (a._id < b._id) return -1;
                    if (a._id > b._id) return 1;
                    return 0;
                  }).map((item) => item._id),
                  datasets: [
                    {
                      label: 'Age Distribution',
                      data: [...data.customerAgeDistribution].sort((a, b) => {
                        if (a._id < b._id) return -1;
                        if (a._id > b._id) return 1;
                        return 0;
                      }).map((item) => item.count),
                      backgroundColor: [
                        'rgba(139, 213, 248, 1)',
                      ],
                      borderColor: [
                        'rgba(139, 213, 248, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                height={400}
                width={600}
              />
            </div>
          </div>
        </div>
      </div>}

    </>
  )
}

export default CustomerInsights;