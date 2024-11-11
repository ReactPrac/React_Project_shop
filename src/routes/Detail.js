import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import { useEffect, useState } from "react"

let YellowBtn = styled.button`
	background : ${props => props.bg};
	color : ${props => props.bg == 'tomato' ? 'white' : 'black'};
	padding : 10px;
	margin : 2px
`

let Box = styled.div`
	background : white;
	padding : 20px;
	margin : 5px;
`

function Detail(props) {

	let [showAlert, setShowAlert] = useState(true)
	let [num, setNum] = useState('')
	let [tabNum, setTabNum] = useState(0)

	// 유저가 URL 파라미터에 입력한거 가져오려면 useParams()
	let { id } = useParams();
	let shoe = props.shoes.find((x) => x.id == id);
	let formattedPrice = shoe.price.toLocaleString();

	let [fade2, setFade2] = useState('');

	useEffect(()=>{
		setTimeout(()=>{setFade2('end')}, 100)

		return () => {
			setFade2('')
		}
	}, [])
		
	useEffect(()=>{
		setTimeout(()=>{ setShowAlert(false) }, 2000)
	}, [])

	useEffect(()=>{
		if (isNaN(num)==true){
			alert('숫자를 입력하세요.');
		}
	}, [num])

	return (
		<Container className={'start ' + fade2}>
			{
				showAlert == true ?
					<div className="alert alert-warning">
						2초 이내 구매시 할인
					</div> : null
			}
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
					<input onChange={ (e)=>{setNum(e.target.value)} }/> 
					<Box>
						<YellowBtn bg="lightgreen">장바구니</YellowBtn>
						<YellowBtn bg="tomato">주문하기</YellowBtn>
					</Box>
				</Col>
			</Row>

			<Nav variant="tabs" defaultActiveKey="link0">	{/** defaultActiveKey : 페이지 로드시 눌린 효과 줄 버튼 결정 */}
				<Nav.Item>
					<Nav.Link onClick={()=>{setTabNum(0)}} eventKey="link0">기본정보</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link onClick={()=>{setTabNum(1)}} eventKey="link1">상세정보</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link onClick={()=>{setTabNum(2)}} eventKey="link2">리뷰</Nav.Link>
				</Nav.Item>
			</Nav>
			<TabDetail tabNum={tabNum}/>
		</Container>
	);
}

function TabDetail({tabNum}){

	let [fade, setFade] = useState('')

	useEffect(()=>{
		setTimeout(()=>{setFade('end')}, 100)		// 0.1 초 후 실행
		// fade 라는  state 를 end 로 변경
		return ()=>{
			// useEffect 실행 전에 실행됨
			setFade('')
		}
	}, [tabNum])	// TabNum 변경될 때마다 안의 코드 실행

	// // 1. if문
	// if(props.tabNum === 0){
	// 	return <div>기본정보</div>
	// } else if(props.tabNum === 1){
	// 	return <div>상세정보</div>
	// } else if(props.tabNum === 2){
	// 	return <div>리뷰</div>
	// }
	
	// // 2. array
	// return [<div>기본정보</div>, <div>상세정보</div>, <div>리뷰</div>][props.tabNum]

	// 3. props 쉽게 사용하기 : 자식컴포넌트에서 props 파라미터대신 {state1이름, state2이름, ...}
	return (<div className={'start ' + fade}>		
		{[<div>기본정보</div>, <div>상세정보</div>, <div>리뷰</div>][tabNum]}
	</div>)		// {'start ' + fade} = {`start ${fade}`}
}

export default Detail;
