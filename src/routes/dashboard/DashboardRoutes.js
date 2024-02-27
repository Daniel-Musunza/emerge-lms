import { v4 as uuid } from 'uuid';
/**
 *  All Dashboard Routes
 *
 *  Understanding name/value pairs for Dashboard routes
 *
 *  Applicable for main/root/level 1 routes
 *  icon 		: String - It's only for main menu or you can consider 1st level menu item to specify icon name.
 * 				: Object - Icon as an object added from v1.4.0.
 *
 *  Applicable for main/root/level 1 and subitems routes
 * 	id 			: Number - You can use uuid() as value to generate unique ID using uuid library, you can also assign constant unique ID for react dynamic objects.
 *  title 		: String - If menu contains childern use title to provide main menu name.
 *  badge 		: String - (Optional - Default - '') If you specify badge value it will be displayed beside the menu title or menu item.
 * 	badgecolor 	: String - (Optional - Default - 'primary' ) - Used to specify badge background color.
 *
 *  Applicable for subitems / children items routes
 *  name 		: String - If it's menu item in which you are specifiying link, use name ( don't use title for that )
 *  children	: Array - Use to specify submenu items
 *
 *  Used to segrigate menu groups
 *  grouptitle : Boolean - (Optional - Default - false ) If you want to group menu items you can use grouptitle = true,
 *  ( Use title : value to specify group title  e.g. COMPONENTS , DOCUMENTATION that we did here. )
 *
 */

// import MDI icons
import Icon from '@mdi/react';
import { mdiTrello, mdiCalendar } from '@mdi/js';

export const DashboardMenu = [
	{
		id: uuid(),
		title: 'Dashboard',
		icon: 'home',
		children: [
			{ id: uuid(), link: '/', name: 'Overview' },
			{ id: uuid(), link: '/dashboard/analytics', name: 'Analytics' }
		]
	},

	{
		id: uuid(),
		title: 'Courses',
		icon: 'book',
		children: [
			{ id: uuid(), link: '/courses/all-courses', name: 'All Courses' }
			// {
			// 	id: uuid(),
			// 	link: '/courses/courses-category',
			// 	name: 'Courses Category'
			// },
			// { id: uuid(), link: '/courses/category-single', name: 'Category Single' }
		]
	},
	{
		id: uuid(),
		title: 'User',
		icon: 'user',
		children: [
			{ id: uuid(), link: '/admin/sign-up', name: 'Register User' },
			{ id: uuid(), link: '/user/instructor', name: 'Instructor' },
			{ id: uuid(), link: '/user/moderator', name: 'Moderator' },
			{ id: uuid(), link: '/user/students', name: 'Students' }
		]
	},

	{
		id: uuid(),
		title: 'CMS',
		icon: 'book-open',
		children: [
			{ id: uuid(), link: '/cms/cms-dashboard', name: 'Overview' },
			{ id: uuid(), link: '/cms/all-posts', name: 'All Posts' },
			{ id: uuid(), link: '/cms/add-new-post', name: 'New Post' },
			{ id: uuid(), link: '/cms/category', name: 'Category' }
		]
	},

	// Projects->Single children are used in below component for the comparision of router link and name
	// If you are changing main routes titles, i.e. Projects and Single you also need to modify on below component.
	// src/components/dashboard/projects/single/CommonHeaderTabs.js

	{
		id: uuid(),
		title: 'Projects',
		icon: 'file',
		children: [
			{ id: uuid(), link: '/dashboard/projects/grid', name: 'Grid' },
			{ id: uuid(), link: '/dashboard/projects/list', name: 'List' },
			{
				id: uuid(),
				title: 'Single',
				children: [
					{
						id: uuid(),
						link: '/dashboard/projects/single/overview',
						name: 'Overview'
					},
					{ id: uuid(), link: '/dashboard/projects/single/task', name: 'Task' },
					{
						id: uuid(),
						link: '/dashboard/projects/single/budget',
						name: 'Budget'
					},
					{
						id: uuid(),
						link: '/dashboard/projects/single/files',
						name: 'Files'
					},
					{ id: uuid(), link: '/dashboard/projects/single/team', name: 'Team' },
					{
						id: uuid(),
						link: '/dashboard/projects/single/summary',
						name: 'Summary'
					}
				]
			},
			{
				id: uuid(),
				link: '/dashboard/projects/create-project',
				name: 'Create Project'
			}
		]
	},
	// {
	// 	id: uuid(),
	// 	title: 'Authentication',
	// 	icon: 'lock',
	// 	children: [
	// 		{ id: uuid(), link: '/authentication/sign-in', name: 'Sign In' },
	// 		{ id: uuid(), link: '/authentication/sign-up', name: 'Sign Up' },
	// 		{
	// 			id: uuid(),
	// 			link: '/authentication/forget-password',
	// 			name: 'Forget Password'
	// 		},
	// 		{
	// 			id: uuid(),
	// 			link: '/authentication/notifications',
	// 			name: 'Notifications'
	// 		},
	// 		{
	// 			id: uuid(),
	// 			link: '/marketing/specialty/404-error/',
	// 			name: '404 Error'
	// 		}
	// 	]
	// },

	// -- Apps -> Mail - v1.3.0
	{
		id: uuid(),
		title: 'Apps',
		grouptitle: true
	},

	// -- Apps -> Chat and Task - v1.4.0
	{
		id: uuid(),
		title: 'Chat',
		icon: 'message-square',
		link: '/dashboard/chat'
	},
	{
		id: uuid(),
		title: 'Task',
		icon: <Icon path={mdiTrello} className="nav-icon me-2" size={0.8} />,
		link: '/dashboard/task-kanban'
	},

	// -- Apps -> Mail - v1.3.0
	{
		id: uuid(),
		title: 'Mail',
		icon: 'mail',
		link: '/dashboard/mail'
	},

	// -- Apps -> Calendar - v2.1.0
	{
		id: uuid(),
		title: 'Calendar',
		icon: <Icon path={mdiCalendar} className="nav-icon me-2" size={0.8} />,
		link: '/dashboard/calendar'
	},

	{
		id: uuid(),
		title: 'Site Settings',
		icon: 'settings',
		children: [
			{ id: uuid(), link: '/settings/general', name: 'General' },
			{ id: uuid(), link: '/settings/google', name: 'Google' },
			{ id: uuid(), link: '/settings/social', name: 'Social' },
			{ id: uuid(), link: '/settings/social-login', name: 'Social Login' },
			{ id: uuid(), link: '/settings/payment', name: 'Payment' },
			{ id: uuid(), link: '/settings/smtp-server', name: 'SMPT' }
		]
	}
];

export default DashboardMenu;
