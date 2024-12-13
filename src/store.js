import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({   // useState 역할
    name : 'user',
    initialState : {name: 'kim', age: 20},
    // 'john kim' 으로 수정해주는 함수
    reducers : {
        changeName(state){      // (state) : 기존 state 뜻함
            // return 'john ' + state
            // return {name: 'park', age: 20}
            state.name = 'park'
        },
        // 함수2(){},   
        changeAge(state){
            state.age += 1
        }
    }
})

// user.actions : state 변경함수들 남음
export let {changeName, changeAge} = user.actions  // 오른쪽 자료를 변수로 빼는 문법

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        countPlus : (state, action) => {
            // action.payload 로 넘겨받은 id 에 해당하는 상품 착지
            const item = state.find(item => item.id === action.payload);

            // 해당 아이템이 존재하면 count 증가
            if (item) {
                item.count += 1;
            }
        }
    }
})

export let {countPlus} = cart.actions

export default configureStore({
    reducer: { 
        // 여기에 등록해야 사용 가능
        user : user.reducer,
        cart : cart.reducer
    }
}) 