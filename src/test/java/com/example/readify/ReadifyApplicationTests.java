package com.example.readify;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootTest
class ReadifyApplicationTests {

	@Test
	void contextLoads() {
	}

	@RestController
	class TempController {
		@GetMapping("/test")
		public String test() {
			return "Temporary Test Endpoint";
		}
	}


}
