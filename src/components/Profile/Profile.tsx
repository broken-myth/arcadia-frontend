import React from "react";
import Trophy from "../Trophy/Trophy";
import UserDetailsBox from "./UserDetailsBox";
import { getUser } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import cardinalToOrdinal from "../../utils/cardinalToOrdinal";

const Profile: React.FC = (): JSX.Element => {
	const user = getUser();
	const navigate = useNavigate();

	if (!user) {
		navigate("/login");
	}

	return (
		<div className="relative h-screen w-full flex flex-col items-center bg-[rgba(0,0,0,0.424)]">
			{/* Top Container */}
			<div className="h-[45vh] w-full box-border pl-[10%] pr-[12%] flex flex-row items-center justify-between">
				<div className="flex flex-row justify-center h-[272px] w-fit gap-x-[85px]">
					<img
						src={`/assets/images/characters/avatars/${user.characterURL}`}
						className="box-content w-[255px] h-[255px] 
                        rounded-[50%] outline outline-[15px] outline-white"
						alt="User PIC"
					/>
					<div className="flex justify-center h-[270px] flex-col">
						<span className="font-heading not-italic font-semibold text-white text-4xl leading-[56px] mb-[10px]">
							{user.username}
						</span>
						<span className=" font-heading not-italic font-normal text-white text-[32px] leading-[47px] mb-[3px]">
							{user.xp}
							<span className="text-white font-bold">XP</span>
						</span>
						<span className="font-heading not-italic font-normal text-white text-[32px] leading-[47px] mb-[3px]">
							{user.numberOfMinicons} Minicons
						</span>
						<span className="font-heading not-italic font-normal text-white text-[32px] leading-[47px] mb-[3px]">
							Rank:{" "}
							<span className="text-white font-bold">
								{cardinalToOrdinal(user.rank || 0)}
							</span>
						</span>
					</div>
				</div>
				<Trophy position={user.trophies || 0} />
			</div>

			{/* Bottom Container */}
			<div className="flex flex-col justify-start w-full pl-[10%]">
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
