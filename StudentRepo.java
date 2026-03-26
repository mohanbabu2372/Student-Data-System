package com.datapro.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.datapro.Model.Student;

@Repository
public interface StudentRepo extends JpaRepository<Student, Long> {

}
