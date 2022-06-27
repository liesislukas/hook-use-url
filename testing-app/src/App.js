import { Route, Routes } from "react-router-dom";
import About from "./elements/About";
import Another from "./elements/Another";
import Contacts from "./elements/Contacts";
import useUrl from "./hooks/useUrl";
import Layout from "./Layout";
import "./index.css";
function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Layout />} />
      <Route path={"/about"} element={<About />} />
      <Route path={"/another"} element={<Another />} />
      <Route path={"/contacts"} element={<Contacts />} />
    </Routes>
  );
}

export default App;
