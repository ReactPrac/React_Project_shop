# Context API

html 페이지가 하나인 사이트(Single Page Application) 단점
---
- 컴포넌트간 state 공유 어려움

  - 부모컴포넌트 → 자식컴포넌트 props 전송은 가능
 
- App 에 있던 state 를 TabDetail 컴포넌트에서 사용하고 싶으면

  - App → Detail → TabDetail 이렇게 props 2번 전송

    - 번거로울 경우 Context API 문법 or Redux 등 외부 라이브러리 사용 가능

<br>

|-|
|-|
|![image](https://github.com/user-attachments/assets/1dcdc1fc-9375-43fd-86a5-4b0fded6ff9a)|


<br>

Context API 문법으로 props 없이 state 공유하기
---
- 재고라는 state를 App 컴포넌트에 생성

  - TabDetail 이라는 자식컴포넌트에서 쓰고싶다고 가정

- Context API 문법을 사용 : props 전송없이도 TabDetail 컴포넌트 사용 가능

<br>

### 1. createContext() 함수를 가져와서 context 하나 생성
- context = state 보관함
  
> App.js
```javascript
  export let Context1 = React.createContext();
  
  function App(){
    let [재고, 재고변경] = useState([10,11,12]);
  
    (생략)
  }
```

<br>

### 2. Context1로 원하는 곳을 감싸고 공유를 원하는 state를 value 안에 작성
- Context1로 감싼 모든 컴포넌트와 그 자식컴포넌트는 state를 props 전송없이 직접 사용가능

> App.js
```javascript
  export let 재고context = React.createContext();
  
  function App(){
    let [재고, 재고변경] = useState([10,11,12]);
  
    return (
      <Context1.Provider value={ {재고, shoes} }>
        <Detail shoes={shoes}/>
      </Context1.Provider>
      
    )
  }
```

<br>

Context 안에 있던 state 사용하려면
---
### 1. 만들어둔 Context를 import

<br>

### 2. useContext() 안에 넣기

> Details.js
```javascript
  import {useState, useEffect, useContext} from 'react';
  import {Context1} from './../App.js';
  
  function Detail(){
    let {재고} = useContext(Context1)
  
    return (
      <div>{재고}</div>
    )
  }
```
- Detail 컴포넌트에서 Context에 있던 state를 꺼내 쓰려면

  - Context1을 import
 
  - useContext() 안에 담기
 
    -  Context 해체해주는 함수
   
    -  그 자리에 공유했던 모든 state가 남아 변수에 담아 사용
   
- Detail 안에 있는 모든 자식컴포넌트도 useContext() 쓰면 자유롭게 재고 state를 사용가능

<br>

Context API 단점
---
### 1. state 변경시 쓸데없는 컴포넌트까지 전부 재렌더링됨

<br>

### 2. useContext() 를 쓰고 있는 컴포넌트는 다른 파일에서 재사용할 때 Context를 import 하는게 번거로워짐

<br>
