# 컴포넌트 전환 애니메이션(transition)
애니메이션 만들기
---
### 1. 애니메이션 동작 전 스타일을 담을 className 만들기 
> css 파일
```css
  .start {
    opacity : 0
  }
  .end {
    opacity : 1;
  }
```
- 애니메이션 동작 전엔 투명도가 0, 동작 후엔 투명도가 1

<br>

### 2. 애니메이션 동작 후 스타일을 담을 className 만들기 
- 1번과 동일

<br>

### 3. transition 속성도 추가
- transition :해당 속성이 변할 때 서서히 변경

> css 파일
```css
  .start {
    opacity : 0
  }
  .end {
    opacity : 1;
    transition : opacity 0.5s;
  }
```

<br>

> 원하는 <div> 요소에 start 넣어두고 end 를 탈부착할 때 마다 fade in
```javascript
  function TabContent({탭}){
  
    return (
      <div className="start end">
        { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭] }
      </div>
    )
  }
```

<br>

### 4. 원할 때 2번 탈부착
- 버튼누르면 end 부착하라고 중복된 코드 작성하려면 useEffect 활용

  - 특정 state 아니면 props가 변할 때 마다 코드실행 가능
 
    - 탭이라는 state가 변할 때 end를 부착하는 것으로 코드 작성

```javascript
  function TabContent({탭}){
  
    let [fade, setFade] = useState('')
  
    useEffect(()=>{
      setFade('end')
    }, [탭])
  
    return (
      <div className={'start ' + fade}>
        { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭] }
      </div>
    )
  }
```
- 탭이라는게 변할 때 end를 부착하고 싶으면 동적인 UI 만드는 법 상기

  - fade라는 state 하나 생성
 
  - state에 따라서 className이 어떻게 보일지 작성
 
  - 원할 때 fade 변경
 
- 탭이라는 state가 변할 때 마다 fade라는 state가 'end'로 변하고 className="start end" 로 변함

<br>

#### 💡 안보인다면?
- 개발자도구에서 검사
  
- end라는 클래스명을 부착하는게 맞긴 맞는데 떼었다가 붙여야 애니메이션이 보임

```javascript
  function TabContent({탭}){
  
    let [fade, setFade] = useState('')
  
    useEffect(()=>{
      setTImeout(()=>{ setFade('end') }, 100)
    return ()=>{
      setFade('')
    }
    }, [탭])
  
    return (
      <div className={'start ' + fade}>
        { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭] }
      </div>
    )
  }
```
- clean up function 안에 fade라는 state를 공백으로 바꾸라고 작성

  - useEffect 실행 전엔 'end'가 ' ' 로 바뀜

<br>

#### 💡 setTimeout
- 리액트 18버전 이상부터는 automatic batch 라는 기능이 생김

- state 변경함수들이 연달아서 여러개 처리되어야한다면 state 변경함수를 다 처리하고 마지막에 한 번만 재렌더링됨

  - 'end' 로 변경하는거랑 ' ' 로 변경하는거랑 약간 시간차를 둔 것

<br>
