import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data)
      })
  }, [])

  function handleDelete(id) {
    fetch('http://localhost:4000/questions/' + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setQuestions(questions.filter((question) => question.id !== id))
      })
  }

  function handleAnswerChange(id, correctIndex) {
    fetch('http://localhost:4000/questions/' + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => res.json())
      .then((data) => {
        const update = questions.map((q) => {
          if (q.id === data.id) return data;
          return q;
        });
        setQuestions(update);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) =>
        <QuestionItem key={question.id} question={question} handleDelete={handleDelete} handleAnswerChange={handleAnswerChange} />)}</ul>
    </section>
  );
}

export default QuestionList;
