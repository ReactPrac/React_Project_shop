import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeName, countPlus } from '../store'

function Cart() {

    // Redux store 가져오기 연습
    // let a = useSelector((state)=>{return state})
    // let a = useSelector((state)=>{return state.user})
    // let a = useSelector((state)=>{return state.stock})
    // let a = useSelector((state) => state.stock)
    // console.log(a)
    let state = useSelector((state)=>state)
    console.log(state)

    let dispatch = useDispatch()    // store.js 로 요청보내주는 함수

    return (
        <div>

            {state.user} 의 장바구니

            <Table>
                <thead>
                    <tr>    
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map((a, i) => 
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{state.cart[i].name}</td>
                                <td>{state.cart[i].count}</td>
                                <td>
                                    <button onClick={()=>{
                                        dispatch(countPlus(a.id))
                                    }}>+</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table> 
        </div>
    );
}

export default Cart;