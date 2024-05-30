/**
 * The <code>AmbillionApplication</code> responsible start this application as Spring Application
 *
 * @author CPJRS
 */
package com.ambillion.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableJpaRepositories
@EnableJpaAuditing
@EnableAsync
@EnableTransactionManagement
public class AmbillionApplication {

	public static void main(final String[] args) {

		SpringApplication.run(AmbillionApplication.class, args);
	}

}
