// 유효한 숫자 및 연산자 상수
const VALID_NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const VALID_OPERATORS = ["+", "-", "*", "/", "^"]; // '^' 연산자 추가

// 디스플레이 요소 가져오기
const getDisplayElement = () => document.getElementById("display");
const getResultElement = () => document.getElementById("result"); // 결과창 요소 추가

// 디스플레이 초기화
const resetDisplay = () => {
  getDisplayElement().textContent = "0";
  getResultElement().classList.add("d-none"); // 결과창 숨김
  getResultElement().classList.remove("alert-danger", "alert-info"); // 스타일 초기화
  return ""; // currentInput을 초기화할 값 반환
};

// 디스플레이 텍스트 설정
const setDisplay = (text) => {
  getDisplayElement().textContent = text;
  return text; // currentInput에 반영될 값 반환
};

// 백스페이스 (마지막 문자 제거)
const subDisplay = (currentInput) => {
  let newText = currentInput.slice(0, -1);
  if (newText === "") {
    newText = "0"; // 입력값이 비면 0으로 표시
  }
  getDisplayElement().textContent = newText;
  return newText === "0" ? "" : newText; // currentInput에 반영될 값 반환 (0이면 빈 값)
};

// 숫자 추가
const appendNumber = (number, currentInput) => {
  if (!VALID_NUMBERS.includes(number)) {
    throw new Error("유효한 숫자를 입력하세요.");
  }

  // "0" 상태에서 0이 아닌 숫자 입력 시 "0" 대체
  if (currentInput === "0" && number !== "0") {
    return setDisplay(number);
  }
  // "0" 상태에서 또 0 입력 시 그대로 "0" 유지 (00, 000 방지)
  else if (currentInput === "0" && number === "0") {
    return currentInput;
  }
  // 그 외의 경우 숫자 추가
  else {
    return setDisplay(currentInput + number);
  }
};

// 소수점 추가
const appendDecimal = (currentInput) => {
  if (currentInput.includes(".")) {
    throw new Error("이미 소수점이 있습니다.");
  }
  if (currentInput === "") {
    return setDisplay("0.");
  }
  return setDisplay(currentInput + ".");
};

// 연산자 설정
const setOperator = (op) => {
  if (!VALID_OPERATORS.includes(op)) {
    throw new Error("유효한 연산자를 선택하세요.");
  }
  return op; // 연산자 문자열 반환
};

export {
  resetDisplay,
  setDisplay,
  subDisplay,
  appendNumber,
  appendDecimal,
  setOperator,
  VALID_NUMBERS,
  VALID_OPERATORS,
};
