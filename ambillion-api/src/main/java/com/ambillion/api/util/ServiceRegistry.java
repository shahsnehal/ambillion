package com.ambillion.api.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ambillion.api.service.UserService;

import lombok.Getter;

@Component
@Getter
public class ServiceRegistry {

	@Autowired
	UserService userService;
}
