// 계산 기록을 표시할 DOM 요소
let historyElement = null; // 초기에는 null, DOMContentLoaded 이후 설정

// 초기화 시 historyElement 설정
export function setHistoryElement(element) {
  historyElement = element;
}

// 계산 기록 저장
export default function saveHistory(
  firstNumber,
  operator,
  secondNumber,
  result,
  history
) {
  const record = { firstNumber, operator, secondNumber, result };
  history.push(record);
  console.log("계산 기록:", JSON.stringify(history, null, 2)); // 콘솔에 JSON 형식 출력

  // HTML 기록 디스플레이 업데이트
  updateHistoryDisplay(history);
  return history;
}

// HTML 기록 디스플레이 업데이트 함수 (challenge)
function updateHistoryDisplay(history) {
  if (!historyElement) {
    historyElement = document.getElementById("history"); // 직접 가져오기 시도
  }

  if (!historyElement) return; // 없으면 함수 종료

  // 기록 영역 초기화 및 표시 설정
  historyElement.classList.remove("d-none", "alert-danger", "alert-info");
  historyElement.classList.add("alert-secondary");

  let historyContent = "기록:\n";
  if (history.length === 0) {
    historyContent += "아직 기록이 없습니다.";
  } else {
    // for 루프를 사용하여 history 배열 순회
    for (let i = 0; i < history.length; i++) {
      const record = history[i];
      historyContent += `${record.firstNumber} ${record.operator} ${record.secondNumber} = ${record.result}\n`;
    }
  }
  historyElement.textContent = historyContent;
}

// 모든 기록 숨기기 (초기화 시 호출)
export function hideHistoryDisplay() {
  if (!historyElement) {
    historyElement = document.getElementById("history");
  }
  if (historyElement) {
    historyElement.classList.add("d-none");
  }
}

// 기록 표시 함수
export function displayHistory(history) {
  updateHistoryDisplay(history);
  return history;
}
