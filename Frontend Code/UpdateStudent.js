import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateStudent() {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { std_id } = useParams(); // student std_id from route
    const fileInputRef = useRef(null);

    const [student, setStudent] = useState({
        std_id: "",
        std_name: "",
        std_fname: "",
        std_mname: "",
        std_dob: "",
        std_email: "",
        std_phone: "",
        std_course: "",
        std_gender: "",
        std_sports: "",
        std_photo: null, // file or base64 string
    });

    // Load student details on mount
    useEffect(() => {
        axios
            .get(`http://localhost:8095/student/displayStudent/${std_id}`)
            .then((res) => {
                const s = res.data;
                setStudent({
                    ...s,
                    std_photo: s.std_photo
                        ? `data:image/jpeg;base64,${s.std_photo}` // Base64 string for preview
                        : null,
                });
            })
            .catch((err) => {
                console.error("Error fetching student:", err);
            });
    }, [std_id]);

    const updateStudent = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("std_name", student.std_name);
            formData.append("std_fname", student.std_fname);
            formData.append("std_mname", student.std_mname);
            formData.append("std_dob", student.std_dob);
            formData.append("std_email", student.std_email);
            formData.append("std_phone", student.std_phone);
            formData.append("std_course", student.std_course);
            formData.append("std_gender", student.std_gender);
            formData.append("std_sports", student.std_sports);

            if (student.std_photo instanceof File) {
                formData.append("std_photo", student.std_photo); // only append if new file
            }

            await axios.put(
                `http://localhost:8095/student/update/${std_id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            setMessage("Student updated successfully!");
            setTimeout(() => {
                navigate("/view");
            }, 1000);
        } catch (error) {
            console.error("Error updating Student:", error);
            setMessage("Failed to update Student. Please try again.");
        }
    };

    const changedData = (e) => {
        const { name, value, files } = e.target;
        if (name === "std_photo") {
            if (files && files.length > 0) {
                setStudent({ ...student, std_photo: files[0] });
            }
        } else {
            setStudent({ ...student, [name]: value });
        }
    };

    return (
        <div className="container text-center mt-3 mb-3">
            <form
                onSubmit={updateStudent}
                className="form text-center w-50 mt-3 p-5 m-auto border border-dark rounded"
                method="post"
                encType="multipart/form-data"
            >
                <h2>Update Student</h2>
                {message && <p className="alert alert-info">{message}</p>}

                <input
                    type="text"
                    placeholder="Student Name"
                    name="std_name"
                    value={student.std_name}
                    onChange={changedData}
                    className="form-control p-2 rounded-pill"
                /><br />

                <input
                    type="text"
                    placeholder="Student Father Name"
                    name="std_fname"
                    value={student.std_fname}
                    onChange={changedData}
                    className="form-control p-2 rounded-pill"
                /><br />

                <input
                    type="text"
                    placeholder="Student Mother Name"
                    name="std_mname"
                    value={student.std_mname}
                    onChange={changedData}
                    className="form-control p-2 rounded-pill"
                /><br />

                <input
                    type="date"
                    placeholder="Student DOB"
                    name="std_dob"
                    value={student.std_dob}
                    onChange={changedData}
                    className="form-control p-2 rounded-pill"
                /><br />

                <input
                    type="text"
                    placeholder="Student Phone Number"
                    name="std_phone"
                    value={student.std_phone}
                    onChange={changedData}
                    className="form-control p-2 rounded-pill"
                /><br />

                <input
                    type="email"
                    placeholder="Student Email"
                    name="std_email"
                    value={student.std_email}
                    onChange={changedData}
                    className="form-control p-2 rounded-pill"
                /><br />

                Student Gender :
                <input
                    type="radio"
                    name="std_gender"
                    value="Male"
                    checked={student.std_gender === "Male"}
                    onChange={changedData}
                    className="form-check-input"
                /> Male
                <input
                    type="radio"
                    name="std_gender"
                    value="Female"
                    checked={student.std_gender === "Female"}
                    onChange={changedData}
                    className="form-check-input"
                /> Female
                <br /><br />

                <input
                    type="text"
                    placeholder="Student Course"
                    name="std_course"
                    value={student.std_course}
                    onChange={changedData}
                    className="form-control p-2 rounded-pill"
                /><br />

                <input
                    type="text"
                    placeholder="Student Sports"
                    name="std_sports"
                    value={student.std_sports}
                    onChange={changedData}
                    className="form-control p-2 rounded-pill"
                /><br />

                <input
                    type="file"
                    placeholder="Student Photo"
                    name="std_photo"
                    onChange={changedData}
                    ref={fileInputRef}
                    className="form-control p-2 rounded-pill"
                /><br />

                {student.std_photo && !(student.std_photo instanceof File) && (
                    <img
                        src={student.std_photo}
                        alt="Current"
                        className="img-thumbnail mt-2"
                        style={{ maxWidth: "150px" }}
                    />
                )}

                {student.std_photo instanceof File && (
                    <img
                        src={URL.createObjectURL(student.std_photo)}
                        alt="Preview"
                        className="img-thumbnail mt-2"
                        style={{ maxWidth: "150px" }}
                    />
                )}
                <br /><br />

                <input type="submit" className="btn btn-primary" value="Update Student" />
            </form>
        </div>
    );
}

export default UpdateStudent;
