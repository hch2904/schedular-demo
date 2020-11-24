import './App.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import Routes from './routes';

const appTheme = createMuiTheme({
  // #265ED7
  palette: {
    primary: {
      'main': '#0779e4',
      'light': '#63a7ff',
      'dark': '#004eb1',
      'contrastText': '#FFF',
    },
    secondary: {
      'main': '#0fc1a1',
      'light': '#60f5d2',
      'dark': '#009073',
      'contrastText': '#000',
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'Lato',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
});


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={appTheme}>
        <SnackbarProvider
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <Routes />
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
