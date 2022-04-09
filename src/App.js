import { Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

// importing various components
import {
	Navbar,
	CryptoDetails,
	Cryptocurrencies,
	Homepage,
	News,
} from "./components";
import "./App.css";

export default function App() {
	return (
		<div className="app">
			<div className="navbar">
				<Navbar />
			</div>
			<div className="main">
				<Layout>
					<div className="routes">
						<Switch>
							<Route exact path="/">
								<Homepage></Homepage>
							</Route>
							<Route exact path="/cryptocurrencies">
								<Cryptocurrencies></Cryptocurrencies>
							</Route>
							<Route exact path="/crypto/:coinId">
								<CryptoDetails></CryptoDetails>
							</Route>
							<Route exact path="/news/">
								<News></News>
							</Route>
						</Switch>
					</div>
				</Layout>
				<div className="footer">
					<Typography.Title
						level={5}
						style={{ color: "white", textAlign: "center" }}
					>
						CryptoWorld <br />
						All rights reserved
					</Typography.Title>
					<Space>
						<Link to="/">Home</Link>
						<Link to="/exchanges">Exchanges</Link>
						<Link to="/news">News</Link>
					</Space>
				</div>
			</div>
		</div>
	);
}
