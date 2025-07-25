import roles from './admin/roles';
import { ROUTES } from './common/globalConstants';
import globalMessages from './common/globalMessages';

const Menu = [
  {
    heading: 'Main Navigation',
    translate: globalMessages.menu.sidebar.heading,
  },
  {
    name: 'Dashboard',
    icon: 'fas icon-book-open',
    translate: globalMessages.menu.dashboard,
    path: ROUTES.dashboard.operation,
    rolesRequired: [roles.admin, roles.superAdmin],
    submenu: [
      {
        name: 'Dashboard Operation',
        icon: 'fas icon-book-open',
        translate: globalMessages.menu.dashboardOperation,
        path: ROUTES.dashboard.operation,
      },
      {
        name: 'Dashboard Admin',
        icon: 'fas icon-book-open',
        translate: globalMessages.menu.dashboardAdmin,
        path: ROUTES.dashboard.admin,
      },
    ],
  },
  {
    name: 'Menu',
    icon: 'fas fa-book-open',
    translate: globalMessages.menu.main,
    path: ROUTES.menu.list,
    rolesRequired: [roles.admin, roles.superAdmin, roles.employee],
    submenu: [
      {
        name: 'Menus',
        icon: 'fas icon-book-open',
        translate: globalMessages.menu.menus,
        path: ROUTES.menu.list,
      },
      {
        name: 'Category',
        icon: 'fas fa-bookmark',
        translate: globalMessages.menu.category,
        path: ROUTES.category.list,
      },
      {
        name: 'Item',
        icon: 'fas fa-utensils',
        translate: globalMessages.menu.item,
        path: ROUTES.item.list,
      },
      {
        name: 'Side',
        icon: 'fas fa-wine-glass',
        translate: globalMessages.menu.side,
        path: ROUTES.side.list,
      },
      {
        name: 'Option',
        icon: 'fas fa-th-list',
        translate: globalMessages.menu.option,
        path: ROUTES.option,
      },
    ],
  },
  {
    name: 'Order',
    icon: 'fas fa-clipboard-list',
    translate: globalMessages.menu.order,
    path: ROUTES.event.list,
  },

  {
    name: 'Logistica',
    icon: 'fas fa-truck',
    translate: globalMessages.menu.logistic,
    path: ROUTES.provider.list,
    submenu: [
      {
        name: 'Providers',
        icon: 'fas fa-motorcycle',
        translate: globalMessages.menu.providers,
        path: ROUTES.provider,
      },
      {
        name: 'Cost Delivery',
        icon: 'fas fa-money-bill',
        translate: globalMessages.menu.costDelivery,
        path: ROUTES.deliveryCost,
      },
    ],
  },
  {
    name: 'Reservation',
    icon: 'fas fa-phone',
    translate: globalMessages.menu.reservation,
    path: ROUTES.reservation.list,
    rolesRequired: [roles.admin, roles.superAdmin, roles.employee],
    submenu: [
      {
        name: 'Reservations',
        icon: 'fas fa-phone-volume',
        translate: globalMessages.menu.reservations,
        path: ROUTES.reservation.list,
      },
      {
        name: 'specialPackages',
        icon: 'fas fa-calendar-check',
        translate: globalMessages.menu.specialPackages,
        path: ROUTES.specialEvent.list,
      },
    ],
  },
  {
    name: 'Coupon',
    icon: 'fas fa-ticket-alt',
    translate: globalMessages.menu.coupon,
    path: ROUTES.coupon.list,
  },
  {
    name: 'Users',
    icon: 'fas fa-users',
    translate: globalMessages.menu.users,
    path: ROUTES.users.list,
    rolesRequired: [roles.admin, roles.superAdmin],
  },
  {
    name: 'Clients',
    icon: 'icon-layers',
    translate: globalMessages.menu.clients,
    path: ROUTES.client.list,
    rolesRequired: [roles.superAdmin],
  },
  {
    name: 'Branches',
    icon: 'fas fa-code-branch',
    translate: globalMessages.menu.branches,
    path: ROUTES.branch.list,
    rolesRequired: [roles.superAdmin],
  },
  {
    name: 'Configuration',
    icon: 'fas fa-cog',
    translate: globalMessages.menu.configuration,
    path: ROUTES.client.companyProfile,
    submenu: [
      {
        name: 'CompanyProfile',
        icon: 'fas fa-city',
        translate: globalMessages.menu.companyProfile,
        path: ROUTES.client.companyProfile,
      },
      {
        name: 'DatesManager',
        icon: 'fas fa-calendar-alt',
        translate: globalMessages.menu.datesManager,
        path: ROUTES.client.datesManager,
        rolesRequired: [roles.admin, roles.superAdmin, roles.employee],
      },
      {
        name: 'Preferences',
        icon: 'fas fa-tasks',
        translate: globalMessages.menu.preferences,
        path: ROUTES.client.preferences,
        rolesRequired: [roles.admin, roles.superAdmin, roles.employee],
      },
    ],
  },
  {
    heading: 'Reports',
    translate: globalMessages.menu.reports,
  },
  {
    name: 'Production Report',
    icon: 'fas fa-industry',
    translate: globalMessages.menu.productionReport,
    submenu: [
      {
        name: 'Orders by Dates Report',
        icon: 'fas fa-clipboard-list',
        translate: globalMessages.menu.ordersByDatesReport,
        path: ROUTES.report.ordersByDatesList,
        rolesRequired: [roles.admin, roles.superAdmin, roles.employee],
      },
      {
        name: 'Items by Dates Report',
        icon: 'fas fa-utensils',
        translate: globalMessages.menu.itemsByDatesReport,
        path: ROUTES.report.itemsByDatesReport,
        rolesRequired: [roles.admin, roles.superAdmin, roles.employee],
      },
      {
        name: 'Ranking Items Report',
        icon: 'fas fa-trophy',
        translate: globalMessages.menu.rankingItemsReport,
        path: ROUTES.report.rankingItemsReport,
        rolesRequired: [roles.admin, roles.superAdmin, roles.employee],
      },
      {
        name: 'Bookings by Dates Report',
        icon: 'fas fa-phone-volume',
        translate: globalMessages.menu.bookingsByDatesReport,
        path: ROUTES.report.bookingsByDatesReport,
        rolesRequired: [roles.admin, roles.superAdmin, roles.employee],
      },
    ],
  },
  {
    name: 'Operative Report',
    icon: 'fas fa-cogs',
    translate: globalMessages.menu.operativeReport,
    submenu: [
      {
        name: 'Events Report',
        icon: 'fas fa-clipboard-list',
        translate: globalMessages.menu.eventsReport,
        path: ROUTES.report.eventsReport,
        rolesRequired: [roles.admin, roles.superAdmin, roles.employee],
      },
      {
        name: 'Operative Times Report',
        icon: 'fas fa-stopwatch',
        translate: globalMessages.menu.operativeTimesReport,
        path: ROUTES.report.operativeTimesReport,
        rolesRequired: [roles.admin, roles.superAdmin, roles.employee],
      },
    ],
  },
  {
    name: 'Finantial Report',
    icon: 'fas fa-chart-line',
    translate: globalMessages.menu.finantialReport,
    submenu: [
      {
        name: 'Transactions by Dates Report',
        icon: 'fas fa-calendar-check',
        translate: globalMessages.menu.transactionsByDatesReport,
        path: ROUTES.report.transactionsByDatesReport,
        rolesRequired: [roles.admin, roles.superAdmin, roles.employee],
      },
      {
        name: 'Logistics Conciliation Report',
        icon: 'fas fa-clipboard-check',
        translate: globalMessages.menu.logisticsConciliationReport,
        path: ROUTES.report.logisticsConciliationReport,
        rolesRequired: [roles.admin, roles.superAdmin, roles.employee],
      },
      {
        name: 'Client Conciliation Report',
        icon: 'fas fa-address-book',
        translate: globalMessages.menu.clientConciliationReport,
        path: ROUTES.report.clientConciliationReport,
        rolesRequired: [roles.superAdmin],
      },
    ],
  },
  {
    name: 'Marketing Report',
    icon: 'fas fa-ad',
    translate: globalMessages.menu.marketingReport,
    submenu: [
      {
        name: 'Activity by Demograph Report',
        icon: 'fas fa-search-location',
        translate: globalMessages.menu.activityByDemographReport,
        path: ROUTES.report.activityByDemographReport,
        rolesRequired: [roles.admin, roles.superAdmin, roles.employee],
      },
    ],
  },
];

export default Menu;
