import {
	GET_PROFILE_SUCCESS,
	LOGOUT,
	STORE_TOKEN,
	UPDATE_PROFILE_SUCCESS,
} from "../actions/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function postReducer(state: any = null, action: any) {
	switch (action.type) {
		case GET_PROFILE_SUCCESS:
			return { ...state, ...action.payload };
		case STORE_TOKEN:
			return { ...state, userToken: action.payload.userToken };
		case UPDATE_PROFILE_SUCCESS:
			if (action.payload.intendedUpdate === "name") {
				return { ...state, name: action.payload.newValue };
			} else if (action.payload.intendedUpdate === "college") {
				return { ...state, college: action.payload.newValue };
			} else if (action.payload.intendedUpdate === "character") {
				return {
					...state,
					characterURL: action.payload.newValue,
				};
			} else if (action.payload.intendedUpdate === "contact") {
				return { ...state, contact: action.payload.newValue };
			}
			break;
		case LOGOUT:
			return null;
		default:
			return state;
	}
}
