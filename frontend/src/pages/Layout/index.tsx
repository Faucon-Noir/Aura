import { Outlet } from "react-router-dom";
import { Header } from "../../components/header/Header";

const Layout = () => {
	return (
		<div style={{ minHeight: "100vh" }}>
			<Header />
			<Outlet />
		</div>
	);
};
export default Layout;
