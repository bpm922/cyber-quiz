const correctAnswers = {
  q1: 0, q2: 2, q3: 1, q4: 1, q5: 1,
  q6: 1, q7: 1, q8: 1, q9: 3, q10: 1,
  q11: 0, q12: 2, q13: 1, q14: 1, q15: 1,
  q16: 2, q17: 2, q18: 1, q19: 2, q20: 0,
  q21: 1, q22: 1, q23: 2, q24: 2, q25: 2
};

function blockRepeatedAttempt() {
  if (localStorage.getItem("attempted") === "yes") {
    if (document.body) {
      document.body.innerHTML = `
        <main class="blocked-state">
          <h2>Quiz already attempted ❌</h2>
          <p>Only one attempt is allowed. Reloading will not reset the quiz.</p>
        </main>`;
    }
    throw new Error("Blocked");
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", blockRepeatedAttempt);
} else {
  blockRepeatedAttempt();
}

function startQuiz() {
  Object.keys(correctAnswers).forEach(question => localStorage.removeItem(question));
  window.location.href = "q1.html";
}

function saveAnswer(questionId, value) {
  localStorage.setItem(questionId, String(value));
}

function restoreAnswer(questionId) {
  const storedValue = localStorage.getItem(questionId);
  if (storedValue === null) return;
  const option = document.querySelector(`input[name="${questionId}"][value="${storedValue}"]`);
  if (option) option.checked = true;
}

function startTimer(nextPage) {
  const timerElement = document.getElementById("timer");
  if (!timerElement) return;
  let time = 30;
  timerElement.innerText = time;
  const intervalId = setInterval(() => {
    time -= 1;
    if (time <= 0) {
      clearInterval(intervalId);
      timerElement.innerText = "0";
      if (nextPage) window.location.href = nextPage;
      return;
    }
    timerElement.innerText = time;
  }, 1000);
}

function calculateResult() {
  let score = 0;
  for (const questionId in correctAnswers) {
    const storedValue = localStorage.getItem(questionId);
    if (storedValue === null) continue;
    if (parseInt(storedValue, 10) === correctAnswers[questionId]) score += 1;
  }
  localStorage.setItem("attempted", "yes");
  return score;
}

document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("copy", e => e.preventDefault());
document.addEventListener("cut", e => e.preventDefault());
document.addEventListener("paste", e => e.preventDefault());
document.addEventListener("keydown", e => {
  if (e.ctrlKey || e.key === "F12") e.preventDefault();
});
