import React, { useState } from "react";
/*import { DiCodeBadge } from "react-icons/di";*/
import "./Login.css";
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
	try {
      const response = await fetch("http://localhost:3000/login", {method: 'POST', body: JSON.stringify(data), 
		headers: {
			'Content-Type': 'application/json'
		}
      });
      const dat = await response.json();
      console.log(dat.name);
      if (response.ok) {
        localStorage.setItem("token", dat.data);
        localStorage.setItem("admin", dat.admin);
        localStorage.setItem("name", dat.name);
        toast.success(dat.message);
        navigate("/home");
      }
      else {
        toast.error(dat.message);
      }
    } catch (error) {
      notify();
      console.log(error);
    }
  };
  const notify = () => {
    toast.error("Invalid Email or Password");
  };
  return (
    <div className="login-container">
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
      <div>
        <img src="https://tse2.mm.bing.net/th?id=OIP.CDqfU5j0Xn1pzK4uJXMq5AAAAA&pid=Api&P=0&h=180" style={{"position": "absolute", "top": "20px", "left": "20px", "width": "100px", "borderRadius": "20px"}}/>
      </div>
      <div className="login-box">
        <div className="logo-title">
          {/*<DiCodeBadge size="50px" />*/}
          <span>KmitLeet</span>
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Password"
            onChange={handleChange}
          />
          <button className="submit-btn" type="submit">
            Log In
          </button>
        </form>
        <div className="forgot-container">
          <Link to="/" className="signup-link">Forgot Password?</Link>
          <Link to="/" className="signup-link">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};
export default Login;