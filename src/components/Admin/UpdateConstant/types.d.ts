import { User } from "../../type";

interface ConstantsType {
	name: string;
	value: string;
}

interface EditConstantsBoxType {
	key: number;
	editable: boolean;
	field: string;
	value: string;
	constants: Constants[];
	setConstants: React.Dispatch<React.SetStateAction<Constants[]>>;
	idx: number;
	admin: User;
}
