import { createTheme, adaptV4Theme } from '@mui/material/styles';

const darkTheme = createTheme(adaptV4Theme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8BD5F8',
    },
    secondary: {
      main: '#6AAFE6',
    },
    error: {
      main: '#FF7F7F',
    },
    background: {
      default: '#121212',
      paper: '#121212',
    },
    warning: {
      main: '#FFD97F',
    },
    info: {
      main: '#A8E0FF',
    },
    success: {
      main: '#9FFF9D',
    },
    text: {
      primary: '#fff',
      secondary: '#fff',
    },
  },
  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',    sans-serif`,
  },
  props: {
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: 'small',
    },
    MuiButton: {
      size: 'small',
    },
    MuiButtonGroup: {
      size: 'small',
    },
    MuiCheckbox: {
      size: 'small',
    },
    MuiFab: {
      size: 'small',
    },
    MuiFormControl: {
      margin: 'dense',
      size: 'small',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiRadio: {
      size: 'small',
    },
    MuiSwitch: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
      size: 'small',
    },
    MuiAppBar: {
      color: 'transparent',
    },
    MuiTooltip: {
      arrow: true,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          border: 0,
          borderRadius: '50px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
          height: 48,
          padding: '0 30px',
          transition: 'transform 0.3s ease-in-out',
          // '&:hover': {
          //   transform: 'scale(0.95)',
          // },
        },
      },
    },
    MuiAppBar: {
      colorInherit: {
        backgroundColor: 'tranparent',
        color: '#fff',
      },
    },
    MuiSwitch: {
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: 8,
      },
      switchBase: {
        padding: 1,
        '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
          transform: 'translateX(16px)',
          color: '#fff',
          '& + $track': {
            opacity: 1,
            border: 'none',
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 13,
        border: '1px solid #bdbdbd',
        backgroundColor: '#fafafa',
        opacity: 1,
        transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      },
    },
  },
}));

export default darkTheme;