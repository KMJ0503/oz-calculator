// 모듈 임포트
import calculateOperation from "./operations.js";
import {
  resetDisplay,
  setDisplay,
  subDisplay,
  appendNumber,
  appendDecimal,
  setOperator,
  VALID_NUMBERS,
  VALID_OPERATORS,
} from "./input.js";
import { showError, removeError } from "./error.js";
import saveHistory, { displayHistory, hideHistoryDisplay } from "./history.js";
// displayHistory와 hideHistoryDisplay 임포트

// 전역 상태 변수
let history = []; // 계산 기록 배열
let currentInput = ""; // 현재 디스플레이 입력값
let firstNumber = null; // 첫 번째 피연산자
let operator = null; // 선택된 연산자

// 숫자 버튼 클릭 핸들러
export const handleAppendNumber = (number) => {
  removeError(); // 에러 메시지 제거
  // currentInput 업데이트 및 디스플레이 반영
  currentInput = appendNumber(number, currentInput);
};

// 소수점 버튼 클릭 핸들러
export const handleAppendDecimal = () => {
  removeError(); // 에러 메시지 제거
  try {
    currentInput = appendDecimal(currentInput);
  } catch (error) {
    showError(error.message);
  }
};

// 연산자 버튼 클릭 핸들러
export const handleSetOperator = (op) => {
  removeError(); // 에러 메시지 제거
  try {
    // 현재 입력값이 없는데, 첫 번째 숫자도 없다면 에러
    if (currentInput === "" && firstNumber === null) {
      throw new Error("숫자를 먼저 입력하세요.");
    }

    // currentInput이 있으면 firstNumber로 저장
    if (currentInput !== "") {
      firstNumber = Number(currentInput);
      if (isNaN(firstNumber)) {
        throw new Error("유효한 숫자를 입력하세요.");
      }
    }

    // 연산자 설정
    operator = setOperator(op); // setOperator는 op만 받도록 변경됨
    currentInput = ""; // 입력값 초기화 (다음 숫자 입력을 위함)
    setDisplay("0"); // 디스플레이 초기화
  } catch (error) {
    showError(error.message);
  }
};

// 계산 실행 핸들러
export default function calculate() {
  removeError(); // 에러 메시지 제거
  try {
    // 계산에 필요한 모든 값이 있는지 확인
    if (firstNumber === null || operator === null || currentInput === "") {
      throw new Error("계산에 필요한 값이 부족합니다.");
    }

    const secondNumber = Number(currentInput);
    if (isNaN(secondNumber)) {
      throw new Error("유효한 숫자를 입력하세요.");
    }

    // operations 모듈의 calculateOperation 함수 사용
    const result = calculateOperation(firstNumber, secondNumber, operator);

    // history 모듈의 saveHistory 함수 사용
    saveHistory(firstNumber, operator, secondNumber, result, history);

    // 결과 표시 및 상태 초기화
    const resultElement = document.getElementById("result");
    resultElement.classList.remove("d-none", "alert-danger");
    resultElement.classList.add("alert-info");
    resultElement.textContent = `결과: ${result}`;

    currentInput = result.toString(); // 다음 계산을 위해 결과값을 현재 입력값으로 설정
    firstNumber = null; // 첫 번째 숫자 초기화
    operator = null; // 연산자 초기화
    setDisplay(currentInput); // 디스플레이에 결과 반영
  } catch (error) {
    showError(error.message);
    // 에러 발생 시 상태 초기화 (사용자 경험 개선)
    currentInput = "";
    firstNumber = null;
    operator = null;
    setDisplay("0");
  }
}

// 초기화 버튼 클릭 핸들러
export const handleClearDisplay = () => {
  removeError(); // 에러 메시지 제거
  currentInput = resetDisplay(); // 디스플레이 초기화 및 currentInput 업데이트
  firstNumber = null;
  operator = null;
  history = []; // 기록 배열도 초기화
  hideHistoryDisplay(); // 기록 디스플레이 숨김
};

// 백스페이스 (마지막 문자 제거) 핸들러
export const handleSubDisplay = () => {
  removeError(); // 에러 메시지 제거
  currentInput = subDisplay(currentInput);
};

// index.js에서 내보낸 함수를 객체로 관리하고 순회
const functions = {
  calculateOperation,
  appendNumber,
  appendDecimal,
  setOperator,
  showError,
  removeError,
  saveHistory,
  displayHistory,
  handleAppendNumber,
  handleAppendDecimal,
  handleSetOperator,
  calculate,
  handleClearDisplay,
  handleSubDisplay,
};
for (const funcName in functions) {
  console.log(`Available function from index.js: ${funcName}`);
}

// 키보드 이벤트 처리에 필요한 상수 내보내기
export { VALID_NUMBERS, VALID_OPERATORS, history }; // history 배열 내보내기
