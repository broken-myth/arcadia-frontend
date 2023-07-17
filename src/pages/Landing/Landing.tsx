/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from "react";
import { Box, Center, Image, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import {
	IconArrowNarrowUp,
	IconArrowNarrowDown,
	IconCircle,
} from "@tabler/icons-react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { FullPage, Slide } from "react-full-page";
import { Features, Learn, Bottom } from "../../components";
import { features } from "../../utils/content";

const visitedSet = new Set<number>();

const Landing = () => {
	const [scollDetails, setScollDetails] = useState({ from: 0, to: 0 });
	const [currentSlide, setCurrentSlide] = useState(0);
	const dotRef = React.useRef<HTMLDivElement>(null);
	const fullPageRef = React.useRef(null);
	const navigate = useNavigate();

	const beforeScroll = (detail: { from: number; to: number }) => {
		setScollDetails(detail);
		setCurrentSlide(detail.to);
		if (dotRef.current) {
			dotRef.current.style.transform = `translateY(${
				detail.to * 36 - 92
			}px)`;
			dotRef.current.style.transition = "transform 0.5s ease-in-out";
		}
	};

	const scrollUp = () => {
		if (currentSlide > 0) {
			setCurrentSlide(currentSlide - 1);
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		fullPageRef.current!.scrollToSlide(currentSlide - 1);
	};

	const scrollDown = () => {
		if (currentSlide < 6) {
			setCurrentSlide(currentSlide + 1);
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		fullPageRef.current!.scrollToSlide(currentSlide + 1);
	};

	const scrollTo = (slide: number) => {
		setCurrentSlide(slide);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		fullPageRef.current!.scrollToSlide(slide);
	};

	useEffect(() => {
		visitedSet.add(currentSlide);
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "e" || e.key === "E") {
				navigate("/login");
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<section className="h-full w-full bg-black">
			<FullPage ref={fullPageRef} afterChange={beforeScroll} duration={200}>
				<Slide>
					<section id="page1" className="h-full w-full sections">
						<Box className="h-full w-full flex flex-col items-center relative">
							<Box className="w-[80%] mt-5 arcadia absolute">
								<Image
									alt="Arcadia Logo"
									src="/assets/images/arcadia-logo-mid-res.webp"
								/>
							</Box>
							<Box className="w-[30%] absolute rivals top-[40%]">
								<Image
									alt="Rivals Logo"
									src="/assets/images/rivals.webp"
								/>
							</Box>
							<Group className="w-full absolute bottom-1/4 justify-center items-center">
								<Text className="font-heading text-new-white drop-shadow font-bold text-[32px] tracking-widest brightness-100 text">
									PRESS
								</Text>

								<span className="text">
									<Image
										alt="E Key"
										className="w-[50px] h-[50px]"
										src={"/assets/images/e-key.webp"}
									/>
								</span>

								<Text className="font-heading text-new-white drop-shadow font-bold text-[32px] tracking-widest brightness-100 text">
									TO ENTER
								</Text>
							</Group>
						</Box>
					</section>
				</Slide>

				<Slide>
					<Learn visitedSet={visitedSet} scrollDetails={scollDetails} />
				</Slide>

				<Slide>
					<Features
						visitedSet={visitedSet}
						scrollDetails={scollDetails}
						idx={2}
						title={features[0].title}
						color={features[0].color}
						imageURL={features[0].imageURL}
						isLeft={true}
						description={features[0].description}
						tagLine={features[0].tagLine}
					/>
				</Slide>

				<Slide>
					<Features
						visitedSet={visitedSet}
						scrollDetails={scollDetails}
						idx={3}
						title={features[1].title}
						color={features[1].color}
						imageURL={features[1].imageURL}
						isLeft={false}
						description={features[1].description}
						tagLine={features[1].tagLine}
					/>
				</Slide>

				<Slide>
					<Features
						visitedSet={visitedSet}
						scrollDetails={scollDetails}
						idx={4}
						title={features[2].title}
						color={features[2].color}
						imageURL={features[2].imageURL}
						isLeft={true}
						description={features[2].description}
						tagLine={features[2].tagLine}
					/>
				</Slide>

				<Slide>
					<Bottom visitedSet={visitedSet} scrollDetails={scollDetails} />
				</Slide>
			</FullPage>
			<Center className="animate-fadeIn z-50 flex-col fixed top-0 right-0 h-full w-[50px]">
				<Center
					onClick={() => scrollUp()}
					className={
						"h-[50px] w-[50px] flex hover:-translate-y-2 ease-in duration-150 items-center justify-center " +
						(currentSlide === 0 ? "invisible" : "cursor-pointer")
					}
				>
					<IconArrowNarrowUp stroke={1} color="#F5F5F5" size={40} />
				</Center>
				<Group className="items-center my-10">
					<Center ref={dotRef} className="w-full absolute bg-transparent">
						<Box className="w-[19px] h-[19px] bg-new-white rounded-full" />
					</Center>
					{[...Array(6)].map((_, idx) => (
						<Center
							onClick={() => scrollTo(idx)}
							className="w-full paginateDot transition-all cursor-pointer"
							key={idx}
						>
							<IconCircle
								stroke={1}
								size={20}
								className="text-new-white transition-all"
							/>
						</Center>
					))}
				</Group>
				<Center
					onClick={() => scrollDown()}
					className={
						"h-[50px] w-[50px] flex items-center hover:translate-y-2 ease-in duration-150 justify-center " +
						(currentSlide === 5 ? "invisible" : "cursor-pointer")
					}
				>
					<IconArrowNarrowDown stroke={1} color="#F5F5F5" size={40} />
				</Center>
			</Center>
		</section>
	);
};

export default Landing;
