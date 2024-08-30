import React, { useState } from "react";
import "./Workspace.css";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ onChange }) => {
  const [value, setValue] = useState("");
  const handleEditorChange = (value) => {
    setValue(value);
    onChange(value);
  };
  return (
    <div className="editor-container" style={{"color": "white", "backgroundColor": "black"}}>
      <div className="code-editor-heading">Java</div>
      <Editor
        width={`100%`}
        language="java"
		    value={value}
        theme='vs-dark'
        defaultValue="public class Main {
    public static void main(String[] args) {
    
    }
}"
        onChange={handleEditorChange}
      />
    </div>
  );
}
export default CodeEditor;