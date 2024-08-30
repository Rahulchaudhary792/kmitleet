import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TestCases = ({ handleCompile, testcases, processing }) => {
  return (
    <div className="testcase-container" style={{"color": "white", "backgroundColor": "black"}}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="test-cases">
        <div className="test-cases-heading">Testcases</div>
        {testcases?.map((testcase, idx) => {
          return (
            <div key={idx}>
              <div className="test-case-number">Case {idx + 1}</div>
              <div className="testcases-input-container">
                <p>Input:</p>
                <div className="testcase-input" style={{"color": "white", "backgroundColor": "#FFFFFF1A"}}>{testcase.input}</div>
              </div>
              <div className="testcases-output-container">
                <p>Output:</p>
                <div className="testcase-output" style={{"color": "white", "backgroundColor": "#FFFFFF1A"}}>{testcase.output}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="compile-btn-container">
        <button onClick={handleCompile}>
          {processing ? "Processing..." : "Compile and Execute"}
        </button>
      </div>
    </div>
  );
};

export default TestCases;
