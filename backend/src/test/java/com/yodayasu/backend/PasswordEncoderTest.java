package com.yodayasu.backend;
import org.junit.jupiter.api.Test;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoderTest {
    @Test
    void generatePassword() {
        var passwordEncoder = new BCryptPasswordEncoder();

        String encodedPassword =
                passwordEncoder.encode("password");

        System.out.println(encodedPassword);
    }
}
