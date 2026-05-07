const quiz = {
  question: "What is the largest planet in the solar system?",
  choices: ["Earth", "Mars", "Jupiter", "Venus"],
  answer: "Jupiter"
};

function getAnswer(question, answer) {
  if(answer === question.answer) {
    return "Correct";
  }
  else {
    return "The Correct Answer is " + question.answer;
  }
}

console.log(getAnswer(quiz, "Jupiter"));