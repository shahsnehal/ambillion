package com.ambillion.api.util;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.DateTimeException;

import org.springframework.boot.jackson.JsonComponent;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import lombok.extern.log4j.Log4j2;

@JsonComponent
@Log4j2
public class ApplicationTimestampSerializer extends JsonSerializer<Timestamp> {

	final SimpleDateFormat formatterMMDDYYYY = new SimpleDateFormat(ApplicationConstants.TIMESTAMP_FORMATTER);

	@Override
	public void serialize(final Timestamp value, final JsonGenerator gen, final SerializerProvider serializers) throws IOException {

		if (value != null) {
			try {
				final String output = formatterMMDDYYYY.format(value);
				gen.writeString(output);
			} catch (final DateTimeException dte) {
				log.error(dte.getMessage());
			}

		} else {
			gen.writeNull();
		}

	}

}