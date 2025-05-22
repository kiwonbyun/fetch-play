# 1단계: HTTP와 비동기 프로그래밍 평가 테스트

이 테스트는 HTTP 프로토콜과 JavaScript의 비동기 프로그래밍 개념에 대한 이해도를 평가합니다. 아래 문제들을 풀어보고 답변을 준비해주세요.

## 1부: HTTP 프로토콜 기초 지식 테스트

### 객관식 문제 (각 5점, 총 30점)

1. 다음 중 idempotent(멱등성)을 가진 HTTP 메서드는 무엇인가요? b, d
   a) POST
   b) GET
   c) PATCH
   d) DELETE

2. 다음 HTTP 상태 코드 중 리소스가 성공적으로 생성되었음을 나타내는 것은? b
   a) 200 OK
   b) 201 Created
   c) 204 No Content
   d) 302 Found

3. 다음 중 CORS(Cross-Origin Resource Sharing)와 관련된 HTTP 헤더는? c
   a) Content-Type
   b) Authorization
   c) Access-Control-Allow-Origin
   d) Cache-Control

4. REST API에서 PUT과 PATCH의 주요 차이점은 무엇인가요? b
   a) PUT은 리소스 생성, PATCH는 리소스 삭제를 위해 사용된다
   b) PUT은 리소스 전체 교체, PATCH는 리소스 부분 수정을 위해 사용된다
   c) PUT은 안전한(safe) 메서드이고, PATCH는 그렇지 않다
   d) 차이가 없으며 서로 대체 가능하다

5. 클라이언트가 캐시된 리소스를 사용해도 좋은지 서버에 확인하는 HTTP 메서드는? d
   a) HEAD
   b) OPTIONS
   c) GET with If-Modified-Since 헤더
   d) POST with Cache-Control 헤더

6. HTTP 상태 코드 401과 403의 차이점은 무엇인가요? c
   a) 401은 서버 오류, 403은 클라이언트 오류
   b) 401은 리소스가 없음, 403은 리소스에 접근 권한이 없음
   c) 401은 인증이 필요함, 403은 인증은 됐으나 권한이 없음
   d) 401은 일시적 오류, 403은 영구적 오류

### 서술형 문제 (각 10점, 총 20점)

7. HTTP 요청과 응답의 구조를 설명하고, 헤더와 바디의 역할을 각각 설명하세요.

8. RESTful API 설계의 주요 원칙 5가지를 설명하세요.

## 2부: 비동기 프로그래밍 기초 지식 테스트

### 객관식 문제 (각 5점, 총 20점)

9. JavaScript에서 비동기 작업의 결과를 처리하는 방법 중 '콜백 지옥'을 가장 효과적으로 해결하는 방법은? c
   a) try/catch 블록 사용
   b) 더 많은 중첩 콜백 사용
   c) Promise 체이닝 사용
   d) 동기 함수만 사용

10. Promise 객체의 상태가 될 수 없는 것은? d
    a) pending
    b) fulfilled
    c) rejected
    d) cancelled

11. async/await를 사용할 때 오류 처리를 위한 가장 적절한 방법은? b
    a) if/else 문
    b) try/catch 블록
    c) Promise.catch() 메서드만 사용
    d) 오류를 무시하기

12. 다음 중 여러 개의 Promise를 병렬로 실행하고 모든 Promise가 완료될 때까지 기다리는 메서드는? a
    a) Promise.all()
    b) Promise.race()
    c) Promise.any()
    d) Promise.finally()

### 코드 분석 문제 (30점)

13. 다음 코드를 분석하고 아래 질문에 답하세요:

```javascript
function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        resolve({ data: "성공 데이터" });
      } else {
        reject(new Error("데이터 로드 실패"));
      }
    }, 1000);
  });
}

async function processData() {
  try {
    console.log("1. 데이터 요청 시작");
    const result = await getData();
    console.log("2. 데이터 수신 성공:", result);
    return result.data;
  } catch (error) {
    console.error("3. 오류 발생:", error.message);
    return "기본값";
  } finally {
    console.log("4. 작업 완료");
  }
}

processData().then((finalData) => {
  console.log("5. 최종 데이터:", finalData);
});

console.log("6. 함수 호출 완료");
```

a) 코드의 실행 순서를 설명하세요. 콘솔에 찍히는 로그의 순서를 정확히 나열하세요. 6- 1 - 2 - 4 - 5 혹은 6- 1 - 3 - 4 -5
b) 성공했을 때와 실패했을 때 각각 어떤 결과가 나오는지 설명하세요. 성공시 1-2-4-5-6 / 실패시 1-3-4-5- 6
c) 이 코드에서 Promise와 async/await가 어떻게 사용되고 있는지 설명하세요.

## 3부: 실습 문제 (총 100점 중 나머지 30점)

14. 아래 요구사항에 맞는 간단한 HTTP 요청 함수를 구현하세요:

```javascript
/**
 * 주어진 URL에 HTTP 요청을 보내고 응답을 처리하는 함수를 작성하세요.
 *
 * 요구사항:
 * 1. XMLHttpRequest를 사용하여 구현할 것
 * 2. GET, POST, PUT, DELETE 메서드를 지원할 것
 * 3. Promise를 반환하여 비동기 처리할 것
 * 4. 타임아웃 기능 구현 (기본값 5초)
 * 5. 응답이 JSON인 경우 자동으로 파싱할 것
 * 6. 오류 처리 구현 (네트워크 오류, HTTP 상태 오류, 타임아웃 등)
 *
 * 힌트: xhr.setRequestHeader(), xhr.timeout, xhr.ontimeout,
 *      xhr.onload, xhr.onerror, Promise 생성자 활용
 */

function httpRequest(url, options = {}) {
  const method = options.method ?? "GET";
  const headers = options.headers ?? {};
  const body = options.body ?? null;
  const timeout = options.timeout ?? 5000;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });

    xhr.timeout = timeout;

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let response;
        try {
          const contentType = xhr.getResponseHeader("Content-Type");
          if (contentType && contentType.includes("application/json")) {
            response = JSON.parse(xhr.responseText);
          } else {
            response = xhr.responseText;
          }

          resolve(response);
        } catch (err) {
          reject(new Error("json parse error" + err));
        }
      } else {
        reject(new Error("HTTP error" + xhr.status));
      }
    };

    xhr.onerror = () => reject("network error");
    xhr.ontimeout = () => reject("request timeout");

    xhr.send(body);
  });
}

// 사용 예시:
httpRequest("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "foo", body: "bar", userId: 1 }),
  timeout: 3000,
})
  .then((data) => console.log("Success:", data))
  .catch((error) => console.error("Error:", error));
```

## 채점 기준

- 총점: 100점
- 객관식 문제: 각 5점 (총 50점)
- 서술형 문제: 각 10점 (총 20점)
- 코드 분석 문제: 30점
- 실습 문제: 30점

객관식 정답:

1. b, d (GET과 DELETE는 멱등성을 가짐)
2. b
3. c
4. b
5. c
6. c

80점 이상: 우수 - 1단계 개념을 충분히 이해하고 있음
60-79점: 양호 - 기본 개념을 이해하고 있으나 일부 부족함
40-59점: 보통 - 핵심 개념에 대한 추가 학습 필요
40점 미만: 미흡 - 기초부터 다시 학습 필요
