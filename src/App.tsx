import './App.css';
import Header from './Components/Layout/Header/Header';
import Main from './Components/Layout/Main/Main';
import Menu from './Components/Layout/Menu/Menu';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <>
        <Header />
        <Menu />
        <Main />
        <ToastContainer
          limit={3}
          newestOnTop
          pauseOnFocusLoss={false}
          pauseOnHover />
      </>
    </div>
  );
}

export default App;
