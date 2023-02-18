import './App.css';
import Header from './Components/Layout/Header/Header';
import Main from './Components/Layout/Main/Main';
import Menu from './Components/Layout/Menu/Menu';
import { ToastContainer } from "react-toastify";
import Footer from './Components/Layout/Footer/Footer';

function App() {
  return (
    <div className="App">
      <>
        <Header />
        <Menu />
        <Main />
        <Footer/>
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
