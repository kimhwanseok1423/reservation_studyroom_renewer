import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import BasicLayout from "../layouts/BasicLayout";


const Loading=()=> <div>Loading ....</div>
const Main=lazy(()=> import("../pages/mainPage")) //필요할떄까지 로딩하지마 하는용
const About=lazy(()=> import("../pages/aboutPage"))
const router = createBrowserRouter([
  {
    path: "/",
    element: (
       <Suspense fallback={<Loading />}>
      <Main />
      </Suspense> // ✅ 모든 페이지가 이 레이아웃 안에서 렌더링됨
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Main />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;