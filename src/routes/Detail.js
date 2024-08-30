import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'

let YellowBtn = styled.button`
	background : ${props => props.bg};
	color : ${props => props.bg == 'tomato' ? 'white' : 'black'};
	padding : 10px;
	margin : 2px
`

let Box = styled.div`
	background : black;
	padding : 20px;
`

function Detail(props) {
	// 유저가 URL 파라미터에 입력한거 가져오려면 useParams()
	let { id } = useParams();
	let shoe = props.shoes.find((x) => x.id == id);
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
					<Box>
						<YellowBtn bg="lightgreen">장바구니</YellowBtn>
						<YellowBtn bg="tomato">주문하기</YellowBtn>
					</Box>
				</Col>
			</Row>
		</Container>
	);
}

export default Detail;
