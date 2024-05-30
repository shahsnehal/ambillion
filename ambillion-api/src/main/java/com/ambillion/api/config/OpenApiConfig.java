package com.ambillion.api.config;

import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ambillion.api.util.ApplicationURIConstants;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class OpenApiConfig {

	@Bean
	OpenAPI customOpenAPI() {

		return new OpenAPI()
				.info(new Info().title("Spring REST API").description("Spring REST API Documentation").version("v1.0")
						.license(new License().name("Apache 2.0").url("http://springdoc.org")))
				.externalDocs(new ExternalDocumentation().description("SpringDoc OpenAPI Documentation").url("https://springdoc.org/"));
	}

	@Bean
	GroupedOpenApi publicApi() {

		return GroupedOpenApi.builder().group("public").pathsToMatch(ApplicationURIConstants.API_BASE_URL + "/**").build();
	}
}
