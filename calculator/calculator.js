//변수 선언
let history = []; //계산 기록을 저장하는 배열 (let 사용)
let currentInput = ""; //현재 입력값 (let 사용)
let firstNumber = null; //첫 번째 숫자 (let 사용)
let operator = null; //선택된 연산자 (let 사용)
const VALID_OPERATORS = ["+", "-", "*", "/"]; //유효한 연산자 상수 (const 사용)
var calculationResult; //계산 결과를 임시 저장할 변수 (var 사용)

//DOM 요소 선택 (추가: history display)
const historyDisplay = document.getElementById("history");

//숫자 버튼 클릭 시 디스플레이에 숫자 추가
const appendNumber = (number) => {
  try {
    //number가 유효한 숫자인지 확인 (예: 문자열 "0" ~ "9")
    if (!/^[0-9]$/.test(number)) {
      throw new Error("유효한 숫자를 입력하세요.");
    }

    //현재 입력값이 "0"이고 새로운 숫자가 "0"이 아니면 "0"을 대체
    if (currentInput === "0" && number !== "0") {
      currentInput = number;
    } else if (currentInput === "0" && number === "0") {
      //"0" 다음에 또 "0"이 오면 아무것도 하지 않음 (00, 000 방지)
      return;
    } else {
      currentInput += number;
    }

    //디스플레이 업데이트
    const display = document.getElementById("display");
    if (!display) throw new Error("디스플레이 요소를 찾을 수 없습니다.");
    display.textContent = currentInput;
  } catch (error) {
    showError(error.message);
  }
};

//연산자 버튼 클릭 시 연산자 설정
const setOperator = (op) => {
  try {
    //op가 유효한 연산자(+, -, *, /)인지 확인
    if (!VALID_OPERATORS.includes(op)) {
      throw new Error("유효한 연산자를 선택하세요.");
    }

    //현재 입력값이 없으면 예외 처리
    if (currentInput === "" && firstNumber !== null) {
      operator = op;
      return; // 연산자만 변경하고 함수 종료
    }
    if (currentInput === "") {
      //currentInput이 비어있고 firstNumber도 없으면 에러
      throw new Error("숫자를 먼저 입력하세요.");
    }

    //첫 번째 숫자 저장 (currentInput이 비어있지 않다면)
    if (currentInput !== "") {
      firstNumber = Number(currentInput);
    }

    //firstNumber가 유효한 숫자인지 확인
    if (isNaN(firstNumber)) {
      throw new Error("유효한 숫자를 입력하세요.");
    }

    operator = op;
    currentInput = ""; //입력값 초기화
    document.getElementById("display").textContent = "0"; //다음 숫자 입력을 위해 디스플레이를 0으로 설정
    document.getElementById("result").classList.add("d-none"); //결과 메시지 숨기기
  } catch (error) {
    showError(error.message);
  }
};

//초기화 버튼 클릭 시 모든 값 초기화
const clearDisplay = () => {
  currentInput = "";
  firstNumber = null;
  operator = null;
  document.getElementById("display").textContent = "0";
  document.getElementById("result").classList.add("d-none"); //결과 알림 숨기기
  document
    .getElementById("result")
    .classList.remove("alert-danger", "alert-info"); //색상 클래스 제거
  updateHistoryDisplay(); //기록 디스플레이 초기화
};

//계산 실행
const calculate = () => {
  const resultElement = document.getElementById("result");
  try {
    //firstNumber, operator, currentInput(두 번째 숫자)이 모두 존재하는지 확인
    if (firstNumber === null || operator === null || currentInput === "") {
      throw new Error("계산에 필요한 값이 부족합니다.");
    }

    const secondNumber = Number(currentInput);

    //secondNumber가 유효한 숫자인지 확인
    if (isNaN(secondNumber)) {
      throw new Error("유효한 숫자를 입력하세요.");
    }
    //나눗셈에서 secondNumber가 0인지 확인
    if (operator === "/" && secondNumber === 0) {
      throw new Error("0으로 나눌 수 없습니다.");
    }

    //var 변수 calculationResult 사용
    var result;
    //operator에 따라 사칙연산 수행 (switch 문 사용 권장)
    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "*":
        result = firstNumber * secondNumber;
        break;
      case "/":
        result = firstNumber / secondNumber;
        break;
      default:
        throw new Error("알 수 없는 연산자입니다.");
    }

    calculationResult = result; //var 변수에 최종 결과 할당

    //결과 출력
    resultElement.classList.remove("d-none", "alert-danger"); //d-none과 에러 클래스 제거
    resultElement.classList.add("alert-info"); //성공 알림 클래스 추가
    resultElement.textContent = `결과: ${calculationResult}`;

    //계산 기록 저장
    const record = {
      firstNumber,
      operator,
      secondNumber,
      result: calculationResult,
    };
    history.push(record);
    console.log("계산 기록:", JSON.stringify(history, null, 2));

    //계산 후 다음 계산을 위해 디스플레이 초기화 또는 결과값 유지
    currentInput = calculationResult.toString(); //다음 계산의 첫 번째 숫자가 되도록 현재 결과로 currentInput 설정
    firstNumber = null; //첫 번째 숫자 초기화 (다음 연산자를 기다림)
    operator = null; //연산자 초기화
    document.getElementById("display").textContent = currentInput; //디스플레이에 결과 반영

    //도전 과제: 계산 기록 표시 업데이트
    updateHistoryDisplay();
  } catch (error) {
    showError(error.message);
  }
};

//에러 메시지 출력
const showError = (message) => {
  const resultElement = document.getElementById("result");
  resultElement.classList.remove("d-none", "alert-info"); //d-none과 성공 클래스 제거
  resultElement.classList.add("alert-danger"); //에러 알림 클래스 추가
  resultElement.textContent = `에러: ${message}`;

  currentInput = "";
  firstNumber = null;
  operator = null;
  document.getElementById("display").textContent = "0";
};

// --- 도전 과제 기능 ---

//계산 기록 표시 함수 (함수 선언문)
function updateHistoryDisplay() {
  historyDisplay.innerHTML = '<h5 class="mb-2">기록:</h5>'; //기록 영역 초기화

  if (history.length === 0) {
    historyDisplay.innerHTML +=
      '<p class="text-muted">아직 기록이 없습니다.</p>';
    return;
  }

  //for 루프를 사용하여 history 배열 순회
  for (let i = 0; i < history.length; i++) {
    const record = history[i];
    const historyItem = document.createElement("p");
    historyItem.className = "history-item";
    historyItem.textContent = `${record.firstNumber} ${record.operator} ${record.secondNumber} = ${record.result}`;
    historyDisplay.appendChild(historyItem);
  }
}

//자유 추가 기능: 소수점 지원 (화살표 함수)
const appendDecimal = () => {
  try {
    //현재 입력값에 이미 소수점이 있는지 확인
    if (currentInput.includes(".")) {
      throw new Error("이미 소수점이 있습니다.");
    }

    //현재 입력값이 비어있으면 "0."으로 시작
    if (currentInput === "") {
      currentInput = "0.";
    } else {
      currentInput += ".";
    }

    //디스플레이 업데이트
    const display = document.getElementById("display");
    if (!display) throw new Error("디스플레이 요소를 찾을 수 없습니다.");
    display.textContent = currentInput;
  } catch (error) {
    showError(error.message);
  }
};

//페이지 로드 시 초기 기록 디스플레이 업데이트
document.addEventListener("DOMContentLoaded", updateHistoryDisplay);
