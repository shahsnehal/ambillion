package com.ambillion.api.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.UpdateTimestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "document")
public class Document implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "document_id")
	private Integer documentId;

	@Column(name = "document_name", nullable = false, length = 50)
	private String documentName;

	@Column(name = "contentpath", nullable = true, length = 150)
	private String contentPath;

	@Column(name = "type", nullable = false, length = 50)
	private String type;

	@Column(name = "filetype", nullable = false, length = 25)
	private String fileType;

	@Column(name = "description", nullable = true, length = 200)
	private String description;

	@ToString.Exclude
	@ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
	@JoinColumn(name = "audit_user_id")
	private User auditUser;

	@UpdateTimestamp
	@Column(name = "audit_timestamp")
	private Timestamp auditTimestamp;
}
