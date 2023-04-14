import { createTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8BD5F8', // Icon color
    },
    text: {
      primary: '#FFFFFF', // Default text color
    },
    error: {
      main: '#CC6577', // Error bg color
      contrastText: '#000000', // Error text color
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
  overrides: {
    MuiButton: {
      root: {
        color: '#FFFFFF', // Button text color
        background: 'linear-gradient(92.37deg, #8BD5F8 0%, #3C9EDF 100%)', // Button background
        borderRadius: '25px', // Button border radius
      },
    },
  },
});

export default theme;
