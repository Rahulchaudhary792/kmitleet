import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
/*import { DiCodeBadge } from "react-icons/di";*/
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const dat = await response.json();
    if (response.ok) {
      toast.success(dat.message);
      navigate("/login");
    }
    else {
      toast.error(dat.message);
    }
    /*try {
      const response = await fetch("https://sheetcoder-backend.vercel.app/auth/signup", {method: 'POST', body: JSON.stringify(data), 'Content-Type': 'application/json'});
      console.log(response.message);
    } catch (error) {
      console.log(error);
    }*/
  };

  return (
    <div className="signup-container">
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
      <div className="signup-box">
        <div className="logo-title">
          {/*<DiCodeBadge size="50px" />*/}
          <span>KmitLeet</span>
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
          />
          <button className="submit-btn" type="submit">
            Sign Up
          </button>
        </form>
        <div className="have-account-container">
          <p>Have an account? </p>
          <Link to='/login'>Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
