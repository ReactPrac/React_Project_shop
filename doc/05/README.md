# styled-components
styled-components 라이브러리
---
### 사용 이유
> 컴포넌트가 많은 경우 스타일링 불편함 발생
```javascript
  1. class 만들어놓은걸 까먹고 중복해서 또 만듦
  
  2. 갑자기 다른 이상한 컴포넌트에 원하지않는 스타일이 적용
  
  3. CSS 파일이 너무 길어져서 수정이 어려움
```

<br>

### 설치 방법
> 터미널
```javascript
  npm install styled-components
```

<br>

> Detail.js
```javascript
  import styled from 'styled-components'
```
- 사용하고 싶은 컴포넌트 맨 위에 import

<br>

### 기본 사용법
#### 컴포넌트를 만들 때 스타일을 미리 주입
```javascript
  import styled from 'styled-components';
  
  let Box = styled.div`
    padding : 20px;
    color : grey
  `;
  let YellowBtn = styled.button`
    background : yellow;
    color : black;
    padding : 10px;
  `;
  
  function Detail(){
    return (
      <div>
        <Box>
          <YellowBtn>버튼임</YellowBtn>
        </Box>
      </div>
    )
  }
```
- \<div>를 하나 만들고 싶으면 styled.div 사용

  - \<p> 만들려면 styled.p 이런 식임 

- 오른쪽에 `` backtick 기호를 이용해서 CSS 스타일 넣기

- 그 자리에 컴포넌트를 남겨주는데 변수에 저장해서 사용

<br>

### 장점
```javascript
  1. CSS 파일 오픈할 필요없이 JS 파일에서 바로 스타일넣을 수 있음
  
  2. 여기 적은 스타일이 다른 JS 파일로 오염되지 않음 
       - 원래 그냥 CSS파일은 오염됨
  
  3. 페이지 로딩시간 단축
       - html 페이지의 <style>태그에 넣어주기 때문
```

<br>

#### 💡 일반 CSS 파일도 오염방지 가능
> 오염
```javascript
  App.css 파일을 만들어서 App.js에서 import해서 쓴다고 해도 
  
  거기 적은 클래스명들은 Detail.js까지 사용가능
  
  프로젝트 사이즈가 작을 땐 편리하겠지만 사이즈가 커지면 관리하기 힘들어짐
```

> 오염 방지(모듈화)
```javascript
  CSS파일에서는 다른 JS 파일에 간섭하지 않는 '모듈화' 기능을 제공\
  
  '컴포넌트명.module.css' 로 CSS 파일 작명

  컴포넌트명.js 파일에서 import 해서 쓰면 그 스타일들은 컴포넌트명.js 파일에만 적용
```

<br>

### props로 재활용
```javascript
  import styled from 'styled-components';
  
  let YellowBtn = styled.button`
    background : ${ props => props.bg };
    color : ${ props => props.bg == 'blue' ? 'white' : 'black' };
    padding : 10px;
  `;
  
  function Detail(){
    return (
      <div>
          <YellowBtn bg="orange">오렌지색 버튼임</YellowBtn>
          <YellowBtn bg="blue">파란색 버튼임</YellowBtn>
      </div>
    )
  }
```

<br>

> 여러가지 비슷한 UI가 필요한 경우
```javascript
  ${ props => props.bg }
```
- bg부분에 자유롭게 작명

- 컴포넌트 쓸 때 bg라는 props를 입력가능

<br>

#### 💡 ${ }
```javascript
  자바스크립트 `` 백틱 따옴표 안에 적어도 문자를 만들 수 있는데
  
  백틱으로 만든 문자 중간에 변수같은걸 넣고 싶을 때 ${ 변수명 } 이렇게 쓸 수 있음
```

<br>

#### 💡 props 전송시 작명={ } 이렇게 전송안하고 따옴표써도 OK

<br>

### 단점
```javascript
  1. JS 파일 복잡해짐
      - 이 컴포넌트가 styled 인지 아니면 일반 컴포넌트인지 구분 어려움
  
  2. JS 파일 간 중복 디자인이 많이 필요하면 다른 파일에서 스타일 넣은 것들 import 해서 사용
      - 그럼 CSS파일 쓰는거랑 차이가 없음
  
  3. CSS 담당하는 디자이너가 있다면 협업시 불편
      - 협업자가 styled-components 문법을 모른다면 CSS를 styled-components로 바꾸는 작업 필요
      - 신기술 도입시 언제나 미래를 생각해봐야 함
```

<br>
