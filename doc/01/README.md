# React-Bootstrap 라이브러리
React-Bootstrap
---
- Bootstrap을 리액트에 맞게 변형한 것

<br>

### 1. [react bootstrap 설치](https://react-bootstrap.netlify.app/docs/getting-started/introduction)
> 터미널
```javascript
  npm install react-bootstrap bootstrap
```

<br>

### 2. 사이트에 있는 CSS 파일 불러오기(2가지 방법 중 택1)
- 어떤 스타일은 Bootstrap CSS 파일을 요구하는 경우가 있기때문
> index.html 내 <head> 태그 안에 복붙
```javascript
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
    crossorigin="anonymous"
  />
```

<br>

> App.js 추가
```javascript
  import 'bootstrap/dist/css/bootstrap.min.css';
```

<br>

