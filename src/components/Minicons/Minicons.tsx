import { Button, Center, Skeleton } from "@mantine/core";
import { useEffect, useState } from "react";
import {
	DragDropContext,
	Draggable,
	Droppable,
	DropResult,
} from "react-beautiful-dnd";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { StyledMinicon } from "..";
import cardinalToOrdinal from "../../utils/cardinalToOrdinal";
import { Mutations, Queries } from "../../utils/constants";
import { dataFetch, getUser, showNotification } from "../../utils/helpers";
import { invalidateQueries, useMinicons } from "../../utils/queries";
import { addToList, removeFromList } from "./helper";
import { LockedMinicon, MutationParams, UnlockedMinicon } from "./types";
const positionArr = [1, 2, 3, 4, 5];
const droppableKey = {
	Lineup: "lineup",
	All: "all",
};

const Minicons = () => {
	const navigate = useNavigate();
	const user = getUser();
	const [lineup, setLineUp] = useState<UnlockedMinicon[] | null>(null);
	const [unlocked, setUnlocked] = useState<UnlockedMinicon[] | null>(null);
	const [locked, setLocked] = useState<LockedMinicon[] | null>(null);
	const [buttonIsVisible, setButtonIsVisible] = useState(false);
	const [lineupExist, setLineupExist] = useState(true);

	if (!user) {
		navigate("/login");
	}

	const { isLoading, isError, isSuccess, data } = useMinicons(user);

	useEffect(() => {
		if (data) {
			data.lineup === null
				? (setLineUp([]), setButtonIsVisible(true), setLineupExist(false))
				: setLineUp([...data.lineup]);
			data.unlocked === null
				? setUnlocked([])
				: setUnlocked([...data.unlocked]);
			data.locked === null ? setLocked([]) : setLocked([...data.locked]);
		}
	}, [data]);

	const updateLineup = useMutation({
		mutationKey: Mutations.updateLineupPATCH,
		mutationFn: async ({ lineupIDArr }: MutationParams) => {
			return dataFetch({
				user: user,
				url: "/api/minicon/updateLineup",
				method: "PATCH",
				body: {
					lineupIDArr: lineupIDArr,
				},
			});
		},
		onSuccess: async (res) => {
			const data = await res.json();
			if (res.ok) {
				await invalidateQueries(Queries.getAllMiniconsGET);
				showNotification("Success", data, "success");
				setButtonIsVisible(false);
			} else {
				showNotification("Oops", data.message, "error");
			}
		},
	});

	const onDragEnd = (result: DropResult) => {
		if (lineup === null || unlocked === null || locked === null) {
			return;
		}
		const source = result.source.droppableId;
		const destination = result.destination?.droppableId;
		const sourceArr = source === droppableKey.Lineup ? lineup : unlocked;
		const destinationArr = source === droppableKey.Lineup ? unlocked : lineup;
		if (!result.destination) {
			return;
		}
		if (source === destination) {
			if (source === droppableKey.Lineup) {
				const newLineUp = [...lineup];
				const [removed] = newLineUp.splice(result.source.index, 1);
				newLineUp.splice(result.destination.index, 0, removed);
				setLineUp(newLineUp);
				setButtonIsVisible(true);
			} else {
				const newUnlocked = [...unlocked];
				const [removed] = newUnlocked.splice(result.source.index, 1);
				newUnlocked.splice(result.destination.index, 0, removed);
				setUnlocked(newUnlocked);
			}
			return;
		} else {
			if (
				source === droppableKey.Lineup &&
				destination === droppableKey.All
			) {
				const [draggedElement, finalSourceArr] = removeFromList(
					sourceArr,
					result.source.index
				);
				const finalDestinationArr = addToList(
					destinationArr,
					result.destination.index,
					draggedElement
				);
				setLineUp(finalSourceArr);
				setUnlocked(finalDestinationArr);
				setButtonIsVisible(true);
			} else if (
				source === droppableKey.All &&
				destination === droppableKey.Lineup
			) {
				const [draggedElement, newSourceArr] = removeFromList(
					sourceArr,
					result.source.index
				);
				const newDestinationArr = addToList(
					destinationArr,
					result.destination.index,
					draggedElement
				);
				setLineUp(newDestinationArr);
				setUnlocked(newSourceArr);
				setButtonIsVisible(true);
				if (newDestinationArr.length !== 6) {
					return;
				}
				const [removedElemntFromDestination, finalDestinationArr] =
					removeFromList(newDestinationArr, newDestinationArr.length - 1);
				const finalSourceArr = addToList(
					newSourceArr,
					result.source.index,
					removedElemntFromDestination
				);
				setLineUp(finalDestinationArr);
				setUnlocked(finalSourceArr);
			}
		}
	};

	const lineUpItems =
		lineup &&
		lineup.map((minicon, index) => {
			return (
				<Draggable
					index={index}
					draggableId={`${minicon.miniconID}`}
					key={minicon.miniconID}
				>
					{(provided, snapshot) => (
						<Link
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							to={`../minicon/${minicon.miniconID}`}
							className="h-fit"
						>
							<StyledMinicon
								locked={false}
								name={minicon.name}
								type={minicon.type}
								miniconImageUrl={minicon.imageLink}
								xp={minicon.xp}
								isDragging={snapshot.isDragging}
							/>
						</Link>
					)}
				</Draggable>
			);
		});

	const unlockedItems =
		unlocked &&
		unlocked.map((minicon, index) => {
			return (
				<Draggable
					index={index}
					draggableId={`${minicon.miniconID}`}
					key={minicon.miniconID}
				>
					{(provided, snapshot) => (
						<Link
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							to={`../minicon/${minicon.miniconID}`}
						>
							<StyledMinicon
								name={minicon.name}
								type={minicon.type}
								miniconImageUrl={minicon.imageLink}
								locked={false}
								xp={minicon.xp}
								isDragging={snapshot.isDragging}
							/>
						</Link>
					)}
				</Draggable>
			);
		});

	const lockedItems =
		locked &&
		locked.map((minicon) => {
			return (
				<StyledMinicon
					key={minicon.miniconID}
					locked={true}
					name={minicon.name}
				/>
			);
		});

	return (
		<main className="h-full w-full">
			{isError && (
				<Center className="h-full w-full">
					<h1 className="text-4xl font-bold text-gray-800">
						Something went wrong
					</h1>
				</Center>
			)}

			<DragDropContext onDragEnd={onDragEnd}>
				<div className="relative h-screen basis-[80%] flex flex-col items-center justify-between bg-[rgba(0,0,0,0.424)] overflow-y-auto scrollBar">
					<div className="box-border pl-[5%] w-[100%] pt-[1%] pr-[5%] flex flex-col items-start justify-between basis-[41%] bg-transparent">
						<span className="font-heading not-italic font-bold text-white text-[36px] leading-[54px]">
							LINEUP
						</span>
						<Droppable
							direction="horizontal"
							key="lineup"
							droppableId="lineup"
						>
							{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className={`bg-[rgba(0,0,0,0.4)] relative pt-[2%] pb-[1%] ${
										lineupExist ? "pt-[2%]" : "pt-0"
									} w-full h-[20vw] pb-5 mt-[32px] rounded-[30px] grid grid-cols-5 overflow-hidden `}
								>
									<>
										{isLoading && (
											<>
												{[...Array(5)].map((_, index) => (
													<Center
														key={"skeleton-minicons-" + index}
														className="w-full h-full"
													>
														<Skeleton
															height={200}
															mb="xl"
															circle
														/>
													</Center>
												))}
											</>
										)}
										{isSuccess && !isLoading && lineUpItems}
										{provided.placeholder}
										{isSuccess && !isLoading && !lineup?.length && (
											<div className="bg-transparent absolute top-0 max-xl:text-base left-0 tracking-wider font-heading text-[32px] w-full h-[300px] mt-0 rounded-[30px] flex flex-col items-center justify-center text-white ">
												Please set your lineup
											</div>
										)}
									</>
								</div>
							)}
						</Droppable>

						<div className=" bg-transparent mt-[-60px] relative w-full h-[50px] flex flex-row items-center justify-around ">
							{positionArr.map((item, index) => {
								return (
									<div
										key={index}
										className="text-white text-[26px] max-xl:text-lg w-full flex items-center justify-center"
									>
										<span className=" font-heading">
											{cardinalToOrdinal(item)}
										</span>
									</div>
								);
							})}
						</div>
					</div>
					<div className=" box-border relative flex w-[100%] pl-[5%] pt-[1%] pr-[5%] pb-[2%] flex-col items-start justify-between basis-[60%]">
						<div className="my-[2%] relative w-[100%] flex flex-row items-center justify-center">
							{buttonIsVisible && (
								<Button
									loading={updateLineup.isLoading}
									onClick={() => {
										let lineupIDArr: number[] = [];
										lineup?.map((minicon) => {
											lineupIDArr = [
												...lineupIDArr,
												minicon.ownedMiniconID,
											];
										});
										updateLineup.mutate({ lineupIDArr });
									}}
									variant="default"
									size="lg"
								>
									SET LINEUP
								</Button>
							)}
						</div>
						{unlocked !== null && unlocked.length !== 0 && (
							<Droppable
								direction="horizontal"
								key="all"
								droppableId="all"
							>
								{(provided) => (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										className="bg-[rgba(0,0,0,0.4)] max-2xl:min-h-[15vw]  w-full pt-[3%] pb-[5%] gap-y-[7.8vh] mt-[10px] rounded-[30px] box-content grid grid-flow-row grid-cols-5 overflow-hidden"
									>
										{isLoading && (
											<>
												{[...Array(5)].map((_, index) => (
													<Center
														key={
															"skeleton-unlocked-minicons-" +
															index
														}
														className="w-full h-full"
													>
														<Skeleton
															height={200}
															mb="xl"
															circle
														/>
													</Center>
												))}
											</>
										)}
										{isSuccess && !isLoading && unlockedItems}

										{provided.placeholder}
									</div>
								)}
							</Droppable>
						)}
						<div className="bg-[rgba(0,0,0,0.4)] w-full pt-[3%] pb-[5%] gap-y-[85px] mt-[32px] rounded-[30px] box-content grid grid-flow-row grid-cols-5 overflow-hidden">
							{isLoading && (
								<>
									{[...Array(5)].map((_, index) => (
										<Center
											key={"skeleton-locked-minicons-" + index}
											className="w-full h-full"
										>
											<Skeleton height={200} mb="xl" circle />
										</Center>
									))}
								</>
							)}
							{isSuccess && !isLoading && lockedItems}
						</div>
					</div>
				</div>
			</DragDropContext>
		</main>
	);
};

export default Minicons;
