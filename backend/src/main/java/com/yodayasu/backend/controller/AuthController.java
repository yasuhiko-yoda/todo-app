package com.yodayasu.backend.controller;

import com.yodayasu.backend.dto.AuthResponse;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @GetMapping("/status")
    public AuthResponse status(Authentication authentication) {

        boolean authenticated = authentication != null
                && !(authentication instanceof AnonymousAuthenticationToken)
                && authentication.isAuthenticated();

        return new AuthResponse(
                authenticated,
                authenticated ? authentication.getName() : "",
                authenticated && hasAdminAuthority(authentication)
        );
    }

    private boolean hasAdminAuthority(Authentication authentication) {
        return authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch("ADMIN"::equals);
    }
//    public Map<String, Object> status(Authentication authentication) {
//        var authenticated = authentication != null
//                && !(authentication instanceof AnonymousAuthenticationToken)
//                && authentication.isAuthenticated();
//
//        return new AuthResponse(
//                authenticated,
//                authenticated ? authentication.getName() : "",
//                authenticated && hasAdminAuthority(authentication)
//        );
//    }

//    private boolean hasRoleAdmin(Authentication authentication) {
//        return authentication.getAuthorities()
//                .stream()
//                .map(GrantedAuthority::getAuthority)
//                .anyMatch("ADMIN"::equals);
//    }
}

