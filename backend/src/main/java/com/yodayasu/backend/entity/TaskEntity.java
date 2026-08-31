package com.yodayasu.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;


@Getter
@Setter
@Entity
@Table(name = "tasks")
public class TaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Long taskId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @NotBlank
    @Size(max = 500)
    @Column(name = "task_content", nullable = false, length = 500)
    private String taskContent;

    @CreationTimestamp
    @Column(name ="created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private  LocalDateTime updatedAt;

    @Column(nullable = false)
    private boolean completed = false;

    protected TaskEntity() {

    }

    public   TaskEntity(UserEntity user, String taskContent) {
        this.user = user;
        this.taskContent = taskContent;
    }

}
