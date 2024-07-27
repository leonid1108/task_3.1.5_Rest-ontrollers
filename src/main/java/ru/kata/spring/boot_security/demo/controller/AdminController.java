package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.dao.RoleRepository;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.security.UserDetailService;
import ru.kata.spring.boot_security.demo.service.UserService;
import java.util.*;
import java.util.stream.Collectors;

@Controller
public class AdminController {
 
	// --------Dependency Injection--------
	private final UserService userService;
	private final UserDetailService userDetailService;
	private final RoleRepository roleRepository;

	@Autowired
	public AdminController(UserService userService,
						   UserDetailService userDetailService,
						   RoleRepository roleRepository) {
		this.userService = userService;
		this.userDetailService = userDetailService;
		this.roleRepository = roleRepository;
	}
	// ------------------------------------
	
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

	@PostMapping("/admin")
	public String handleAdminActions(@RequestParam String action,
									 @ModelAttribute User user,
									 @RequestParam(required = false, defaultValue = "") List<Long> roles) {
		if ("create".equals(action)) {
			List<Role> roleObjects = roles.stream()
					.map(roleRepository::findById)
					.map(optionalRole -> optionalRole.orElse(null))
					.collect(Collectors.toList());
			user.setRoles(roleObjects);
			userService.saveUser(user);
		} else if ("edit".equals(action)) {
			if (user != null && user.getId() != null) {
				List<Role> roleObjects = roles.stream()
						.map(roleRepository::findById)
						.map(optionalRole -> optionalRole.orElse(null))
						.collect(Collectors.toList());
				user.setRoles(roleObjects);
				userService.editUser(user.getId(), user);
			}
		} else if ("delete".equals(action)) {
			userService.deleteById(user.getId());
		}
		return "redirect:/admin";
	}
}
