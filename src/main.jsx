import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App.jsx";
import Score from "./components/Score.jsx";
import { RecoilRoot } from "recoil";
import TopScore from "./components/TopScore.jsx";
import "./i18n.js";
import QuizForm from "./components/QuizForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/quiz",
    element: <QuizForm />,
  },
  {
    path: "/score",
    element: <Score />,
  },
  {
    path: "/topscore",
    element: <TopScore />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <Suspense fallback="loading..">
      <RouterProvider router={router} />
    </Suspense>
  </RecoilRoot>
);
