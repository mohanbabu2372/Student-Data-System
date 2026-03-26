package com.datapro.Controllers;

import java.io.IOException;
import java.sql.Date;  
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.datapro.Model.Student;
import com.datapro.Service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "*")
public class StudentControllers {
    @Autowired 
    private StudentService service;
    
    @GetMapping({"/","AllStudents"})
    public List<Student> allStudents(){
        return service.allStudents();
    }
    
    @PostMapping(value="/addStudent" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)    
    public Student addStudent(
                                @RequestParam("std_name") String stdName,
                                @RequestParam("std_fname") String stdFName,
                                @RequestParam("std_mname") String stdMName,
                                @RequestParam("std_dob") 
                                @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate stdDob,
                                @RequestParam("std_email") String stdEmail,
                                @RequestParam("std_phone") Long stdPhone,
                                @RequestParam("std_course") String stdCourse,
                                @RequestParam("std_gender") String stdGender,
                                @RequestParam("std_sports") String stdSports,
                                @RequestParam(value="std_photo",required =false) MultipartFile file
                                ) throws IOException {
        Student student=new Student();
        student.setStd_name(stdName);
        student.setStd_fname(stdFName);
        student.setStd_mname(stdMName);
        student.setStd_dob(Date.valueOf(stdDob));
        student.setStd_email(stdEmail);
        student.setStd_phone(stdPhone);
        student.setStd_course(stdCourse);
        student.setStd_gender(stdGender);
        student.setStd_sports(stdSports);
        if (file != null && !file.isEmpty()) {
            student.setStd_photo(file.getBytes());
        } else {
            student.setStd_photo(null); 
        }
        
        return service.addStudent(student);
    }
    
    @DeleteMapping("/deleteStudent/{id}")
    public String deleteStudent(@PathVariable("id") Long std_id) {
        service.deleteStudent(std_id);
        return "Student with ID " + std_id + " deleted successfully";
    }
    
    @GetMapping("/displayStudent/{id}")
    public Student listStudent(@PathVariable("id") Long std_id) {
        return service.listStudent(std_id);
    }
    
    @PutMapping(value="/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Student listStudent( @PathVariable("id") Long std_id ,
                                @RequestParam("std_name") String stdName,
                                @RequestParam("std_fname") String stdFName,
                                @RequestParam("std_mname") String stdMName,
                                @RequestParam("std_dob") 
                                @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate stdDob,
                                @RequestParam("std_email") String stdEmail,
                                @RequestParam("std_phone") Long stdPhone,
                                @RequestParam("std_course") String stdCourse,
                                @RequestParam("std_gender") String stdGender,
                                @RequestParam("std_sports") String stdSports,
                                @RequestParam(value="std_photo",required =false) MultipartFile file
                    ) throws IOException {
        Student s=service.listStudent(std_id);
        s.setStd_name(stdName);
        s.setStd_fname(stdFName);
        s.setStd_mname(stdMName);
        s.setStd_dob(Date.valueOf(stdDob));  
        s.setStd_email(stdEmail);
        s.setStd_phone(stdPhone);
        s.setStd_course(stdCourse);
        s.setStd_gender(stdGender);
        s.setStd_sports(stdSports);
        if (file != null && !file.isEmpty()) {
            s.setStd_photo(file.getBytes());
        }
        
        return service.updateStudent(s);
    }
    @GetMapping("/photo/{id}")
    public String getStudentPhotoBase64(@PathVariable("id") Long std_id) {
        Student s = service.listStudent(std_id);
        byte[] photo = s.getStd_photo();
        return Base64.getEncoder().encodeToString(photo);
    }
}
