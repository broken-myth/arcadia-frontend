import { Center, Loader } from "@mantine/core";
import { useQuery } from "react-query";
import { Queries } from "../../../utils/constants";
import { dataFetch, getUser } from "../../../utils/helpers";
import { logout } from "../../../actions/user";
import { useDispatch } from "react-redux";

const AdminDashboard = (props: AdminDashboardType) => {
	const admin = getUser();
	const dispatch = useDispatch();

	const { isLoading, isError, isSuccess } = useQuery({
		queryKey: Queries.verifyAdminGET,
		queryFn: async () =>
			dataFetch({
				user: admin,
				url: "/api/admin/verify",
			}),
		onSuccess: async (res) => {
			if (res && res.status == 200) {
				props.setLoggedIn(true);
			} else {
				props.setLoggedIn(false);
				dispatch(logout());
			}
		},
	});

	return (
		<>
			{isLoading && (
				<Center className="h-full w-full">
					<Loader color="violet" />
				</Center>
			)}
			{isError && (
				<Center className="h-full w-full">
					<h1 className="text-4xl font-bold text-gray-800">
						Something went wrong
					</h1>
				</Center>
			)}
			{isSuccess && (
				<div className="text-white text-[36px] m-auto flex items-center justify-center h-[80vh]">
					Please select an entity from Navbar to view!
				</div>
			)}
		</>
	);
};

export default AdminDashboard;
