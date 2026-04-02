import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ViewStudent(){
    const [student,setStudent]=useState([]);
    const [message,setMessage]=useState('');
    const navigate=useNavigate();

    useEffect(()=>{
        fetchStudent();
    },[]);

    const fetchStudent = async () =>{
        try{
            let res=await axios.get("http://localhost:8095/student/");
            console.log(res.data);
            setStudent(res.data);
        }catch(error){
            console.error("There is error in fetch the data");
        }
    }

    async function handleDelete(std_id){
        try{
            const resp= await axios.delete(`http://localhost:8095/student/deleteStudent/${std_id}`)
            console.log('Student Deleted',resp);
            setMessage("Student Deleted successfully!");
            fetchStudent();
        }catch(error){
            console.error(error);
            setMessage("Failed to Delete Student. Please try again.");
        }

    }

    async function handleUpdate(std_id){
        navigate(`/student/updateStudent/${std_id}`)
    }

    return(
        <>
            <div className="container mt-4">
                <h1 className="text-center m-3">Student List</h1>
                {message && <p className="alert alert-info text-center">{message}</p>}
                <table className="table table-bordered text-center table-hover align-middle">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Father Name</th>
                            <th>Mother Name</th>
                            <th>Student DOB</th>
                            <th>Student Email</th>
                            <th>Phone Number</th>
                            <th>Student Course</th>
                            <th>Student Gender</th>
                            <th>Student Sports</th>
                            <th>Student Photo</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {student.map((s)=>(
                            <tr key={s.std_id}>
                                <td>{s.std_id}</td>
                                <td>{s.std_name}</td>
                                <td>{s.std_fname}</td>
                                <td>{s.std_mname}</td>
                                <td>{s.std_dob}</td>
                                <td>{s.std_email}</td>
                                <td>{s.std_phone}</td>
                                <td>{s.std_course}</td>
                                <td>{s.std_gender}</td>
                                <td>{s.std_sports}</td>
                                <td>{s.std_photo ? (<img src={`data:image/jpeg;base64,${s.std_photo}`} alt='std_photo' width={"80px"} height={"80px"}/>) : (<span>No Photo</span>)}</td>
                                <td><button className="btn btn-warning" onClick={()=>{handleUpdate(s.std_id)}}>Update</button></td>
                                <td><button className="btn btn-danger" onClick={()=>{handleDelete(s.std_id)}}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ViewStudent;