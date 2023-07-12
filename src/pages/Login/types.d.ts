/* eslint-disable no-unused-vars */
interface TokenResponseType {
	message: string;
	statusCode: number;
}

enum IntendedAction {
	Login,
	Signup,
}

enum AuthStatusEnum {
	PRE, // Wait for UI to trigger
	START,
	WAITING, // WAITING FOR AUTH RESPONSE
	ACCEPTED,
	REJECTED,
	AUTH, // sending dauth data to backend
	ERROR, // some error occurred, ask user to try again
}

export { TokenResponseType, IntendedAction, AuthStatusEnum };
