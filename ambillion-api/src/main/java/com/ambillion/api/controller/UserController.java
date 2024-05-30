package com.ambillion.api.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ambillion.api.entity.User;
import com.ambillion.api.enums.Role;
import com.ambillion.api.service.UserService;
import com.ambillion.api.util.ApplicationURIConstants;
import com.ambillion.api.util.ApplicationViews;
import com.ambillion.api.util.ServiceRegistry;
import com.fasterxml.jackson.annotation.JsonView;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(ApplicationURIConstants.API_USERSERVICE_URL)
@Tag(name = "User", description = "User Management APIs")
public class UserController extends BaseController {

	@Autowired
	private ServiceRegistry serviceRegistry;

	private UserService getUserService() {

		return serviceRegistry.getUserService();
	}

	@GetMapping
	@Operation(summary = "Get all users", description = "Retrieve a list of all users")
	@JsonView(ApplicationViews.DTOView.class)
	public List<User> getAllUsers() {

		return getUserService().getAllUsers();
	}

	@GetMapping(ID_PARAMATER_API)
	@Operation(summary = "Get user by ID", description = "Retrieve a user by their ID")
	public ResponseEntity<User> getUserById(@Parameter(description = "ID of the user to be retrieved") @PathVariable final Long id) {

		return getUserService().getUserById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@PostMapping(USERREGISTER_API)
	@Operation(summary = "Register manufacturer", description = "Register a new manufacturer")
	@JsonView(ApplicationViews.DTOView.class)
	public ResponseEntity<User> registerManufacturer(@Valid @RequestBody final User user) {

		return ResponseEntity.ok(getUserService().registerManufacturer(user));
	}

	@PostMapping(ADDAGENT_API)
	@Operation(summary = "Add agent", description = "Add a new origin or destination agent")
	@JsonView(ApplicationViews.DTOView.class)
	public ResponseEntity<User> addAgent(@Valid @RequestBody final User user, @RequestParam final Role role, @RequestParam final String country) {

		if (role == Role.ORIGIN_AGENT || role == Role.DESTINATION_AGENT) {
			return ResponseEntity.ok(getUserService().addAgent(user, role, country));
		} else {
			return ResponseEntity.badRequest().build();
		}
	}

	@PutMapping(ID_PARAMATER_API)
	@Operation(summary = "Update user", description = "Update an existing user")
	@JsonView(ApplicationViews.DTOView.class)
	public ResponseEntity<User> updateUser(@Parameter(description = "ID of the user to be updated") @PathVariable final Long id,
			@Valid @RequestBody final User user) {

		if (getUserService().getUserById(id).isPresent()) {
			user.setId(id);
			return ResponseEntity.ok(getUserService().saveUser(user));
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PutMapping(APPROVE_USER_API)
	@Operation(summary = "Approve manufacturer", description = "Approve a manufacturer by admin")
	public ResponseEntity<Void> approveManufacturer(@Parameter(description = "ID of the manufacturer to be approved") @PathVariable final Long userId) {

		getUserService().approveManufacturer(userId);
		return ResponseEntity.ok().build();
	}

	@PutMapping(REJECT_USER_API)
	@Operation(summary = "Reject manufacturer", description = "Reject a manufacturer by admin")
	public ResponseEntity<Void> rejectManufacturer(@Parameter(description = "ID of the manufacturer to be rejected") @PathVariable final Long userId) {

		getUserService().rejectManufacturer(userId);
		return ResponseEntity.ok().build();
	}

	@PostMapping(LOGIN_API)
	@Operation(summary = "Login user", description = "Login a user with email and password")
	public ResponseEntity<User> loginUser(@RequestParam final String email, @RequestParam final String password) {

		final Optional<User> user = getUserService().loginUser(email, password);
		return user.map(ResponseEntity::ok).orElse(ResponseEntity.badRequest().build());
	}

}
