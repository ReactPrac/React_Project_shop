import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function List(props) {
	let formattedPrice = props.shoes.price.toLocaleString();

	return (
		<Col className="list" md={4}>
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

export default List;
