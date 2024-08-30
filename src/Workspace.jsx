import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Split from "react-split";
import { toast } from "react-toastify";
import CodeEditor from "./CodeEditor";
import ProblemDescription from "./ProblemDescription";
import TestCases from "./TestCases";
function Workspace() {
	const [code, setCode] = useState("");
	const urlPathname = window.location.pathname;
	const segments = urlPathname.split("/");
	const problemId = segments[segments.length - 1];
	const [details, setDetails] = useState({});
	const [processing, setProcessing] = useState(false);
	const testcases = details.testcases;
  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await axios.get(
          `http://localhost:3000/problem/${problemId}`
        );
        setDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDetails();
  }, [problemId]);
  const onChange = (data) => {
	  setCode(data);
	};
	const handleCompile = async () => {
    const response = await axios.post('http://localhost:3000/runcode',  {code: code});
      const dat = await response.data;
      try {
          if (dat.output.trim() === testcases[0].output.trim()) {
            toast.success("Testcases Passed");
            const response = await fetch('http://localhost:3000/submit-code', {
              method: 'POST', 
              body: JSON.stringify({
               name: localStorage.getItem("name"),
               javaCode: code,
               status: "Accepted"
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }
        else {
          //toast.error("Testcases not passed");
          /*const response = await fetch('http://localhost:3000/submit-code', {
            method: 'POST', 
            body: JSON.stringify({
             name: localStorage.getItem("name"),
             javaCode: code,
             status: "Wrong answer"
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });*/
        toast.error(dat.output);
        }
    }
    catch(error) {
       toast.error(error);
    }
		/*setProcessing(true);
		const formData = {
			language_id: 4,
			source_code: btoa(code),
			stdin: btoa(details?.testcases[0].input),
			};		
			const options = {
				method: "POST",
				url: "https://judge0-extra-ce.p.rapidapi.com/submissions",
				params: { base64_encoded: "true", fields: "*" },
				headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "judge0-extra-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "1ff6a697f9msh0751eeacbfce2c3p190b46jsn4a06c7b26baa",
		},
		data: formData,
		};
		try {
			const response = await axios.request(options);
			const token = response.data.token;
			checkStatus(token);
			} catch (error) {
				console.log(error);
				}
				};
  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: "https://judge0-extra-ce.p.rapidapi.com/submissions" + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": "judge0-extra-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "1ff6a697f9msh0751eeacbfce2c3p190b46jsn4a06c7b26baa",
      },
    };

    try {
      const response = await axios.request(options);
      const statusId = await response.data.status_id;
      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        const output = atob(response.data.stdout);
        //console.log(response.data.output);
        const reqOutput = details.testcases[0].output;
        if (output.trim() == reqOutput.trim()) {
          toast.success("Congrats! TestCase Passed");
        } else {
          toast.error("Oops! Output Didn't Matched");
        }
        setProcessing(false);
        return;
      }
    } catch (error) {
      setProcessing(false);
      toast.error("Some error occurred");
      console.log(error);
    }*/
  };
  return (
    <Split className="split" minSize={0}>
      <ProblemDescription details={details} />
      <Split className="split-vertical" direction="vertical">
        <CodeEditor onChange={onChange}/>
        <TestCases
        handleCompile={handleCompile}
        testcases={testcases}
        processing={processing}
        />
      </Split>
    </Split>
  );
}
export default Workspace;