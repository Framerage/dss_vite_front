import {BrowserRouter} from "react-router-dom";

import AppLayout from "./components/appLayout";
import "./styles/defaultStyles.css";

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
