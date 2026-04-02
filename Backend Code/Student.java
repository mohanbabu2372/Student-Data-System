package com.datapro.Model;

import java.sql.Date;
import java.util.Arrays;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "java121sbs")
public class Student {
	@Id
	@GeneratedValue
	private long std_id;
	
	@Column(length = 20)
	private String std_name;
	
	@Column(length = 20)
	private String std_fname;
	
	@Column(length = 20)
	private String std_mname;
	
	private Date std_dob;
	
	@Column(length = 20)
	private String std_email;
	
	private long std_phone;
	
	@Column(length = 20)
	private String std_course;
	
	@Column(length = 20)
	private String std_gender;
	
	@Column(length = 20)
	private String std_sports;
	
	@Lob
	@Column(name = "std_photo", columnDefinition = "BLOB")
	private byte[] std_photo;

	public Student() {
		super();
		// TODO Auto-generated constructor stub
	}

	

	public Student(long std_id, String std_name, String std_fname, String std_mname, Date std_dob, String std_email,
			long std_phone, String std_course, String std_gender, String std_sports, byte[] std_photo) {
		super();
		this.std_id = std_id;
		this.std_name = std_name;
		this.std_fname = std_fname;
		this.std_mname = std_mname;
		this.std_dob = std_dob;
		this.std_email = std_email;
		this.std_phone = std_phone;
		this.std_course = std_course;
		this.std_gender = std_gender;
		this.std_sports = std_sports;
		this.std_photo = std_photo;
	}



	public long getStd_id() {
		return std_id;
	}

	public void setStd_id(long std_id) {
		this.std_id = std_id;
	}

	public String getStd_name() {
		return std_name;
	}

	public void setStd_name(String std_name) {
		this.std_name = std_name;
	}

	public String getStd_fname() {
		return std_fname;
	}

	public void setStd_fname(String std_fname) {
		this.std_fname = std_fname;
	}

	public String getStd_mname() {
		return std_mname;
	}

	public void setStd_mname(String std_mname) {
		this.std_mname = std_mname;
	}

	public Date getStd_dob() {
		return std_dob;
	}

	public void setStd_dob(Date std_dob) {
		this.std_dob = std_dob;
	}

	public String getStd_email() {
		return std_email;
	}

	public void setStd_email(String std_email) {
		this.std_email = std_email;
	}

	public long getStd_phone() {
		return std_phone;
	}

	public void setStd_phone(long std_phone) {
		this.std_phone = std_phone;
	}

	public String getStd_course() {
		return std_course;
	}

	public void setStd_course(String std_course) {
		this.std_course = std_course;
	}

	public String getStd_gender() {
		return std_gender;
	}

	public void setStd_gender(String std_gender) {
		this.std_gender = std_gender;
	}

	public byte[] getStd_photo() {
		return std_photo;
	}

	public void setStd_photo(byte[] std_photo) {
		this.std_photo = std_photo;
	}



	public String getStd_sports() {
		return std_sports;
	}



	public void setStd_sports(String std_sports) {
		this.std_sports = std_sports;
	}

	@Override
	public String toString() {
		return "Student [std_id=" + std_id + ", std_name=" + std_name + ", std_fname=" + std_fname + ", std_mname="
				+ std_mname + ", std_dob=" + std_dob + ", std_email=" + std_email + ", std_phone=" + std_phone
				+ ", std_course=" + std_course + ", std_gender=" + std_gender + ", std_sports=" + std_sports
				+ ", std_photo=" + Arrays.toString(std_photo) + "]";
	}
	
}
