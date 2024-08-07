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
import java.util.logging.Logger;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class RestAdminController {

    private final Logger log = Logger.getLogger(RestAdminController.class.getName());

    // --------Dependency Injection--------
    private final UserService userService;
    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;


    @Autowired
    public RestAdminController(UserService userService, RoleRepository roleRepository, ModelMapper modelMapper) {
		this.userService = userService;
		this.roleRepository = roleRepository;
        this.modelMapper = modelMapper;
    }
    // ------------------------------------

	@GetMapping("/users")
	public List<UserDTO> showAllUsers() {
		return userService.getAllUsers().stream()
                .map(this::convertToUserDTO)
                .collect(Collectors.toList());
	}

    @GetMapping("/users/{id}")
    public UserDTO showUser(@PathVariable Long id) {
        return convertToUserDTO(userService.findById(id));
    }

    @PostMapping(value = "/users", consumes = "application/json", produces = "application/json")
    public ResponseEntity<User> createNewUser(@RequestBody UserDTO userDTO) {
        log.info(userDTO.toString());
        User user = convertToUser(userDTO);
        log.info(user.toString());
        List<Role> roles = user.getRoles().stream()
                .map(role -> roleRepository.findById(role.getId())
                        .orElseThrow(() -> new RuntimeException("Role not found")))
                .collect(Collectors.toList());
        log.info(roles.toString());
        user.setRoles(roles);
        User savedUser = userService.saveUser(user);

        return ResponseEntity.ok(savedUser);
    }

    @PutMapping("/users")
    public ResponseEntity<User> editUser(@RequestBody UserDTO userDTO) {
        User user = convertToUser(userDTO);
        log.info(user.toString());
        log.info(userDTO.toString());
        User existingUser = userService.findById(user.getId());
        if (existingUser == null) {
            return ResponseEntity.notFound().build();
        }

        existingUser.setUsername(userDTO.getUsername());
        existingUser.setPassword(userDTO.getPassword());
        existingUser.setEmail(userDTO.getEmail());
        existingUser.setAge(userDTO.getAge());

        List<Role> roles = userDTO.getRoles().stream()
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

//        User(id=null, username=admin2, password=admin2, email=inostran@gmail.com, age=27)
//        user.setRoles(roles);

//    // Отображение таблицы User'ов
//    @GetMapping("/admin")
//    public String showAllUsers(Model model) {
//		// Получение авторизованного пользователя
//		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//		String username = auth.getName();
//		User user = userDetailService.findByUsername(username);
//		// --------------------------------------
//		boolean isAdmin = auth.getAuthorities().stream()
//				.anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));
//		model.addAttribute("isAdmin", isAdmin);
//		model.addAttribute("thisUser", user);
//		model.addAttribute("users", userService.getAllUsers());
//		model.addAttribute("roles", roleRepository.findAll());
//		return "admin";
//    }
//
//    @PostMapping("/admin")
//    public String handleAdminActions(@RequestParam String action, @ModelAttribute User user, @RequestParam(required = false, defaultValue = "") List<Long> roles) {
//		if ("create".equals(action)) {
//			List<Role> roleObjects = roles.stream()
//				.map(roleRepository::findById)
//				.map(optionalRole -> optionalRole.orElse(null))
//				.collect(Collectors.toList());
//			user.setRoles(roleObjects);
//			userService.saveUser(user);
//		} else if ("edit".equals(action)) {
//			if (user != null && user.getId() != null) {
//			List<Role> roleObjects = roles.stream()
//							.map(roleRepository::findById)
//				.map(optionalRole -> optionalRole.orElse(null))
//				.collect(Collectors.toList());
//			user.setRoles(roleObjects);
//			userService.editUser(user.getId(), user);
//			}
//		} else if ("delete".equals(action)) {
//			userService.deleteById(user.getId());
//		}
//		return "redirect:/admin";
//    }
}
