import { Route, Routes } from "react-router-dom";
import Posts from "./pages/Posts";
import "./index.css";
import {UserContextProvider} from "./UserContext";
import Layout from "./Layout";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        {" "}
        <Route path="/posts" index element={<Posts />}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/logout" element={<Signin/>}></Route>
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
