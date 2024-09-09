# 탭 UI 만들기
동적 UI 만들기
---
```javascript
  1. html, css 로 디자인 미리 완성

  2. UI의 현재 상태를 저장할 state 하나 생성

  3. state에 따라서 UI가 어떻게 보일지 작성
```

<br>

### 1. html, css 로 탭 디자인 미리 완성
> react-bootstrap 적용
```javascript
  <Nav variant="tabs"  defaultActiveKey="link0">
      <Nav.Item>
        <Nav.Link eventKey="link0">기본정보</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link1">상세정보</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link2">리뷰</Nav.Link>
      </Nav.Item>
  </Nav>
  <div>기본정보</div>
  <div>상세정보</div>
  <div>리뷰</div> 
```
- eventKey 속성 : 버튼마다 마음대로 작명

- defaultActiveKey : 페이지 로드시 어떤 버튼에 눌린 효과를 줄지 결정

<br>

### 2. UI의 현재 상태를 저장할 state 하나 만들기
```javascript
  function Detail(){
    let [tabNum, setTabNum[ = useState(0)
    ...
  }
```
- 상단에 state 생성

  - 탭 UI 상태는 0번 내용이 보이거나, 1번 내용이 보이거나, 2번 내용이 보이는 상태 중 하나
 
    - 0~2 숫자로 상태 표현
   
<br>

### 3. state에 따라서 UI가 어떻게 보일지 작성
```javascript
  function Detail(){
    let [tabNum, setTabNum[ = useState(0)
    ...

    return (
      <TabDetail />
    )
  }

  function TabDetail(){
    if (tabnum === 1){
      <div>기본정보</div>
    } else if (tabNum === 2){
      <div>상세정보</div>
    } else if (tabNum === 3){
      <div>리뷰</div>
    }
  }
```
- state 가 0이면 0번 내용 출력, 1이면 1번 내용 출력하도록 코드 작성

- tabNum 이라는 state는 Detail 안에는 있지만 TabDetail 안에는 없어서 에러 발생

  - 부모에 있던 state를 자식이 쓰고 싶으면 props로 보내기
 
  - return 추가하기

<br>

> 수정본
```javascript
  function Detail(){
    let [tabNum, setTabNum[ = useState(0)
    ...

    return (
      <TabDetail tabNum={tabNum}/>
    )
  }

  function TabDetail(props){
    if (props.tabnum === 1){
      return <div>기본정보</div>
    } else if (props.tabNum === 2){
      return <div>상세정보</div>
    } else if (props.tabNum === 3){
      return <div>리뷰</div>
    }
  }
```

<br>

### 4. 0번 버튼 누르면 0번 내용, 1번 버튼 누르면 1번 내용 노출되도록 코드 정리
```javascript
  <Nav variant="tabs"  defaultActiveKey="link0">
    <Nav.Item>
      <Nav.Link onClick={()=>{setTabNum(0)}} eventKey="link0">기본정보</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link onClick={()=>{setTabNum(1)}} eventKey="link1">상세정보</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link onClick={()=>{setTabNum(2)}} eventKey="link2">리뷰</Nav.Link>
    </Nav.Item>
  </Nav>
```

<br>

#### 💡 TabDetail 의 여러 작성 방법
> 1. 파라미터 props + if문
```javascript
  function TabDetail(props){
    if (props.tabnum === 1){
      return <div>기본정보</div>
    } else if (props.tabNum === 2){
      return <div>상세정보</div>
    } else if (props.tabNum === 3){
      return <div>리뷰</div>
    }
  }
```

<br>

> 2. 파라미터 props + array
```javascript
  function TabDetail(props){
    return [<div>기본정보</div>, <div>상세정보</div>, <div>리뷰</div>][props.tabNum]
  }
```
- props.tabNum 가 0이면 array 자료에서 0번 자료 꺼냄

<br>

> 3. {state1이름, state2이름, ...} + array
```javascript
  function TabDetail({tabNum}){
    return [<div>기본정보</div>, <div>상세정보</div>, <div>리뷰</div>][tabNum]
  }
```

<br>
