package com.yodayasu.backend.dto;

import java.time.LocalDateTime;

public record TaskResponse(
        Long taskId,
        Long userId,
        String taskContent,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        boolean completed
) {

}
