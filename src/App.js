import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Navbar, Container, Nav } from 'react-bootstrap'; // 여기서도 import 해줘야 사용가능
import bg from './img/bg.png';
import data from './data.js';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail.js';
import List from './routes/List.js';
import About from './routes/About.js';
import Event from './routes/Event.js';

function App() {
	// 다른 파일에 있던 변수 가져오려면
	// 1. 변수를 export 하고
	// 2. import
	let [shoes] = useState(data);

	// useNavigate() : 페이지 이동 도와줌
	let navigate = useNavigate();

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
						<Nav.Link
							onClick={() => {
								navigate('/');
							}}
						>
							Home
						</Nav.Link>
						<Nav.Link
							onClick={() => {
								navigate('/cart');
							}}
						>
							Cart
						</Nav.Link>
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
				{/* 페이지 여러개 만들고 싶으면 :URL파라미터 사용 */}
				<Route path="/detail/:id" element={<Detail shoes={shoes} />} />
				<Route path="/event" element={<Event />}>
					<Route
						path="one"
						element={<div>첫 주문시 양배추즙 서비스</div>}
					/>
					<Route path="two" element={<div>생일기념 쿠폰받기</div>} />
				</Route>
				{/* Nested Routes */}
				<Route path="/about" element={<About />}>
					<Route path="member" element={<div>멤버임</div>} />
					<Route path="location" element={<div>위치</div>} />
				</Route>
				<Route path="*" element={<div>없는 페이지</div>} />
			</Routes>
		</div>
	);
}

export default App;
