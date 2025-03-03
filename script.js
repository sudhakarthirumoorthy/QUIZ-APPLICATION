const outputDiv = document.getElementById('heading');
const text = " WELCOME TO QUIZ MASTER";

let i = 0;
const interval = setInterval(() => {
  outputDiv.innerHTML += text.charAt(i);
  i++;
  if (i > text.length) {
    clearInterval(interval);
  }
}, 150);