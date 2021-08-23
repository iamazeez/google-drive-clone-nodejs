import axios from "axios";
import { Routes } from "./routes/routes";
import { GlobalProvider } from "./Context/GlobalContext";

function App() {
  axios.default.withCredentials = true;

  return (
    <GlobalProvider>
      <Routes />
    </GlobalProvider>
  );
}

export default App;
