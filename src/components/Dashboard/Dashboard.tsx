import { eventEmitter, Events } from "free-roam";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "..";

const Dashboard: React.FC = (): JSX.Element => {
	useEffect(() => {
		eventEmitter.emit(Events.OPEN_DASHBOARD);

		return () => {
			eventEmitter.emit(Events.CLOSE_DASHBOARD);
		};
	}, []);

	return (
		<div className="fixed top-0 left-0 w-screen h-screen ">
			<div className="w-screen h-screen bg-[rgba(0, 0, 0, 0.5)] backdrop-blur-[25px] flex flex-row">
				<SideBar />
				<Outlet />
			</div>
		</div>
	);
};

export default Dashboard;
