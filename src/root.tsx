import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import HomeLayout from "./routes/home/HomeLayout";
import HomePage from "./routes/home/HomePage";
import DocumentView from "./routes/home/DocumentView";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<HomeLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/:id" element={<DocumentView />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
