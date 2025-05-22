/**
 * Fetch API 학습 1단계: HTTP와 비동기 프로그래밍 실습 코드
 * 
 * 이 파일은 HTTP 프로토콜과 비동기 프로그래밍 개념을 이해하기 위한 실습 코드입니다.
 * 각 함수를 구현하여 HTTP 통신의 기본 개념과 비동기 프로그래밍 패턴을 익히세요.
 */

/**
 * 문제 1: XMLHttpRequest를 사용한 기본 HTTP 클라이언트 구현
 * 
 * 아래 함수를 완성하여 XMLHttpRequest를 사용한 HTTP 클라이언트를 구현하세요.
 * 요구사항:
 * 1. GET, POST, PUT, DELETE 메서드를 지원해야 함
 * 2. Promise를 반환하여 비동기 처리할 것
 * 3. 타임아웃 설정 가능 (기본값 5초)
 * 4. JSON 응답 자동 파싱
 * 5. 오류 처리 (HTTP 상태 오류, 네트워크 오류, 타임아웃)
 */
function makeRequest(url, options = {}) {
  // 여기에 코드를 작성하세요
  
}

/**
 * 문제 2: 콜백 함수를 사용하여 연속적인 API 호출 구현
 * 
 * 아래 함수는 첫 번째 API에서 받은 결과를 사용하여 두 번째 API를 호출해야 합니다.
 * 콜백 패턴을 사용하여 구현하세요.
 * 
 * 사용할 API:
 * - 첫 번째 API: https://jsonplaceholder.typicode.com/users/1
 * - 두 번째 API: https://jsonplaceholder.typicode.com/posts?userId={첫 번째 API에서 받은 userId}
 */
function fetchUserPostsWithCallback(callback) {
  // 여기에 코드를 작성하세요
  
}

/**
 * 문제 3: Promise를 사용하여 연속적인 API 호출 구현
 * 
 * 문제 2와 동일한 기능을 Promise 체이닝을 사용하여 구현하세요.
 */
function fetchUserPostsWithPromise() {
  // 여기에 코드를 작성하세요
  
}

/**
 * 문제 4: async/await를 사용하여 연속적인 API 호출 구현
 * 
 * 문제 2와 동일한 기능을 async/await를 사용하여 구현하세요.
 */
async function fetchUserPostsWithAsyncAwait() {
  // 여기에 코드를 작성하세요
  
}

/**
 * 문제 5: Promise.all을 사용하여 병렬 API 호출 구현
 * 
 * 여러 사용자의 정보를 병렬로 가져오는 함수를 구현하세요.
 * Promise.all을 사용하여 효율적으로 구현하세요.
 * 
 * 사용할 API: https://jsonplaceholder.typicode.com/users/{userId}
 * userId는 1부터 5까지 사용합니다.
 */
function fetchMultipleUsers() {
  // 여기에 코드를 작성하세요
  
}

/**
 * 문제 6: RESTful API 클라이언트 구현
 * 
 * JSONPlaceholder API를 사용하는 완전한 RESTful 클라이언트를 구현하세요.
 * GET, POST, PUT, PATCH, DELETE 메서드를 모두 지원해야 합니다.
 * 또한 에러 처리와 타임아웃 기능도 구현하세요.
 * 
 * API Base URL: https://jsonplaceholder.typicode.com
 * 
 * 참고: 실제로는 JSONPlaceholder가 수정을 모의(mock)하기 때문에
 * 리소스가 실제로 변경되지는 않습니다.
 */
class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  
  // 여기에 필요한 메서드를 구현하세요
  // get(path, options)
  // post(path, data, options)
  // put(path, data, options)
  // patch(path, data, options)
  // delete(path, options)
}

/**
 * 테스트 실행 함수
 */
function runTests() {
  console.log('===== 테스트 시작 =====');
  
  // 문제 1 테스트
  console.log('\n----- 문제 1: XMLHttpRequest 테스트 -----');
  makeRequest('https://jsonplaceholder.typicode.com/todos/1')
    .then(data => console.log('문제 1 GET 성공:', data))
    .catch(error => console.error('문제 1 GET 실패:', error));
  
  // 문제 2 테스트
  console.log('\n----- 문제 2: 콜백 패턴 테스트 -----');
  fetchUserPostsWithCallback((error, posts) => {
    if (error) {
      console.error('문제 2 실패:', error);
    } else {
      console.log('문제 2 성공. 게시물 수:', posts.length);
    }
  });
  
  // 문제 3 테스트
  console.log('\n----- 문제 3: Promise 패턴 테스트 -----');
  fetchUserPostsWithPromise()
    .then(posts => console.log('문제 3 성공. 게시물 수:', posts.length))
    .catch(error => console.error('문제 3 실패:', error));
  
  // 문제 4 테스트
  console.log('\n----- 문제 4: async/await 패턴 테스트 -----');
  fetchUserPostsWithAsyncAwait()
    .then(posts => console.log('문제 4 성공. 게시물 수:', posts.length))
    .catch(error => console.error('문제 4 실패:', error));
  
  // 문제 5 테스트
  console.log('\n----- 문제 5: 병렬 요청 테스트 -----');
  fetchMultipleUsers()
    .then(users => console.log('문제 5 성공. 사용자 수:', users.length))
    .catch(error => console.error('문제 5 실패:', error));
  
  // 문제 6 테스트
  console.log('\n----- 문제 6: RESTful API 클라이언트 테스트 -----');
  const apiClient = new ApiClient('https://jsonplaceholder.typicode.com');
  
  // 여기에 apiClient의 테스트 코드를 작성하세요
  
  console.log('\n===== 테스트 종료 =====');
}

// 아래 주석을 해제하여 테스트를 실행하세요
// runTests();

// === 모범 답안 예시 ===
// 이 부분은 실제 구현 후에 참고하세요. 먼저 스스로 구현해보는 것이 중요합니다.
/*
// 문제 1 모범 답안
function makeRequest(url, options = {}) {
  const { method = 'GET', headers = {}, body = null, timeout = 5000 } = options;
  
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    
    // 헤더 설정
    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key]);
    });
    
    // 타임아웃 설정
    xhr.timeout = timeout;
    
    // 이벤트 핸들러 설정
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        let response;
        try {
          // Content-Type이 JSON인 경우에만 파싱
          const contentType = xhr.getResponseHeader('Content-Type');
          if (contentType && contentType.includes('application/json')) {
            response = JSON.parse(xhr.responseText);
          } else {
            response = xhr.responseText;
          }
          resolve(response);
        } catch (e) {
          reject(new Error('응답 파싱 실패: ' + e.message));
        }
      } else {
        reject(new Error('HTTP 에러: ' + xhr.status));
      }
    };
    
    xhr.onerror = function() {
      reject(new Error('네트워크 에러'));
    };
    
    xhr.ontimeout = function() {
      reject(new Error('요청 타임아웃: ' + timeout + 'ms 초과'));
    };
    
    // 요청 전송
    xhr.send(body);
  });
}
*/

/**
 * 제출 방법:
 * 1. 위 함수들을 모두 구현하세요.
 * 2. runTests() 함수의 주석을 해제하여 테스트를 실행하세요.
 * 3. 테스트 결과를 확인하고 모든 테스트가 통과하는지 확인하세요.
 * 4. 코드와 테스트 결과를 함께 제출하세요.
 */