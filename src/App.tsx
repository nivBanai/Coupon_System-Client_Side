import './App.css';
import Header from './Components/Layout/Header/Header';
import Main from './Components/Layout/Main/Main';
import Menu from './Components/Layout/Menu/Menu';
import { ToastContainer } from "react-toastify";
import Footer from './Components/Layout/Footer/Footer';
import { useState } from 'react';

function App() {

  const [theme, setTheme] = useState<string>("dark");

  const switchTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  return (
    <div className="App" data-theme={theme}>
      <>
        <Header onSwitchTheme={switchTheme} theme={theme} />
        <Menu />
        <Main />
        <Footer />
        <ToastContainer
          limit={3}
          newestOnTop
          pauseOnFocusLoss={false}
          pauseOnHover
        />
      </>
    </div>
  );
}

export default App;
