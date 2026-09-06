package com.yodayasu.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskForm {
    @NotBlank(message = "タスクを入力してください")
    private  String taskContent;

    private boolean completed;
}
