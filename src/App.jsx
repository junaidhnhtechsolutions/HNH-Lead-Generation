import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="details" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

