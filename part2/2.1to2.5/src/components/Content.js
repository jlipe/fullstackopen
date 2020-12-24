import React from 'react';
import Part from "./Part";

const Content = ({parts}) => {
  const renderedParts = parts.map((v) => {
    return(
      <Part part={v} key={v.id}></Part>
    );
  });

  const totalExercises = parts.reduce((a, v) => {
    return a + v.exercises;
  }, 0);

  return(
    <div>
      {renderedParts}
      <b>total of {totalExercises} exercises</b>
    </div>
  )
}
 
 export default Content;