const Trophy = (props: { position: number }): JSX.Element => {
	return (
		<div className="relative">
			<img
				src="/assets/images/Trophy.webp"
				className={"w-full h-full object-cover"}
			></img>
			<span
				className={`absolute top-0 bottom-0 left-0 right-0 h-fit m-auto font-heading 
                not-italic font-bold text-[100px] leading-[150px] text-center tracking-[-0.115em] text-white
                drop-shadow-[0px_6.25771px_6.25771px_rgba(0,0,0,0.25)]`}
			>{`${props.position}`}</span>
		</div>
	);
};

export default Trophy;
