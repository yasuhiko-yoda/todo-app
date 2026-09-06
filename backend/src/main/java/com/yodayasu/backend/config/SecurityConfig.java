package com.yodayasu.backend.config;

import com.yodayasu.backend.service.AppUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
public class SecurityConfig {
    @Bean
    @Order(1)
    SecurityFilterChain securityFilterChain (
            HttpSecurity http,
            DaoAuthenticationProvider authenticationProvider
    ) throws Exception {
        http
                .securityMatcher("/api/**")
                .authenticationProvider(authenticationProvider)
                .csrf(csrf -> csrf.disable())
//                .csrf(csrf -> csrf
//                        .ignoringRequestMatchers(
//                                "/api/login",
//                                "/api/logout",
//                                "/api/tasks",
//                                "/api/tasks/**"
//                        )
//                )
                .authorizeHttpRequests( auth -> auth
                        .requestMatchers(HttpMethod.POST, "/api/login")
                                .permitAll().requestMatchers(HttpMethod.GET, "/api/auth/status").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/api/tasks").hasAuthority("ADMIN")
//                        .requestMatchers(HttpMethod.GET, "/api/tasks/**").hasAuthority("ADMIN")
                        .anyRequest().authenticated()
                )
                .formLogin(login -> login
                        .loginProcessingUrl("/api/login")
                        .successHandler((request, response, authentication) -> {
                            response.setStatus(HttpStatus.OK.value());
                            response.setContentType("application/json;charset=UTF-8");
                            response.getWriter().write("{\"authenticated\":true}");
                        })
                        .failureHandler((request, response, exception) -> {
                            response.sendError(HttpStatus.UNAUTHORIZED.value());
                        })
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/api/logout")
                        .logoutSuccessHandler((request, response, authentication) -> {
                            response.setStatus(HttpStatus.NO_CONTENT.value());
                        })
                        .permitAll()
                )
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                );
        return http.build();
    }

    @Bean
    DaoAuthenticationProvider authenticationProvider(
            AppUserDetailsService appUserDetailsService,
            PasswordEncoder passwordEncoder
    ) {
        var provider = new DaoAuthenticationProvider(appUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}




