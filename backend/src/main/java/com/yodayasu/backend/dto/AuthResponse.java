package com.yodayasu.backend.dto;

import java.util.List;

public record AuthResponse(
        boolean authenticated,
        String username,
        boolean isAdmin
) {
}
