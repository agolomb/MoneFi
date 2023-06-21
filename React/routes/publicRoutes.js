import TestDelete from "components/tests/TestDelete";
import TestUpdate from "components/tests/TestUpdate";
import { lazy } from "react";
const Landing = lazy(() => import("../components/landing/Landing"));
const RegisterNotify = lazy(() => import("../components/user/RegisterNotify"));
const Guidelines = lazy(() => import("../components/guide/Guidelines"));
const Login = lazy(() => import("../components/user/Login"));
const ResetPassword = lazy(() => import("../components/user/ResetPassword"));
const ChangePassword = lazy(() => import("../components/user/ChangePassword"));
const NewsletterSubscriptionsForm = lazy(() =>
  import(
    "../components/newslettersubscriptionsform/NewsletterSubscriptionsForm"
  )
);
const NewsletterUnsubcriptionForm = lazy(() => import("../components/newslettersubscriptionsform/NewsletterUnsubscriptionsForm"));
const Register = lazy(() => import("../components/user/Register"));
const Confirm = lazy(() => import("../components/user/Confirm"));
const PageNotFound = lazy(() => import("../components/error/Error404"));
const PrivacyPolicy = lazy(() =>
  import("../components/privacypolicy/PrivacyPolicy")
);
const FaqsList = lazy(() => import("components/faq/FaqsList"));
const Tests = lazy(() => import("../components/tests/Tests"));
const HelpCenter = lazy(() => import("../components/helpcenter/HelpCenter"));
const AboutUs = lazy(() => import("components/aboutus/AboutUs"));
const BlogsMain = lazy(() => import("components/blogs/BlogsMain"));
const CommentsForm = lazy(() => import("../components/comments/CommentForm"));
const ContactUs = lazy(() => import("components/contactus/ContactUs"));
const BlogCardFullWidth = lazy(() =>
  import("../components/blogs/BlogsFullCard")
);
const SiteReference = lazy(() =>
  import("../components/sitereference/SiteReference")
);
const CourseListView = lazy(() =>
  import("../components/courses/CourseListView")
);
const CourseDetail = lazy(() => import("../components/courses/CourseDetail"));

const routes = [
  {
    path: "/",
    name: "Landing",
    exact: true,
    element: Landing,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/login",
    name: "Login",
    exact: true,
    element: Login,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/resetpassword",
    name: "ResetPassword",
    exact: true,
    element: ResetPassword,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/changepassword",
    name: "ChangePassword",
    exact: true,
    element: ChangePassword,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/register",
    name: "Register",
    exact: true,
    element: Register,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/confirm",
    name: "Confirm",
    exact: true,
    element: Confirm,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/registernotify",
    name: "RegisterNotify",
    exact: true,
    element: RegisterNotify,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/sitereference/:userId",
    name: "SiteReference",
    exact: true,
    element: SiteReference,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/privacypolicy",
    name: "PrivacyPolicy",
    exact: true,
    element: PrivacyPolicy,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/comments/new",
    name: "CommentsForm",
    exact: true,
    element: CommentsForm,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/contact",
    name: "ContactUs",
    exact: true,
    element: ContactUs,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/blogs/:blogId",
    name: "BlogCardFullWidth",
    exact: true,
    element: BlogCardFullWidth,
    roles: [],
    isAnonymous: true,
  },
];
const newsletterRoutes = [
  {
    path: "/newsletter/create",
    name: "Newsletter Form",
    exact: true,
    element: NewsletterSubscriptionsForm,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/newsletterunsubcription",
    name: "Unsubcription Newsletter Form",
    exact: true,
    element: NewsletterUnsubcriptionForm,
    roles: ["Admin"],
    isAnonymous: true,
  },
];
const testsRoutes = [
  {
    path: "/tests",
    name: "Tests",
    exact: true,
    element: Tests,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/tests/update",
    name: "TestUpdate",
    exact: false,
    element: TestUpdate,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/tests/delete",
    name: "TestDelete",
    exact: false,
    element: TestDelete,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/blogs",
    name: "Blogs",
    exact: true,
    element: BlogsMain,
    roles: [],
    isAnonymous: true,
  },
];
const helpCenterRoutes = [
  {
    path: "/helpcenter",
    name: "HelpCenter",
    exact: true,
    element: HelpCenter,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/guide",
    name: "Guidelines",
    exact: true,
    element: Guidelines,
    roles: [],
    isAnonymous: true,
  },
];

const faqRoutes = [
  {
    path: "/faqs",
    name: "Faq",
    exact: true,
    element: FaqsList,
    roles: [],
    isAnonymous: true,
  },
];

const aboutUsRoutes = [
  {
    path: "/aboutus",
    name: "AboutUs",
    exact: true,
    element: AboutUs,
    roles: [],
    isAnonymous: true,
  },
];
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

const errorRoutes = [
  {
    path: "*",
    name: "Error - 404",
    element: PageNotFound,
    roles: [],
    // exact: false,
    isAnonymous: true,
  },
];

var allRoutes = [
  ...routes,
  ...errorRoutes,
  ...testsRoutes,
  ...aboutUsRoutes,
  ...newsletterRoutes,
  ...helpCenterRoutes,
  ...faqRoutes,
  ...courseRoutes,
];
export default allRoutes;
