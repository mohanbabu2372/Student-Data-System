package com.datapro.Service;

import java.util.List;

import com.datapro.Model.Student;

public interface StudentService {
	Student addStudent(Student student);
	Student updateStudent(Student student);
	Student deleteStudent(Long std_id);
	List<Student> allStudents();
	Student listStudent(Long std_id);
}
