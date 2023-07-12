import Router from "./routes";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import theme from "./utils/theme";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackUI } from "./components";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
});

const appendCache = createEmotionCache({ key: "mantine", prepend: false });
const App = () => {
	return (
		<ErrorBoundary
			FallbackComponent={FallbackUI}
			onError={(error: Error) => {
				console.error(error);
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
