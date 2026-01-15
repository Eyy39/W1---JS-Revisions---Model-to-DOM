const addBtn = document.querySelector("#addBtn");
const questionsList = document.querySelector("#questionsList");
const dialogOverlay = document.querySelector("#dialogOverlay");
const dialogTitle = document.querySelector("#dialogTitle");
const questionForm = document.querySelector("#questionForm");
const cancelBtn = document.querySelector("#cancelBtn");
const submitBtn = document.querySelector("#submitBtn");
const titleInput = document.querySelector("#titleInput");
const answerA = document.querySelector("#answerA");
const answerB = document.querySelector("#answerB");
const answerC = document.querySelector("#answerC");
const answerD = document.querySelector("#answerD");
const correctAnswer = document.querySelector("#correctAnswer");

let questions = [
  {
    title: "What does HTML stand for?",
    choiceA: "Hi Thierry More Laught",
    choiceB: "How To move Left",
    choiceC: "Ho Theary Missed the Laundry !",
    choiceD: "Hypertext Markup Language",
    correct: "D",
  },
  {
    title: "What does CSS stand for?",
    choiceA: "Cisco and Super Start",
    choiceB: "Ci So Sa",
    choiceC: "Cascading Style Sheets",
    choiceD: "I don't know !",
    correct: "C",
  },
  {
    title: "What does JS stand for?",
    choiceA: "Junior stars",
    choiceB: "Justing Star",
    choiceC: "Javascript",
    choiceD: "RonanScript",
    correct: "C",
  },
];

let editingIndex = null;

addBtn.addEventListener("click", openAddDialog);
cancelBtn.addEventListener("click", closeDialog);
questionForm.addEventListener("submit", saveQuestion);

function openAddDialog() {
  editingIndex = null;
  dialogTitle.textContent = "Create new question";
  submitBtn.textContent = "Create";
  questionForm.reset();
  dialogOverlay.style.display = "flex";
}

function openEditDialog(index) {
  editingIndex = index;
  const question = questions[index];

  dialogTitle.textContent = "Edit question";
  submitBtn.textContent = "Update";

  titleInput.value = question.title;
  answerA.value = question.choiceA;
  answerB.value = question.choiceB;
  answerC.value = question.choiceC;
  answerD.value = question.choiceD;
  correctAnswer.value = question.correct;

  dialogOverlay.style.display = "flex";
}

function closeDialog() {
  dialogOverlay.style.display = "none";
  questionForm.reset();
  editingIndex = null;
}

function saveQuestion(e) {
  e.preventDefault();

  const questionData = {
    title: titleInput.value,
    choiceA: answerA.value,
    choiceB: answerB.value,
    choiceC: answerC.value,
    choiceD: answerD.value,
    correct: correctAnswer.value,
  };

  if (editingIndex !== null) {
    // Update existing question
    questions[editingIndex] = questionData;
  } else {
    // Add new question
    questions.push(questionData);
  }

  closeDialog();
  renderQuestions();
}

function deleteQuestion(index) {
  questions.splice(index, 1);
  renderQuestions();
}

function renderQuestions() {
  questionsList.innerHTML = "";

  questions.forEach((question, index) => {
    const questionItem = document.createElement("div");
    questionItem.className = "question-item";

    questionItem.innerHTML = `
      <span class="question-text">${question.title}</span>
      <div class="question-actions">
        <button class="edit-btn" onclick="openEditDialog(${index})" title="Edit">
          ✏️
        </button>
        <button class="delete-btn" onclick="deleteQuestion(${index})" title="Delete">
          🗑️
        </button>
      </div>
    `;

    questionsList.appendChild(questionItem);
  });
}

// Initial render
renderQuestions();
