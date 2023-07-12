import { Center, Loader } from "@mantine/core";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { queries } from "../../utils/constants";
import { dataFetch, getUser } from "../../utils/helpers";
import MiniconAbilities from "./MiniconAbilities";
import StatsMinicon from "./StatsMinicon";
import { MiniconDetails } from "./types";

const Minicon = (): JSX.Element => {
	const { id } = useParams();
	const [MiniconDetails, setMiniconDetails] = useState<MiniconDetails | null>(
		null
	);
	const navigate = useNavigate();
	const user = getUser();
	if (!user) {
		navigate("/login");
	}
	const { isLoading, isError, isSuccess } = useQuery({
		queryKey: queries.getAllMiniconsGET,
		queryFn: async () => {
			return dataFetch({
				user: user,
				url: `/api/minicon/${id}`,
			});
		},
		onSuccess: async (res) => {
			if (res && res.status === 200) {
				const data = await res.json();
				setMiniconDetails(data.message);
			}
		},
	});

	return (
		<div className="h-full w-full">
			{isLoading && (
				<Center className="h-full w-full">
					<Loader color="violet" />
				</Center>
			)}
			{isError && (
				<Center className="h-full w-full">
					<h1 className="text-4xl font-bold text-gray-800">
						Something went wrong
					</h1>
				</Center>
			)}
			{isSuccess && (
				<div className="relative h-screen w-full basis-[80%] flex flex-row bg-[rgba(0,0,0,0.424)] items-center justify-center ">
					<div className=" relative bg-[rgba(0,0,0,0.4)] w-[68.5vw] h-[85%] flex flex-col items-center rounded-[32px] ">
						{/*Upper Potrion*/}
						<div className=" relative flex flex-row items-center justify-center basis-[48%]">
							<div className="flex flex-row items-center justify-between h-fit w-[55vw] ">
								{/* eslint-disable indent */}
								<img
									src={`/assets/images/minicons/profile/${MiniconDetails?.imgLink}`}
									className={` border-[10px] w-[300px] h-[300px]
                                    border-solid  border-new-black rounded-[50%] 
                                    drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]`}
									alt=""
								/>
								{/* eslint-enable indent */}
								<div className=" w-[35vw] h-full flex flex-col items-start justify-between">
									<div className="font-heading not-italic font-bold text-[48px] leading-[72px] text-white mb-6">
										{MiniconDetails?.name}
									</div>
									<div className=" font-body not-italic font-normal text-base leading-5 text-justify text-white">
										{MiniconDetails?.description}
									</div>
								</div>
							</div>
						</div>
						{/*Lower Portion */}
						<div
							className="relative w-full flex flex-row items-center 
					basis-[52%] border-solid border-t 
					border-[rgba(255,255,255,0.4)]"
						>
							<StatsMinicon
								fire={
									MiniconDetails?.attack ? MiniconDetails?.attack : 0
								}
								defense={
									MiniconDetails?.health ? MiniconDetails?.health : 0
								}
								water={
									MiniconDetails?.perk1Value
										? MiniconDetails?.perk1Value
										: 0
								}
							/>
							<MiniconAbilities />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Minicon;
