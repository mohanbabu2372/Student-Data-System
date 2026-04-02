import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function AddStudent(){
    const[message,setMessage]=useState('');
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const[student,setStudent]=useState({
        std_id : '',
        std_name : '',
        std_fname : '',
        std_mname : '',
        std_dob : '',
        std_email : '',
        std_phone : '',
        std_course : '',
        std_gender : '',
        std_sports : '',
        std_photo :''
    });

    const newStudent = async(e) => {
        e.preventDefault();
        
        try{
            const formData = new FormData();
            formData.append("std_name", std_name);
            formData.append("std_fname", std_fname);
            formData.append("std_mname", std_mname);
            formData.append("std_dob", std_dob);
            formData.append("std_email", std_email);
            formData.append("std_phone", std_phone);
            formData.append("std_course", std_course);
            formData.append("std_gender", std_gender);
            formData.append("std_sports", std_sports);
            if (std_photo) {
            formData.append("std_photo", std_photo);
            }

            await axios.post("http://localhost:8095/student/addStudent", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            });

            setMessage("Student Added  successfully!");
            setStudent({
                std_name : '',
                std_fname : '',
                std_mname : '',
                std_dob : '',
                std_email : '',
                std_phone : '',
                std_course : '',
                std_gender : '',
                std_sports : '',
                std_photo : null
            });
            fileInputRef.current.value = "";
            setTimeout(()=>{
                navigate('/view');
            },2000)
        }catch(error){
            console.error("Error adding Student:", error);
            setMessage('Failed to add Student. Please try again.');
        }    
    }

    const {std_name,std_fname,std_mname,std_dob,std_email,std_course,std_sports,std_phone,std_gender,std_photo}=student;

    const changedData = (e) => {
        const { name, value, files } = e.target;
        if (name === "std_photo") {
            setStudent({ ...student, [name]: files[0] }); 
        } else {
            setStudent({ ...student, [name]: value });
        }
    };

    return(
        <>
            <div className="container text-center mt-3 mb-3" >
                <form onSubmit={newStudent} className="form text-center w-50 mt-3 p-5 m-auto border border-dark rounded t-center" method="post" encType="multipart/form-data">
                    <h2>Add Student</h2>
                    {message && <p className="alert alert-info">{message}</p>}
                    <input type="text" placeholder="Student Name" name="std_name" value={std_name} onChange={changedData} className="form-control p-2 rounded-pill"/><br/>
                    <input type="text" placeholder="Student Father Name" name="std_fname" value={std_fname} onChange={changedData} className="form-control p-2 rounded-pill"/><br/>
                    <input type="text" placeholder="Student Mother Name" name="std_mname" value={std_mname} onChange={changedData} className="form-control p-2 rounded-pill"/><br/>
                    <input type="date" placeholder="Student DOB" name="std_dob" value={std_dob} onChange={changedData} className="form-control p-2 rounded-pill"/><br/>
                    <input type="text" placeholder="Student Phone Number" name="std_phone" value={std_phone} onChange={changedData} className="form-control p-2 rounded-pill"/><br/>
                    <input type="email" placeholder="Student Email" name="std_email" value={std_email} onChange={changedData} className="form-control p-2 rounded-pill"/><br/>
                    Student Gender : <input type="radio" name="std_gender" value="Male" checked={std_gender === "Male"}  onChange={changedData} className="form-check-input"/>Male
                    <input type="radio" name="std_gender" value="Female" checked={std_gender === "Female"}  onChange={changedData} className="form-check-input"/>FeMale <br/><br/>
                    <input type="text" placeholder="Student Course" name="std_course" value={std_course} onChange={changedData} className="form-control p-2 rounded-pill"/><br/>
                    <input type="text" placeholder="Student Sports" name="std_sports" value={std_sports} onChange={changedData} className="form-control p-2 rounded-pill"/><br/>
                    <input type="file" placeholder="Student Photo" name="std_photo" onChange={changedData} ref={fileInputRef}  className="form-control p-2 rounded-pill"/><br/>
                    {student.std_photo && (
                    <img src={URL.createObjectURL(student.std_photo)}  alt="Preview"
                    className="img-thumbnail mt-2"
                    style={{ maxWidth: "150px" }} /> )} <br/><br/>
                    <input type="submit" className="btn btn-primary"/>
                </form>
            </div>
        </>
    )
}

export default AddStudent;