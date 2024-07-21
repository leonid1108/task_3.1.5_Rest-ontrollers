package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.dao.UserRepository;
import ru.kata.spring.boot_security.demo.entities.User;


import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    // --------Dependency Injection--------
    @Autowired
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    // ------------------------------------

    // Сервис поиска пользователя по ID
    @Override
    @Transactional(readOnly = true)
    public User findById(Long id) {
        return userRepository.getById(id);
    }

    // Сервис отображение всех пользователей
    @Override
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Сервис создания пользователя
    @Override
    @Transactional
    public void saveUser(User user) {
        userRepository.save(user);
    }

    // Сервис удаления пользователя
    @Override
    @Transactional
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    // Сервис редактирования пользователя
    @Override
    @Transactional
    public void editUser(Long id, String username, String password, String email, int age) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setUsername(username);
            user.setPassword(password);
            user.setEmail(email);
            user.setAge(age);

            userRepository.save(user);
        }
    }
}
