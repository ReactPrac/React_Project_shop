import React, { useState, createContext, useEffect } from 'react';
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
import Cart from './routes/Cart.js'
import axios from 'axios'

export let Context1 = createContext()

function App() {

	// // localStorage===============================
	// let obj = {name : 'kim'}
	// // localStorage.setItem('data', obj)	// JSON 변환 전 value : [object Object] 로 자료 깨짐
	// // JSON.stringify() : array/object -> JSON 변환
	// localStorage.setItem('data', JSON.stringify(obj))	// JSON 변환 후 value : {"name":"kim"}
	// let result = localStorage.getItem('data')
	// // console.log(result.name);	// object 에서 데이터 뽑는 문법으로 JSON 에서 사용불가
	// // JSON.parse() : JSON -> array/object 변환
	// console.log(JSON.parse(result).name)
	// // localStorage===============================


	useEffect(()=>{
		localStorage.setItem('watched', JSON.stringify([]))
	}, [])

	// 다른 파일에 있던 변수 가져오려면
	// 1. 변수를 export 하고
	// 2. import
	let [shoes, setShoes] = useState(data);
	let [loadCount, setLoadCount] = useState(1);	// 몇 번 데이터를 불러왔는지 카운트
	let [isLoading, setIsLoading] = useState(false);	// 로딩 상태 관리
	let [stock] = useState(10, 11, 12);		// Detail, TabDetail 에서 사용하려면 props 2번 or Context API 사용

	// useNavigate() : 페이지 이동 도와줌
	let navigate = useNavigate();

	// 복잡한 자료에서 데이터 뽑을 땐 시작기호만 잘 보면 됨
	console.log(shoes); // [] : array
	console.log(shoes[0]); // {} : object
	console.log(shoes[0].title);

	const loadMoreData = ()=>{
		setIsLoading(true);		// 로딩 시작
		let url = '';
		
		if(loadCount === 1){
			url = 'https://codingapple1.github.io/shop/data2.json'
		} else if(loadCount === 2){
			url = 'https://codingapple1.github.io/shop/data3.json'
		} else {
			alert('더 이상 상품이 없습니다.')
			setIsLoading(false)	// 로딩 상태 해제
			return;
		}

		axios.get(url)
			.then((result)=>{
				let copy = [...shoes, ...result.data]
				setShoes(copy)
				setLoadCount(loadCount+1)
			})
			.catch(()=>{
				console.log('실패')
			})
			.finally(()=>{
				setIsLoading(false)	// 로딩 중
			})
	}

	return (
		<div className="App">
			<Navbar bg="dark" data-bs-theme="dark">
				<Container>
					<Navbar.Brand style={{cursor: 'default'}}>ShoeShop</Navbar.Brand>
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
					index
					element={
						<div>
							<div
								className="main-bg"
								style={{ backgroundImage: 'url(' + bg + ')' }}
							></div>

							<Container className="px-5">
								<Row className="mx-auto">
									{shoes.map(function (a, i) {
										return (
											<List shoes={shoes[i]} i={i}></List>
										);
									})}
								</Row>
								{isLoading && <p>로딩중입니다...</p>}	{/* 로딩 중일 때 메시지 표시 */}
								<button className="my-3" onClick={loadMoreData} disabled={isLoading}>더보기</button>
							</Container>
						</div>
					}
				/>

				<Route path='/cart' element={
					<Cart />
				}/>

				{/* 페이지 여러개 만들고 싶으면 :URL파라미터 사용 */}
				<Route path="/detail/:id" element={
					<Context1.Provider value={{stock, shoes}}>
						<Detail shoes={shoes} />
					</Context1.Provider>
				} />
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
