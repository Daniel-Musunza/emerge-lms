// ** Import from react dom
import { Route, Routes, Navigate } from 'react-router-dom';

// ** Import core SCSS styles
import 'assets/scss/theme.scss';


// ** Import Authentication components
import SignIn from 'components/dashboard/authentication/SignIn';
import SignUp from 'components/dashboard/authentication/SignUp';
import ForgetPassword from 'components/dashboard/authentication/ForgetPassword';
// Dashboard Apps -> Calendar ( v2.1.0 )

// ** Boostrap Forms components
import ChecksRadios from 'components/elements/bootstrap/forms/ChecksRadios';
import FloatingLabels from 'components/elements/bootstrap/forms/FloatingLabels';
import FormControls from 'components/elements/bootstrap/forms/FormControls';
import FormText from 'components/elements/bootstrap/forms/FormText';
import BSInputGroup from 'components/elements/bootstrap/forms/BSInputGroup';
import Layouts from 'components/elements/bootstrap/forms/Layouts';
import Range from 'components/elements/bootstrap/forms/Range';
import BSSelect from 'components/elements/bootstrap/forms/BSSelect';
import Validation from 'components/elements/bootstrap/forms/Validation';

// ** Boostrap components
import Accordions from 'components/elements/bootstrap/Accordions';
import Alerts from 'components/elements/bootstrap/Alerts';
import AvatarStyles from 'components/elements/bootstrap/AvatarStyles';
import Badges from 'components/elements/bootstrap/Badges';
import Breadcrumbs from 'components/elements/bootstrap/Breadcrumbs';
import Buttons from 'components/elements/bootstrap/Buttons';
import ButtonGroup from 'components/elements/bootstrap/ButtonGroup';
import Cards from 'components/elements/bootstrap/Cards';
import Carousels from 'components/elements/bootstrap/Carousels';
import CloseButtons from 'components/elements/bootstrap/CloseButtons';
import Collapses from 'components/elements/bootstrap/Collapses';
import Dropdowns from 'components/elements/bootstrap/Dropdowns';
import Listgroups from 'components/elements/bootstrap/Listgroups';
import Navbars from 'components/elements/bootstrap/Navbars';
import Navs from 'components/elements/bootstrap/Navs';
import BSOffcanvas from 'components/elements/bootstrap/BSOffcanvas';
import Overlays from 'components/elements/bootstrap/Overlays';
import Paginations from 'components/elements/bootstrap/Paginations';
import Popovers from 'components/elements/bootstrap/Popovers';
import Progress from 'components/elements/bootstrap/Progress';
import Spinners from 'components/elements/bootstrap/Spinners';
import Modals from 'components/elements/bootstrap/Modals';
import Tables from 'components/elements/bootstrap/Tables';
import Toasts from 'components/elements/bootstrap/Toasts';
import Tooltips from 'components/elements/bootstrap/Tooltips';



// IMPORTS FOR HELP CENTER PAGES ( v1.3.0 )
import HelpCenter from 'components/marketing/pages/help-center/help-center/HelpCenter';

import TermsAndConditions from 'components/marketing/pages/specialty/TermsAndConditions';

// Landing menu item pages
import HomeAcademy from 'components/marketing/landings/home-academy/HomeAcademy'; 

// Student Dashboard Pages
import StudentDashboard from 'components/marketing/student/Dashboard';
import DeleteProfile from 'components/marketing/account-settings/DeleteProfile';
import EditProfile from 'components/marketing/account-settings/EditProfile';
import LinkedAccounts from 'components/marketing/account-settings/LinkedAccounts';
import AccountNotifications from 'components/marketing/account-settings/Notifications';
import StudentPayment from 'components/marketing/account-settings/Payment';
import ProfilePrivacy from 'components/marketing/account-settings/ProfilePrivacy';
import Security from 'components/marketing/account-settings/Security';
import SocialProfiles from 'components/marketing/account-settings/SocialProfiles';
import Subscriptions from 'components/marketing/account-settings/Subscriptions';

// Student New Dashboard Pages for Quiz ( v2.0.0)
import StudentQuiz from 'components/marketing/student/Quiz';
import StudentQuizStart from 'components/marketing/student/quiz-start/QuizStart';
import StudentQuizAttempt from 'components/marketing/student/QuizAttempt';
import StudentQuizResult from 'components/marketing/student/QuizResult';

// Account Settings
import BillingInfo from 'components/marketing/account-settings/BillingInfo';
import Invoice from 'components/marketing/account-settings/Invoice';
import InvoiceDetails from 'components/marketing/account-settings/InvoiceDetails';
import BlankLayout from 'layouts/marketing/BlankLayout';
import AcademyLayout from 'layouts/marketing/AcademyLayout';
import HelpCenterTransparentLayout from 'layouts/marketing/HelpCenterTransparentLayout';
import AuthLayout from 'layouts/dashboard/AuthLayout';
import DashboardIndex from 'layouts/dashboard/DashboardIndex';
import Documentation from 'components/dashboard/documentation/Documentation';
import ChangeLog from 'components/dashboard/changelog/ChangeLog';
import { Calendar } from 'react-bootstrap-icons';
import CourseResume from 'components/marketing/pages/courses/course-resume/CourseResume';
import CourseSingle from 'components/marketing/pages/courses/course-single/CourseSingle';
import AllCourses from 'components/marketing/pages/courses/AllCourses';
import VerifyEmail from 'components/dashboard/authentication/verifyEmail';


const AllRoutes = () => {
	return (
		<Routes>
		
			<Route
				path="/marketing/student/dashboard/"
				element={<StudentDashboard />}
			/>
			<Route
				path="/marketing/allcourses/"
				element={<AllCourses />}
			/>
			<Route
				path="/marketing/student/student-subscriptions/"
				element={<Subscriptions />}
			/>
			<Route
				path="/marketing/student/student-billing-info/"
				element={<BillingInfo />}
			/>
			<Route
				path="/marketing/student/student-payment/"
				element={<StudentPayment />}
			/>
			<Route path="/marketing/student/student-invoice/" element={<Invoice />} />
			<Route
				path="/marketing/student/student-invoice-details/"
				element={<InvoiceDetails />}
			/>
			<Route
				path="/marketing/student/student-edit-profile/"
				element={<EditProfile />}
			/>
			<Route
				path="/marketing/student/student-security/"
				element={<Security />}
			/>
			<Route
				path="/marketing/student/student-social-profiles/"
				element={<SocialProfiles />}
			/>
			<Route
				path="/marketing/student/student-notifications/"
				element={<AccountNotifications />}
			/>
			<Route
				path="/marketing/student/student-profile-privacy/"
				element={<ProfilePrivacy />}
			/>
			<Route
				path="/marketing/student/student-delete-profile/"
				element={<DeleteProfile />}
			/>
			<Route
				path="/marketing/student/student-linked-accounts/"
				element={<LinkedAccounts />}
			/>
			<Route path="/marketing/student/quiz/" element={<StudentQuiz/>} />
			<Route
				path="/marketing/student/quiz/attempt/"
				element={<StudentQuizAttempt />}
			/>
			<Route
				path="/marketing/student/quiz/start/"
				element={<StudentQuizStart />}
			/>
			<Route
				path="/marketing/student/quiz/result/"
				element={<StudentQuizResult />}
			/>
			{/* </Route> */}

			<Route
					path="/marketing/courses/course-resume/:id"
					element={<CourseResume />}
				/>
				<Route
					path="/marketing/courses/course-single/:id"
					element={<CourseSingle />}
				/>
			{/* Routes with BlankLayout */}
			<Route element={<BlankLayout />}>
				
				<Route
					path="/marketing/specialty/terms-and-conditions/"
					element={<TermsAndConditions />}
				/>
			</Route>


			
			{/* Routes with AcademyLayout */}
			<Route element={<AcademyLayout />}>
				<Route
					path="/"
					element={<HomeAcademy />}
				/>
			</Route>

			{/* Routes with HelpCenterTransparentLayout */}
			<Route element={<HelpCenterTransparentLayout />}>
				<Route path="/marketing/help-center/" element={<HelpCenter />} />
			</Route>

			
			{/* Routes with AuthLayout */}
			<Route element={<AuthLayout />}>
				<Route path="/authentication/sign-in/:email?" element={<SignIn />} />
				<Route path="/authentication/sign-up" element={<SignUp />} />
				<Route
					path="/authentication/forget-password"
					element={<ForgetPassword />}
				/>
				<Route
					path="/students/verify/:code"
					element={<VerifyEmail />}
				/>
			</Route>

			{/* Routes (DASHBOARD ROUTERS) with DashboardIndex */}
			<Route element={<DashboardIndex />}>
				

				{/* REACT-BOOTSTRAP FORMS COMPOENTS ROUTERS */}
				<Route
					path="/elements/forms/checks-and-radios"
					element={<ChecksRadios />}
				/>
				<Route
					path="/elements/forms/floating-labels"
					element={<FloatingLabels />}
				/>
				<Route
					path="/elements/forms/form-controls"
					element={<FormControls />}
				/>
				<Route path="/elements/forms/form-text" element={<FormText />} />
				<Route path="/elements/forms/input-group" element={<BSInputGroup />} />
				<Route path="/elements/forms/layouts" element={<Layouts />} />
				<Route path="/elements/forms/range" element={<Range />} />
				<Route path="/elements/forms/select" element={<BSSelect />} />
				<Route path="/elements/forms/validation" element={<Validation />} />

				{/* REACT-BOOTSTRAP COMPOENTS ROUTERS */}
				<Route path="/elements/accordions" element={<Accordions />} />
				<Route path="/elements/alerts" element={<Alerts />} />
				<Route path="/elements/avatar" element={<AvatarStyles />} />
				<Route path="/elements/badges" element={<Badges />} />
				<Route path="/elements/breadcrumbs" element={<Breadcrumbs />} />
				<Route path="/elements/buttons" element={<Buttons />} />
				<Route path="/elements/button-group" element={<ButtonGroup />} />
				<Route path="/elements/cards" element={<Cards />} />
				<Route path="/elements/carousels" element={<Carousels />} />
				<Route path="/elements/close-button" element={<CloseButtons />} />
				<Route path="/elements/collapse" element={<Collapses />} />
				<Route path="/elements/dropdowns" element={<Dropdowns />} />
				<Route path="/elements/list-group" element={<Listgroups />} />
				<Route path="/elements/modal" element={<Modals />} />
				<Route path="/elements/navs" element={<Navs />} />
				<Route path="/elements/offcanvas" element={<BSOffcanvas />} />
				<Route path="/elements/overlays" element={<Overlays />} />
				<Route path="/elements/navbar" element={<Navbars />} />
				<Route path="/elements/pagination" element={<Paginations />} />
				<Route path="/elements/popovers" element={<Popovers />} />
				<Route path="/elements/progress" element={<Progress />} />
				<Route path="/elements/spinners" element={<Spinners />} />
				<Route path="/elements/tables" element={<Tables />} />
				<Route path="/elements/toasts" element={<Toasts />} />
				<Route path="/elements/tooltips" element={<Tooltips />} />
				<Route path="/dashboard/documentation" element={<Documentation />} />
				<Route path="/dashboard/changelog" element={<ChangeLog />} />
				<Route path="/dashboard/calendar" element={<Calendar />} />

			
			</Route>

			{/*Redirect*/}
			<Route
				path="*"
				element={<Navigate to="/marketing/specialty/404-error/" replace />}
			/>
		</Routes>
	);
};

export default AllRoutes;
