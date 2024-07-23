import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Navbar, Container, Nav } from 'react-bootstrap'; // 여기서도 import 해줘야 사용가능
import bg from './img/bg.png';
import data from './data.js';

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
						<Nav.Link href="#home">Home</Nav.Link>
						<Nav.Link href="#cart">Cart</Nav.Link>
					</Nav>
				</Container>
			</Navbar>

			<div
				className="main-bg"
				style={{ backgroundImage: 'url(' + bg + ')' }}
			></div>

			<Container>
				<Row>
					<List shoes={shoes[0]} i={1}></List>
					<List shoes={shoes[1]} i={2}></List>
					<List shoes={shoes[2]} i={3}></List>
					{/* <Col className='list'>
						<img
							src="https://codingapple1.github.io/shop/shoes1.jpg"
							width="80%"
						/>
						<h4>{shoes[0].title}</h4>
						<p>{shoes[0].price}원</p>
					</Col>
					<Col className='list'>
						<img
							src="https://codingapple1.github.io/shop/shoes2.jpg"
							width="80%"
						/>
						<h4>{shoes[1].title}</h4>
						<p>{shoes[1].price}</p>
					</Col>
					<Col className='list'>
						<img
							src="https://codingapple1.github.io/shop/shoes3.jpg"
							width="80%"
						/>
						<h4>{shoes[2].title}</h4>
						<p>{shoes[2].price}</p>
					</Col> */}
				</Row>
			</Container>
		</div>
	);
}

function List(props) {
	return (
		<Col className="list">
			<img
				src={
					'https://codingapple1.github.io/shop/shoes' +
					props.i +
					'.jpg'
				}
				width="80%"
			/>
			<h4>{props.shoes.title}</h4>
			<p>{props.shoes.price + '원'}</p>
		</Col>
	);
}

export default App;
