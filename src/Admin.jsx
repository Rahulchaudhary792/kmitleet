import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Admin.css';
import ModalContent from './ModalContent';
const Admin = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = (item) => {
    setSelectedItem(item);
  };
  const closeModal = () => {
    setSelectedItem(null);
  };
  useEffect(() => {
	const fetchData = async () => {
		try {
			const response = await fetch('../backend/all_codes.json');
			const res = await fetch('http://localhost:3000/get-scores');
			const dat = await response.json();
			setData(dat);
		}
		catch(error) {
			console.log(error);
		}
	}
	fetchData();
}, [data]);
const convertToCsv = (data) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));
    for (const row of data) {
      const values = headers.map(header => {
        const escaped = ('' + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }
    return csvRows.join('\n');
  };
  const handleDownload = () => {
    const csv = convertToCsv(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'data.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return (
	<div style={{"color": "white", "backgroundColor": "black", "width": "100vw", "height": "100vh", "position": "relative", "bottom": "20px", "padding": "20px 10px"}}>
	<h2 style={{"textAlign": "center", "marginTop": "20px"}}>SUBMISSIONS</h2>
    <div style={{"display": "grid", "gridTemplateColumns": "1fr 1fr 1fr 1fr", "placeItems": "center", "marginTop": "30px"}}>
         <div><h3>NAME</h3></div>
         <div><h3>SIMILARITY</h3></div>
         <div><h3>CODE</h3></div>
         <div><h3>STATUS</h3></div>
    </div>
    <div style={{"display": "flex", "justifyContent": "center", "alignItems": "center"}}>
       <hr style={{"marginTop": "20px", "width": "95%"}}/>
    </div>
	   {data.map(item => (
      <div style={{"display": "grid", "gridTemplateColumns": "1fr 1fr 1fr 1fr", "placeItems": "center", "marginTop": "30px"}}>
        <div>
          <h4 style={{"color": "white"}}>{item.Name}</h4>
        </div>
        <div>
          {item.copy  == 'not copied' ?
             <h4 style={{"color": "blue"}}>{item.copy}</h4>
            : <h4 style={{"color": "red"}}>{item.copy}</h4>
          }
        </div>	
        <div>
          <h4 onClick={()=>openModal(item)} style={{"cursor": "pointer"}}>code</h4>
        </div>
        <div>
          {item.Status == 'Accepted' ?
            <h4 style={{"color": "green"}}>{item.Status}</h4>
          : <h4 style={{"color": "red"}}>{item.Status}</h4>}
        </div>
      </div>
	   )) 
	}
    <div style={{"display": "flex", "justifyContent": "center", "alignItems": "center", "marginTop": "50px"}}>
      <button style={{"padding": "10px 20px", "borderRadius": "10px", "border": "none", "color": "white", "backgroundColor": "green", "fontSize": "15px"}} onClick={handleDownload}><b>Download</b></button>
    </div>
	<Modal
        isOpen={selectedItem !== null}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
	>
        {selectedItem && (
          <ModalContent item={selectedItem} onClose={closeModal} />
        )}
  </Modal>
  </div>
  )
}
export default Admin