# 서버와 통신하기(AJAX)
서버
---
- 유저가 데이터를 달라고 요청하면 데이터를 보내주는 프로그램

  - 네이버웹툰 서버 : 유저가 웹툰 달라고 하면 웹툰 보내주는 프로그램
 
  - 유튜브 서버 : 유저가 영상 달라고 하면 영상 보내주는 프로그램

<br>

서버 개발
---
|-|
|-|
|![image](https://github.com/user-attachments/assets/58d07a99-9a65-4bd4-a6ad-aae80d8d2a75)|

- "누가 A를 요청하면 A를 보내주세요" 라고 코드를 작성하는 것

- 서버에 데이터를 요청할 때는 정확한 규격에 맞춰서 요청

  - 어떤 데이터인지 (URL 형식으로)
 
    - 어떤 데이터를 보고싶은지 URL만 잘 기재해야 함
 
    - URL이 기재된 html 페이지를 찾아보기
   
  - 어떤 방법으로 요청할지 (GET or POST)
 
    - GET : 데이터를 가져올 때
   
    - POST : 데이터를 서버로 보낼 때

<br>

GET / POST 요청하는 방법
---
- GET 요청

  - 브라우저 주소창에 URL 기재시 그 곳으로 GET 요청

- POST 요청

  - <form action="요청할 url" method="post"> 태그 이용

    - 폼이 전송되었을 때 POST 요청

- 위 방법으로 GET, POST 요청시 **브라우저가 새로고침된다**는 단점 존재

<br>

AJAX
---
- 서버에 GET, POST 요청시 *새로고침 없이* 데이터를 주고받을 수 있게 도와주는 간단한 브라우저 기능

  - 새로고침 없이 쇼핑몰 상품 더 가져올수도, 댓글을 서버로 전송할수도 있음
 
<br>

AJAX로 GET/POST 요청
---
- XMLHttpRequest 라는 옛날 문법 사용

- fetch() 라는 최신 문법 사용

- axios 같은 외부 라이브러리 사용


<br>

> axios 설치(터미널)
```
  npm install axios
```

<br>

AJAX 요청하는 방법
---
```
  import axios from 'axios'
  
  function App(){
    return (
      <button onClick={()=>{
        axios.get('https://silverywaves.github.io/shop/data2.json').then((결과)=>{
          console.log(결과.data)
        })
        .catch(()=>{
          console.log('실패함')
        })
      }}>버튼</button>
    )
  }
```
- axios 사용을 위해 상단에 import

- axios.get(URL) 작성시 그 URL로 GET 요청

- 데이터 가져온 결과는 결과.data 안에 들어있음

  - 위 버튼 누르면 서버에서 가져온 데이터가 콘솔창에 출력
 
- 인터넷이 안되거나 URL이 이상하면 실패

  - 실패했을 때 실행할 코드는 .catch() 안에 작성

<br>
