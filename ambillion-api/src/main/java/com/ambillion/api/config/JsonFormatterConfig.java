package com.ambillion.api.config;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.TimeZone;

import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ambillion.api.util.ApplicationConstants;
import com.ambillion.api.util.ApplicationLocalDateSerializer;
import com.ambillion.api.util.ApplicationTimestampSerializer;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@Configuration
public class JsonFormatterConfig {

	@Bean
	SimpleModule customDoubleSerializerModule() {

		final SimpleModule module = new SimpleModule();
		module.addSerializer(LocalDate.class, new ApplicationLocalDateSerializer());
		module.addSerializer(Timestamp.class, new ApplicationTimestampSerializer());

		return module;
	}

	@Bean
	Jackson2ObjectMapperBuilderCustomizer customizeObjectMapper() {

		return builder -> {
			builder.modules(new JavaTimeModule(), customDoubleSerializerModule());
			builder.featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
			builder.timeZone(TimeZone.getDefault());
			builder.simpleDateFormat(ApplicationConstants.DATE_FORMATTER);

		};
	}
}
