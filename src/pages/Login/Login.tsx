import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeUserToken } from "../../actions/user";
import { BACKEND_URL, auth } from "../../../config";
import { getUser } from "../../utils/helpers";
import { AuthStatusEnum, IntendedAction } from "./types.d";
import { showNotification } from "../../utils/helpers";
import { Button } from "@mantine/core";

const generateOAuth2String = (): URL => {
	const oAuth2Url = new URL("https://accounts.google.com/o/oauth2/v2/auth");

	const state =
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15);

	const oAuth2QueryParams = {
		client_id: auth.CLIENT_ID,
		redirect_uri: auth.REDIRECT_URI,
		scope: auth.SCOPE,
		response_type: "code",
		access_type: "offline",
		prompt: "consent",
		state: state,
	};

	// eslint-disable-next-line @typescript-eslint/ban-types
	const appendQueryParametersToURL = (url: URL, queryParams: Object) => {
		Object.keys(queryParams).forEach((query) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			url.searchParams.append(query, queryParams[query]);
		});
	};

	appendQueryParametersToURL(oAuth2Url, oAuth2QueryParams);

	return oAuth2Url;
};

const Login = () => {
	const [intendedAction, setIntendedAction] = useState<IntendedAction | null>(
		null
	);
	const [windowObjectReference, setWindowObjectReference] =
		useState<Window | null>(null);
	const [previousUrl, setPreviousUrl] = useState<string | null>(null);

	const [authStatus, setAuthStatus] = useState<AuthStatusEnum>(
		AuthStatusEnum.PRE
	);
	const [code, setCode] = useState<string | null>(null);
	const dispatch = useDispatch();
	const user = getUser();
	const navigate = useNavigate();

	const sendAuthCodeToServer = useCallback(
		(code: string, intendedAction: IntendedAction) => {
			try {
				setAuthStatus(AuthStatusEnum.WAITING);
				fetch(BACKEND_URL + "/api/user/auth", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						code: code,
						authType:
							intendedAction == IntendedAction.Login
								? "LOGIN"
								: "SIGNUP",
					}),
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.status_code > 403) {
							showNotification("Error", data.message, "error");
							setAuthStatus(AuthStatusEnum.ERROR);
							return;
						}
						if (data.status_code == 403) {
							showNotification("Warning", "Fill Details", "warning");
							dispatch(
								storeUserToken({
									userToken: data.message,
								})
							);
							navigate("/signup");
							return;
						}
						if (intendedAction == IntendedAction.Login) {
							dispatch(
								storeUserToken({
									userToken: data.message,
								})
							);
						} else if (intendedAction == IntendedAction.Signup) {
							dispatch(
								storeUserToken({
									userToken: data.message,
								})
							);
						} else {
							setAuthStatus(AuthStatusEnum.ERROR);
						}
					});
			} catch (err) {
				console.error(err);
				setAuthStatus(AuthStatusEnum.ERROR);
			}
		},
		[intendedAction]
	);

	const BASE_URL = window.location.origin;

	const receiveMessage = useCallback(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		async (event: MessageEvent<any>) => {
			if (event.origin !== BASE_URL) {
				return;
			}
			const { data } = event;
			if (data.source === "auth-callback") {
				if (!data.code) {
					setAuthStatus(AuthStatusEnum.REJECTED);
				} else {
					setCode(data.code);
					setAuthStatus(AuthStatusEnum.ACCEPTED);
				}
			}
		},
		[BASE_URL, sendAuthCodeToServer]
	);

	const openWindow = useCallback(
		(url: string, name: string) => {
			if (user != null && user.userToken != undefined) {
				return;
			}
			window.removeEventListener("message", receiveMessage);

			const strWindowFeatures =
				"toolbar=no, menubar=no, width=600, height=700, top=100, left=100";

			if (windowObjectReference === null || windowObjectReference.closed) {
				setWindowObjectReference(window.open(url, name, strWindowFeatures));
			} else if (previousUrl !== url) {
				setWindowObjectReference(window.open(url, name, strWindowFeatures));
				windowObjectReference?.focus();
			} else {
				windowObjectReference.focus();
			}

			setAuthStatus(AuthStatusEnum.WAITING);

			window.addEventListener("message", receiveMessage, false);

			setPreviousUrl(url);
		},
		[previousUrl, receiveMessage, windowObjectReference]
	);

	const generateOAuth2StringAndOpenUrl = useCallback(() => {
		const authURL = generateOAuth2String();
		openWindow(authURL.toString(), "oAuthURL");
		setAuthStatus(AuthStatusEnum.START);
	}, [openWindow]);

	const startAuth = useCallback(
		(intendedAction: IntendedAction) => {
			setIntendedAction(intendedAction);
			generateOAuth2StringAndOpenUrl();
		},
		[generateOAuth2StringAndOpenUrl]
	);

	useEffect(() => {
		if (
			authStatus == AuthStatusEnum.ACCEPTED &&
			code != null &&
			intendedAction != null
		) {
			sendAuthCodeToServer(code, intendedAction);
		}
	}, [authStatus]);

	useEffect(() => {
		if (user != null && user.userToken != undefined) {
			if (intendedAction == IntendedAction.Signup) {
				navigate("/signup");
			} else if (intendedAction == IntendedAction.Login) {
				navigate("/game");
			}
		}
	}, [user]);

	return (
		<>
			<div>
				<div className="flex bg-login-bg bg-no-repeat bg-cover bg-center bg-fixed overflow-hidden">
					<div className="bg-blac flex flex-col items-center justify-center font-heading h-screen min-w-[55%] relative">
						<h1 className="font-heading font-extrabold text-white text-6xl mb-6">
							Get back in!
						</h1>
						<div>
							<Button
								onClick={() => startAuth(IntendedAction.Login)}
								size={"xl"}
							>
								Login
							</Button>
						</div>
						<img
							src="/assets/images/dots.webp"
							className="w-64 absolute bottom-[75%] right-0"
							alt=""
						/>
						<img
							src="/assets/images/pikachulogin.webp"
							className="w-64 absolute right-0 bottom-0"
							alt=""
						/>
						<img
							src="/assets/images/dots.webp"
							className="w-64 absolute bottom-0 left-0"
							alt=""
						/>
						<img
							src="/assets/images/circles.webp"
							className="w-64 absolute top-0 left-0"
							alt=""
						/>
					</div>
					<div
						className="bg-gradient-to-r from-blu-100
                     to-blu-200 flex flex-col items-center justify-center -z-10 h-screen relative"
					>
						<h1 className="font-heading font-extrabold text-white text-6xl mb-12">
							New here?
						</h1>
						<p className="font-body text-white w-2/3 text-center mb-10">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Obcaecati, nobis. Adipisci, molestias fugit atque
							reprehenderit rerum magni expedita, ratione mollitia
							perspiciatis aut libero ex similique laborum placeat!
							Exercitationem, accusamus dolores?
						</p>
					</div>
					<div className="z-10 absolute right-[17.5%] top-[63.5%]">
						<div>
							<Button
								onClick={() => startAuth(IntendedAction.Signup)}
								size={"xl"}
								variant="default"
							>
								Sign Up
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Login;
