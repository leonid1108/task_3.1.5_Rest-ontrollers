package ru.kata.spring.boot_security.demo.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserGlobalExceptionHandler {
    // Хендлер ошибки с несуществующим пользователем
    @ExceptionHandler
    private ResponseEntity<UserErrorResponse> handleException(UserIncorrectDataException exception) {
        UserErrorResponse userErrorResponse = new UserErrorResponse("User with this id not found!",
                System.currentTimeMillis());
        return new ResponseEntity<>(userErrorResponse, HttpStatus.NOT_FOUND);
    }

    // Хендлер всех остальных ошибок
    @ExceptionHandler
    private ResponseEntity<UserErrorResponse> handleException(Exception exception) {
        UserErrorResponse userErrorResponse = new UserErrorResponse(exception.getMessage(),
                System.currentTimeMillis());
        return new ResponseEntity<>(userErrorResponse, HttpStatus.BAD_REQUEST);
    }

}
