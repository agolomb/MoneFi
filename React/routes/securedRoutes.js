import { lazy } from "react";

const CourseAddForm = lazy(() => import("../components/courses/CourseAddForm"));
const CourseDetail = lazy(() => import("../components/courses/CourseDetail"));
const CourseEditDelete = lazy(() =>
  import("../components/courses/CourseEditDeleteForm")
);
const CourseListView = lazy(() =>
  import("../components/courses/CourseListView")
);
const courseRoutes = [
  {
    path: "/courses",
    name: "Courses",
    exact: true,
    element: CourseListView,
    roles: ["Admin", "User", "Merchant", "Borrower"],
    isAnonymous: false,
  },
  {
    path: "/course/:courseId/detail",
    name: "Course Info",
    exact: true,
    element: CourseDetail,
    roles: ["Admin", "User"],
    isAnonymous: false,
  },
  {
    path: "/course/new",
    name: "Course Add Form",
    exact: true,
    element: CourseAddForm,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: "/course/:courseId/edit",
    name: "Course Edit Delete",
    exact: true,
    element: CourseEditDelete,
    roles: ["Admin"],
    isAnonymous: false,
  },
];

const allRoutes = [
  ...courseRoutes,
];

export default allRoutes;
