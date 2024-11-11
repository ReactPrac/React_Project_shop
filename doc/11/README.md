# Redux

Redux 장점
---
- props 없이 state를 공유할 수 있게 도와주는 라이브러리

- js 파일 하나에 state들을 보관하고 모든 컴포넌트가 직접 꺼내 사용

  - props 전송 필요 X

<br>

Redux 설치
---
> 터미널
```javascript
  npm install @reduxjs/toolkit@1.8.1 react-redux 
```
- redux toolkit이라는 라이브러리 : redux의 개선버전

- 설치하기 전에 package.json 파일에서 "react", "react-dom" 항목 버전 확인

  - 18.1.x 이상 사용가능

<br>

Redux 셋팅
---
### 1. state 보관할 js 파일 생성
> store.js
```javacsript
  import { configureStore } from '@reduxjs/toolkit'
  
  export default configureStore({
    reducer: { }
  }) 
```
- 아무데나 store.js 파일을 만들어서 위 코드를 복붙

  - state들을 보관하는 파일

<br>

### 2. import 
> index.js
```javacsript
  import { Provider } from "react-redux";
  import store from './store.js'
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  ); 
```
- Provider 라는 컴포넌트와 아까 작성한 파일을 import 

- \<Provider store={import해온거}> 이걸로 <App/> 을 감싸기

  - \<App>과 그 모든 자식컴포넌트들은 store.js에 있던 state를 꺼내 사용 가능

<br>

---

<br>

store에 state 보관하고 쓰는 법
---
> store.js
```javascript
  import { configureStore, createSlice } from '@reduxjs/toolkit'
  
  let user = createSlice({
    name : 'user',    // state 이름 작명, state 하나를 slice 라고 부름
    initialState : 'kim'  // state 값
  })
  
  export default configureStore({
    reducer: {
      user : user.reducer
    }
  }) 
```
- createSlice( ) 로 state 생성

  - createSlice( ) 상단에서 import
 
  - \{ name : 'state이름', initialState : 'state값' } 작성하면 state 생성가능
 
    - createSlice( ) 는 useState( ) 와 용도가 비슷

- configureStore( ) 안에 등록

  - \{ 작명 : createSlice만든거.reducer }
 
  - 여기 등록한 state는 모든 컴포넌트가 자유롭게 사용가능

<br>

Redux store에 있던 state 가져다쓰는 법
---
> Cart.js
```javascript
  import { useSelector } from "react-redux"
  
  function Cart(){
    let a = useSelector((state) => { return state } )
    // let a = useSelector((state) => state.user )   // 이렇게도 사용가능
    console.log(a)
  
    return (생략)
  }
```
- 아무 컴포넌트에서 useSelector((state) => { return state } )

  - store에 있던 모든 state가 그 자리에 남음

<br>

---

<br>


