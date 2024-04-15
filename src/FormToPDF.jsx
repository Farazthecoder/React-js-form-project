import React, { useState } from 'react'
import "./Form.css"
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';

function FormToPDF() {

    const [isVisible , setIsVisible] = useState(false)
    
    const [formData, setFormData] = useState({
        name : "",
        option : ""
    })

    const [formInfo,setFormInfo] = useState({
        nameInfo : "",
        optionInfo : ""
    })


  function handleSelectEvent(e){
    if(e.target.id == "name"){
       setFormData({...formData,name:e.target.value})
    }

    else if(e.target.id == "course"){
        setFormData({...formData,option:e.target.value})
    }
  }

  function handleSubmit(e){
   e.preventDefault()

    const formName = formData.name
    const formOption = formData.option
    setFormInfo({...formInfo,nameInfo:formName,optionInfo:formOption})

    setIsVisible(true)
  }


  function getPdf(){
    const imageContainer = document.getElementById("image-container");
    console.log(imageContainer)
   
    html2canvas(imageContainer).then((data)=>{
 
       const imageData = data.toDataURL("img/png")
    //    console.log(imageData)
 
       const document = new jsPDF("l","px","a4")

    //    console.log(document)
 
       const  width = document.internal.pageSize.width
       const  height = document.internal.pageSize.height

       document.addImage(imageData,"png",0,-10,width,height)
       document.save("Info.pdf")
 
    }).catch((err)=>{
     alert(err)
    })
   }


    
  return (
    <>
    <form action="" className='form' onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id='name' className='box' value={formData.name}  placeholder='Enter Your name' onChange={handleSelectEvent}/>
        <label htmlFor="course">Courses:</label>
        <select name="" id="course" value={formData.option}  onChange={handleSelectEvent} className='box'>
            <option value="">Select Courses</option>
            <option value="b-tech">Btech</option>
            <option value="m-tech">Mtech</option>
        </select>
        <button>Submit</button>
    </form>

    {isVisible ? <div className='details' id='image-container'>
        <h4>Date : {new Date().toLocaleDateString()}</h4>
        <h2>Name : {formInfo.nameInfo}</h2>
        <h2>Course : {formInfo.optionInfo}</h2>
    </div> : null}  
    
    {isVisible ? <button onClick={getPdf}>Generate PDF</button> : null}
    </>
  )
}

export default FormToPDF