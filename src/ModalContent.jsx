import React from 'react'
const ModalContent = ({ item, onClose }) => {
  const arr = item.Code.split("\n")
  console.log(arr);
  return (
	<div>
	  <h2 style={{"textAlign": "center"}}>{item.Name}</h2>
      <div style={{"marginTop": "30px"}}>
		 {arr.map((i) => (
			<p>{i}</p>
		 ))}
	  </div>
      <button onClick={onClose} style={{"position": "absolute", "top": "20px", "right": "20px", "color": "white", "backgroundColor": "red", "padding": "5px 15px", "borderRadius": "5px", "border": "none"}}>Close</button>
	</div>
  )
}

export default ModalContent
