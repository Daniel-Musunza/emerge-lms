// ** Import from react dom
import { Route, Routes, Navigate } from 'react-router-dom';

// ** Import core SCSS styles
import 'assets/scss/theme.scss';


// ** Import Authentication components
import SignIn from 'components/dashboard/authentication/SignIn';
import SignUp from 'components/dashboard/authentication/SignUp';
import ForgetPassword from 'components/dashboard/authentication/ForgetPassword';


import Pricing from 'components/marketing/pages/pricing/Pricing';
import Contact from 'components/marketing/pages/contact/Contact'; // new v1.1.0

// IMPORTS FOR HELP CENTER PAGES ( v1.3.0 )
import HelpCenter from 'components/marketing/pages/help-center/help-center/HelpCenter';
import HelpCenterFAQ from 'components/marketing/pages/help-center/help-center-faq/HelpCenterFAQ';
import HelpCenterGuide from 'components/marketing/pages/help-center/help-center-guide/HelpCenterGuide';
import HelpCenterGuideSingle from 'components/marketing/pages/help-center/help-center-guide-single/HelpCenterGuideSingle';
import HelpCenterSupport from 'components/marketing/pages/help-center/help-center-support/HelpCenterSupport';

/* IMPORTS FOR FRONT CAREER SUBMENU  ROUTERS */
import Career from 'components/marketing/pages/career/career/Career';

// Landing menu item pages
import HomeAcademy from 'components/marketing/landings/home-academy/HomeAcademy';

// Student Dashboard Pages
import StudentDashboard from 'components/marketing/student/Dashboard';
import EditProfile from 'components/marketing/account-settings/EditProfile';
import Security from 'components/marketing/account-settings/Security';
import Subscriptions from 'components/marketing/account-settings/Subscriptions';

// Student New Dashboard Pages for Quiz ( v2.0.0)
import StudentQuiz from 'components/marketing/student/Quiz';
import StudentQuizStart from 'components/marketing/student/quiz-start/QuizStart';
import StudentQuizAttempt from 'components/marketing/student/QuizAttempt';
import StudentQuizResult from 'components/marketing/student/QuizResult';

// Account Settings
import Invoice from 'components/marketing/account-settings/Invoice';
import InvoiceDetails from 'components/marketing/account-settings/InvoiceDetails';
import AcademyLayout from 'layouts/marketing/AcademyLayout';
import HelpCenterTransparentLayout from 'layouts/marketing/HelpCenterTransparentLayout';
import AuthLayout from 'layouts/dashboard/AuthLayout';

import CourseResume from 'components/marketing/pages/courses/course-resume/CourseResume';
import CourseSingle from 'components/marketing/pages/courses/course-single/CourseSingle';
import AllCourses from 'components/marketing/pages/courses/AllCourses';
import VerifyEmail from 'components/dashboard/authentication/verifyEmail';

import CheckLoggedIn from './CheckLoggedIn';
import HelpCenterLayout from 'layouts/marketing/HelpCenterLayout';
import GetApp from 'components/marketing/pages/GetApp';
import BecomeAnInstructor from 'components/marketing/pages/BecomeInstructor';
import Certifications from 'components/marketing/account-settings/Certifications';

// Inside the route or navigation logic
import Error404 from 'components/marketing/pages/specialty/Error404';
import Assignments from 'components/marketing/account-settings/Assignments';
import SingleAssignment from 'components/marketing/account-settings/SingleAssignment';
import AssignmentResults from 'components/marketing/account-settings/AssignmentResults';
import ChatLayout from './dashboard/ChatLayout';
import Chat from 'components/dashboard/chat/Chat';
import Certificate from 'components/marketing/account-settings/Certificate';
const AllRoutes = () => {
	return (

		<Routes>
			<Route element={<CheckLoggedIn />}>
				<Route path="/marketing/student/dashboard" element={<StudentDashboard />} />

				<Route
					path="/marketing/student/student-subscriptions/"
					element={<Subscriptions />}
				/>
				<Route
					path="/marketing/student/student-certifications/"
					element={<Certifications />}
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
			
				<Route path="/marketing/student/quiz/:sectionId" element={<StudentQuiz />} />
				<Route
					path="/marketing/student/quiz/attempt/"
					element={<StudentQuizAttempt />}
				/>
				<Route
					path="/marketing/student/quiz/start/:sectionId/:quizId"
					element={<StudentQuizStart />}
				/>
				<Route
					path="/marketing/student/quiz/result/:rawscore/:noOfQuestions/:passMark"
					element={<StudentQuizResult />}
				/>
				{/* </Route> */}

				<Route
					path="/marketing/assignments/:id/:course"
					element={<Assignments />}
				/>

				<Route
					path="/marketing/assignments/single/:id/:title"
					element={<SingleAssignment />}
				/>
				<Route
					path="/marketing/assignments/results/:id"
					element={<AssignmentResults />}
				/>

				<Route element={<ChatLayout />}>
					<Route path="/dashboard/chat/:id/:name" element={<Chat />} />
				</Route>
			</Route>
			<Route
					path="/certificate/:student/:certificateId"
					element={<Certificate />}
				/>
			<Route
				path="/marketing/allcourses/"
				element={<AllCourses />}
			/>
			<Route
				path="/marketing/courses/course-single/:id/:courseId"
				element={<CourseSingle />}
			/>

			<Route
				path="/marketing/courses/course-resume/:id/:courseId"
				element={<CourseResume />}
			/>

			{/* Career */}
			<Route path="/marketing/pages/career/career/Career" element={<Career />} />
			<Route path="/marketing/pages/contact/" element={<Contact />} />
			<Route path="/marketing/pages/pricing/" element={<Pricing />} />
			<Route path="/marketing/pages/get-the-app/" element={<GetApp />} />
			<Route path="/marketing/pages/become-instructor/" element={<BecomeAnInstructor />} />

			{/* Routes with AcademyLayout */}
			<Route element={<AcademyLayout />}>
				<Route path="/marketing/specialty/404-error/" element={<Error404 />} />
				<Route
					path="/"
					element={<HomeAcademy />}
				/>
			</Route>

			<Route element={<HelpCenterTransparentLayout />}>
				<Route path="/marketing/help-center/" element={<HelpCenter />} />
			</Route>

			{/* Routes with HelpCenterLayout */}
			<Route element={<HelpCenterLayout />}>
				<Route path="/marketing/help-center/faq/" element={<HelpCenterFAQ />} />
				<Route
					path="/marketing/help-center/guide/"
					element={<HelpCenterGuide />}
				/>
				<Route
					path="/marketing/help-center/guide-single/:categoryslug/:articleslug"
					element={<HelpCenterGuideSingle />}
				/>
				<Route
					path="/marketing/help-center/support/"
					element={<HelpCenterSupport />}
				/>
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

		

			{/*Redirect*/}
			<Route
				path="*"
				element={<Navigate to="/marketing/specialty/404-error/" replace />}
			/>
		</Routes>
	);
};

export default AllRoutes;
