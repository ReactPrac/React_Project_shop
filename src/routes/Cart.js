import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function Cart() {

    // Redux store 가져오기 연습
    // let a = useSelector((state)=>{return state})
    // let a = useSelector((state)=>{return state.user})
    // let a = useSelector((state)=>{return state.stock})
    // let a = useSelector((state) => state.stock)
    // console.log(a)
    let state = useSelector((state)=>state)
    console.log(state)

    return (
        <div>
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
                                <td>안녕</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table> 
        </div>
    );
}

export default Cart;