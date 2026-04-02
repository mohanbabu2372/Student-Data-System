package com.datapro.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.datapro.Model.Student;
import com.datapro.Repository.StudentRepo;

@Service
public class StudentServiceImp implements StudentService{
	
	@Autowired
	private StudentRepo repo;	
	
	@Override
	public Student addStudent(Student student) {
		// TODO Auto-generated method stub
		return repo.save(student);
	}

	@Override
	public Student updateStudent(Student student) {
		// TODO Auto-generated method stub
		return repo.save(student);
	}

	@Override
	public Student deleteStudent(Long std_id) {
		// TODO Auto-generated method stub
			repo.deleteById(std_id);
		return null;
	}

	@Override
	public List<Student> allStudents() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public Student listStudent(Long std_id) {
		// TODO Auto-generated method stub
		return repo.findById(std_id).get();
	}

}
