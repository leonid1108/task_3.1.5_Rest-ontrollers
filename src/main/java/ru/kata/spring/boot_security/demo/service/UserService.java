package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.entities.User;

import java.util.List;
import java.util.Set;

public interface UserService {

    User findById(Long id);

    List<User> getAllUsers();

    void saveUser(User user);

    void deleteById(Long id);

    void editUser(Long id, String username, String password, String email, int age, Set<String> roles);
}
