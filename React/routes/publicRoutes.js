import { lazy } from "react";
const CourseListView = lazy(() =>
  import("../components/courses/CourseListView")
);
const CourseDetail = lazy(() => import("../components/courses/CourseDetail"));
const courseRoutes = [
  {
    path: "/coursesoffered",
    name: "Courses",
    exact: true,
    element: CourseListView,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/course/:courseId/info",
    name: "Course Info",
    exact: true,
    element: CourseDetail,
    roles: [],
    isAnonymous: true,
  },
];

var allRoutes = [
  ...courseRoutes
];
export default allRoutes;
