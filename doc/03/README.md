# import & export
- state 생성시 useState() 안에 넣기에는 너무 긴 자료일 경우
  - 다른 파일에 보관했다가 import 해올 수 있음
 
- 다른 파일에 있던 변수 가져오려면
```javascript
  1. 변수를 export
  2. import 진행
```

> data.js
```javascript
  let a = 10;
  let b = 100;
  
  // export 하려면 export default 변수명
  export default a;
  
  // export 여러개 하려면 export{변수1, 변수2}
  export {a, b}
```

<br>

> App.js
```javascript
  // import 하려면 import 작명 from '파일경로'
  import 작명 from './data.js'; 

  // import 여러개 하려면 import{변수1, 변수2} from '경로'
  // export{} 했던 것들은 import{} 쓸 때 자유작명 불가 ⇒ export 했던 변수명 그대로 사용
  import { a, b } from './data'; 
```

<br>

> 유의점
```javascript
  - 변수, 함수, 자료형 전부 export 가능
  - 파일마다 export default 라는 키워드는 하나만 사용 가능
  - 파일경로는 ./ 부터 시작   ← 현재경로라는 뜻
```

<br>

<details>
  <summary>object 자료</summary>

<br>

> 여러가지 문자나 숫자를 한 변수에 보관하고 싶을 때 사용
```javascript
  let user = {'kim', 20}
```
- user라는 변수에 'kim'과 20 둘 다 저장 가능

> object 자료는 자료들 왼쪽에 이름 붙여야 함
```javascript
  let user = {name : 'kim', age : 20}
```
- 자유롭게 'kim'과 20의 별명을 작성하면 됨
- array와 다르게 별명 붙여서 저장할 수 있는게 장점

</details>

<br>




