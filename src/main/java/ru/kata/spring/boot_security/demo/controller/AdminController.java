package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.security.UserDetailService;
import ru.kata.spring.boot_security.demo.service.UserService;
import java.util.*;

@Controller
public class AdminController {
	
	// --------Dependency Injection--------
	private final UserService userService;
	private final UserDetailService userDetailService;

	@Autowired
	public AdminController(UserService userService, UserDetailService userDetailService) {
		this.userService = userService;
		this.userDetailService = userDetailService;
	}
	// ------------------------------------

	// Отображение таблицы User'ов
	@GetMapping("/admin")
	public String showAllUsers(Model model) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String username = auth.getName();
		User user = userDetailService.findByUsername(username);

		boolean isAdmin = auth.getAuthorities().stream()
				.anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));
		model.addAttribute("isAdmin", isAdmin);
		model.addAttribute("thisUser", user);
		model.addAttribute("users", userService.getAllUsers());
		return "admin";
	}
	@PostMapping("/admin")
	public String handleAdminActions(@RequestParam String action,
									 @ModelAttribute User user,
									 @RequestParam(required = false, defaultValue = "") List<String> roles) {
		if ("create".equals(action)) {
			Set<String> roleSet = new HashSet<>(roles);
			user.setRoles(roleSet);
			userService.saveUser(user);
		} else if ("edit".equals(action)) {
			if (user != null && user.getId() != null) {
				Set<String> roleSet = new HashSet<>(roles);
				user.setRoles(roleSet);
				userService.editUser(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(), user.getAge(), user.getRoles());
			}
		} else if ("delete".equals(action)) {
			userService.deleteById(user.getId());
		}
		return "redirect:/admin";
	}

//	//-----GET и POST методы для создания пользователя-----
//	@GetMapping("/admin/create")
//	public String createUser(Model model) {
//		model.addAttribute("user", new User());
//		return "create";
//	}
//
//	@PostMapping("/admin/create")
//	public String createUser(@ModelAttribute("user") User user) {
//		userService.saveUser(user);
//		return "redirect:/admin";
//	}
//	// ----------------------------------------------------
//
//	//-----GET и POST методы для удаления пользователя-----
//	@GetMapping("/admin/delete")
//	public String deleteUser(@RequestParam("id") Long id, Model model) {
//		User user = userService.findById(id);
//		model.addAttribute("user", user);
//		return "delete";
//	}
//
//	@PostMapping("/admin/delete")
//	public String deleteUser(@RequestParam("id") Long id) {
//		userService.deleteById(id);
//		return "redirect:/admin";
//	}
//	// ----------------------------------------------------
//
//	//-----GET и POST методы для редактирования пользователя-----
//	@GetMapping("/admin/edit")
//	public String editUser(@RequestParam("id") Long id, Model model) {
//		User user = userService.findById(id);
//		model.addAttribute("user", user);
//		return "edit";
//	}
//
//	@PostMapping("/admin/edit")
//	public String editUser(@RequestParam("id") Long id, @ModelAttribute("user") User user) {
//		if (user != null && user.getId() != null) {
//			userService.editUser(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(), user.getAge(), user.getRoles());
//		}
//		return "redirect:/admin";
//	}
//	// -----------------------------------------------------------

}
