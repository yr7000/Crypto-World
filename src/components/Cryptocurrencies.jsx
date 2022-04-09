import millify from "millify";
import { Card, Row, Col, Input } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useState, useEffect } from "react";
import Loader from "./Loader";
export default function Cryptocurrencies({ simplified }) {
	// if simplified we fetch only top 10
	const count = simplified ? 10 : 100;
	const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
	const [cryptos, setCryptos] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const filteredData = cryptosList?.data?.coins.filter((coin) =>
			coin.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setCryptos(filteredData);
	}, [cryptosList, searchTerm]);

	if (isFetching) return <Loader></Loader>;
	return (
		<>
			{!simplified && (
				<div className="search-crypto">
					<Input
						placeholder="Search Cryptocurrency"
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			)}
			<Row gutter={[32, 32]} className="crypto-card-container">
				{cryptos?.map((currency) => (
					<Col
						xs={24}
						sm={12}
						lg={6}
						className="crypto-card"
						key={currency.id}
					>
						<Link
							to={`/crypto/${currency.uuid}`}
							key={currency.uuid}
						>
							<Card
								title={`${currency.rank}. ${currency.name}`}
								extra={
									<img
										className="crypto-image"
										src={currency.iconUrl}
									></img>
								}
								hoverable
							>
								<p>Price: {millify(currency.price)}</p>
								<p>
									Market price: {millify(currency.marketCap)}
								</p>
								<p>Daily Change: {millify(currency.change)}</p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</>
	);
}
