# 실시간 데이터가 중요하면 react-query

업데이트 사항
---
### 1. 설치
```javascript
npm install react-query@3
```
 
<br>

### 2. import 해서 사용 
```javascript
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'  
```
 
<br>

### 3. useQuery쓸 때 '작명' 말고 ['작명']
```javascript
useQuery(['작명'], 
```

<br>

- ajax 요청시 가끔 필요한 기능

    - 몇초마다 자동으로 데이터 다시 가져오게 하려면?

    - 요청실패시 몇초 간격으로 재시도?

    - 다음 페이지 미리가져오기?

    - ajax 성공/실패시 각각 다른 html을 보여주려면?

- 직접 개발 or react-query 라이브러리 사용

    - SNS, 코인거래소 등 실시간 데이터를 보여줘야하는 사이트들이 쓰면 유용

<br>

---

<Br>

react-query 설치 & 셋팅
---
- 터미널에서 npm install react-query

> index.js
```javascript
import { QueryClient, QueryClientProvider } from "react-query"  //1번
const queryClient = new QueryClient()   //2번

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>  //3번
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
); 
```
- 1번 2번 3번 작성

<br>

---

<br>

react-query로 ajax 요청하는 법
---
- react-query 써서 ajax 요청시 더 편리한 기능 제공

    - 그냥 ajax 요청도 OK

<br>

> 사용법
```javascript
function App(){
  let result = useQuery('작명', ()=>
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{ return a.data })
  )
}
```
- useQuery 라는걸 상단에서 import 해온 뒤 

- useQuery()로 ajax 요청을 감싸면 됨

그럼 유용한 기능을 제공해주는데 

 
<br>

---

<br>

react-query 장점
---
- server-state(DB 데이터)를 프론트엔드에서 실시간 동기화해주는걸 도와줌

- ajax 요청을 몇초마다 계속 날려서 가져오는 방식

    - http1을 쓰는 서버나 브라우저라면 좀 비효율적일 수 있음

- 실시간으로 서버에서 데이터를 자주 보내려면? 

    - 웹소켓이나 server-sent events 같은 가벼운 방식들도 존재

- react-query는 ajax 관련 기능개발 편하게 할 수 있는데에 의의가 더 있음 

- http2나 3을 지원하는 브라우저나 서버를 이용시

    - GET POST 요청 자주해도 서버 부담이 적을 수 있어서 상관X

<br>

### 장점1. ajax 요청 성공/실패/로딩중 상태를 쉽게 파악 가능

> ex
```javascript
function App(){
  let result = useQuery('작명', ()=>
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{ return a.data })
  )

  return (
    <div>
      { result.isLoading && '로딩중' }
      { result.error && '에러남' }
      { result.data && result.data.name }
    </div>
  )
}
```
- result라는 변수에 ajax 현재 상태 자동 저장

    - ajax요청이 로딩중일 땐 result.isLoading 이 true

    - ajax요청이 실패시엔 result.error 가 true 

    - ajax요청이 성공시엔 result.data 안에 데이터가 들어옴

- ajax 로딩중일 땐 \<A/> 보여달라거나 ajax 성공시엔 \<B/> 보여달라고 요청

    - 직접 개발하려면 state 부터 만들어야 함
    
    - 이 문법은 그럴 필요 X 

<br>

### 장점2. 자동으로 ajax 재요청함
- 자동으로 ajax 재요청하는 경우

    - 페이지 체류하고나서 일정시간 경과 

    - 다른 창으로 갔다가 다시 페이지로 돌아옴

    - 다시 메인페이지로 돌아감

- 재요청 끄는 법, 재요청간격 조절하는 법도 있음 

<br>

### 장점3. 실패시 자동으로 재시도
- 잠깐 인터넷이 끊겼거나 서버가 죽었으면

    - ajax 요청 실패

- 실패했을 때는 4~5번 자동으로 재시도해줌

<br>

### 장점4. ajax로 가져온 결과는 state 공유 필요 X
- App 컴포넌트에서 유저이름 가져오는 ajax 요청시

    - 유저이름 결과가 Detail 컴포넌트에도 필요하다면?

        - 유저이름을 props 전송

- 실은 props 전송 필요 X

    - Detail 컴포넌트에다가 유저이름 ajax 요청하는 코드 똑같이 또 작성

    - react-query는 ajax 요청이 2개나 있으면 1개만 날려줌

    - 캐싱기능 有 → 같은 ajax 요청을 한 적이 있으면 그걸 우선 가져와서 사용

<br>

---

<br>

RTK Query 라이브러리
---
- Redux Toolkit 설치한 경우 RTK Query 기본적으로 사용가능

- 비슷한 기능들을 제공하지만 셋팅하는 코드가 지저분함

- RTK Query는 다른 용도로도 많이 쓰임

    - ajax 요청후 Redux state 변경을 하고 싶다면...

    - Redux state변경함수 안에선 ajax요청하면 안되어서 컴포넌트 안에서 해야함

    - ajax 요청하는 코드가 다양하고 많으면 컴포넌트 안의 코드가 길어지고 관리도 힘듦

    - 위 상황을 Slice 안에서 관리가능하게 도와줌

        - ajax 요청하는 코드가 길다면 그걸 편리하게 관리할 수 있게 도와줌

<br>
 
