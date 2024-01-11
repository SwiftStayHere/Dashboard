import moment from "moment";
import "moment/locale/it";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Root from "./components/root/Root";

function App() {
  useEffect(() => {
    moment.locale("it");
  }, []);
  return (
    <div className="app">
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </div>
  );
}

export default App;
