const student = {
  name: "Michael",
  scores: {
    math: 92,
    english: 88,
    science: 95,
    history: 90,
    programming: 95
  }
};

function calculateAvgScore(scores) {
  const total = Object.values(scores).reduce((total, current) => total + current, 0);
  const avgScore = total / Object.values(scores).length;

  return avgScore;
}

console.log(calculateAvgScore(student.scores));