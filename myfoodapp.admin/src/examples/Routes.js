import React, { Suspense, lazy } from 'react';

import {
  withRouter,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import PageLoader from './components/Common/PageLoader';
import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';
// import BaseHorizontal from './components/Layout/BaseHorizontal';

/* Used to render a lazy component with react-router */
const waitFor = (Tag) => (props) => <Tag {...props} />;

const DashboardV1 = lazy(() => import('./components/Dashboard/DashboardV1'));
const DashboardV2 = lazy(() => import('./components/Dashboard/DashboardV2'));
const DashboardV3 = lazy(() => import('./components/Dashboard/DashboardV3'));

const Widgets = lazy(() => import('./components/Widgets/Widgets'));

const Buttons = lazy(() => import('./components/Elements/Buttons'));
const Notifications = lazy(() => import('./components/Elements/Notifications'));
const SweetAlert = lazy(() => import('./components/Elements/SweetAlert'));
const BsCarousel = lazy(() => import('./components/Elements/Carousel'));
const Spinner = lazy(() => import('./components/Elements/Spinner'));
const DropdownAnimation = lazy(() =>
  import('./components/Elements/DropdownAnimation')
);
const Nestable = lazy(() => import('./components/Elements/Nestable'));
const Sortable = lazy(() => import('./components/Elements/Sortable'));
const Cards = lazy(() => import('./components/Elements/Cards'));
const Grid = lazy(() => import('./components/Elements/Grid'));
const GridMasonry = lazy(() => import('./components/Elements/GridMasonry'));
const Typography = lazy(() => import('./components/Elements/Typography'));
const FontIcons = lazy(() => import('./components/Elements/FontIcons'));
const WeatherIcons = lazy(() => import('./components/Elements/WeatherIcons'));
const Colors = lazy(() => import('./components/Elements/Colors'));

const ChartFlot = lazy(() => import('./components/Charts/ChartFlot'));
const ChartRadial = lazy(() => import('./components/Charts/ChartRadial'));
const ChartChartJS = lazy(() => import('./components/Charts/ChartChartJS'));
const ChartMorris = lazy(() => import('./components/Charts/ChartMorris'));
const ChartChartist = lazy(() => import('./components/Charts/ChartChartist'));

const MapsGoogle = lazy(() => import('./components/Maps/MapsGoogle'));
const MapsVector = lazy(() => import('./components/Maps/MapsVector'));

const TableStandard = lazy(() => import('./components/Tables/TableStandard'));
const TableExtended = lazy(() => import('./components/Tables/TableExtended'));
const Datatable = lazy(() => import('./components/Tables/DatatableView'));
const DataGrid = lazy(() => import('./components/Tables/DataGrid'));

const FormStandard = lazy(() => import('./components/Forms/FormStandard'));
const FormExtended = lazy(() => import('./components/Forms/FormExtended'));
const FormValidation = lazy(() => import('./components/Forms/FormValidation'));
const FormWizard = lazy(() => import('./components/Forms/FormWizard'));
const FormUpload = lazy(() => import('./components/Forms/FormUpload'));
const FormCropper = lazy(() => import('./components/Forms/FormCropper'));

const Login = lazy(() => import('./components/Pages/Login'));
const Register = lazy(() => import('./components/Pages/Register'));
const Recover = lazy(() => import('./components/Pages/Recover'));
const Lock = lazy(() => import('./components/Pages/Lock'));
const NotFound = lazy(() => import('./components/Pages/NotFound'));
const Error500 = lazy(() => import('./components/Pages/Error500'));
const Maintenance = lazy(() => import('./components/Pages/Maintenance'));

const Mailbox = lazy(() => import('./components/Extras/Mailbox'));
const Timeline = lazy(() => import('./components/Extras/Timeline'));
const Calendar = lazy(() => import('./components/Extras/Calendar'));
const Invoice = lazy(() => import('./components/Extras/Invoice'));
const Search = lazy(() => import('./components/Extras/Search'));
const Todo = lazy(() => import('./components/Extras/Todo'));
const Profile = lazy(() => import('./components/Extras/Profile'));
const BugTracker = lazy(() => import('./components/Extras/BugTracker'));
const ContactDetails = lazy(() => import('./components/Extras/ContactDetails'));
const Contacts = lazy(() => import('./components/Extras/Contacts'));
const Faq = lazy(() => import('./components/Extras/Faq'));
const FileManager = lazy(() => import('./components/Extras/FileManager'));
const Followers = lazy(() => import('./components/Extras/Followers'));
const HelpCenter = lazy(() => import('./components/Extras/HelpCenter'));
const Plans = lazy(() => import('./components/Extras/Plans'));
const ProjectDetails = lazy(() => import('./components/Extras/ProjectDetails'));
const Projects = lazy(() => import('./components/Extras/Projects'));
const Settings = lazy(() => import('./components/Extras/Settings'));
const SocialBoard = lazy(() => import('./components/Extras/SocialBoard'));
const TeamViewer = lazy(() => import('./components/Extras/TeamViewer'));
const VoteLinks = lazy(() => import('./components/Extras/VoteLinks'));

const EcommerceOrder = lazy(() =>
  import('./components/Ecommerce/EcommerceOrders')
);
const EcommerceOrderView = lazy(() =>
  import('./components/Ecommerce/EcommerceOrderView')
);
const EcommerceProduct = lazy(() =>
  import('./components/Ecommerce/EcommerceProducts')
);
const EcommerceProductView = lazy(() =>
  import('./components/Ecommerce/EcommerceProductView')
);
const EcommerceCheckout = lazy(() =>
  import('./components/Ecommerce/EcommerceCheckout')
);

const BlogList = lazy(() => import('./components/Blog/BlogList'));
const BlogPost = lazy(() => import('./components/Blog/BlogPost'));
const BlogArticle = lazy(() => import('./components/Blog/BlogArticles'));
const BlogArticleView = lazy(() => import('./components/Blog/BlogArticleView'));

const ForumHome = lazy(() => import('./components/Forum/ForumHome'));

// List of routes that uses the page layout
// listed here to Switch between layouts
// depending on the current pathname
const listofPages = [
  '/examples/login',
  '/examples/register',
  '/examples/recover',
  '/examples/lock',
  '/examples/notfound',
  '/examples/error500',
  '/examples/maintenance',
];

const Routes = ({ location }) => {
  const currentKey = location.pathname.split('/')[1] || '/';
  console.log(location);
  console.log(location.pathname);
  const timeout = { enter: 500, exit: 500 };

  // Animations supported
  //      'rag-fadeIn'
  //      'rag-fadeInRight'
  //      'rag-fadeInLeft'

  const animationName = 'rag-fadeIn';
  let { path } = useRouteMatch();

  if (listofPages.indexOf(location.pathname) > -1) {
    return (
      // Page Layout component wrapper
      <BasePage>
        <Suspense fallback={<PageLoader />}>
          <Switch location={location}>
            <Route path={`${path}/login`} component={waitFor(PageLoader)} />
            <Route path={`${path}/register`} component={waitFor(Register)} />
            <Route path={`${path}/recover`} component={waitFor(Recover)} />
            <Route path={`${path}/lock`} component={waitFor(Lock)} />
            <Route path={`${path}/notfound`} component={waitFor(NotFound)} />
            <Route path={`${path}/error500`} component={waitFor(Error500)} />
            <Route
              path={`${path}/maintenance`}
              component={waitFor(Maintenance)}
            />
          </Switch>
        </Suspense>
      </BasePage>
    );
  } else {
    return (
      // Layout component wrapper
      // Use <BaseHorizontal> to change layout
      <Base>
        <TransitionGroup>
          <CSSTransition
            key={currentKey}
            timeout={timeout}
            classNames={animationName}
            exit={false}
          >
            <div>
              <Suspense fallback={<PageLoader />}>
                <Switch location={location}>
                  {/*Dashboard*/}
                  <Route
                    path={`${path}/dashboardv1`}
                    component={waitFor(DashboardV1)}
                  />
                  <Route
                    path={`${path}/dashboardv2`}
                    component={waitFor(DashboardV2)}
                  />
                  <Route
                    path={`${path}/dashboardv3`}
                    component={waitFor(DashboardV3)}
                  />

                  {/*Widgets*/}
                  <Route
                    path={`${path}/widgets`}
                    component={waitFor(Widgets)}
                  />

                  {/*Elements*/}
                  <Route
                    path={`${path}/buttons`}
                    component={waitFor(Buttons)}
                  />
                  <Route
                    path="/notifications"
                    component={waitFor(Notifications)}
                  />
                  <Route
                    path={`${path}/sweetalert`}
                    component={waitFor(SweetAlert)}
                  />
                  <Route
                    path={`${path}/carousel`}
                    component={waitFor(BsCarousel)}
                  />
                  <Route
                    path={`${path}/spinners`}
                    component={waitFor(Spinner)}
                  />
                  <Route
                    path="/dropdown"
                    component={waitFor(DropdownAnimation)}
                  />
                  <Route
                    path={`${path}/nestable`}
                    component={waitFor(Nestable)}
                  />
                  <Route
                    path={`${path}/sortable`}
                    component={waitFor(Sortable)}
                  />
                  <Route path={`${path}/cards`} component={waitFor(Cards)} />
                  <Route path={`${path}/grid`} component={waitFor(Grid)} />
                  <Route
                    path={`${path}/grid-masonry`}
                    component={waitFor(GridMasonry)}
                  />
                  <Route
                    path={`${path}/typography`}
                    component={waitFor(Typography)}
                  />
                  <Route
                    path={`${path}/icons-font`}
                    component={waitFor(FontIcons)}
                  />
                  <Route
                    path={`${path}/icons-weather`}
                    component={waitFor(WeatherIcons)}
                  />
                  <Route path={`${path}/colors`} component={waitFor(Colors)} />

                  {/*Forms*/}
                  <Route
                    path={`${path}/form-standard`}
                    component={waitFor(FormStandard)}
                  />
                  <Route
                    path={`${path}/form-extended`}
                    component={waitFor(FormExtended)}
                  />
                  <Route
                    path={`${path}/form-validation`}
                    component={waitFor(FormValidation)}
                  />
                  <Route
                    path={`${path}/form-wizard`}
                    component={waitFor(FormWizard)}
                  />
                  <Route
                    path={`${path}/form-upload`}
                    component={waitFor(FormUpload)}
                  />
                  <Route
                    path={`${path}/form-cropper`}
                    component={waitFor(FormCropper)}
                  />

                  {/*Charts*/}
                  <Route
                    path={`${path}/chart-flot`}
                    component={waitFor(ChartFlot)}
                  />
                  <Route
                    path={`${path}/chart-radial`}
                    component={waitFor(ChartRadial)}
                  />
                  <Route
                    path={`${path}/chart-chartjs`}
                    component={waitFor(ChartChartJS)}
                  />
                  <Route
                    path={`${path}/chart-morris`}
                    component={waitFor(ChartMorris)}
                  />
                  <Route
                    path={`${path}/chart-chartist`}
                    component={waitFor(ChartChartist)}
                  />

                  {/*Table*/}
                  <Route
                    path={`${path}/table-standard`}
                    component={waitFor(TableStandard)}
                  />
                  <Route
                    path={`${path}/table-extended`}
                    component={waitFor(TableExtended)}
                  />
                  <Route
                    path={`${path}/table-datatable`}
                    component={waitFor(Datatable)}
                  />
                  <Route
                    path={`${path}/table-datagrid`}
                    component={waitFor(DataGrid)}
                  />

                  {/*Maps*/}
                  <Route
                    path={`${path}/map-google`}
                    component={waitFor(MapsGoogle)}
                  />
                  <Route
                    path={`${path}/map-vector`}
                    component={waitFor(MapsVector)}
                  />

                  {/*Extras*/}
                  <Route
                    path={`${path}/mailbox`}
                    component={waitFor(Mailbox)}
                  />
                  <Route
                    path={`${path}/timeline`}
                    component={waitFor(Timeline)}
                  />
                  <Route
                    path={`${path}/calendar`}
                    component={waitFor(Calendar)}
                  />
                  <Route
                    path={`${path}/invoice`}
                    component={waitFor(Invoice)}
                  />
                  <Route path={`${path}/search`} component={waitFor(Search)} />
                  <Route path={`${path}/todo`} component={waitFor(Todo)} />
                  <Route
                    path={`${path}/profile`}
                    component={waitFor(Profile)}
                  />
                  <Route
                    path={`${path}/ecommerce-orders`}
                    component={waitFor(EcommerceOrder)}
                  />
                  <Route
                    path={`${path}/ecommerce-order-view`}
                    component={waitFor(EcommerceOrderView)}
                  />
                  <Route
                    path={`${path}/ecommerce-products`}
                    component={waitFor(EcommerceProduct)}
                  />
                  <Route
                    path={`${path}/ecommerce-product-view`}
                    component={waitFor(EcommerceProductView)}
                  />
                  <Route
                    path={`${path}/ecommerce-checkout`}
                    component={waitFor(EcommerceCheckout)}
                  />
                  <Route
                    path={`${path}/blog-list`}
                    component={waitFor(BlogList)}
                  />
                  <Route
                    path={`${path}/blog-post`}
                    component={waitFor(BlogPost)}
                  />
                  <Route
                    path={`${path}/blog-articles`}
                    component={waitFor(BlogArticle)}
                  />
                  <Route
                    path={`${path}/blog-article-view`}
                    component={waitFor(BlogArticleView)}
                  />
                  <Route
                    path={`${path}/bug-tracker`}
                    component={waitFor(BugTracker)}
                  />
                  <Route
                    path={`${path}/contact-details`}
                    component={waitFor(ContactDetails)}
                  />
                  <Route
                    path={`${path}/contacts`}
                    component={waitFor(Contacts)}
                  />
                  <Route path={`${path}/faq`} component={waitFor(Faq)} />
                  <Route
                    path={`${path}/file-manager`}
                    component={waitFor(FileManager)}
                  />
                  <Route
                    path={`${path}/followers`}
                    component={waitFor(Followers)}
                  />
                  <Route
                    path={`${path}/help-center`}
                    component={waitFor(HelpCenter)}
                  />
                  <Route path={`${path}/plans`} component={waitFor(Plans)} />
                  <Route
                    path={`${path}/project-details`}
                    component={waitFor(ProjectDetails)}
                  />
                  <Route
                    path={`${path}/projects`}
                    component={waitFor(Projects)}
                  />
                  <Route
                    path={`${path}/settings`}
                    component={waitFor(Settings)}
                  />
                  <Route
                    path={`${path}/social-board`}
                    component={waitFor(SocialBoard)}
                  />
                  <Route
                    path={`${path}/team-viewer`}
                    component={waitFor(TeamViewer)}
                  />
                  <Route
                    path={`${path}/vote-links`}
                    component={waitFor(VoteLinks)}
                  />

                  <Route
                    path={`${path}/forum`}
                    component={waitFor(ForumHome)}
                  />

                  <Redirect to={`${path}/dashboardv1`} />
                </Switch>
              </Suspense>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Base>
    );
  }
};

export default withRouter(Routes);
