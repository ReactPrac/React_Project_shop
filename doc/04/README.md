# 리액트 라우터
페이지 나누는 법(리액트 미사용)
---
```
  1. html 파일 만들어서 상세페이지 내용 채움
  2. 누가 /detail로 접속하면 html 파일 보내줌
```

<br>

페이지 나누는 법(리액트 사용)
---
```
  1. 컴포넌트 만들어서 상세페이지내용 채움(리액트는 html 파일을 하나만 사용)
  2. 누가 /detail로 접속하면 그 컴포넌트 보여줌
```

<br>

react-router-dom
---
- react-router-dom 라이브러리 사용시 쉽게 페이지 나누기 가능
- 설치 방법

> 터미널
```
  npm install react-router-dom@6
```

<br>

- 셋팅

> index.js
```
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
