package com.yodayasu.backend.config;

import com.yodayasu.backend.service.AppUserDetailsService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {
    @Value("${app.frontend-url}")
    private String frontendUrl;
    @Bean
    @Order(1)
    SecurityFilterChain securityFilterChain (
            HttpSecurity http,
            DaoAuthenticationProvider authenticationProvider
    ) throws Exception {
        http
                .cors(cors ->
                        cors.configurationSource(corsConfigurationSource())
                )
                .securityMatcher("/api/**")
                .authenticationProvider(authenticationProvider)
                .csrf(Customizer.withDefaults())
                .authorizeHttpRequests( auth -> auth
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/login"
                        ).permitAll()
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/auth/status",
                                        "/api/csrf"
                                ).permitAll()
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

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of(frontendUrl)
        );

        configuration.setAllowedMethods(
                List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")
        );

        configuration.setAllowedHeaders(
                List.of("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/api/**", configuration);

        return source;
    }
}




