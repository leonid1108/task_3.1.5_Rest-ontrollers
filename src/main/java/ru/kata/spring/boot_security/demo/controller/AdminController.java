package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.dao.RoleRepository;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.security.UserDetailService;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
public class AdminController {

    // --------Dependency Injection--------
    private final UserService userService;
    private final RoleRepository roleRepository;
    private final UserDetailService userDetailService;


    @Autowired
    public AdminController(UserService userService, RoleRepository roleRepository, UserDetailService userDetailService) {
        this.userService = userService;
        this.roleRepository = roleRepository;
        this.userDetailService = userDetailService;
    }

    // Отображение таблицы User'ов
    @GetMapping("/admin")
    public String showAllUsers(Model model) {
	// Получение авторизованного пользователя
	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	String username = auth.getName();
	User user = userDetailService.findByUsername(username);
	// --------------------------------------
	boolean isAdmin = auth.getAuthorities().stream()
			.anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));
	model.addAttribute("isAdmin", isAdmin);
	model.addAttribute("thisUser", user);
	model.addAttribute("users", userService.getAllUsers());
	model.addAttribute("roles", roleRepository.findAll());
	return "admin";
    }
}
