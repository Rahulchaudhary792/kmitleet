import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import './Home.css'
import { Link } from 'react-router-dom'
const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
	 try {
		const fetchData = async () => {
			const response = await fetch('http://localhost:3000/problems');
			const dat = await response.json();
			setData(dat);
		}
		fetchData();
	}
	catch(error) {
		console.log("Some Error occurred");
	}
  }, []);
  return (
	<div>
	   <Navbar />
	   <div className="main-container" style={{"backgroundColor": "black", "width": "100vw", "height": "100vh", "position": "relative", "bottom": "20px"}}>
      <table className="problem-table">
        <thead className="table-head-col">
          <tr style={{"color": "white"}}>
            <th className="table-heading">Rank</th>
            <th className="table-heading">Title</th>
            <th className="table-heading">Difficulty</th>
            <th className="table-heading">Category</th>
          </tr>
        </thead>
		<tbody style={{"color": "white"}}>
		{data.map((doc, idx) => {
            const difficultyColor =
              doc.difficult === "Easy"
                ? "green"
                : doc.difficult === "Medium"
                ? "yellow"
                : "red";
            return (
              <tr className={`${idx % 2 === 1 ? "row-odd" : ""}`} key={doc.id}>
                <th>1</th>
                <td className="title">
                  <Link to={`/problem/${doc._id}`} style={{"color": "white"}}>{doc.title}</Link>
                </td>
                <td style={{ color: difficultyColor }}>{doc.difficult}</td>
                <td>{doc.category}</td>
              </tr>
            );
          })}
		</tbody>
	   </table>
	</div>
	</div>
  )
}
export default Home