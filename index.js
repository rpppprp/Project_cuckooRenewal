// 기본 설정
const express = require("express");
const useragent = require('express-useragent');
const path = require('path');
const app = express();
const PORT = 4000;


// 정적 파일 불러오기
app.use(express.static(__dirname + "/pc"));
app.use(express.static(__dirname + "/mo"));

// 라우팅 정의
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// // User-Agent 미들웨어 설정
// app.use(useragent.express());

// // 정적 파일 디렉토리 (선택)
// app.use(express.static('pc'));

// // 라우트 예제
// app.get('/', (req, res) => {
//     const userAgent = req.headers['user-agent'];
//     console.log('User-Agent:', userAgent);

//     // 모바일 장치 판별
//     const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);

//     if (isMobile) {
//         res.sendFile(path.join(__dirname, 'pc', 'mo_index.html'));
//     } else {
//         res.sendFile(path.join(__dirname, 'pc', 'index.html'));
//     }
// });



// 서버 실행
app.listen(PORT, () => {
  console.log(`Listen : ${PORT}`);
});