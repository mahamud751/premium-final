import {
  Article,
  MoveToInbox as InboxIcon,
  PhotoLibraryOutlined as PhotoLibraryOutlinedIcon,
  BrandingWatermark,
  QuestionAnswer,
  LocationOn,
  People,
  AccountBalance,
  Store,
  Person,
  Group,
  LocalOffer,
  Category,
  Inventory,
  ShoppingCart,
  Pages,
  Reviews,
  Notifications,
  Payment,
  Business,
  Assignment,
  Storefront,
  Camera,
  Receipt,
  Description,
  Apartment,
} from "@mui/icons-material";

interface MenuItem {
  text: string;
  icon: React.ReactElement;
  path: string;
  requiredPermission?: string;
  submenus: { text: string; path: string; requiredPermission?: string }[];
}

export const commonMenuItems: MenuItem[] = [
  {
    text: "Home",
    icon: <InboxIcon className="text-green-500" />,
    path: "/",
    submenus: [],
  },
  {
    text: "Product-Request",
    icon: <LocalOffer className="text-blue-600" />,
    path: "/request-list",
    submenus: [],
  },
  // {
  //   text: "User",
  //   icon: <Person className="text-indigo-600" />,
  //   path: "/user-list",
  //   submenus: [],
  // },
  {
    text: "Customer",
    icon: <Group className="text-teal-600" />,
    path: "/customers",
    submenus: [
      {
        text: "Add Customer",
        path: "/add-customer",
      },
      {
        text: "Customer List",
        path: "/customer-list",
      },
    ],
  },
  {
    text: "Vendor",
    icon: <Store className="text-orange-600" />,
    path: "/vendors",
    submenus: [
      {
        text: "Add Vendor",
        path: "/add-vendors",
      },
      {
        text: "Vendor List",
        path: "/vendors-list",
      },
    ],
  },
  {
    text: "Banner",
    icon: <PhotoLibraryOutlinedIcon className="text-purple-600" />,
    path: "/banners",
    submenus: [
      {
        text: "Add Banner",
        path: "/add-banner",
      },
      {
        text: "Banner List",
        path: "/banner-list",
      },
    ],
  },
  {
    text: "Brand",
    icon: <BrandingWatermark className="text-pink-600" />,
    path: "/brand",
    submenus: [
      {
        text: "Add Brand Logo",
        path: "/add-brand",
      },
      {
        text: "Brand List",
        path: "/brand-list",
      },
    ],
  },
  {
    text: "Faq",
    icon: <QuestionAnswer className="text-yellow-600" />,
    path: "/faqs",
    submenus: [
      {
        text: "Add Faq",
        path: "/add-faq",
      },
      {
        text: "Faq List",
        path: "/faq-list",
      },
    ],
  },
  {
    text: "Blog",
    icon: <Article className="text-cyan-600" />,
    path: "/blogs",
    submenus: [
      {
        text: "Add Blog",
        path: "/add-blog",
      },
      {
        text: "Blog List",
        path: "/blog-list",
      },
    ],
  },
  {
    text: "Location",
    icon: <LocationOn className="text-red-600" />,
    path: "/locations",
    submenus: [
      {
        text: "Add Location",
        path: "/add-location",
      },
      {
        text: "Location List",
        path: "/location-list",
      },
    ],
  },
  {
    text: "Requisition",
    icon: <Assignment className="text-blue-700" />,
    path: "/requisitions",
    submenus: [
      {
        text: "Add Requisition",
        path: "/add-requisition",
      },
      {
        text: "Requisition List",
        path: "/requisition-list",
      },
    ],
  },
  {
    text: "Unit",
    icon: <Inventory className="text-gray-600" />,
    path: "/units",
    submenus: [
      {
        text: "Add Unit",
        path: "/add-unit",
      },
      {
        text: "Unit List",
        path: "/unit-list",
      },
    ],
  },
  {
    text: "Lead",
    icon: <People className="text-green-600" />,
    path: "/leeds",
    submenus: [
      {
        text: "Add Lead",
        path: "/add-leed",
      },
      {
        text: "Lead List",
        path: "/leed-list",
      },
    ],
  },
  {
    text: "Product",
    icon: <Category className="text-purple-700" />,
    path: "/products",
    submenus: [
      {
        text: "Add Product",
        path: "/add-product",
      },
      {
        text: "Product List",
        path: "/product-list",
      },
    ],
  },
  {
    text: "Purchase",
    icon: <ShoppingCart className="text-orange-700" />,
    path: "/purchases",
    submenus: [
      {
        text: "Add Purchase",
        path: "/add-purchase",
      },
      {
        text: "Purchase List",
        path: "/purchase-list",
      },
    ],
  },
  {
    text: "Camera",
    icon: <Camera className="text-teal-700" />,
    path: "/cameras",
    submenus: [
      {
        text: "Add Camera",
        path: "/add-camera",
      },
      {
        text: "Camera List",
        path: "/camera-list",
      },
    ],
  },
  {
    text: "Project",
    icon: <Apartment className="text-lime-700" />,
    path: "/projects",
    submenus: [
      {
        text: "Add Project",
        path: "/add-project",
      },
      {
        text: "Project List",
        path: "/project-list",
      },
    ],
  },
  {
    text: "Popluar Project",
    icon: <Storefront className="text-rose-700" />,
    path: "/popular",
    submenus: [
      {
        text: "Add Popular",
        path: "/add-popular",
      },
      {
        text: "Popular List",
        path: "/popular-list",
      },
    ],
  },
  {
    text: "Order",
    icon: <Receipt className="text-blue-800" />,
    path: "/orders",
    submenus: [
      {
        text: "Add Order",
        path: "/add-orders",
      },
      {
        text: "Order List",
        path: "/orders-list",
      },
    ],
  },
  {
    text: "Review",
    icon: <Reviews className="text-yellow-700" />,
    path: "/reviews",
    submenus: [
      {
        text: "Add Review",
        path: "/add-review",
      },
      {
        text: "Review List",
        path: "/review-list",
      },
    ],
  },
  {
    text: "Notification",
    icon: <Notifications className="text-amber-700" />,
    path: "/notifications",
    submenus: [
      {
        text: "Add Notification",
        path: "/add-notification",
      },
      {
        text: "Notification List",
        path: "/notification-list",
      },
    ],
  },
  {
    text: "Payment",
    icon: <Payment className="text-emerald-700" />,
    path: "/payments",
    submenus: [
      {
        text: "Add Payment",
        path: "/add-payment",
      },
      {
        text: "Payment List",
        path: "/payment-list",
      },
    ],
  },
  {
    text: "Hr",
    icon: <Business className="text-indigo-700" />,
    path: "/hr",
    submenus: [
      {
        text: "Employee List",
        path: "/employee-list",
      },
      {
        text: "Department List",
        path: "/department-list",
      },
      {
        text: "Designations List",
        path: "/designation-list",
      },
      {
        text: "Leave List",
        path: "/leave-list",
      },
      {
        text: "Salary List",
        path: "/salary-list",
      },
      {
        text: "Salary Preview List",
        path: "/salary-preview-list",
      },
      {
        text: "Salary Sheet List",
        path: "/salary-sheet-list",
      },
      {
        text: "Weekend List",
        path: "/weekend-list",
      },
    ],
  },
  {
    text: "Employee",
    icon: <AccountBalance className="text-gray-700" />,
    path: "/employee",
    submenus: [
      {
        text: "Leave Create",
        path: "/add-leave",
      },
      {
        text: "Leave List",
        path: "/employee-leave-list",
      },
    ],
  },
  {
    text: "Inventories",
    icon: <Storefront className="text-red-700" />,
    path: "/inventories-list",
    submenus: [],
  },
  {
    text: "Auctions",
    icon: <Group className="text-teal-600" />,
    path: "/auctions",
    submenus: [
      {
        text: "Auction List",
        path: "/auction-list",
      },
    ],
  },
  {
    text: "Account",
    icon: <Description className="text-slate-700" />,
    path: "/account",
    submenus: [
      {
        text: "Account List",
        path: "/account-list",
      },
      {
        text: "Journal List",
        path: "/journal-list",
      },
      {
        text: "Ledger List",
        path: "/ledger-list",
      },
      // {
      //   text: "Expense Head List",
      //   path: "/expense-head-list",
      // },
      {
        text: "Additional Salary",
        path: "/additional-salary-list",
      },
    ],
  },
];

export const adminMenuItems: MenuItem[] = [
  {
    text: "Dynamic",
    icon: <Pages className="text-sky-800" />,
    path: "/dynamic",
    requiredPermission: "dynamicMenu",
    submenus: [
      {
        text: "Add Dynamic",
        path: "/add-dynamic",
        requiredPermission: "dynamicCreate",
      },
      {
        text: "Dynamic List",
        path: "/dynamic-list",
        requiredPermission: "dynamicList",
      },
    ],
  },
];
