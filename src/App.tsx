import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BarkPanel } from "components";
import { Home, ProfilePage, Bark } from "pages";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index path="/:page_number" element={<BarkPanel />} />
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
