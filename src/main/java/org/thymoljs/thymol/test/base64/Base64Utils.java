package org.thymoljs.thymol.test.base64;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class Base64Utils {

	private Base64Utils() {
	}

	public static String encode(String value) {
		return Base64.getEncoder().encodeToString(value.getBytes(StandardCharsets.UTF_8));
	}

	public static String decode(String value) {
		byte[] decodedValue = Base64.getDecoder().decode(value);
		return new String(decodedValue, StandardCharsets.UTF_8);
	}

}
