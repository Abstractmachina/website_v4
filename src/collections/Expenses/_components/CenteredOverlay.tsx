import Centered from "@/components/ui/Centered";
import React, { PropsWithChildren } from "react";

type Props = {};

const CenteredOverlay = ({ children }: Props & PropsWithChildren) => {
	return (
		<div className="fixed top-0 bottom-0 left-0 right-0 bg-transparent pointer-events-none">
			<Centered className="relative h-full ">{children}</Centered>
		</div>
	);
};

export default CenteredOverlay;
