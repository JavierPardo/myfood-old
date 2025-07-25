import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { useContext } from 'react';

import { Base } from '../common/Layout';
import PrivateRoute from '../common/PrivateRoute';
import { Modal, ContentWrapper } from '../common/components';
import { ROUTES } from '../common/globalConstants';
import { ModalProvider } from '../common/contexts/ModalContext';
import { UserContext } from '../common/contexts/UserContext';
import Forbidden from '../common/pages/Forbidden';
import Maintenance from '../common/pages/Maintenance';
import BranchEdit from '../common/pages/Branch/Edit';
import ExceptionDateEdit from '../common/pages/Branch/ExceptionDateEdit';
import ExceptionDateList from '../common/pages/Branch/ExceptionDateList';
import BranchList from '../common/pages/Branch/List';
import ClientInformation from '../common/pages/Client/ClientInformation';
import ClientEdit from '../common/pages/Client/Edit';
import ClientList from '../common/pages/Client/List';
import Preferences from '../common/pages/Configuration/Preferences';
import EventEdit from '../common/pages/Event/Edit';
import Event from '../common/pages/Event/Index';
import EventList from '../common/pages/Event/List';
import OrderEdit from '../common/pages/Order/Edit';
import EventOrder from '../common/pages/Order/EventOrder';
import Order from '../common/pages/Order/Index';
import OrderList from '../common/pages/Order/List';
import ReportActivityByDemographList from '../common/pages/Report/ActivityByDemograph/List';
import ReportBookingsByDatesList from '../common/pages/Report/BookingsByDates/List';
import ReportClientConciliationList from '../common/pages/Report/ClientConciliation/List';
import ReportEventsList from '../common/pages/Report/Events/List';
import ReportItemsByDatesList from '../common/pages/Report/ItemsByDates/List';
import ReportLogisticsConciliationList from '../common/pages/Report/LogisticsConciliation/List';
import ReportOperativeTimesList from '../common/pages/Report/OperativeTimes/List';
import ReportOrdersByDatesList from '../common/pages/Report/OrdersByDates/List';
import ReportRankingItemsList from '../common/pages/Report/RankingItems/List';
import ReportTransactionsByDatesList from '../common/pages/Report/TransactionsByDates/List';

import roles from './roles';

import { Category, CategoryList } from './views/Category';
import { CouponHandler, CouponListHandler } from './views/Coupon';
import DashboardAdmin from './views/DashboardAdmin';
import DashboardOperation from './views/DashboardOperation';
import {
  DeliveryCostListHandler,
  DeliveryCostHandler,
} from './views/DeliveryCost';
import { ItemHandler, ItemListHandler } from './views/Item';
import { OptionListHandler } from './views/Option';
import { ProviderListHandler, ProviderHandler } from './views/Provider';
import {
  ReservationHandler,
  ReservationPreview,
  ReservationListHandler,
} from './views/Reservation';
import { SideListHandler, SideHandler } from './views/Side';
import {
  SpecialEvent,
  SpecialEventList,
  SpecialEventPreview,
} from './views/SpecialEvent';
import { UserListHandler, UserHandler } from './views/User';
import MenuEdit from './views/Menu/Edit';
import MenuList from './views/Menu/List';

const Admin = () => {
  const { user } = useContext(UserContext);

  if (user && !user.loaded) return null;
  if (!user.roles || !user.roles.length)
    return <Redirect to={ROUTES.public.login} />;
  return (
    <Base>
      <ModalProvider>
        <Modal />
        <Switch>
          <Route path={`${ROUTES.private.default}/${ROUTES.public.forbidden}`}>
            <ContentWrapper>
              <Forbidden />
            </ContentWrapper>
          </Route>
          <Route exact path={ROUTES.private.default}>
            <Redirect to={ROUTES.event.list} />
          </Route>
          {/* Dashboard Module */}
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.dashboard.operation}
            component={DashboardOperation}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
            readonly={[roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.dashboard.admin}
            component={DashboardAdmin}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
            readonly={[roles.employee]}
          />

          {/* Menu Module*/}
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.menu.list}
            component={MenuList}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
            readonly={[roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.menu.edit}
            component={MenuEdit}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
            readonly={[roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.menu.new}
            component={MenuEdit}
            roles={[roles.superAdmin, roles.admin]}
            readonly={[roles.employee]}
          />

          {/* Category Module */}
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.category.list}
            component={CategoryList}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
            readonly={[roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.category.new}
            component={Category}
            roles={[roles.superAdmin, roles.admin]}
            readonly={[roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.category.edit}
            component={Category}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
            readonly={[roles.employee]}
          />

          {/* Item Module */}
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.item.list}
            component={ItemListHandler}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
            readonly={[roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.item.new}
            component={ItemHandler}
            roles={[roles.superAdmin, roles.admin]}
            readonly={[roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.item.edit}
            component={ItemHandler}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
            readonly={[roles.employee]}
          />

          {/* Side Module */}
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.side.list}
            component={SideListHandler}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
            readonly={[roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.side.new}
            component={SideHandler}
            roles={[roles.superAdmin, roles.admin]}
            readonly={[roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.side.edit}
            component={SideHandler}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
            readonly={[roles.employee]}
          />

          {/*Option Module*/}
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.option}
            component={OptionListHandler}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
            readonly={[roles.employee]}
          />

          {/*Event Module*/}
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.event.list}
            component={EventList}
            roles={[
              roles.superAdmin,
              roles.admin,
              roles.accounting,
              roles.employee,
            ]}
            readonly={[roles.accounting, roles.admin, roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.event.edit}
            component={EventEdit}
            roles={[
              roles.superAdmin,
              roles.admin,
              roles.accounting,
              roles.employee,
            ]}
            readonly={[roles.accounting, roles.admin, roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.event.new}
            component={EventEdit}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
            readonly={[roles.accounting, roles.admin, roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.event.newOrder}
            component={EventOrder}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
            readonly={[roles.accounting]}
          />

          {/*Provider Module*/}
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.provider}
            component={ProviderListHandler}
            roles={[
              roles.superAdmin,
              roles.admin,
              roles.accounting,
              roles.employee,
            ]}
            readonly={[roles.employee, roles.accounting]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.createProvider}
            component={ProviderHandler}
            roles={[roles.superAdmin, roles.admin]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.editProvider}
            component={ProviderHandler}
            roles={[
              roles.superAdmin,
              roles.admin,
              roles.accounting,
              roles.employee,
            ]}
            readonly={[roles.employee, roles.accounting]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.deliveryCost}
            component={DeliveryCostListHandler}
            roles={[
              roles.superAdmin,
              roles.admin,
              roles.accounting,
              roles.employee,
            ]}
            readonly={[roles.employee, roles.accounting]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.createDeliveryCost}
            component={DeliveryCostHandler}
            roles={[roles.superAdmin, roles.admin]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.editDeliveryCost}
            component={DeliveryCostHandler}
            roles={[
              roles.superAdmin,
              roles.admin,
              roles.accounting,
              roles.employee,
            ]}
            readonly={[roles.employee, roles.accounting]}
          />

          {/*Reservation Module*/}
          <PrivateRoute
            exact
            branchDepends={true}
            path={[ROUTES.reservation.new, ROUTES.reservation.edit]}
            component={ReservationHandler}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.reservation.preview}
            component={ReservationPreview}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.reservation.list}
            component={ReservationListHandler}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
          />

          {/*Special Reservation Module*/}
          <PrivateRoute
            exact
            branchDepends={true}
            path={[ROUTES.specialEvent.new, ROUTES.specialEvent.edit]}
            component={SpecialEvent}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.specialEvent.preview}
            component={SpecialEventPreview}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.specialEvent.list}
            component={SpecialEventList}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
          />

          {/*Coupon Module*/}
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.coupon.list}
            component={CouponListHandler}
            roles={[
              roles.superAdmin,
              roles.admin,
              roles.employee,
              roles.accounting,
            ]}
            readonly={[roles.employee, roles.accounting]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.coupon.create}
            component={CouponHandler}
            roles={[roles.superAdmin, roles.admin]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.coupon.edit}
            component={CouponHandler}
            roles={[
              roles.superAdmin,
              roles.admin,
              roles.employee,
              roles.accounting,
            ]}
            readonly={[roles.employee, roles.accounting]}
          />
          {/* User Module */}
          <PrivateRoute
            exact
            clientDepends={true}
            path={ROUTES.user}
            component={UserListHandler}
            roles={[roles.superAdmin, roles.admin]}
            readonly={[roles.employee]}
          />
          <PrivateRoute
            exact
            clientDepends={true}
            path={ROUTES.createUser}
            component={UserHandler}
            roles={[roles.superAdmin, roles.admin]}
            readonly={[roles.employee]}
          />
          <PrivateRoute
            exact
            clientDepends={true}
            path={ROUTES.editUser}
            component={UserHandler}
            roles={[roles.superAdmin, roles.admin]}
            readonly={[roles.employee]}
          />

          {/*Configuration Module*/}
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.client.preferences}
            component={Preferences}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
          />
          <PrivateRoute
            path={ROUTES.client.companyProfile}
            branchDepends={true}
            component={ClientInformation}
            roles={[
              roles.superAdmin,
              roles.admin,
              roles.employee,
              roles.accounting,
            ]}
          />

          {/*Client Module*/}
          <PrivateRoute
            exact
            path={ROUTES.createUser}
            component={UserHandler}
          />
          <PrivateRoute
            exact
            path={ROUTES.client.list}
            component={ClientList}
            roles={[roles.superAdmin]}
          />
          <PrivateRoute
            exact
            path={ROUTES.client.new}
            component={ClientEdit}
            roles={[roles.superAdmin]}
          />
          <PrivateRoute
            exact
            path={ROUTES.client.edit}
            component={ClientEdit}
            roles={[roles.superAdmin]}
          />
          {/* Branch Module */}
          <PrivateRoute
            exact
            clientDepends={true}
            path={ROUTES.branch.new}
            component={BranchEdit}
            roles={[roles.superAdmin]}
          />
          <PrivateRoute
            exact
            clientDepends={true}
            path={ROUTES.branch.edit}
            component={BranchEdit}
            roles={[roles.superAdmin]}
          />
          <PrivateRoute
            exact
            clientDepends={true}
            path={ROUTES.branch.list}
            component={BranchList}
            roles={[roles.superAdmin]}
          />
          {/* Dates Exception */}
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.client.datesManager}
            component={ExceptionDateList}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.client.datesManagerNew}
            component={ExceptionDateEdit}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.client.datesManagerEdit}
            component={ExceptionDateEdit}
            roles={[roles.superAdmin, roles.admin, roles.employee]}
          />

          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.order.edit}
            component={OrderEdit}
            roles={[roles.superAdmin]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.order.edit}
            component={OrderEdit}
            roles={[roles.superAdmin]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.order.new}
            component={OrderEdit}
            roles={[roles.superAdmin]}
          />
          <PrivateRoute
            branchDepends={true}
            exact
            path={ROUTES.order.list}
            component={OrderList}
            roles={[roles.superAdmin]}
          />
          <PrivateRoute
            branchDepends={true}
            path={ROUTES.order.main}
            component={Order}
            roles={[roles.superAdmin]}
          />
          <PrivateRoute
            branchDepends={true}
            path={ROUTES.event.main}
            component={Event}
            roles={[roles.superAdmin]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.report.ordersByDatesList}
            component={ReportOrdersByDatesList}
            roles={[
              roles.superAdmin,
              roles.admin,
              roles.accounting,
              roles.employee,
            ]}
            readonly={[roles.accounting, roles.admin, roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.report.itemsByDatesReport}
            component={ReportItemsByDatesList}
            roles={[
              roles.superAdmin,
              roles.admin,
              roles.accounting,
              roles.employee,
            ]}
            readonly={[roles.accounting, roles.admin, roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.report.rankingItemsReport}
            component={ReportRankingItemsList}
            roles={[
              roles.superAdmin,
              roles.admin,
              roles.accounting,
              roles.employee,
            ]}
            readonly={[roles.accounting, roles.admin, roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.report.bookingsByDatesReport}
            component={ReportBookingsByDatesList}
            roles={[
              roles.superAdmin,
              roles.admin,
              roles.accounting,
              roles.employee,
            ]}
            readonly={[roles.accounting, roles.admin, roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.report.eventsReport}
            component={ReportEventsList}
            roles={[
              roles.superAdmin,
              roles.admin,
              roles.accounting,
              roles.employee,
            ]}
            readonly={[roles.accounting, roles.admin, roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.report.operativeTimesReport}
            component={ReportOperativeTimesList}
            roles={[
              roles.superAdmin,
              roles.admin,
              roles.accounting,
              roles.employee,
            ]}
            readonly={[roles.accounting, roles.admin, roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.report.transactionsByDatesReport}
            component={ReportTransactionsByDatesList}
            roles={[
              roles.superAdmin,
              roles.admin,
              roles.accounting,
              roles.employee,
            ]}
            readonly={[roles.accounting, roles.admin, roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.report.logisticsConciliationReport}
            component={ReportLogisticsConciliationList}
            roles={[
              roles.superAdmin,
              roles.admin,
              roles.accounting,
              roles.employee,
            ]}
            readonly={[roles.accounting, roles.admin, roles.employee]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.report.clientConciliationReport}
            component={ReportClientConciliationList}
            roles={[roles.superAdmin]}
          />
          <PrivateRoute
            exact
            branchDepends={true}
            path={ROUTES.report.ReportActivityByDemographList}
            component={ReportActivityByDemographList}
            roles={[
              roles.superAdmin,
              roles.admin,
              roles.accounting,
              roles.employee,
            ]}
            readonly={[roles.accounting, roles.admin, roles.employee]}
          />
          <Route exact path="/">
            <Redirect to={ROUTES.private.default} />
          </Route>
          <Route exact path="">
            <Redirect to={ROUTES.private.default} />
          </Route>
          <Route path="*">
            <Redirect to={'/404'} />
          </Route>
        </Switch>
      </ModalProvider>
    </Base>
  );
};

export default Admin;
