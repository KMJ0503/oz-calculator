// index.js에서 필요한 함수와 상태 임포트
import calculate, { // calculate는 이제 export default로 임포트
  handleAppendNumber,
  handleAppendDecimal,
  handleSetOperator,
  handleClearDisplay,
  handleSubDisplay,
  VALID_NUMBERS,
  VALID_OPERATORS,
  history, // history 배열 임포트
} from "./index.js";

import { setHistoryElement, displayHistory } from "./history.js"; // history.js에서 추가 임포트

// DOM이 완전히 로드된 후 이벤트 리스너 연결
document.addEventListener("DOMContentLoaded", () => {
  // history.js 모듈에 historyElement 설정
  setHistoryElement(document.getElementById("history"));

  // 숫자 버튼 이벤트 리스너 연결
  document.querySelectorAll(".calc-btn.btn-secondary").forEach((button) => {
    const buttonText = button.textContent.trim();
    if (VALID_NUMBERS.includes(buttonText)) {
      // 숫자 버튼만
      button.addEventListener("click", () => handleAppendNumber(buttonText));
    } else if (buttonText === ".") {
      // 소수점 버튼
      button.addEventListener("click", handleAppendDecimal);
    }
  });

  // 연산자 버튼 이벤트 리스너 연결
  document.querySelectorAll(".calc-btn.btn-warning").forEach((button) => {
    const op = button.textContent.trim();
    // ÷ -> /, × -> *, ^ 변환
    let actualOp = op;
    if (op === "÷") actualOp = "/";
    if (op === "×") actualOp = "*";
    // HTML에 ^ 버튼이 추가되면 자동으로 매핑됩니다.
    button.addEventListener("click", () => handleSetOperator(actualOp));
  });

  // '=' 버튼 이벤트 리스너 연결
  document
    .querySelector(".calc-btn.btn-primary")
    .addEventListener("click", calculate); // calculate는 이제 default export

  // 'C' (초기화) 버튼 이벤트 리스너 연결
  document
    .querySelector(".calc-btn.btn-danger")
    .addEventListener("click", handleClearDisplay);

  // 기록 표시 버튼 이벤트 리스너 연결
  // index.html에서 추가될 '기록 표시' 버튼에 연결
  const showHistoryButton = document.getElementById("showHistoryBtn"); // 나중에 index.html에 추가될 ID
  if (showHistoryButton) {
    showHistoryButton.addEventListener("click", () => displayHistory(history));
  }

  // 키보드 이벤트 처리
  document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (VALID_NUMBERS.includes(key)) {
      handleAppendNumber(key);
    } else if (VALID_OPERATORS.includes(key)) {
      // 연산자 키보드 입력
      handleSetOperator(key);
    } else if (key === "Enter") {
      calculate();
    } else if (key === ".") {
      handleAppendDecimal();
    } else if (key === "Backspace") {
      event.preventDefault(); // 브라우저의 기본 뒤로가기 동작 방지
      handleSubDisplay();
    } else if (key === "Escape") {
      // ESC 키로 초기화
      handleClearDisplay();
    }
  });

  // 초기 디스플레이 설정 (초기화 함수 호출)
  handleClearDisplay();
});
