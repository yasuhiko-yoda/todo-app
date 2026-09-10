package com.yodayasu.backend.controller;

import com.yodayasu.backend.dto.TaskForm;
import com.yodayasu.backend.dto.TaskResponse;
import com.yodayasu.backend.entity.TaskEntity;
import com.yodayasu.backend.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    List<TaskResponse> index() { return taskService.findAllTasks();}

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskResponse store(@Valid @RequestBody TaskForm form, Authentication authentication) {
        return taskService.create(
                form,
                authentication.getName()
        );
    }

    @GetMapping("/{task_id}")
    public TaskResponse getTaskById(@PathVariable("task_id") Long taskId) {
        return taskService.findTask(taskId);
    }

    @PutMapping("/{task_id}")
    public TaskResponse update(@PathVariable("task_id") Long taskId, @Valid @RequestBody TaskForm form) {
        return taskService.update(taskId, form);
    }

    @DeleteMapping("/{task_id}")
    public void delete(@PathVariable("task_id") Long taskId) {
        taskService.delete(taskId);
    }


}

