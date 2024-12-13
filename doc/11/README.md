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

store의 state 변경하는 법 
---
- state 수정해주는 함수부터 store.js에 만들어두고 컴포넌트에서 원할 때 실행하는 식으로 코드 작성

<br>

### 1. store.js 안에 state 수정해주는 함수 생성
> store.js
```javascript
  let user = createSlice({
    name : 'user',
    initialState : 'kim',
    reducers : {
      changeName(state){
        return 'john ' + state
      }
    }
  }) 
```
- slice 안에 reducers : { } 열고 거기 안에 함수 작성

  - 함수 작명 원하는대로
 
  - 파라미터 하나 작명하면 그건 기존 state가 됨
 
  - return 우측에 새로운 state 입력하면 그걸로 기존 state 변경

- changeName() 쓸 때 마다 'kim' -> 'john kim' 으로 변경

<br>

### 2. 다른 곳에서 쓰기좋게 export 
```javascript
  export let { changeName } = user.actions 
```
- store.js 밑에 추가

- slice이름.actions 라고 적으면 state 변경함수가 전부 그 자리에 출력됨

  - 그걸 변수에 저장했다가 export 하라는 의미

<br>

### 3. 원할 때 import 해서 사용 (단, dispatch() 로 감싸서 사용)
- 버튼 누르면 state를 'kim' -> 'john kim' 변경 하려면

> Cart.js
```javascript
  import { useDispatch, useSelector } from "react-redux"
  import { changeName } from "./../store.js"
  
  (생략) 
  
  <button onClick={()=>{
    dispatch(changeName())
  }}>버튼임</button> 
```
- store.js에서 원하는 state변경함수 가져오기

- useDispatch 도 라이브러리에서 가져오기

- dispatch( state변경함수() ) 이렇게 감싸서 실행하면 state 변경

<br>

|컴포넌트에서 state 직접 수정|state 수정함수를 store.js에 만들어두고 컴포넌트에서 불러오기|
|:-:|:-:|
|![image](https://github.com/user-attachments/assets/f794aaad-9cd5-43ee-a32a-2ef2ab0c2ed8)|![image](https://github.com/user-attachments/assets/8d8c2a84-f051-4c7c-836f-03dbd74b9e82)|
|컴포넌트 100개에서 직접 'kim' 이라는 state 변경하다가<br>갑자기 'kim'이 123이 되어버리는 버그가 발생하면<br>범인 찾으려고 컴포넌트 100개를 다 확인해야함|'kim'이 123이 되어버리는 버그가 발생했을 때 범인찾기가 수월<br>범인은 무조건 store.js에 존재|

<br>

---

<br>

state가 object/array일 경우 변경하는 법
---
### 01. redux state가 array/object인 경우 변경
- state 가 object 형인 경우 'kim' -> 'park' 변경
> 방법1
```javascript
  let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20},
    reducers : {
      changeName(state){
        return {name : 'park', age : 20}
      }
    }
  }) 
```

<br>

> 방법2 (state 직접 수정)
```javascript
  let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20},
    reducers : {
      changeName(state){
        state.name = 'park'
      }
    }
  }) 
```
- state를 직접 수정하는 문법을 사용해도 잘 변경되는 이유

  - Immer.js 라이브러리가 state 사본을 하나 더 생성해주기 때문

  - Redux 설치하면 자동 생성

- 수정이 편리하므로 state 만들 때 문자나 숫자 하나만 필요해도 redux 에선 일부러 object 아니면 array 에 담는 경우도 있음

<br>

### 02. state 변경함수가 여러개 필요하면
- state 변경함수에 파라미터문법 사용
```javascript
  let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20},
    reducers : {
      countPlus(state, action){
        state.age += action.payload
      }
    }
  }) 
```
- state 변경함수의 둘째 파라미터 작명(action 으로 자주 함)하면 파라미터 입력을 해서 함수 사용 가능

- 파라미터자리에 넣은 자료들은 action.payload 하면 나옴

  - action.type 하면 state 변경함수 이름이 나옴
  
  - action.payload 하면 파라미터가 나옴

<br>

### 03. 배열 메서드
|메소드|설명|반환 값|원본 배열 변경 여부|
|-|-|-|-|
|push()|열의 끝에 하나 이상의 요소를 추가|추가된 배열의 새로운 길이|변경|
|find()|배열에서 주어진 조건을 만족하는 첫 번째 요소를 반환|조건을 만족하는 첫 번째 요소 (없으면 undefined)|변경 안 함|
|findIndex()|배열에서 주어진 조건을 만족하는 첫 번째 요소의 인덱스를 반환|조건을 만족하는 요소의 인덱스 (없으면 -1)|변경 안 함|
|splice()|배열에서 요소를 추가하거나 삭제|삭제된 배열의 항목|변경|
|filter()|배열에서 조건을 만족하는 모든 요소를 새로운 배열로 반환|조건을 만족하는 새로운 배열 (빈 배열도 가능)|변경 안 함|
|map()|배열의 각 요소에 대해 주어진 함수를 호출한 결과로 새로운 배열을 반환|각 요소에 대해 호출된 함수의 결과 배열|변경 안 함|
|sort()|배열의 요소들을 정렬|정렬된 배열|변경|
|reverse()|배열의 순서를 반대로 바꿈|반대로 뒤집힌 배열|변경|

<br>

