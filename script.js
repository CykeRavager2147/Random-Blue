const questions = [
  {
    question: "How many meters is a olympic swimming pool",
    answers: [
      {
        text: "25m",
        correct: true,
      },
      {
        text: "100m",
        correct: false,
      },
      {
        text: "62m",
        correct: false,
      },
      {
        text: "1000m",
        correct: false,
      },
    ],
  },
  {
    question: `What is the tallest mountain in the world`,
    answers: [
      {
        text: "Lhotse",
        correct: "false",
      },
      {
        text: "Godwin Austen",
        correct: "false",
      },
      {
        text: "Mount Everest",
        correct: "true",
      },
      {
        text: "Whistler",
        correct: "false",
      },
    ],
  },
  {
    question: "What year did WW2 end (if ever)",
    answers: [
      {
        text: "last friday",
        correct: "false",
      },
      {
        text: "1945",
        correct: "true",
      },
      {
        text: "IT ENDED!!! shocked*",
        correct: "false",
      },
      {
        text: "1969",
        correct: "false",
      },
    ],
  },
];

// Point A - Basic questions, Css, Html,

let elementQuestion = document.getElementById("question");
console.log(elementQuestion);
let answerButtons = document.querySelector(".answerButton");
let next = document.getElementById("next");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  next.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  console.log(currentQuestion);
  let questionNumber = currentQuestionIndex + 1;
  elementQuestion.innerHTML = questionNumber + ") " + currentQuestion.question;

  currentQuestion.answers.map((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("button");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
      console.log(button.dataset.correct);
      // line 100 !!!
    }
    button.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(event) {
  let selectedButton = event.target;
  console.log(selectedButton);
  let isCorrect = selectedButton.dataset.correct === "true";
  console.log(isCorrect);
  if (isCorrect) {
    selectedButton.classList.add("correct");
  } else {
    selectedButton.classList.add("incorrect");
  }
  Array.from(answerButtons.children).map((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = "true";
  });
  next.style.display = "block";
  // Point B - When clicking on buttons actiaully does something (logs the clicked button) - Point C is earlier.
}

function showScore(){
  resetState()
  elementQuestion.innerHTML=`You Scored ${score} out of ${questions.length}`
  next.innerHTML="Play again"
  next.style.display="block"
};

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore()
  }
}

next.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

function resetState() {
  next.style.display = "none";

  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

startQuiz();
