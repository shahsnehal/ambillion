package com.ambillion.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CustomErrorController implements ErrorController {

	@RequestMapping("/error")
	public ResponseEntity<CustomErrorResponse> handleError(final HttpServletRequest request) {

		final Object status = request.getAttribute("javax.servlet.error.status_code");
		final HttpStatus httpStatus = status != null ? HttpStatus.valueOf(Integer.parseInt(status.toString())) : HttpStatus.INTERNAL_SERVER_ERROR;

		final CustomErrorResponse errorResponse = new CustomErrorResponse(httpStatus.value(), httpStatus.getReasonPhrase());
		return new ResponseEntity<>(errorResponse, httpStatus);
	}

	public String getErrorPath() {

		return "/error";
	}
}

class CustomErrorResponse {

	private int status;
	private String error;

	public CustomErrorResponse(final int status, final String error) {

		this.status = status;
		this.error = error;
	}

	// Getters and setters
	public int getStatus() {

		return status;
	}

	public void setStatus(final int status) {

		this.status = status;
	}

	public String getError() {

		return error;
	}

	public void setError(final String error) {

		this.error = error;
	}
}
