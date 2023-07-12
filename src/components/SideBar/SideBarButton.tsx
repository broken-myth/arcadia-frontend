/* eslint-disable indent */
import { NavLink, useLocation } from "react-router-dom";

const SideBarButton = (props: SideBarButtonProps): JSX.Element => {
	const location = useLocation();
	return (
		<NavLink className="relative w-full" to={`../game/${props.field}`}>
			<div
				className={`cursor-pointer flex flex-row items-center justify-start w-full h-[100px] box-border
                  ${
							location.pathname.endsWith(props.field)
								? "bg-[#F0F0F0] shadow-[0px_3px_5px_rgba(0,0,0,0.25)]"
								: "bg-transparent hover:bg-[rgba(240,240,240,0.5)]"
						} `}
			>
				<span
					className={`font-heading not-italic text-2xl leading-9 indent-7 
                        ${
									location.pathname.endsWith(props.field)
										? "font-medium text-new-black"
										: "text-white"
								}`}
				>
					{props.value}
				</span>
			</div>
		</NavLink>
	);
};

export default SideBarButton;
