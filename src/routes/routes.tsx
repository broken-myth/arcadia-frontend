import React, { lazy } from "react";
import "./types.d";
import { Landing, Signup, Leaderboard, Login, NotFoundPage } from "../pages";
import { Route } from "react-router-dom";
import { Navbar } from "../components";

const Game = lazy(() => import("../pages/Game/Game"));
const Admin = lazy(() => import("../pages/Admin/Admin"));
const Dashboard = lazy(() => import("../components/Dashboard/Dashboard"));
const Profile = lazy(() => import("../components/Profile/Profile"));
const Minicons = lazy(() => import("../components/Minicons/Minicons"));
const Minicon = lazy(() => import("../components/Minicon/Minicon"));
const Characters = lazy(() => import("../components/Characters/Characters"));
const MatchHistory = lazy(
	() => import("../components/MatchHistory/MatchHistory")
);

const SuspenseFallback = () => {
	return <div>Loading...</div>;
};

const LazyRouteElement = (props: { element: JSX.Element }) => {
	return (
		<React.Suspense fallback={<SuspenseFallback />}>
			{props.element}
		</React.Suspense>
	);
};

export const routes: RouteType[] = [
	{
		path: "/",
		element: <Landing />,
		title: "Welcome",
		description: "Landing Page of Arcadia",
	},
	{
		path: "/login",
		element: <Login />,
		title: "Login",
		description: "Login Page of Arcadia",
	},
	{
		path: "/signup",
		element: <Signup />,
		title: "Signup",
		description: "Signup Page of Arcadia",
	},
	{
		path: "/leaderboard",
		element: <Leaderboard />,
		title: "Leaderboard",
		description: "Leaderboard page of Arcadia",
	},

	// Private Routes
	{
		path: "/game",
		element: <LazyRouteElement element={<Game />} />,
		children: (
			<>
				<Route path="/game" element={<Navbar />} />
				<Route element={<LazyRouteElement element={<Dashboard />} />}>
					<Route
						path="/game/profile"
						element={<LazyRouteElement element={<Profile />} />}
					/>
					<Route
						path="/game/minicons"
						element={<LazyRouteElement element={<Minicons />} />}
					/>
					<Route
						path="/game/minicon/:id"
						element={<LazyRouteElement element={<Minicon />} />}
					/>
					<Route
						path="/game/characters"
						element={<LazyRouteElement element={<Characters />} />}
					/>
					<Route
						path="/game/match-history"
						element={<LazyRouteElement element={<MatchHistory />} />}
					/>
					<Route path="/game/*" element={<NotFoundPage />} />
				</Route>
			</>
		),
		title: "Game Page",
		description: "Game page of Arcadia",
	},

	// Admin Route
	{
		path: "/admin",
		element: <LazyRouteElement element={<Admin />} />,
		title: "Admin Page",
		description: "Admin Login page of Arcadia",
	},
];
