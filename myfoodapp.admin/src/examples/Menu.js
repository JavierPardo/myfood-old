const Menu = [
  {
    heading: "Main Navigation",
    translate: "sidebar.heading.HEADER",
  },
  {
    name: "Dashboard",
    icon: "icon-speedometer",
    translate: "sidebar.nav.DASHBOARD",
    label: { value: 3, color: "success" },
    submenu: [
      {
        name: "Dashboard v1",
        path: "/examples/dashboardv1",
      },
      {
        name: "Dashboard v2",
        path: "/examples/dashboardv2",
      },
      {
        name: "Dashboard v3",
        path: "/examples/dashboardv3",
      },
    ],
  },
  {
    name: "Widgets",
    icon: "icon-grid",
    path: "/examples/widgets",
    label: { value: 30, color: "success" },
    translate: "sidebar.nav.WIDGETS",
  },
  {
    heading: "Components",
    translate: "sidebar.heading.COMPONENTS",
  },
  {
    name: "Elements",
    icon: "icon-chemistry",
    translate: "sidebar.nav.element.ELEMENTS",
    submenu: [
      {
        name: "Buttons",
        path: "/examples/buttons",
        translate: "sidebar.nav.element.BUTTON",
      },
      {
        name: "Notifications",
        path: "/examples/notifications",
        translate: "sidebar.nav.element.NOTIFICATION",
      },
      {
        name: "Sweetalert",
        path: "/examples/sweetalert",
      },
      {
        name: "Carousel",
        path: "/examples/carousel",
        translate: "sidebar.nav.element.INTERACTION",
      },
      {
        name: "Spinners",
        path: "/examples/spinners",
        translate: "sidebar.nav.element.SPINNER",
      },
      {
        name: "Dropdown",
        path: "/examples/dropdown",
        translate: "sidebar.nav.element.DROPDOWN",
      },
      {
        name: "Nestable",
        path: "/examples/nestable",
      },
      {
        name: "Sortable",
        path: "/examples/sortable",
      },
      {
        name: "Cards",
        path: "/examples/cards",
        translate: "sidebar.nav.element.CARD",
      },
      {
        name: "Grid",
        path: "/examples/grid",
        translate: "sidebar.nav.element.GRID",
      },
      {
        name: "Grid Masonry",
        path: "/examples/grid-masonry",
        translate: "sidebar.nav.element.GRID_MASONRY",
      },
      {
        name: "Typography",
        path: "/examples/typography",
        translate: "sidebar.nav.element.TYPO",
      },
      {
        name: "IconsFont",
        path: "/examples/icons-font",
        translate: "sidebar.nav.element.FONT_ICON",
        label: { value: "+400", color: "success" },
      },
      {
        name: "IconsWeather",
        path: "/examples/icons-weather",
        translate: "sidebar.nav.element.WEATHER_ICON",
        label: { value: "+100", color: "success" },
      },
      {
        name: "Colors",
        path: "/examples/colors",
        translate: "sidebar.nav.element.COLOR",
      },
    ],
  },
  {
    name: "Forms",
    icon: "icon-note",
    translate: "sidebar.nav.form.FORM",
    submenu: [
      {
        name: "Standard",
        path: "/examples/form-standard",
        translate: "sidebar.nav.form.STANDARD",
      },
      {
        name: "Extended",
        path: "/examples/form-extended",
        translate: "sidebar.nav.form.EXTENDED",
      },
      {
        name: "Validation",
        path: "/examples/form-validation",
        translate: "sidebar.nav.form.VALIDATION",
      },
      {
        name: "Wizard",
        path: "/examples/form-wizard",
      },
      {
        name: "Upload",
        path: "/examples/form-upload",
      },
      {
        name: "Cropper",
        path: "/examples/form-cropper",
      },
    ],
  },
  {
    name: "Charts",
    icon: "icon-graph",
    translate: "sidebar.nav.chart.CHART",
    submenu: [
      {
        name: "Flot",
        path: "/examples/chart-flot",
        translate: "sidebar.nav.chart.FLOT",
      },
      {
        name: "Radial",
        path: "/examples/chart-radial",
        translate: "sidebar.nav.chart.RADIAL",
      },
      {
        name: "Chartjs",
        path: "/examples/chart-chartjs",
      },
      {
        name: "Morris",
        path: "/examples/chart-morris",
      },
      {
        name: "Chartist",
        path: "/examples/chart-chartist",
      },
    ],
  },
  {
    name: "Tables",
    icon: "icon-grid",
    translate: "sidebar.nav.table.TABLE",
    submenu: [
      {
        name: "Standard",
        path: "/examples/table-standard",
        translate: "sidebar.nav.table.STANDARD",
      },
      {
        name: "Extended",
        path: "/examples/table-extended",
        translate: "sidebar.nav.table.EXTENDED",
      },
      {
        name: "Datatable",
        path: "/examples/table-datatable",
        translate: "sidebar.nav.table.DATATABLE",
      },
      {
        name: "Datagrid",
        path: "/examples/table-datagrid",
      },
    ],
  },
  {
    name: "Maps",
    icon: "icon-map",
    translate: "idebar.nav.map.MAP",
    submenu: [
      {
        name: "Google",
        path: "/examples/map-google",
        translate: "sidebar.nav.map.GOOGLE",
      },
      {
        name: "Vector",
        path: "/examples/map-vector",
        translate: "sidebar.nav.map.VECTOR",
      },
    ],
  },
  {
    heading: "More",
    translate: "sidebar.heading.MORE",
  },
  {
    name: "Pages",
    icon: "icon-doc",
    translate: "sidebar.nav.pages.PAGES",
    submenu: [
      {
        name: "Login",
        path: "/examples/login",
        translate: "sidebar.nav.pages.LOGIN",
      },
      {
        name: "Register",
        path: "/examples/register",
        translate: "sidebar.nav.pages.REGISTER",
      },
      {
        name: "Recover",
        path: "/examples/recover",
        translate: "sidebar.nav.pages.RECOVER",
      },
      {
        name: "Lock",
        path: "/examples/lock",
        translate: "sidebar.nav.pages.LOCK",
      },
      {
        name: "Not Found",
        path: "/examples/notfound",
      },
      {
        name: "Error 500",
        path: "/examples/error500",
      },
      {
        name: "Maintenance",
        path: "/examples/maintenance",
      },
    ],
  },
  {
    name: "Extras",
    icon: "icon-cup",
    translate: "sidebar.nav.extra.EXTRA",
    submenu: [
      {
        name: "Mailbox",
        path: "/examples/mailbox",
        translate: "sidebar.nav.extra.MAILBOX",
      },
      {
        name: "Bug Tracker",
        path: "/examples/bug-tracker",
      },
      {
        name: "Contact Details",
        path: "/examples/contact-details",
      },
      {
        name: "Contacts",
        path: "/examples/contacts",
      },
      {
        name: "Faq",
        path: "/examples/faq",
      },
      {
        name: "File Manager",
        path: "/examples/file-manager",
      },
      {
        name: "Followers",
        path: "/examples/followers",
      },
      {
        name: "Help Center",
        path: "/examples/help-center",
      },
      {
        name: "Plans",
        path: "/examples/plans",
      },
      {
        name: "Project Details",
        path: "/examples/project-details",
      },
      {
        name: "Projects",
        path: "/examples/projects",
      },
      {
        name: "Settings",
        path: "/examples/settings",
      },
      {
        name: "Social Board",
        path: "/examples/social-board",
      },
      {
        name: "Team Viewer",
        path: "/examples/team-viewer",
      },
      {
        name: "Vote Links",
        path: "/examples/vote-links",
      },
      {
        name: "Timeline",
        path: "/examples/timeline",
        translate: "sidebar.nav.extra.TIMELINE",
      },
      {
        name: "Calendar",
        path: "/examples/calendar",
        translate: "sidebar.nav.extra.CALENDAR",
      },
      {
        name: "Invoice",
        path: "/examples/invoice",
        translate: "sidebar.nav.extra.INVOICE",
      },
      {
        name: "Search",
        path: "/examples/search",
        translate: "sidebar.nav.extra.SEARCH",
      },
      {
        name: "Todo",
        path: "/examples/todo",
        translate: "sidebar.nav.extra.TODO",
      },
      {
        name: "Profile",
        path: "/examples/profile",
        translate: "sidebar.nav.extra.PROFILE",
      },
    ],
  },
  {
    name: "Blog",
    icon: "icon-notebook",
    submenu: [
      {
        name: "List",
        path: "/examples/blog-list",
      },
      {
        name: "Post",
        path: "/examples/blog-post",
      },
      {
        name: "Articles",
        path: "/examples/blog-articles",
      },
      {
        name: "Article View",
        path: "/examples/blog-article-view",
      },
    ],
  },
  {
    name: "eCommerce",
    icon: "icon-basket-loaded",
    submenu: [
      {
        name: "Orders",
        path: "/examples/ecommerce-orders",
        label: { value: 10, color: "success" },
      },
      {
        name: "Order-view",
        path: "/examples/ecommerce-order-view",
      },
      {
        name: "Products",
        path: "/examples/ecommerce-products",
      },
      {
        name: "Product-view",
        path: "/examples/ecommerce-product-view",
      },
      {
        name: "Checkout",
        path: "/examples/ecommerce-checkout",
      },
    ],
  },
  {
    name: "Forum",
    icon: "icon-speech",
    path: "/examples/forum",
  },
];

export default Menu;
