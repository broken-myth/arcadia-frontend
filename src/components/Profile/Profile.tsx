import React from "react";
import { getUser } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import UserDetailsBox from "./UserDetailsBox";
import cardinalToOrdinal from "../../utils/cardinalToOrdinal";
import Trophy from "../Trophy/Trophy";

const Profile: React.FC = (): JSX.Element => {
	const user = getUser();
	const navigate = useNavigate();

	if (!user) {
		navigate("/login");
	}

	return (
		<div className="relative h-screen w-full border-box bg-[rgba(0,0,0,0.424)] flex flex-col p-10 ">
			<div className="w-full basis-[50%] flex flex-row border-b-0 border-solid border-white">
				<div className="basis-[30%] relative flex items-center pl-10 justify-start">
					<img
						src={`/assets/images/characters/avatars/${user.characterURL}`}
						className="rounded-[50%] border-solid border-white border-[8px]"
						alt="User PIC"
						width="275px"
						height="275px"
					/>
				</div>
				<div className="basis-[45%] max-2xl:p-10 pl-1 gap-4 max-2xl:gap-3 flex animate-fadeIn flex-col items-start justify-center">
					<span className="font-heading not-italic font-semibold text-white text-4xl leading-10">
						{user.username}{" "}
					</span>{" "}
					<span className=" font-heading not-italic font-normal text-white text-3xl leading-10 max-xl:leading-8 max-xl:text-2xl ">
						{user.xp}
						<span className="text-white font-normal">XP</span>{" "}
					</span>{" "}
					<span className="font-heading not-italic font-normal text-white text-3xl leading-10 max-xl:leading-8 max-xl:text-2xl">
						{user.numberOfMinicons} Minicons{" "}
					</span>{" "}
					<span className="font-heading not-italic font-normal text-white text-3xl leading-10 max-xl:leading-8 max-xl:text-2xl">
						Rank:{" "}
						<span className="text-white font-normal opacity-90">
							{cardinalToOrdinal(user.rank || 0)}{" "}
						</span>{" "}
					</span>
				</div>
				<div className="basis-[25%] pl-12 flex flex-row items-center justify-start">
					<Trophy position={user.trophies || 0}></Trophy>
				</div>
			</div>
			<div className="w-full basis-[50%] animate-fadeIn pl-12 flex flex-col items-left justify-start">
				<UserDetailsBox
					user={user}
					editable={true}
					field="Name"
					value={user.name || ""}
				/>
				<UserDetailsBox
					user={user}
					editable={true}
					field="College"
					value={user.college || ""}
				/>
				<UserDetailsBox
					user={user}
					editable={false}
					field="Email"
					value={user.email || ""}
				/>
				<UserDetailsBox
					user={user}
					editable={true}
					field="Contact"
					value={user.contact || ""}
				/>
			</div>
		</div>
	);
};

export default Profile;
