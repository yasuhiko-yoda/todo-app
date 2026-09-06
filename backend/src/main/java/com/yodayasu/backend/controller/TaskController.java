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


//package jp.co.developersb.controller.chapter7_controller;
//
//import jp.co.developersb.dto.chapter7_dto.ProductForm7;
//import jp.co.developersb.entity.chapter7_entity.ProductInfo7;
//import jp.co.developersb.service.chapter7_service.ProductService7;
//import jakarta.validation.Valid;
//import java.util.List;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.ResponseStatus;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class AdminProductController7 {
//
//    private final ProductService7 productService;
//
//    public AdminProductController7(ProductService7 productService) {
//        this.productService = productService;
//    }
//
//    @GetMapping("/api/product-management")
//    public List<ProductInfo7> index() {
//        return productService.findAllProducts();
//    }
//
//    @PostMapping("/api/product-registration")
//    @ResponseStatus(HttpStatus.CREATED)
//    public ProductInfo7 store(@Valid @RequestBody ProductForm7 form) {
//        return productService.create(form);
//    }
//
//    @PostMapping("/api/product-management/{id}/publish")
//    public ProductInfo7 publish(@PathVariable Long id) {
//        return productService.publish(id);
//    }
//
//    @PostMapping("/api/product-management/{id}/hide")
//    public ProductInfo7 hide(@PathVariable Long id) {
//        return productService.hide(id);
//    }
//}
