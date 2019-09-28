package com.ajovanov.developer.srca;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SrcaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SrcaApplication.class, args);
	}

}
