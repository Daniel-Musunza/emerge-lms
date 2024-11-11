// import node module libraries
import { BrowserRouter as Router } from 'react-router-dom';

// import layouts
import ScrollToTop from 'layouts/dashboard/ScrollToTop';
import AllRoutes from 'routes/AllRoutes';
import { CourseProvider } from './components/courseContext'; 

// import required stylesheet
import 'simplebar/dist/simplebar.min.css';
import 'tippy.js/animations/scale.css';

function App() {
	return (
		<Router>
			<CourseProvider>
				<ScrollToTop />
				<AllRoutes />
			</CourseProvider>
		</Router>
	);
}

export default App;
