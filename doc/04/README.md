# 리액트 라우터
- 페이지 이동이 쉬움(UI 스위치 조작 쉬움)
- 동적 UI 생성 가능
- 뒤로가기 버튼 이용가능

<br>

페이지 나누는 법(리액트 미사용)
---
```javascript
  1. html 파일 만들어서 상세페이지 내용 채움
  2. 누가 /detail로 접속하면 html 파일 보내줌
```

<br>

페이지 나누는 법(리액트 사용)
---
```javascript
  1. 컴포넌트 만들어서 상세페이지내용 채움(리액트는 html 파일을 하나만 사용)
  2. 누가 /detail로 접속하면 그 컴포넌트 보여줌
```

<br>

react-router-dom
---
- react-router-dom 라이브러리 사용시 쉽게 페이지 나누기 가능
- 설치 방법

> 터미널
```javascript
  npm install react-router-dom@6
```

<br>

- 셋팅

> index.js
```javascript
  import { BrowserRouter } from "react-router-dom";

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
```
>> import 후 <BrowserRouter> 이걸로 <App/> 이걸 감싸면 끝

<br>

useNavigate()
---
- 페이지 이동 (Link 사용도 가능)
  - 앞으로가기, 뒤로가기 개발 가능 => navigate() 괄호 안에 숫자 기재
    - -1 : 뒤로 1번 가기
    - 2 : 앞으로 2번 가기

> ex
```javascript
  function App(){
    let navigate = useNavigate()
    
    return (
      (생략)
      <button onClick={()=>{ navigate('/detail') }}>이동버튼</button>
    )
  }
```

<br>

Nested Routes
---
- 서브경로 설정
- 장점
  - route 작성이 간단해짐
  - nested route 접속시엔 element 2개 보임
    - nested routes의 element 보여주는 곳은 <Outlet>
- 사용 시점
  - 여러 유사한 페이지 필요할 때

> 이렇게 작성해 둔 코드를
```javascript
  <Route path="/about/member" element={ <div>멤버들</div> } />
  <Route path="/about/location" element={ <div>회사위치</div> } />
```

<br>

> 이렇게 작성할 수 있음
```javascript
  <Route path="/about" element={ <About/> } >  
    <Route path="member" element={ <div>멤버들</div> } />
    <Route path="location" element={ <div>회사위치</div> } />
  </Route>
```

<br>

