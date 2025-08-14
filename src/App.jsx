import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/Loginpage.jsx"
import ProfilePage from "./pages/profilePage";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import {BASE_URL}  from "./utils/constants.jsx";
import Body from "./components/Body";
import FeedPage from "./pages/FeedPage.jsx";
import RequestsPage from "./pages/RequestsPage.jsx";
import ConnectionsPage from "./pages/ConnectionsPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
  


function App() {


  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body/>}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/requests" element={<RequestsPage/>}/>
              <Route path="/connections" element={<ConnectionsPage/>}/>
              <Route path="/chat/:id" element= {<ChatPage/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}
export default App;
