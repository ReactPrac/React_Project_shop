import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Navbar, Container, Nav } from 'react-bootstrap'; // 여기서도 import 해줘야 사용가능
import bg from './img/bg.png';
import data from './data.js';
import {
	Routes,
	Route,
	Link,
	useNavigate,
	Outlet,
	useParams,
} from 'react-router-dom';

function App() {
	// 다른 파일에 있던 변수 가져오려면
	// 1. 변수를 export 하고
	// 2. import
	let [shoes] = useState(data);

	// 복잡한 자료에서 데이터 뽑을 땐 시작기호만 잘 보면 됨
	console.log(shoes); // [] : array
	console.log(shoes[0]); // {} : object
	console.log(shoes[0].title);

	return (
		<div className="App">
			<Navbar bg="dark" data-bs-theme="dark">
				<Container>
					<Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="/cart">Cart</Nav.Link>
					</Nav>
				</Container>
			</Navbar>

			<Routes>
				<Route
					path="/"
					element={
						<div>
							<div
								className="main-bg"
								style={{ backgroundImage: 'url(' + bg + ')' }}
							></div>

							<Container>
								<Row>
									{shoes.map(function (a, i) {
										return (
											<List shoes={shoes[i]} i={i}></List>
										);
									})}
								</Row>
							</Container>
						</div>
					}
				/>
				<Route path="/detail/:id" element={<Detail shoes={shoes} />} />
			</Routes>
		</div>
	);
}

function List(props) {
	let formattedPrice = props.shoes.price.toLocaleString();

	return (
		<Col className="list">
			<Link
				to={`/detail/${props.shoes.id}`}
				style={{ color: 'black', textDecorationLine: 'none' }}
			>
				<img
					src={
						'https://codingapple1.github.io/shop/shoes' +
						(props.i + 1) +
						'.jpg'
					}
					width="80%"
				/>
				<h4>{props.shoes.title}</h4>
				<p>{formattedPrice + '원'}</p>
			</Link>
		</Col>
	);
}

function Detail({ shoes }) {
	let { id } = useParams();
	let shoe = shoes.find((x) => x.id == id);
	let formattedPrice = shoe.price.toLocaleString();

	return (
		<Container>
			<Row>
				<Col>
					<img
						src={
							'https://codingapple1.github.io/shop/shoes' +
							(shoe.id + 1) +
							'.jpg'
						}
						width="100%"
					/>
				</Col>
				<Col>
					<h4 className="pt-5">{shoe.title}</h4>
					<p>{shoe.content}</p>
					<p>{formattedPrice}원</p>
					<button>주문하기</button>
				</Col>
			</Row>
		</Container>
	);
}

export default App;
