# 리액트에서 자주쓰는 if문 작성패턴 5개
- JSX 이용해서 html을 작성시 if문을 써서 조건부로 html을 보여주고 싶을 때

    - 삼항연산자 외 사용가능한 if문들

<br> 

## 1. 컴포넌트 안에서 쓰는 if/else

> jsx
```jsx
function Component() {
  if ( true ) {
    return <p>참이면 보여줄 HTML</p>;
  } else {
    return null;
  }
} 
```
- 자바스크립트 if문은 return () 안의 JSX 내에서는 사용 불가

    - \<div> if ( ) { } \</div> 사용 불가

- 컴포넌트에서 JSX를 조건부로 보여주고 싶을때

    - return + JSX 전체를 뱉는 if문을 작성해서 사용


<br> 

### else 생략 가능
> jsx
```jsx
function Component() {
  if ( true ) {
    return <p>참이면 보여줄 HTML</p>;
  } 
  return null;
} 
```
- else와 중괄호를 하나 없애도 위 코드와 똑같은 기능 수행

    - 자바스크립트 function 안에선 return 이라는 키워드를 만나면 return 밑에 있는 코드는 더이상 실행 X

        - else가 필요없는 경우 多

- if -> else if -> else 이렇게 구성된 조건문도 if 두개로 축약 가능

 
<br>

---

<br>

## 2. JSX안에서 쓰는 삼항연산자 
- ternary operator

    - 조건문 ? 조건문 참일때 실행할 코드 : 거짓일 때 실행할 코드


<br>

> jsx
```jsx
function Component() {
  return (
    <div>
      {
        1 === 1
        ? <p>참이면 보여줄 HTML</p>
        : null
      }
    </div>
  )
} 
```
- JSX 내에서 if/else 대신 쓸 수 있음

- 삼항연산자는 그냥 if와는 다르게 JSX 안에서도 실행가능

    - 조건을 간단히 주고 싶을 때 사용

- 중첩 사용 가능

> jsx
```jsx
function Component() {
  return (
    <div>
      {
        1 === 1
        ? <p>참이면 보여줄 HTML</p>
        : ( 2 === 2 
            ? <p>안녕</p> 
            : <p>반갑</p> 
          )
      }
    </div>
  )
} 
```
- else 문 안에 if/else 문을 하나 추가

    - 나중에 읽었을 때 + 남이 읽었을 때 보기싫은 코드는 좋지 않음

- return문 바깥에서 if else 쓴 후 그 결과를 변수로 저장해놓고 변수 넣는 방식 사용하기

<br>

---

<br>

 

## 3. && 연산자로 if 역할 대신하기
- 자바스크립트의 &&연산자

    - html 조건부로 보여줄 때

        - 만약 이 변수가 참이면 \<p>\</p>, 참이 아니면 null 

    - 위 내용을 더 쉽게 축약

> jsx
```jsx
function Component() {
  return (
    <div>
      {
        1 === 1
        ? <p>참이면 보여줄 HTML</p>
        : null
      }
    </div>
  )
} 

function Component() {
  return (
    <div>
      { 1 === 1 && <p>참이면 보여줄 HTML</p> }
    </div>
  )
}
```
- 위의 두 예제는 동일한 역할

- && 연산자로 조건식과 오른쪽 JSX 자료를 비교

    - 왼쪽 조건식이 true면 오른쪽 JSX가 그 자리에 남음

    - 왼쪽 조건식이 false면 false가 남음

        - false가 남으면 HTML로 렌더링 X

 
<br>

---

<br>


## 4. switch / case 조건문
- if문이 중첩해서 여러개 달려있는 경우 사용

> jsx
```jsx
function Component2(){
  var user = 'seller';
  if (user === 'seller'){
    return <h4>판매자 로그인</h4>
  } else if (user === 'customer'){
    return <h4>구매자 로그인</h4>
  } else {
    return <h4>그냥 로그인</h4>
  }
}
```
- if문을 연달아 여러개 써야되는 상황

    - 자바스크립트 switch 문법을 이용하면 괄호를 조금 더 줄일 수 있음

 
<br>

> jsx
```jsx
function Component2(){
  var user = 'seller';
  switch (user){
    case 'seller' :
      return <h4>판매자 로그인</h4>
    case 'customer' :
      return <h4>구매자 로그인</h4>
    default : 
      return <h4>그냥 로그인</h4>
  }
}
```
- switch 문법

    - switch (검사할변수){} 작성

    - case 일치검사할변수 : 작성

    - 일치하면 case : 밑에 있는 코드 실행

    - default : 는 맨 마지막에 쓰는 else문과 동일

- 장점 : if문 연달아쓸 때 코드가 약간 줄어들 수 있음

- 단점 : 조건식란에서 변수하나만 검사할 수 있음

<br>

---

<br>
 

## 5. object/array 자료형 응용 
- 경우에 따라서 다른 html 태그들을 보여주고 싶은 경우

    - if문 여러개 혹은 삼항연산자 여러개를 작성

    - object/array 자료형 응용 
 

<br>

 
> ex : 쇼핑몰에서 상품설명부분을 탭으로 만들 때
```
경우에 따라서 상품정보 / 배송정보 / 환불약관 내용을 보여줌
 
- 현재 state가 info면 <p>상품정보</p>

- 현재 state가 shipping이면 <p>배송정보</p>

- 현재 state가 refund면 <p>환불약관</p>
```

<br>

- 자바스크립트 object 자료형에 내가 보여주고 싶은 HTML을 다 담기

> jsx
```jsx
function Component() {
  var 현재상태 = 'info';
  return (
    <div>
      {
        { 
           info : <p>상품정보</p>,
           shipping : <p>배송관련</p>,
           refund : <p>환불약관</p>
        }[현재상태]
      }

    </div>
  )
} 
```
- JSX 상에서 html 태그들은 object에 담든, array에 담든 아무 상관 X

- object 자료형으로 HTML을 다 정리해서 담은 다음 
마지막에 object{} 뒤에 [] 대괄호

    - key값이 현재상태인 자료를 뽑겠다고 작성

- 현재상태라는 변수의 값에 따라서 원하는 HTML을 보여줄 수 있음

    - var 현재상태가 'info'면 info 항목에 저장된 \<p>태그

    - var 현재상태가 'refund'면 refund 항목에 저장된 \<p>태그 

 
<br>
 

 

- 변수에 저장해서 쓸 경우

> jsx
```jsx
var 탭UI = { 
  info : <p>상품정보</p>,
  shipping : <p>배송관련</p>,
  refund : <p>환불약관</p>
}

function Component() {
  var 현재상태 = 'info';
  return (
    <div>
      {
        탭UI[현재상태]
      }
    </div>
  )
} 
```
- 보기에는 깔끔하지만, 실은 안깔끔한 코드

- 리액트처럼 html css js를 마구 한데 비벼서 개발하면 어떻게 해도 코드가 깔끔해지지 않음

 
<br>
 

 