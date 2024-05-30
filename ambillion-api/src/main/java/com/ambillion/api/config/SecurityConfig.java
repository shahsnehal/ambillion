package com.ambillion.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	AuthenticationManager authenticationManagerBean(final AuthenticationConfiguration authenticationConfiguration) throws Exception {

		return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean
	SecurityFilterChain securityFilterChain(final HttpSecurity httpSecurity) throws Exception {

		httpSecurity.csrf(CsrfConfigurer::disable).authorizeHttpRequests(requests -> requests.anyRequest().permitAll())
				.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		return httpSecurity.build();
	}

	@Bean
	BCryptPasswordEncoder passwordEncoder() {

		return new BCryptPasswordEncoder();
	}
}
