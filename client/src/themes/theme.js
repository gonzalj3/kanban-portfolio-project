import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    },
    button: {
      textTransform: 'none'
    }
  },
  spacing: (factor) => `${8 * factor}px`, // Define spacing function (8px is default)
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    create: (props = ['all'], options = {}) => {
      const {
        duration = 300,
        easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
        delay = 0,
      } = options;
      
      return (Array.isArray(props) ? props : [props])
        .map((animatedProp) => `${animatedProp} ${duration}ms ${easing} ${delay}ms`)
        .join(',');
    },
  },
  mixins: {
    toolbar: {
      minHeight: 56,
      '@media (min-width:0px) and (orientation: landscape)': {
        minHeight: 48,
      },
      '@media (min-width:600px)': {
        minHeight: 64,
      },
    },
  },
  palette: {
    primary: { main: "#759CFC" },
    secondary: {
      main: "#759CFC",
    },
    cardColor: {
      blue: "#15A1F7",
      green: '#5ACD76',
      red: '#C70039',
      yellow: '#EA7829',
      purple: "#D057F0",
      white: "#E8E7E3"
    }
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#039be5",
        },
        underlineHover: {
          "&:hover": {
            textDecoration: "none",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "black",
          fontWeight: "500",
        }
      }
    },
  },
});
