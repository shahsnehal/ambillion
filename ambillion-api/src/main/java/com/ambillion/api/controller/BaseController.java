package com.ambillion.api.controller;

import org.springframework.beans.factory.annotation.Autowired;

import com.ambillion.api.util.ApplicationURIConstants;
import com.ambillion.api.util.ServiceRegistry;

import lombok.Getter;

@Getter
public class BaseController extends ApplicationURIConstants {

	@Autowired
	ServiceRegistry serviceRegistry;

}
