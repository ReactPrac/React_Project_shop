# 이미지 & public 폴더
이미지 넣기
---
> html 안에서 src 폴더의 이미지 넣을 떄
>> 이미지를 import 해오고 사용
```javascript
import bg from './bg.png'

function App(){
  return (
    <div>
      <div className="main-bg" style={{ backgroundImage : 'url(' + bg + ')' }}></div>
    </div>
  )
}
```
- import 작명 from './이미지경로'
- 이미지경로가 필요한 곳에서 작명한걸 사용
  - \<img>태그 쓰고싶으면 \<img src={bg}/>
- 외부에 호스팅해둔 이미지라면 이미지 절대주소만 넣으면 됨

<br>

> css 파일에서 src 안의 이미지 넣을 때
```javascript
  background-image: url('./이미지경로');
```

<br>

public 폴더
---
- public 폴더에도 이미지 보관가능
- 리액트는 사이트발행 전에 html, jss, css 파일을 압축함(bundling)
  - but, public 폴더에 있던건 압축X
> html에서 public 폴더 이미지 사용할 때
```javascript
  <img src="/이미지경로" />
```

<br>

public 폴더 주의점
> example.com 발행시
```javascript
  문제 없음!
```

<br>

> example.com/blah~/ 발행시
```javascript
  <img src="/blah~/이미지경로" />

  or

  <img src={process.env.PUBLIC_URL + '/이미지경로'} /> // 권장방식
```

<br>
