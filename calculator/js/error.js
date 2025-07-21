// 에러 메시지 출력
const showError = (message) => {
  const resultElement = document.getElementById("result");
  resultElement.classList.remove("d-none", "alert-info");
  resultElement.classList.add("alert-danger");
  resultElement.textContent = `에러: ${message}`;
};

// 에러 메시지 제거 (숨김)
const removeError = () => {
  const resultElement = document.getElementById("result");
  resultElement.classList.add("d-none"); // 숨김
  resultElement.classList.remove("alert-danger", "alert-info"); // 모든 색상 클래스 제거
};

export { showError, removeError };
