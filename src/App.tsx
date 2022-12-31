import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BarkPanel } from "components";
import { Home, ProfilePage, Bark } from "pages";
import Login from "pages/Login";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/search" element={<Home />}>
            <Route index path="/search/:page_number" element={<BarkPanel />} />
          </Route>
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/bark" element={<Bark />}>
            <Route index path="/bark/:id" element={<BarkPanel />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
