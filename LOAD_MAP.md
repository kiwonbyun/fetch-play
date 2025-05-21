# Fetch API 전문가가 되기 위한 학습 로드맵

Fetch API에 대한 전문가가 되기 위한 체계적인 접근 방법을 제안해 드리겠습니다. 기초부터 고급 주제까지 단계별로 나누어 설명하겠습니다.

## 1단계: 기본 개념 이해하기

### HTTP 프로토콜 기초

- HTTP 요청/응답 구조, 메서드(GET, POST 등), 상태 코드
- 헤더와 바디, 콘텐츠 타입
- RESTful API 디자인 원칙

### 비동기 프로그래밍 기초

- 콜백 함수의 개념과 한계
- Promise의 작동 방식과 메서드 체이닝
- async/await 구문

### 리소스

- 📚 "HTTP: The Definitive Guide" (데이비드 고울리)
- 🌐 [MDN - HTTP 개요](https://developer.mozilla.org/ko/docs/Web/HTTP/Overview)
- 🌐 [JavaScript.info - Promise](https://ko.javascript.info/promise-basics)

## 2단계: Fetch API 기본 사용법 마스터하기

### 기본 요청 생성

```javascript
// 기본 GET 요청
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data));

// 다양한 옵션을 포함한 POST 요청
fetch("https://api.example.com/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ key: "value" }),
});
```

### 응답 처리 방법

- `response.json()`, `response.text()`, `response.blob()` 등
- 상태 코드와 헤더 확인
- 에러 처리 패턴

### 리소스

- 🌐 [MDN - Fetch API 사용하기](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch)
- 📚 "JavaScript: The Definitive Guide" (데이비드 플래너건)
- 🎥 [JavaScript Promises and Fetch API](https://www.youtube.com/watch?v=DHvZLI7Db8E)

## 3단계: 고급 Fetch 기법 탐구

### 요청 커스터마이징

- 헤더 조작 (인증, 캐싱 제어, 콘텐츠 타입)
- 요청 모드와 자격 증명 정책 (CORS 관련)
- `AbortController`를 사용한 요청 취소

```javascript
const controller = new AbortController();
const signal = controller.signal;

fetch("https://huge-data-api.example.com/data", { signal })
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((err) => {
    if (err.name === "AbortError") {
      console.log("Fetch was aborted");
    } else {
      console.error("Error:", err);
    }
  });

// 5초 후 요청 취소
setTimeout(() => controller.abort(), 5000);
```

### 응답 스트리밍

- `Response.body`와 스트림 API 활용
- 청크 단위 처리를 통한 대용량 데이터 다루기

```javascript
fetch("https://large-data.example.com/stream")
  .then((response) => {
    const reader = response.body.getReader();

    return new ReadableStream({
      start(controller) {
        function push() {
          return reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }

            controller.enqueue(value);
            return push();
          });
        }

        return push();
      },
    });
  })
  .then((stream) => new Response(stream))
  .then((response) => response.json())
  .then((data) => console.log(data));
```

### 실전 에러 처리

- HTTP 상태 코드에 따른 에러 처리 전략
- 네트워크 오류 vs 서버 오류 구분
- 타임아웃과 재연결 메커니즘

```javascript
async function safelyFetch(url, options = {}) {
  try {
    // 6초 타임아웃 설정
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);  // 성공 시 타이머 제거
    
    // HTTP 오류 상태 검사
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error ${response.status}: ${errorText}`);
    }
    
    return response;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    
    if (error.message.includes('NetworkError')) {
      // 네트워크 연결 문제
      throw new Error('Network connection failed');
    }
    
    throw error;  // 기타 오류는 그대로 전달
  }
}
```

### 리소스

- 🌐 [MDN - Fetch 고급 기능](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options)
- 🌐 [JavaScript.info - Fetch: 중단](https://ko.javascript.info/fetch-abort)
- 🌐 [웹 스트림 API 사용하기](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams)

## 4단계: 브라우저 내부 구현 이해하기

### 네트워크 스택과 Fetch

- 브라우저 네트워크 스택의 구조
- Fetch API가 네트워크 스택과 상호작용하는 방식

### 성능 고려사항

- 연결 관리 (Keep-Alive, HTTP/2 멀티플렉싱)
- 캐싱 메커니즘과 `Cache-Control` 헤더
- 메모리 사용 패턴과 가비지 컬렉션 영향

### 디버깅 및 성능 모니터링

- Chrome DevTools Network 패널을 활용한 요청 분석
- Waterfall 차트 이해 및 병목 현상 식별
- WebPageTest, Lighthouse를 활용한 성능 측정

### 리소스

- 📚 "High Performance Browser Networking" (일리야 그리고릭)
- 🌐 [Chrome 네트워크 스택 설명서](https://www.chromium.org/developers/design-documents/network-stack/)
- 🎥 [Chrome DevTools로 네트워크 문제 디버깅](https://www.youtube.com/watch?v=e1gAyQuIFQo)

## 5단계: 인기있는 Fetch 래퍼 라이브러리 분석

### ky 라이브러리 분석

- ky의 아키텍처와 API 디자인 철학 이해
- 코어 기능 구현 방식 분석 (인터셉터, 재시도 로직, 에러 처리)
- ky와 Fetch API 간의 관계 이해

```javascript
// ky 사용 예시
import ky from "ky";

// 기본 사용법
const json = await ky
  .post("https://example.com/api", {
    json: { foo: true },
  })
  .json();

// 인스턴스 생성 및 설정
const api = ky.create({
  prefixUrl: "https://api.example.com",
  timeout: 4000,
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("X-API-KEY", "my-api-key");
      },
    ],
  },
});
```

### axios 라이브러리 분석

- axios의 내부 구조와 XMLHttpRequest/Fetch 활용 방식
- 요청 및 응답 인터셉터 메커니즘
- 브라우저와 Node.js 환경에서의 동작 차이
- 어댑터 시스템의 설계 및 구현

```javascript
// axios 사용 예시
import axios from "axios";

// 요청 인터셉터 추가
axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getToken()}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 인스턴스 생성
const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
  withCredentials: true,
});
```

### 기타 주목할만한 라이브러리

- wretch, redaxios, unfetch 등의 비교 분석
- 각 라이브러리의 장단점과 유스케이스
- 번들 크기, 성능, API 디자인 비교

### 리소스

- 🌐 [ky 공식 문서](https://github.com/sindresorhus/ky)
- 🌐 [axios 공식 문서](https://axios-http.com/)
- 🌐 [Fetch 래퍼 라이브러리 비교](https://blog.logrocket.com/axios-vs-fetch-best-http-requests/)

## 6단계: 실제 응용 사례 및 패턴 마스터하기

### 데이터 페칭 패턴

- 캐싱 전략 (메모리 캐시, 영구 저장소)
- 재시도 로직 구현
- 동시 요청 관리 (Promise.all, Promise.allSettled)

```javascript
// 재시도 로직 예시
async function fetchWithRetry(url, options = {}, retries = 3) {
  try {
    return await fetch(url, options);
  } catch (err) {
    if (retries <= 1) throw err;

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return fetchWithRetry(url, options, retries - 1);
  }
}
```

### 프레임워크 통합

- React, Vue, Angular에서의 Fetch 활용 패턴
- React Query, SWR 같은 데이터 페칭 라이브러리 이해
- RTK Query, Apollo Client 등의 고급 상태 관리 솔루션

### 리소스

- 🌐 [React Query 문서](https://tanstack.com/query/latest)
- 🌐 [SWR 공식 문서](https://swr.vercel.app/)
- 📚 "Patterns of Enterprise Application Architecture" (마틴 파울러)

## 7단계: 심화 주제 탐구

### CORS (Cross-Origin Resource Sharing)

- 동일 출처 정책과 CORS의 필요성
- Preflight 요청의 작동 방식
- CORS 설정과 디버깅

### 보안 고려사항

- CSRF(Cross-Site Request Forgery) 방어
- Content Security Policy와 Fetch
- HTTPS와 혼합 콘텐츠 문제

### 리소스

- 🌐 [MDN - CORS](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)
- 🌐 [OWASP - CSRF 방어 치트 시트](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- 📚 "Web Application Security" (앤드류 호프만)

## 8단계: 최신 기술과 미래 동향

### HTTP/3와 QUIC

- 새로운 프로토콜이 Fetch에 미치는 영향
- 성능 최적화 기회

### 서비스 워커와 Fetch

- 오프라인 지원과 캐싱 전략
- 백그라운드 동기화 API 통합

### 리소스

- 🌐 [QUIC 및 HTTP/3 소개](https://blog.cloudflare.com/ko-kr/http3-the-past-present-and-future-ko-kr/)
- 🌐 [MDN - 서비스 워커 API](https://developer.mozilla.org/ko/docs/Web/API/Service_Worker_API)
- 🎥 [Progressive Web Apps 강의](https://www.youtube.com/playlist?list=PLNYkxOF6rcIB2xHBZ7opgc2Mv009X87Hh)

## 9단계: 자신만의 Fetch 라이브러리 개발하기

### 라이브러리 설계 및 기획

- 기능 요구사항 정의 (필수 기능과 선택 기능)
- API 디자인 및 사용자 경험 고려
- 프로젝트 구조 설계

### 핵심 기능 구현

- 기본 요청 기능 (GET, POST, PUT, DELETE 등)
- 인터셉터 시스템 구현
- 캐싱 메커니즘 설계
- 재시도 및 타임아웃 로직
- 에러 처리 및 상태 관리
- TypeScript 타입 정의 최적화

```javascript
// 자신만의 Fetch 라이브러리 - 기본 구조 예시
class MyFetch {
  constructor(baseUrl, defaultOptions = {}) {
    this.baseUrl = baseUrl;
    this.defaultOptions = defaultOptions;
    this.interceptors = {
      request: [],
      response: [],
    };
  }

  async request(url, options = {}) {
    let requestUrl = this.baseUrl ? new URL(url, this.baseUrl) : url;
    let requestOptions = { ...this.defaultOptions, ...options };

    // 요청 인터셉터 적용
    for (const interceptor of this.interceptors.request) {
      const result = await interceptor(requestOptions);
      if (result) requestOptions = result;
    }

    try {
      const response = await fetch(requestUrl, requestOptions);

      // 응답 인터셉터 적용
      let processedResponse = response;
      for (const interceptor of this.interceptors.response) {
        const result = await interceptor(processedResponse);
        if (result) processedResponse = result;
      }

      return processedResponse;
    } catch (error) {
      // 에러 처리 로직
      throw error;
    }
  }

  // 편의 메소드들
  get(url, options) {
    return this.request(url, { ...options, method: "GET" });
  }
  post(url, data, options) {
    /* ... */
  }
  // ... 기타 메소드들
}
```

### 테스트 및 문서화

- 단위 테스트 작성 및 테스트 자동화
- 실제 API와의 통합 테스트
- API 문서 작성 및 예제 코드 제공
- TypeScript 타입 정의 제공

### 배포 및 유지보수

- NPM 패키지로 배포
- 의미론적 버전 관리 (Semantic Versioning)
- 이슈 관리 및 커뮤니티 피드백 수용

### 리소스

- 🌐 [JavaScript 라이브러리 작성 가이드](https://github.com/sindresorhus/module-best-practices)
- 🌐 [NPM 패키지 배포하기](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- 📚 "JavaScript: The Good Parts" (더글라스 크록포드)

## 10단계: 선택적 심화 학습 - Fetch API 내부 구현 이해하기

### Chromium 소스 코드 탐색

- Fetch API 관련 소스 코드 위치와 구조 이해
- 주요 클래스와 인터페이스 분석

### 주요 파일 살펴보기

- `//third_party/blink/renderer/core/fetch/fetch_manager.cc`
- `//third_party/blink/renderer/core/fetch/request.cc`
- `//third_party/blink/renderer/core/fetch/response.cc`

### 리소스

- 🌐 [Chromium 코드 검색](https://source.chromium.org/chromium/chromium/src)
- 🌐 [Blink 소스 코드 가이드](https://www.chromium.org/blink/source-code-organization/)
- 📚 "How Browsers Work" (타리 가니)

## 학습 진행 방식 및 실습 전략

### 단계별 학습 접근법

- 각 단계마다 이론을 학습한 후 실습 코드 작성
- 직접 따라해보는 미니 프로젝트 진행
- 학습 내용 문서화 및 블로그에 기록

### 피드백 루프 구축

- 코드 리뷰 받기 (GitHub Gist, CodePen 등 활용)
- 스터디 그룹 참여 또는 온라인 커뮤니티 활용
- 학습 진행 상황 추적 및 정기적 복습

## 실습 프로젝트 제안

1. **개인 Fetch 라이브러리 개발 및 확장**

   - 기본적인 HTTP 메서드 지원 구현
   - 인터셉터, 캐싱, 재시도 기능 추가
   - 테스트 코드 작성 및 TypeScript 타입 정의
   - NPM 패키지로 배포

2. **미디어 스트리밍 애플리케이션**

   - Fetch와 스트림 API를 활용한 대용량 미디어 처리
   - 청크 단위 다운로드와 실시간 렌더링
   - 프로그레시브 이미지/비디오 로딩 구현

3. **오프라인 지원 SPA 구현**
   - 서비스 워커와 Fetch를 활용한 오프라인 기능
   - 백그라운드 동기화 API 통합
   - IndexedDB를 활용한 로컬 데이터 관리

4. **실시간 데이터 대시보드**
   - Fetch 기반의 폴링, Server-Sent Events, WebSocket 비교 구현
   - 실시간 데이터 시각화 및 업데이트 최적화
   - 다양한 네트워크 상황에 대응하는 폴백 전략 구현

## 실무에서 전문성 입증하기

1. **기술 블로그 작성**

   - Fetch API의 심층 분석 포스팅
   - 사례 연구 및 성능 최적화 팁 공유
   - 자신의 라이브러리 개발 과정 및 의사결정 공유

2. **오픈 소스 기여**

   - Fetch 관련 라이브러리에 기여
   - 버그 수정이나 기능 개선 제안
   - 자신의 라이브러리를 오픈소스로 공개

3. **기술 강연 또는 워크샵**
   - 로컬 개발자 모임에서 Fetch API 주제로 발표
   - 온라인 코스나 튜토리얼 제작
   - 라이브러리 제작 경험을 바탕으로 한 사례 발표
