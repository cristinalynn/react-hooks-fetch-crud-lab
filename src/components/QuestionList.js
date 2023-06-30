import React, { useEffect, useState } from "react";

import QuestionItem from './QuestionItem'

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then((data) => setQuestions(data));
  }, []);

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((r) => r.json())
    .then(() => {
      const updateQuestions = questions.filter((question) => question.id !== id);
      setQuestions(updateQuestions);
    });
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
    .then((r) => r.json())
    .then((updateQuestion) => {
      const updateQuestions = questions.map((question) => {
        if (question.id === updateQuestion.id) return updateQuestion;
        return question;
      });
      setQuestions(updateQuestions)
    })
  }

  const questionDisplay = questions.map((question) => (
    <QuestionItem   
      key={question.id} 
      question={question}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
     />
  ));

  

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionDisplay}</ul>
    </section>
  );
}

export default QuestionList;
