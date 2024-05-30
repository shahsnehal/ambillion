package com.ambillion.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ambillion.api.dao.UserRepository;
import com.ambillion.api.entity.User;
import com.ambillion.api.enums.Role;
import com.ambillion.api.enums.UserStatus;

import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	public List<User> getAllUsers() {

		return userRepository.findAll();
	}

	public Optional<User> getUserById(final Long id) {

		return userRepository.findById(id);
	}

	public User saveUser(final User user) {

		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	public void deleteUser(final Long id) {

		userRepository.deleteById(id);
	}

	public User registerManufacturer(final User user) {

		user.setRole(Role.MANUFACTURER);
		user.setStatus(UserStatus.PENDING);

		return saveUser(user);
	}

	public User addAgent(final User user, final Role role, final String country) {

		user.setRole(role);
		user.setCountry(country);
		user.setStatus(UserStatus.APPROVED);

		return saveUser(user);
	}

	public void approveManufacturer(final Long userId) {

		log.debug("Approving manufacturer with ID: {}", userId);
		final Optional<User> optionalUser = userRepository.findById(userId);
		if (optionalUser.isPresent()) {
			final User user = optionalUser.get();
			user.setStatus(UserStatus.APPROVED);
			userRepository.save(user);
		} else {
			log.error("Manufacturer with ID {} not found", userId);
		}
	}

	public void rejectManufacturer(final Long userId) {

		log.debug("Rejecting manufacturer with ID: {}", userId);
		final Optional<User> optionalUser = userRepository.findById(userId);
		if (optionalUser.isPresent()) {
			final User user = optionalUser.get();
			user.setStatus(UserStatus.REJECTED);
			userRepository.save(user);
		} else {
			log.error("Manufacturer with ID {} not found", userId);
		}
	}

	public Optional<User> loginUser(final String email, final String password) {

		log.debug("Logging in user with email: {}", email);
		final Optional<User> optionalUser = userRepository.findByEmail(email);
		if (optionalUser.isPresent()) {
			final User user = optionalUser.get();
			if (passwordEncoder.matches(password, user.getPassword())) {
				return Optional.of(user);
			}
		}
		return Optional.empty();
	}
}
