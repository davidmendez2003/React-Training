document.addEventListener("DOMContentLoaded", () =>{
    const startButton = document.getElementById("startButton");
    const welcomePage = document.getElementById("welcomePage");
    const questionsSection = document.getElementById("questions");
  
 /* start button function to clear welcome window */
  startButton.addEventListener("click", () => {
  currentQIndex = 0; 
  score = 0;
  welcomePage.classList.add("hidden");
  questionsSection.classList.remove("hidden");
  loadQuestion();
    });

  let quiz = [];

/*  fetch data from json */
    fetch("quiz.json")
    .then(response => response.json())
    .then(data => {
    quiz = data;
    });

/*  timer variables  */
  let questionTimer;
  const timerDisplay = document.createElement("p");
  timerDisplay.className = "fixed bottom-[360px] left-[530px] text-lg font-bold text-red-600 z-[1000]";


/*  timer function consists of 3 functions*/
  function startQuestionTimer() {
    timeLeft = 10;
    updateTimerDisplay();
    questionTimer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(questionTimer);
      selectedAnswer = ''; 
      automaticNextQuestion();
    }
    }, 1000);
  }
  function updateTimerDisplay() {
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;
  }


  /* function to move to next question when timer ends */
 function automaticNextQuestion() {
  const currentQuestion = quiz[currentQIndex];
  if (selectedAnswer === currentQuestion.answer){
    score++;
      }
  currentQIndex++;
     if (currentQIndex < quiz.length){
     loadQuestion();
   } else{
     showScore();
   }
  }

  /*  function to load a question and its option along displaying timer and next button */
function loadQuestion() {
  questionsSection.innerHTML = '';
  selectedAnswer = '';

  const currentQuestion = quiz[currentQIndex];
  const question = document.createElement("h2");
  question.className = "text-black font-medium text-[21px] ml-2";
  question.textContent = currentQuestion.question;
  questionsSection.appendChild(question);

  const optionsContainer = document.createElement("div");
  optionsContainer.className = "flex flex-col items-center mt-5 gap-4";
  currentQuestion.options.forEach((option) => {
  const button = document.createElement("button");
  button.textContent = option;
  button.className = "optionButton w-48 h-10 text-base rounded-lg bg-amber-50 border border-teal-400 text-black hover:bg-teal-400 transition duration-300 cursor-pointer";
  button.addEventListener("click", () => {
   selectedAnswer = option;
   optionsContainer.querySelectorAll(".optionButton").forEach(btn => {
   btn.classList.remove("bg-teal-400", "text-white", "border-black", "border-2");
   btn.classList.add("bg-amber-50", "text-black", "border", "border-teal-400");
      });
   button.classList.remove("bg-amber-50", "text-black", "border-teal-400");
   button.classList.add("bg-teal-400", "text-white", "border-black", "border-2");
   nextButton.disabled = false;
    });
   optionsContainer.appendChild(button);
    });
  questionsSection.appendChild(optionsContainer);
  questionsSection.appendChild(timerDisplay);
  questionsSection.appendChild(nextButton);
  nextButton.disabled = true;
  clearInterval(questionTimer);
  startQuestionTimer();
};


/*   next button   */
const nextButton = document.createElement("button");
nextButton.className = "fixed bottom-[360px] right-[530px] bg-amber-50 border border-teal-400 rounded-md w-20 z-[1000] hover:bg-teal-400 transition duration-900 cursor-pointer";
nextButton.disabled = "true";
const img = document.createElement("img");
img.src = "next.png";
img.className = "h-[30px] w-[35px] mx-auto"; 
nextButton.appendChild(img);

nextButton.addEventListener("click", ()=>{
  clearInterval(questionTimer);
  const currentQuestion = quiz[currentQIndex];
  if (selectedAnswer === currentQuestion.answer) {
    score++;
  }
  currentQIndex++;
  if (currentQIndex < quiz.length) {
    loadQuestion();
  } else {
    showScore();
  }
});


/*   show score, restart and review buttons  */
function showScore() {
  questionsSection.innerHTML = 
`<div class="flex flex-col items-center gap-6">
    <h2 class="text-black text-3xl font-semibold ml-[40px]">Quiz Completed! 🎉</h2>
    <p class="text-black text-lg text-center">Your Score: ${score} / ${quiz.length}</p>
    <div class="flex gap-6">
      <button id="restartQuiz" class="w-48 h-10 text-black text-base rounded-lg bg-amber-50 border border-teal-400 hover:bg-teal-400 transition cursor-pointer">Restart Quiz</button>
      <button id="reviewAnswers" class="w-48 h-10 text-black text-base rounded-lg bg-amber-50 border border-teal-400 hover:bg-teal-400 transition cursor-pointer">Review Answers</button>
    </div>
 </div>
 <div id="answerPopup" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999] hidden">
    <div class="bg-white p-6 rounded-xl max-w-[600px] max-h-[80vh] overflow-y-auto relative">
      <span id="closePopup" class="absolute text-black top-[10px] right-[15px] text-2xl cursor-pointer">&times;</span>
      <div id="answersList"></div>
    </div>
 </div>`;
  const restartButton = document.getElementById("restartQuiz");
  restartButton.addEventListener("click", () => {
  welcomePage.classList.remove("hidden");
  questionsSection.classList.add("hidden");
  currentQuestionIndex = 0;
  score = 0;
  });


/*   show popup for answers  */
  document.getElementById("reviewAnswers").addEventListener("click", () => {
  const answersList = document.getElementById("answersList");
  answersList.innerHTML = '';
  quiz.forEach((q, index) => {
  const qDiv = document.createElement("div");
  qDiv.className = "mb-5 border-b pb-2";
  qDiv.innerHTML = 
  `<p class="text-black ml-[10px]"><strong>Q${index + 1}:</strong> ${q.question}</p>
   <p class="text-black ml-[10px]"><strong>Correct Answer:</strong> ${q.answer}</p>`;
  answersList.appendChild(qDiv);
   });
   document.getElementById("answerPopup").classList.remove("hidden");
});
  document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("answerPopup").classList.add("hidden");
  });
}

});
