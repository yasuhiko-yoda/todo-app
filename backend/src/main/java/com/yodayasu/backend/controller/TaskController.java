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
    List<TaskResponse> index(Authentication authentication) { return taskService.findAllTasks(authentication.getName());}

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskResponse store(@Valid @RequestBody TaskForm form, Authentication authentication) {
        return taskService.create(
                form,
                authentication.getName()
        );
    }

    @GetMapping("/{task_id}")
    public TaskResponse getTaskById(@PathVariable("task_id") Long taskId, Authentication authentication) {
        return taskService.findTask(taskId, authentication.getName());
    }

    @PutMapping("/{task_id}")
    public TaskResponse update(@PathVariable("task_id") Long taskId, @Valid @RequestBody TaskForm form, Authentication authentication) {
        return taskService.update(taskId, form, authentication.getName());
    }

    @DeleteMapping("/{task_id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("task_id") Long taskId, Authentication authentication) {
        taskService.delete(taskId, authentication.getName());
    }


}

