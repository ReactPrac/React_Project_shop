import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, changeAge } from '../store/userSlice';
import { countPlus, delItem } from './store';

function Cart() {
	// Redux store 가져오기 연습
	// let a = useSelector((state)=>{return state})
	// let a = useSelector((state)=>{return state.user})
	// let a = useSelector((state)=>{return state.stock})
	// let a = useSelector((state) => state.stock)
	// console.log(a)
	let state = useSelector((state) => state);
	console.log(state);

	let dispatch = useDispatch(); // store.js 로 요청보내주는 함수

	return (
		<div>
			{state.user.name} {state.user.age} 의 장바구니
			<button
				onClick={() => {
					dispatch(changeAge(5));
				}}
			>
				+
			</button>
			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th>상품명</th>
						<th>수량</th>
						<th>변경하기</th>
                        <th>삭제하기</th>
					</tr>
				</thead>
				<tbody>
					{state.cart.map((a, i) => (
						<tr key={i}>
							<td>{i + 1}</td>
							<td>{state.cart[i].name}</td>
							<td>{state.cart[i].count}</td>
							<td>
								<button
									onClick={() => {
										dispatch(changeName())
										dispatch(countPlus(a.id))
									}}
								>
									+
								</button>
							</td>
                            <td>
                                <button onClick={()=>{
                                    dispatch(delItem(a.id))
                                }}>-</button>
                            </td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default Cart;
