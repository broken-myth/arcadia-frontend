import Router from "./routes";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import theme from "./utils/theme";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackUI } from "./components";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";
import { logErrorToServer } from "./utils/helpers";
import { queryClient } from "./utils/queries";

const appendCache = createEmotionCache({ key: "mantine", prepend: false });

const App = () => {
	return (
		<ErrorBoundary
			FallbackComponent={FallbackUI}
			onError={(error: Error) => {
				const state = store.getState();
				const user = state.user;
				if (user) {
					logErrorToServer({
						user: user,
						error: {
							error: error.stack,
						},
					});
				} else {
					console.error("error");
				}
			}}
		>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<QueryClientProvider client={queryClient}>
						<MantineProvider emotionCache={appendCache} theme={theme}>
							<NotificationsProvider>
								<Router />
							</NotificationsProvider>
						</MantineProvider>
					</QueryClientProvider>
				</PersistGate>
			</Provider>
		</ErrorBoundary>
	);
};

export default App;
