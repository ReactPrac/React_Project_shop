import {createSlice} from '@reduxjs/toolkit'

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
        changeAge(state, action){    // state 변경함수에 파라미터 뚫기
            state.age += action.payload
        }
    }
})

// user.actions : state 변경함수들 남음
export let {changeName, changeAge} = user.actions  // 오른쪽 자료를 변수로 빼는 문법

export default user