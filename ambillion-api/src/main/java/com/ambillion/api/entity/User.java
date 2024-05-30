package com.ambillion.api.entity;

import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.ambillion.api.enums.Role;
import com.ambillion.api.enums.UserStatus;
import com.ambillion.api.util.ApplicationViews;
import com.fasterxml.jackson.annotation.JsonView;

import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {

	@JsonView(ApplicationViews.DTOView.class)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "userid")
	private Long id;

	@JsonView(ApplicationViews.DTOView.class)
	@NotBlank(message = "First Name is mandatory")
	@Column(name = "firstName", length = 25, nullable = false)
	private String firstName;

	@JsonView(ApplicationViews.DTOView.class)
	@NotBlank(message = "Last Name is mandatory")
	@Column(length = 25, nullable = false)
	private String lastName;

	@JsonView(ApplicationViews.DTOView.class)
	@Column(length = 100, nullable = true)
	private String company;

	@JsonView(ApplicationViews.DTOView.class)
	@Email(message = "Email should be valid")
	@NotBlank(message = "Email is mandatory")
	@Column(length = 100, nullable = false, unique = true)
	private String email;

	@NotBlank(message = "Password is mandatory")
	@Column(length = 250, nullable = false)
	private String password;

	@JsonView(ApplicationViews.DTOView.class)
	@Enumerated(EnumType.STRING)
	@Column(length = 20, nullable = false)
	private Role role;

	@JsonView(ApplicationViews.DTOView.class)
	@Column(length = 50, nullable = true)
	private String country;

	@JsonView(ApplicationViews.DTOView.class)
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(updatable = false, nullable = false)
	private Date registeredDate;

	@Enumerated(EnumType.STRING)
	@Column(length = 20, nullable = false)
	private UserStatus status;

	@UpdateTimestamp
	@Column(name = "audit_timestamp", nullable = false)
	private Timestamp auditTimestamp;

}
