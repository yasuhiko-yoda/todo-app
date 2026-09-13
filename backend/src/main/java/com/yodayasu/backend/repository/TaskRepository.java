package com.yodayasu.backend.repository;

import com.yodayasu.backend.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<TaskEntity, Long> {
    List<TaskEntity> findByUserUsernameOrderByTaskIdDesc(String username);

    Optional<TaskEntity> findByTaskIdAndUserUsername(
            Long taskId,
            String username
    );


//    Optional<TaskEntity> findByIdAndUserUsername(Long id, String username);
}
