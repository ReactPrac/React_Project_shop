# state 변경함수 사용할 때 주의점 : async

자바스크립트의 sync / async 관련 상식
---
- 자바스크립트는 일반적인 코드를 작성하면 synchronous 하게 처리됨

    - 동기 방식

    - 코드 적은 순서대로 윗줄부터 차례로 코드 실행

- 거의 모든 프로그래밍 언어들은 위에서 부터 한줄한줄 실행됨 

<br>  

> es
```javascript
console.log(1+1)
console.log(1+2)
console.log(1+3)
```
- 위에서부터 한줄한줄 잘 실행됨

    - 콘솔창에 `2, 3, 4` 순으로 출력
 
<br>

- 자바스크립트는 특정 함수들을 사용하면 asynchronous 하게 코드실행이 가능

    - 비동기적 방식

    - ajax, 이벤트리스너, setTimeout 이런 함수들 등

        - 위 함수들은 처리시간이 오래걸림
        
        - ajax : 인터넷 상황이 안좋으면 코드 실행이 오래걸림

            - ajax 요청하는 코드들은 순차적 실행 X, 완료되면 실행됨

<br>

> ex
```javascript
console.log(1+1)
axios로 get요청하고나서 console.log(1+2) 실행
console.log(1+3)
```
- `2, 4` 출력되고 그 다음에 `3` 출력

- 3을 출력하는 코드는 asynchronous 처리를 지원하는 코드 

- 3을 출력할 때 오래걸리면 완료될 때 까지 잠깐 보류했다가 다른 코드를 먼저 실행시킴

    - ajax요청이 0.00초 걸려도 2, 4가 먼저, 그 다음 3 출력

- 자바스크립트 특징이자 장점
 
- asynchronous 처리를 지원하는 함수들을 써야 이런 식으로 동작
 
<br>

---

<br>

리액트의 setState 함수 특징
---
> 리액트로 state 만들기
```javascript
function App(){
  let [name, setName] = useState('kim')
}
```
- setName 사용하면 name이라는 state를 자유롭게 변경 가능

    - setName('park') 이런 식으로 하면 변경됨

- setName() 등 state 변경함수들은 asynchronous (비동기적)으로 처리

    - setName()이 오래걸리면 보류 후 다른 코드들부터 실행

    - 예상치 못한 문제 발생 가능성有

<br>

---

<br>

버튼을 누르면 2개 기능을 순차적으로 실행시키기
---
> 기본 코드
```js
function App(){
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);

  return (
    <div>
      <div>안녕하십니까 전 {age}</div>
      <button>누르면한살먹기</button>
    </div>
  )
}
```
- 버튼을 누를 때마다

    - (1) count라는 state +1  (버튼누른 횟수 기록용)

    - (2) age라는 state도 +1 

    - (3) count >= 3 이면 더 이상 age라는 state를 1 더하지 않음

        - 버튼 3번 이상 누르면 (count가 3 이상이면) 나이를 그만더하는 기능
        
        - 22살에서 멈춰야함


<br>

```js
<button onClick={()=>{

  setCount(count+1);
  if ( count < 3 ) {
    setAge(age+1);
  }
         
}}>누르면한살먹기</button> 
```
- 버튼을 누르면 count를 +1 (버튼누른 횟수 기록용)

- count가 3회보다 작으면 age를 +1 

    - 의도는 22살에 멈추는 것이지만, 코드 실행시 23까지 증가

    - count가 3일 때도 age +1를 해주고 있음 

        - async 특징 때문

- state 변경함수는 async 하게 처리되는 함수

    - 완료되기까지 시간이 오래걸리면 제쳐두고 다음 코드 실행

- 코드 해석

    - 버튼을 세번째 누르면 setCount(count+1);  실행 
    
        - count = 3

    - count를 3으로 만드는건 오래걸리니까 보류, if ( count > 3 ) {} 실행

    - 이 때 count = 2
    
        - if문 안의 setAge(age+1)이 잘 동작

 

- 이 모든 문제는 setCount()가 async 함수라서 발생 

    - state1 변경하고나서 state2를 변경하는 코드를 작성할 때 가끔 문제 발생

- 순차적으로 실행하고 싶을 때 해결책 : useEffect

    - 특정 state가 변경될 때 useEffect 실행 가능

<br>
 
? App 컴포넌트안에 useEffect 생성
```js
useEffect(()=>{
    
 }, [count]) 
``` 
- useEffect : 컴포넌트가 렌더링/재렌더링될 때 실행되는 함수

- 뒤에다가 [] 대괄호안에 state를 집어넣으면?

    - `state가 변경되면 이 코드 실행해달라`는 뜻으로 사용가능

    - 순차적으로 코드 실행 가능

        - count라는 state가 변경되고나서 age도 변경

<br>

> 버튼 변경
```js
<button onClick={()=>{

  setCount(count+1);

}}>누르면한살먹기</button> 
```
- count +1 
 
<br>

> age를 +1 하는 코드는 useEffect안에 개발
```js
useEffect(()=>{
  if ( count < 3 ) {
    setAge(age+1)
  }
 }, [count]) 
 ```
- useEffect는 count라는 state가 변경되고나서 실행됨

    - if문으로 count state값을 제대로 의도대로 측정 가능

- 문제는 useEffect 써도 처음 페이지 로드될 때도 한번 실행

    - 의도치 않은 버그가 발생 가능성有

- 해결

    - 처음 페이지 로드시 useEffect 실행을 막는 코드 적용

    - count라는 state를 또 활용 

        - count가 0일 때는 (페이지 처음 로드되었을 때는) 내부 코드를 동작시키지 않음

<br>

> count가 0이 아닐 때만 실행하라고 조건을 추가
```js
useEffect(()=>{
  if ( count != 0 && count < 3 ) {
    setAge(age+1)
  }
 }, [count])
 ``` 
- 버튼 누르면 22살까지만 잘 증가

 <br>

 

 