package com.ambillion.api.util;

import java.io.IOException;
import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.boot.jackson.JsonComponent;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import lombok.extern.log4j.Log4j2;

@JsonComponent
@Log4j2
public class ApplicationLocalDateSerializer extends JsonSerializer<LocalDate> {

	final DateTimeFormatter formatterMMDDYYYY = DateTimeFormatter.ofPattern(ApplicationConstants.DATE_FORMATTER);

	@Override
	public void serialize(final LocalDate value, final JsonGenerator gen, final SerializerProvider serializers) throws IOException {

		if (value != null) {
			try {
				final String output = value.format(formatterMMDDYYYY);
				gen.writeString(output);
			} catch (final DateTimeException dte) {
				log.error(dte.getMessage());
			}

		} else {
			gen.writeNull();
		}
	}

}