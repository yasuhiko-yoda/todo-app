package com.yodayasu.backend.service;

import com.yodayasu.backend.dto.TaskForm;
import com.yodayasu.backend.dto.TaskResponse;
import com.yodayasu.backend.entity.TaskEntity;
import com.yodayasu.backend.entity.UserEntity;
import com.yodayasu.backend.exception.TaskNotFoundException;
import com.yodayasu.backend.repository.TaskRepository;
import com.yodayasu.backend.repository.UserRepository;
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

//    public  List<TaskEntity> findCompletedFalseTasks() {
//        return  taskRepository.findByCompletedFalseOrderByTaskIdDesc();
//    }

    public List<TaskResponse> findAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public TaskResponse findTask(Long id) {
        TaskEntity task = taskRepository.findById(id)
                .orElseThrow(()->
                        new TaskNotFoundException("指定されたタスクが見つかりません"));
//        return taskRepository.findById(id)
//                .orElseThrow();
        return toResponse(task);
    }

    public  TaskResponse create(TaskForm form) {
        UserEntity user = userRepository.findById(1L)
                .orElseThrow();

        TaskEntity task = new TaskEntity(
                user,
                form.getTaskContent()
        );

        TaskEntity savedTask = taskRepository.save(task);
        return toResponse(savedTask);
    }

    public TaskResponse update(Long id,TaskForm form) {
        TaskEntity task = taskRepository.findById(id)
                .orElseThrow(()->
                        new TaskNotFoundException("指定されたタスクが見つかりません"));

        task.setTaskContent(form.getTaskContent());
        task.setCompleted(form.isCompleted());

        TaskEntity updatedTask = taskRepository.save(task);

        return toResponse(updatedTask);
    }

    public void delete(Long id) {
        TaskEntity task = taskRepository.findById(id)
                .orElseThrow(()->
                        new TaskNotFoundException("指定されたタスクが見つかりません"));

        taskRepository.delete(task);
    }


}


//@Service
//public class ProductService7 {
//
//    private final ProductRepository7 productRepository;
//
//    public ProductService7(ProductRepository7 productRepository) {
//        this.productRepository = productRepository;
//    }
//
//    public List<ProductInfo7> findPublishedProducts() {
//        return productRepository.findByPublishedTrueOrderByIdDesc();
//    }
//
//    public List<ProductInfo7> findAllProducts() {
//        return productRepository.findAll();
//    }
//
//    public ProductInfo7 create(ProductForm7 form) {
//        var product = new ProductInfo7(
//                form.getName(),
//                form.getPrice(),
//                form.getStock(),
//                form.isPublished()
//        );
//
//        return productRepository.save(product);
//    }
//
//    public ProductInfo7 publish(Long id) {
//        var product = productRepository.findById(id).orElseThrow();
//        product.setPublished(true);
//        return productRepository.save(product);
//    }
//
//    public ProductInfo7 hide(Long id) {
//        var product = productRepository.findById(id).orElseThrow();
//        product.setPublished(false);
//        return productRepository.save(product);
//    }
//}
