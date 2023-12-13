import {BrowserRouter} from "react-router-dom";
// import {Provider} from "react-redux";
import AppLayout from "./components/appLayout";
// import {store} from "./store";
import "./styles/defaultStyles.css";

function App() {
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
