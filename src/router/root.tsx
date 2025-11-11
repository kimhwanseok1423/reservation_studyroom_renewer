import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import BasicLayout from "../layouts/BasicLayout";



const Loading=()=> <div>Loading ....</div>
const Main=lazy(()=> import("../pages/mainPage")) //필요할떄까지 로딩하지마 하는용
const Notice=lazy(()=> import("../pages/notice"))
const router = createBrowserRouter([
  {
    path: "/",
    Component: BasicLayout,
    children: [
      {index: true,
        element: <Suspense fallback={<Loading/>}><Main/></Suspense>
      },
      {
        path:"notice",
        element: <Suspense fallback={<Loading/>}><Notice/></Suspense>
      }
    ]

  }
]);

export default router;