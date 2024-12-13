import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from '../store/userSlice.js';

let cart = createSlice({
	name: 'cart',
	initialState: [
		{ id: 0, name: 'White and Black', count: 2 },
		{ id: 2, name: 'Grey Yordan', count: 1 },
	],
	reducers: {
		countPlus(state, action) {
			let no = state.findIndex((a)=>a.id === action.payload)
            state[no].count++
		},
        addItem(state, action){
            let exist = state.find((a)=>a.id === action.payload.id)
            if(exist)
                exist.count += action.payload.count
            else
                state.push(action.payload)
        },
        delItem(state, action){
            return state.filter((a)=>a.id !== action.payload)
        }
	},
});

export let { countPlus, addItem, delItem } = cart.actions;

export default configureStore({
	reducer: {
		// 여기에 등록해야 사용 가능
		user: user.reducer,
		cart: cart.reducer,
	},
});
