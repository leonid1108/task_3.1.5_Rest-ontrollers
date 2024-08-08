package ru.kata.spring.boot_security.demo.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.dao.RoleRepository;
import ru.kata.spring.boot_security.demo.dto.UserDTO;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class RestAdminController {

    private final UserService userService;
    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;


    @Autowired
    public RestAdminController(UserService userService, RoleRepository roleRepository, ModelMapper modelMapper) {
	this.userService = userService;
	this.roleRepository = roleRepository;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/users")
    public List<UserDTO> showAllUsers() {
	return userService.getAllUsers().stream()
            .map(this::convertToUserDTO)
            .collect(Collectors.toList());
    }

    @GetMapping("/roles")
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @GetMapping("/users/{id}")
    public UserDTO showUser(@PathVariable Long id) {
        return convertToUserDTO(userService.findById(id));
    }

    // Создание нового пользователя
    @PostMapping(value = "/users", consumes = "application/json", produces = "application/json")
    public ResponseEntity<User> createNewUser(@RequestBody UserDTO userDTO) {
        User user = convertToUser(userDTO);
        List<Role> roles = user.getRoles().stream()
                .map(role -> roleRepository.findById(role.getId())
                        .orElseThrow(() -> new RuntimeException("Role not found")))
                .collect(Collectors.toList());
        user.setRoles(roles);
        User savedUser = userService.saveUser(user);

        return ResponseEntity.ok(savedUser);
    }

    // Редактирование пользователя
    @PutMapping("/users/{id}")
    public ResponseEntity<User> editUser(@PathVariable Long id, @RequestBody User user) {
        User existingUser = userService.findById(id);
        if (existingUser == null) {
            return ResponseEntity.notFound().build();
        }
        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(user.getPassword());
        existingUser.setEmail(user.getEmail());
        existingUser.setAge(user.getAge());

        List<Role> roles = user.getRoles().stream()
                .map(roleDTO -> roleRepository.findById(roleDTO.getId())
                        .orElseThrow(() -> new RuntimeException("Role not found")))
                .collect(Collectors.toList());
        existingUser.setRoles(roles);

        User updatedUser = userService.editUser(existingUser);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteById(id);
            return ResponseEntity.ok("User with ID = " + id + " deleted");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    private UserDTO convertToUserDTO(User user) {
        return modelMapper.map(user, UserDTO.class);
    }

    private User convertToUser(UserDTO userDTO) {
        return modelMapper.map(userDTO, User.class);
    }
}
