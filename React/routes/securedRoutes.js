import { lazy } from "react";
const AdminDashBoard = lazy(() =>
  import("../components/dashboard/admin/AdminDashBoard")
);
const Appointment = lazy(() =>
  import("../components/appointments/Appointment")
);

const ViewAppointments = lazy(()=>import("../components/appointments/ViewAppointments"))
const AnalyticsDashboards = lazy(() =>
  import("../components/dashboard/analytics/Analytics")
);
const CourseAddForm = lazy(() => import("../components/courses/CourseAddForm"));
const CourseDetail = lazy(() => import("../components/courses/CourseDetail"));
const CourseEditDelete = lazy(() =>
  import("../components/courses/CourseEditDeleteForm")
);
const CourseListView = lazy(() =>
  import("../components/courses/CourseListView")
);
const Forum = lazy(() => import("../components/forums/ForumPage"));
const ForumForm = lazy(() => import("../components/forums/ForumForm"));
const ThreadDetails = lazy(() => import("../components/forums/ThreadDetails"));
const TestInstances = lazy(() => import("../components/instances/TestAnswers"));
const LoanAppListView = lazy(() =>
  import("../components/loanapplications/LoanAppListView")
);
const TestAnalytics = lazy(() =>
  import("../components/instances/TestAnalytics")
);
const BusinessProfiles = lazy(() =>
  import("../components/businessprofiles/BusinessProfiles")
);
const BusinessProfileDetails = lazy(() =>
  import("../components/businessprofiles/BusinessProfileDetails")
);
const BusinessProfileCreate = lazy(() =>
  import("../components/businessprofiles/BusinessProfileCreate")
);
const BusinessProfileConfirm = lazy(() =>
  import("../components/businessprofiles/BusinessProfileConfirm")
);
const FileManager = lazy(() => import("../components/files/FileManager"));
const UploadFile = lazy(() => import("../components/files/UploadFile"));
const Lenders = lazy(() => import("../components/lender/Lenders"));
const LenderInfo = lazy(() => import("../components/lender/LenderInformation"));
const LenderForm = lazy(() => import("../components/lender/LenderFormWrapper"));
const Licenses = lazy(() => import("../components/license/Licenses"))
const FaqForm = lazy(() => import("../components/faq/FaqForm"));
const BlogsForm = lazy(() => import("../components/blogs/BlogsForm"));
const LectureForm = lazy(() => import("../components/lecture/LectureForm"));
const LocationForm = lazy(() => import("../components/location/LocationForm"));
const LocationView = lazy(() => import("../components/location/LocationView"));
const TestQuestions = lazy(() => import("../components/testbuilder/TestQuestions"));
const Lecture = lazy(() => import("../components/lecture/Lecture"));
const LectureDetails = lazy(() => import("../components/lecture/LectureDetails"));
const BorrowerForm = lazy(() => import("../components/borrower/BorrowerPageTemplate"));
const BorrowerListView = lazy(() => import("../components/borrower/BorrowerListView"));
const BorrowerDetails = lazy(() => import("../components/borrower/BorrowerCardDetails"));
const BorrowerDebtForm = lazy(() => import("../components/dashboard/borrowers/BorrowerDebtForm"));
const PageNotFound = lazy(() => import("../components/error/Error404"));
const notesForm = lazy(() => import("../components/notes/NotesForm"));
const NewsletterSubscriptionTable = lazy(() =>
  import(
    "../components/newslettersubscriptionsform/NewsletterSubscriptionTable"
  )
);

const VideoChat = lazy(() => import("../components/daily/VideoChat"));
const LoanApplication = lazy(() => import("../components/loan/LoanApplication"));
const Settings = lazy(()=> import ("../components/user/Settings"))

const SiteReferencesChart = lazy(() => import("../components/sitereferences/SiteReferencesChart"));
const Subscriptions = lazy(() =>
  import("../components/stripesubscriptions/Subscriptions")
);
const CheckoutSuccess = lazy(() =>
  import("../components/checkout/CheckoutSuccess")
);
const PaymentDetails = lazy(() =>
  import("../components/checkout/PaymentDetails")
);
const StripeCreateAcctSuccess = lazy(() =>
  import("../components/dashboard/paymentaccounts/StripeCreateAcctSuccess")
);
const PaymentAccountDashboard = lazy(() =>
  import("../components/dashboard/paymentaccounts/PaymentAccountDashboard")
);

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboards",
    icon: "uil-home-alt",
    header: "Navigation",
    children: [
      {
        path: "/dashboard/analytics",
        name: "Analytics",
        element: AnalyticsDashboards,
        roles: ["Admin", "Merchant"],
        exact: true,
        isAnonymous: false,
      },
      {
        path: "/dashboard/analytics/admin",
        name: "Analytics",
        element: AnalyticsDashboards,
        roles: ["Admin"],
        exact: true,
        isAnonymous: false,
      },
      {
        path: "/dashboard/analytics/merchant",
        name: "Analytics",
        element: AnalyticsDashboards,
        roles: ["Admin", "Merchant"],
        exact: true,
        isAnonymous: false,
      },
      {
        path: "/dashboard/paymentaccounts",
        name: "PaymentAccountDashboard",
        exact: true,
        element: PaymentAccountDashboard,
        roles: ["Admin", "Merchant"],
        isAnonymous: false,
      },
      {
        path: "/borrowerdebt/new",
        name: "BorrowerDebtForm",
        exact: true,
        element: BorrowerDebtForm,
        roles: ["Admin", "Borrower"],
        isAnonymous: false,
      },
      {
        path: "/borrowerdebt/new/borrower",
        name: "BorrowerDebtForm",
        exact: true,
        element: BorrowerDebtForm,
        roles: ["Admin", "Borrower"],
        isAnonymous: false,
      },
      {
        path: "/dashboard/overview",
        name: "AdminDashBoard",
        element: AdminDashBoard,
        roles: ["Admin"],
        exact: true,
        isAnonymous: false,
      },
    ],
  },
];

const loanAppsRoutes = [
  {
    path: "/loanapplications/list",
    name: "LoanAppsList",
    exact: true,
    element: LoanAppListView,
    roles: ["Admin"],
    isAnonymous: false,
  },
];

const appointmentsRoutes = [
  {
    path: "/appointments/lender/:id",
    name: "ViewAppointments",
    element: ViewAppointments,
    roles: ["User"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/appointments/:id/form",
    name: "EditAppointments",
    element: Appointment,
    roles: ["User"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/appointments",
    name: "Appointments",
    element: Appointment,
    roles: ["User"],
    exact: true,
    isAnonymous: false,
  },
];
const borrowerRoutes = [
  {
    path: "/borrower/new",
    name: "BorrowerForm",
    exact: true,
    element: BorrowerForm,
    roles: ["Admin", "User", "Borrower"],
    isAnonymous: false,
  },
  {
    path: "/borrowers/list",
    name: "BorrowerList",
    exact: true,
    element: BorrowerListView,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: "/borrowers/details/:id",
    name: "BorrowerDetails",
    exact: true,
    element: BorrowerDetails,
    roles: ["Admin"],
    isAnonymous: false,
  },
];

const forumRoutes = [
  {
    path: "/forum",
    name: "Forums",
    element: Forum,
    roles: [],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/forum/new",
    name: "New Forum Form",
    element: ForumForm,
    roles: [],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/forum/:id",
    name: "Edit Forum",
    exact: true,
    element: ForumForm,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/forums/:forumId",
    name: "threadDetails",
    element: ThreadDetails,
    roles: [],
    exact: true,
    isAnonymous: false,
  },
];

const test = [
  {
    path: "/test",
    name: "Test",
    exact: true,
    element: AnalyticsDashboards,
    roles: ["Fail"],
    isAnonymous: false,
  },
  {
    path: "/secured",
    name: "A Secured Route",
    exact: true,
    element: AnalyticsDashboards,
    roles: ["Fail"],
    isAnonymous: false,
  },
  {
    path: "/secured2",
    name: "A Secured Route",
    exact: true,
    element: AnalyticsDashboards,
    roles: ["Admin"],
    isAnonymous: false,
  },
];

const businessProfileRoutes = [
  {
    path: "/business",
    name: "BusinessProfiles",
    exact: true,
    element: BusinessProfiles,
    roles: ["Admin", "User"],
    isAnonymous: false,
  },
  {
    path: "/business/:id",
    name: "BusinessProfileDetails",
    exact: true,
    element: BusinessProfileDetails,
    roles: ["Admin", "User"],
    isAnonymous: false,
  },
  {
    path: "/business/create",
    name: "BusinessProfileCreate",
    exact: true,
    element: BusinessProfileCreate,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: "/business/:id/edit",
    name: "BusinessProfileCreate",
    exact: true,
    element: BusinessProfileCreate,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: "/business/create/confirm",
    name: "BusinessProfileConfirm",
    exact: true,
    element: BusinessProfileConfirm,
    roles: ["Admin"],
    isAnonymous: false,
  },
];

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

const lenderRoutes = [
  {
    path: "/lenders",
    name: "Lenders",
    exact: true,
    element: Lenders,
    roles: ["Admin", "User", "Merchant", "Borrower"],
    isAnonymous: false,
  },
  {
    path: `/lender/:id`,
    name: "Lender info",
    exact: true,
    element: LenderInfo,
    roles: ["Admin", "User"],
    isAnonymous: false,
  },
  {
    path: `/lender/add`,
    name: "Lender add",
    exact: true,
    element: LenderForm,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: `/lender/:id/edit`,
    name: "Lender edit",
    exact: true,
    element: LenderForm,
    roles: ["Admin"],
    isAnonymous: false,
  },


]
const licenseRoutes =[
  {
    path: "/licenses",
    name: "Licenses",
    exact: true,
    element: Licenses,
    roles: ["Admin"],
    isAnonymous: false,
  }
]

const locationRoutes = [
  {
    path: "/location/create",
    name: "Location",
    exact: true,
    element: LocationForm,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: "/location/view",
    name: "Location",
    exact: true,
    element: LocationView,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: "/location/update",
    name: "Location",
    exact: true,
    element: LocationForm,
    roles: ["Admin"],
    isAnonymous: false,
  },
];

const faqRoutes = [
  {
    path: "/faqs/new",
    name: "Faq",
    exact: true,
    element: FaqForm,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: "/faqs/:id",
    name: "Faq",
    exact: true,
    element: FaqForm,
    roles: ["Admin"],
    isAnonymous: false,
  },
];

const fileRoutes = [
  {
    path: "/files/manager",
    name: "FileManager",
    exact: true,
    element: FileManager,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: "/files/upload",
    name: "UploadFile",
    exact: true,
    element: UploadFile,
    roles: ["Admin"],
    isAnonymous: false,
  },
];

const lectures = [
  {
    path: "courses/lectures/create",
    name: "LectureForm",
    exact: true,
    element: LectureForm,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: "courses/lectures/:id/update/:updateId",
    name: "LectureForm",
    exact: true,
    element: LectureForm,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: "courses/lectures",
    name: "Lecture",
    element: Lecture,
    roles: ["Admin", "User"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "courses/lectures/:id",
    name: "LectureDetails",
    exact: true,
    element: LectureDetails,
    roles: ["Admin", "User"],
    isAnonymous: false,
  },
];

const blogRoutes = [
  {
    path: "/blogs/new",
    name: "Blogs Form",
    exact: true,
    roles: ["Admin"],
    element: BlogsForm,
    isAnonymous: false,
  },
  {
    path: "/blogs/:id/edit",
    name: "Blogs Form + Id",
    exact: true,
    roles: ["Admin"],
    element: BlogsForm,
    isAnonymous: false,
  },
];


const siteReferenceRoutes = [
  {
    path: "/sitereferences/charts",
    name: "SiteReferences",
    exact: true,
    element: SiteReferencesChart,
    roles: ["Admin"],
    isAnonymous: false,
  },
];

const testBuilderRoutes = [
  {
    path: "/test/builder",
    name: "Test Questions",
    exact: true,
    element: TestQuestions,
    roles: ["Admin"],
    isAnonymous: false,
  },
];

const testInstancesRoutes = [
  {
    path: "/test/instances",
    name: "TestInstances",
    exact: true,
    element: TestInstances,
    roles: ["Admin", "User"],
    isAnonymous: false,
  },
  {
    path: "/test/analytics",
    name: "TestAnalytics",
    exact: true,
    element: TestAnalytics,
    roles: ["Admin", "User"],
    isAnonymous: false,
  },
];

const notesRoutes = [
  {
    path: "/:lectureId/notes",
    name: "NotesForm",
    exact: true,
    element: notesForm,
    roles: ["Admin", "User"],
    isAnonymous: false,
  },
];

const newsletterRoutes = [
  {
    path: "/newsletter/admin",
    name: "NewsletterSubscriptionTable",
    exact: true,
    element: NewsletterSubscriptionTable,
    roles: ["Admin"],
    isAnonymous: false,
  },
];

const userSettingsRoutes = [
  {
    path: "/settings",
    name: "Settings",
    exact: true,
    element: Settings,
    roles:["User","Admin"],
    isAnonymous: false,
  },
];

const errorRoutes = [
  {
    path: "*",
    name: "Error - 404",
    element: PageNotFound,
    roles: [],
    // exact: true,
    isAnonymous: false,
  },
];

const loanRoutes = [
  {
    path: "/loan_application",
    name: "LoanApplication",
    exact: true,
    element: LoanApplication,
    roles: ["Admin"],
    isAnonymous: false,
  },
];

const videoChatRoutes = [
  {
    path: "/video-chat",
    name: "Video Chat",
    exact: true,
    element: VideoChat,
    roles: ["Admin"],
    isAnonymous: false,
  },
];

const stripeRoutes = [
  {
    path: "/checkoutsuccess",
    name: "CheckoutSuccess",
    exact: true,
    element: CheckoutSuccess,
    roles: ["Admin", "User", "Borrower"],
    isAnonymous: false,
  },
  {
    path: "/paymentdetails",
    name: "PaymentDetails",
    exact: true,
    element: PaymentDetails,
    roles: ["Admin", "User", "Borrower"],
    isAnonymous: false,
  },
  {
    path: "/paymentaccounts/create/success",
    name: "StripeCreateAcctSuccess",
    exact: true,
    element: StripeCreateAcctSuccess,
    roles: ["Admin", "Merchant"],
    isAnonymous: false,
  },
  {
    path: "/subscriptions",
    name: "Subscriptions",
    exact: true,
    element: Subscriptions,
    roles: ["Admin", "User", "Borrower"],
    isAnonymous: false,
  },
];

const allRoutes = [
  ...loanRoutes,
  ...appointmentsRoutes,
  ...dashboardRoutes,
  ...test,
  ...errorRoutes,
  ...faqRoutes,
  ...forumRoutes,
  ...fileRoutes,
  ...lenderRoutes,
  ...licenseRoutes,
  ...courseRoutes,
  ...blogRoutes,
  ...businessProfileRoutes,
  ...lectures,
  ...testInstancesRoutes,
  ...locationRoutes,
  ...testBuilderRoutes,
  ...borrowerRoutes,
  ...notesRoutes,
  ...siteReferenceRoutes,
  ...loanAppsRoutes,
  ...newsletterRoutes,
  ...userSettingsRoutes,
  ...videoChatRoutes,
  ...stripeRoutes,
];

export default allRoutes;