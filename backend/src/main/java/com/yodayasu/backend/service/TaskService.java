package com.yodayasu.backend.service;

import com.yodayasu.backend.dto.TaskForm;
import com.yodayasu.backend.dto.TaskResponse;
import com.yodayasu.backend.entity.TaskEntity;
import com.yodayasu.backend.entity.UserEntity;
import com.yodayasu.backend.exception.TaskNotFoundException;
import com.yodayasu.backend.repository.TaskRepository;
import com.yodayasu.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private  final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public  TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    private TaskResponse toResponse(TaskEntity task) {
        return new TaskResponse(
                task.getTaskId(),
                task.getUser().getUserId(),
                task.getTaskContent(),
                task.getCreatedAt(),
                task.getUpdatedAt(),
                task.isCompleted()
        );
    }


    private TaskEntity findOwnedTask(Long taskId, String username) {
        return taskRepository
                .findByTaskIdAndUserUsername(taskId, username)
                .orElseThrow(() ->
                        new TaskNotFoundException(
                                "指定されたタスクが見つかりません"
                        )
                );
    }

    public List<TaskResponse> findAllTasks(String username) {
        return taskRepository
                .findByUserUsernameOrderByTaskIdDesc(username)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public TaskResponse findTask(Long taskId, String username) {
        TaskEntity task = findOwnedTask(taskId, username);
        return toResponse(task);
    }

    public TaskResponse create(TaskForm form, String username) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                username + " is not found"
                        )
                );

        TaskEntity task = new TaskEntity(
                user,
                form.getTaskContent()
        );

        TaskEntity savedTask = taskRepository.save(task);
        return toResponse(savedTask);
    }

    public TaskResponse update(
            Long taskId,
            TaskForm form,
            String username
    ) {
        TaskEntity task = findOwnedTask(taskId, username);

        task.setTaskContent(form.getTaskContent());
        task.setCompleted(form.isCompleted());

        TaskEntity updatedTask = taskRepository.save(task);
        return toResponse(updatedTask);
    }

    public void delete(Long taskId, String username) {
        TaskEntity task = findOwnedTask(taskId, username);
        taskRepository.delete(task);
    }


}