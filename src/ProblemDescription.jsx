import React from "react";
import "./Workspace.css";
// import ProblemDetails from "../../problem.js";

function ProblemDescription({ details }) {
  return (
    <div className="problem-desc-container" style={{"color": "white", "backgroundColor": "black"}}>
      <div className="problem-desc-heading">Description</div>
      <div className="desc-title">
        {details.order}. {details.title}
      </div>
      <div className="desc-difficult" style={{ color: "green" }}>
        {details.difficult}
      </div>
      <div className="companies-container">
        <div className="problem-companies" style={{"color": "grey"}}>Companies</div>
      </div>
      <div className="problem-description">{details.description}</div>
      <div className="problem-examples">
        {details.examples?.map((example, index) => {
          return (
            <div className="example-container" key={index}>
              <div className="example-no">Example {index + 1}:</div>
              <div className="example-desc" style={{"color": "white", "backgroundColor": "#FFFFFF1A"}}>
                <strong>Input:</strong> {example.input} <br />
                <strong>Output:</strong> {example.output}
                <br />
                {example.explanation ?
                <div>
                <strong>Explanation:</strong> {example.explanation}
                </div>
                : ' '}
              </div>
            </div>
          );
        })}
      </div>
      <div className="constraints-container">
        <div className="constraints">Constraints:</div>
        {details.constraints?.map((constraint, index) => {
          return <li key={index}>{constraint}</li>;
        })}
      </div>
    </div>
  );
}

export default ProblemDescription;
