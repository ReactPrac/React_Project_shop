# Lifecycle & useEffect
> 학습 목적
```
  1. componentDidMount() 등 유용한 Lifecycle 함수들을 쓰기 위해
  
  2. 요즘은 위의 긴 함수 안쓰고 useEffect() 라는 깔끔한 함수 사용하기 때문
```

<br>

컴포넌트의 인생(Lifecycle)
---
|-|
|-|
|![image](https://github.com/user-attachments/assets/62849207-67c2-4b17-839d-8c5f7f527c0b)|


### 컴포넌트
```
  1. 생성이 될 수도 있고 (전문용어로 mount)
  
  2. 재렌더링이 될 수도 있고 (전문용어로 update)
  
  3. 삭제 될 수도 있음 (전문용어로 unmount)
```

<br>

### 컴포넌트의 인생을 배우는 이유
```
  컴포넌트 인생 중간중간에 간섭(=코드실행)할 수 있기 때문

    컴포넌트가 장착이 될 때 특정 코드를 실행할 수도 있고, 
  
    컴포넌트가 업데이트될 때 특정 코드를 실행할 수도 있음.
```

<br>

컴포넌트 인생에 간섭하는 방법
---
|Lifecycle hook|
|-|
|![image](https://github.com/user-attachments/assets/f76bf09b-335f-4c13-aa11-691ecfb7ac8e)|

### 갈고리(hook)를 달아서 간섭
> ex
```
  "Detail 컴포넌트 등장 전에 이것좀 해줘"
  
  "Detail 컴포넌트 사라지기 전에 이것좀 해줘"
  
  "Detail 컴포넌트 업데이트 되고나서 이것좀 해줘"
  
  이렇게 코드 실행해달라고 간섭 가능
```

<br>

옛날 React에서 Lifecycle hook 쓰는 법
---
```
  class Detail2 extends React.Component {
    componentDidMount(){
      //Detail2 컴포넌트가 로드되고나서 실행할 코드
    }
    componentDidUpdate(){
      //Detail2 컴포넌트가 업데이트 되고나서 실행할 코드
    }
    componentWillUnmount(){
      //Detail2 컴포넌트가 삭제되기전에 실행할 코드
    }
  }
```
- class 문법으로 컴포넌트 만들었음

  - 안에 함수명을 써주면 각각 특정 Lifecycle에서 코드 실행 가능

<br>

요즘 React에서 Lifecycle hook 쓰는 법
---
```
  import {useState, useEffect} from 'react';
  
  function Detail(){
  
    useEffect(()=>{
      //여기적은 코드는 컴포넌트 로드 & 업데이트 마다 실행됨
      console.log('안녕')
    });
    
    return (생략)
  }
```
- 상단에서 useEffect import

- 콜백함수 추가해서 안에 코드 기재

  - 코드는 컴포넌트가 mount & update시 실행 (=Lifecycle hook)

<br>

> 재렌더링시
```
  import {useState, useEffect} from 'react';
  
  function Detail(){
  
    useEffect(()=>{
      //여기적은 코드는 컴포넌트 로드 & 업데이트 마다 실행됨
      console.log('안녕')
    });
  
    let [count, setCount] = useState(0)
    
    return (
      <button onClick={()=>{ setCount(count+1) }}>버튼</button>
    )
  }
```

<br>

#### 💡 '안녕' 2번 출력되는 경우?
```
  index.js에 <React.StrictMode>라는 태그가 있으면 2번 출력
  
  디버깅용으로 편하라고 2번 출력해주는데 싫으면 저 태그 제거
```

<br>

useEffect 밖에 적어도 똑같다?!
---
- useEffect 바깥에 적어도 똑같이 컴포넌트 mount & update시 실행

  - 컴포넌트가 mount & update시 function 안에 있는 코드도 다시 읽고 지나가기 때문

<br>

### 그럼 왜 useEffect 만든걸까?
- useEffect 안에 적은 코드는 html 렌더링 이후에 동작

  - 코드의 실행 시점 조절 가능
 
  - 조금이라도 html 렌더링이 빠른 사이트를 원하면 쓸데없는 것들은 useEffect 안에 넣기

<br>

> ex) 굉장히 시간이 오래 걸리는 쓸데없는 코드가 필요하다고 가정
```
  function Detail(){
  
    (반복문 10억번 돌리는 코드)
    return (생략)
  }
```
- 여기에 대충 적으면 반복문 돌리고 나서 하단의 html 보여줌

<br>

```
  function Detail(){
  
    useEffect(()=>{
      (반복문 10억번 돌리는 코드)
    });
    
    return (생략)
  }
```
- useEffect 안에 적으면 html 보여주고 나서 반복문 돌림

<br>

### side effect
- 함수 안에 코드짤 때 함수의 핵심기능 외에 쓸데없는 기능들

<br>

### useEffect
- 컴포넌트의 핵심 기능은 html 렌더링

  - 그 외의 쓸데없는 기능들은 useEffect 안에 적으라는 뜻
 
- 오래걸리는 반복연산, 서버에서 데이터 가져오는 작업, 타이머 등

<br>

setTimeout
---
- 자바스크립트로 x초 후 코드를 실행하고 싶을 때 사용하는 함수

<br>

```
  setTimeout( ()=>{ 1초 후 실행할 코드 }, 1000 );
```
- 1000 이라고 숫자적은 곳에 ms 단위로 시간 기재

  - 1000 = 1초
 
  - 위 코드는 1초 후에 내부코드 실행

<br>

실습
---
### Detail 페이지 후 2초 후에 박스 사라지게 하기
> 동적UI
```
  1. UI 상태를 저장할 state 만들기

  2. state에 따라 UI가 어떻게 보일지 작성
```

<br>

```
  function Detail(){
  
    let [alert, setAlert] = useState(true)
  
    return (
    {
      alert == true
      ? <div className="alert alert-warning">
          2초이내 구매시 할인
        </div>
      : null
    }
    )
  }
```
- alert 라는 state 를 true 로 바꾸면 노란박스 노출

  - false 로 바꾸면 안보임

<br>

> useEffect & setTimeout 사용
```
  function Detail(){
  
    let [alert, setAlert] = useState(true)
    useEffect(()=>{
      setTimeout(()=>{ setAlert(false) }, 2000)
    }, [])
  
    return (
    {
      alert == true
      ? <div className="alert alert-warning">
          2초이내 구매시 할인
        </div>
      : null
    }
    )
  }
```
- Detail 페이지 접속 후 2초 후에 안보임

<br>

useEffect에 넣을 수 있는 실행조건
---
```
  useEffect( ()=>{ 실행할코드 }, [count] )
```
- useEffect()의 둘째 파라미터로 [ ]

  - 변수나 state같은 것들을 넣을 수 있음
 
  - [ ]에 있는 변수나 state 가 변할 때만 useEffect 안의 코드를 실행

- 위의 코드는 count라는 변수가 변할 때만 useEffect 안의 코드가 실행

- [ ] 안에 state 여러개 넣을 수 있음

<br>

```
  useEffect( ()=>{ 실행할코드 }, [] )
```
- 아무것도 안넣으면 컴포넌트 mount시 (로드시) 1회 실행

  - 이후 영영 실행하지 않음
 
<br>

clean up function
---
```
  useEffect(()=>{ 
    그 다음 실행됨 
    return ()=>{
      여기있는게 먼저실행됨
    }
  }, [count])
```
- useEffect 동작하기 전에 특정코드를 실행하고 싶으면

  - return ()=>{} 안에 넣기

<br>

#### 💡 왜 이런 기능이 있는걸까?
```
  복잡하고 어려운 숙제할 때 책상을 싹 치우고 하면 잘되는 것 처럼 
  
  useEffect 안에 있는 코드를 실행할 때도
  
  싹 치우고 깔끔한 마음으로 실행하는게 좋을 때가 있음
```

<br>

> ex) setTimeout
```
  setTimeout() 쓸 때마다 브라우저 안에 타이머가 하나 생김
  
    → 근데 useEffect 안에 썼기 때문에 컴포넌트가 mount 될 때 마다 실행 
    
    → 잘못 코드를 짜면 타이머가 100개 1000개 생길 수도 있음


  이러한 버그를 방지하고 싶으면
  
    → useEffect에서 타이머 만들기 전에 기존 타이머를 싹 제거하라고 코드 작성
    
    → 이럴 때 return ()=>{} 안에 작성
```

<br>

```
  useEffect(()=>{ 
    let a = setTimeout(()=>{ setAlert(false) }, 2000)
    return ()=>{
      clearTimeout(a)
    }
  }, [])
```
- 타이머 제거하고 싶으면 clearTimeout(타이머)

  - 타이머 장착하기 전에 기존 타이머가 있으면 제거
 
<br>

#### 💡 clean up function에는 타이머제거, socket 연결요청제거, ajax요청 중단 이런 코드를 많이 작성

<br>

#### 💡 컴포넌트 unmount 시에도 clean up function 안에 있던게 1회 실행

<br>

---

<br>

사용법 정리
---
### 1. 재렌더링마다 코드를 실행가능
```
  useEffect(()=>{ 실행할코드 })
```

<br>

### 2. 컴포넌트 mount시 (로드시) 1회만 실행가능
```
  useEffect( ()=>{ 실행할코드 }, [] )
```

<br>

### 3. useEffect 안의 코드 실행 전에 항상 실행
```
  useEffect(()=>{ 
    return ()=>{
      실행할코드
    }
  })
```

<br>

### 4. 컴포넌트 unmount시 1회 실행
```
  useEffect(()=>{
    return ()=>{
      실행할코드
    }
  }, [])
```

<br>

### 5. state1 이 변경될 때만 실행
```
  useEffect(()=>{
    실행할코드
  }, [state1])
```

<br>

실습
---
### input 태그에 유저가 숫자 말고 다른걸 입력하면 "숫자를 입력하세요" 안내메세지 출력
> useEffect 사용해보기
```
  function Detail(){
    let [num, setNum] = useState('')
  
    useEffect(()=>{
      if (isNaN(num) == true){
        alert('숫자를 입력하세요')
      }
    }, [num])
  
    return (
      <input onChange={ (e) => { setNum(e.target.value) } } />
    )
  }
```
- \<input>에 입력한 값은 출력해보면 전부 문자형태로 출력

- '123' 이렇게 숫자가 있는 문자인지, 'ㄱㄴㄷ' 이렇게 숫자가 없는 문자인지 파악하려면

  - isNaN() 사용
 
    - isNaN('abc') ⇒ true
   
    - isNaN('123') ⇒ false

<br>
