package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
public class AdminController {

	// --------Dependency Injection--------
	private final UserService userService;

	@Autowired
	public AdminController(UserService userService) {
		this.userService = userService;
	}
	// ------------------------------------

	// Отображение таблицы User'ов
	@GetMapping("/admin")
	public String showAllUsers(Model model) {
		model.addAttribute("users", userService.getAllUsers());
		return "show";
	}

	//-----GET и POST методы для создания пользователя-----
	@GetMapping("/admin/create")
	public String createUser(Model model) {
		model.addAttribute("user", new User());
		return "create";
	}

	@PostMapping("/admin/create")
	public String createUser(@ModelAttribute("user") User user) {
		userService.saveUser(user);
		return "redirect:/admin";
	}
	// ----------------------------------------------------

	//-----GET и POST методы для удаления пользователя-----
	@GetMapping("/admin/delete")
	public String deleteUser(@RequestParam("id") Long id, Model model) {
		User user = userService.findById(id);
		model.addAttribute("user", user);
		return "delete";
	}

	@PostMapping("/admin/delete")
	public String deleteUser(@RequestParam("id") Long id) {
		userService.deleteById(id);
		return "redirect:/admin";
	}
	// ----------------------------------------------------

	//-----GET и POST методы для редактирования пользователя-----
	@GetMapping("/admin/edit")
	public String editUser(@RequestParam("id") Long id, Model model) {
		User user = userService.findById(id);
		model.addAttribute("user", user);
		return "edit";
	}

	@PostMapping("/admin/edit")
	public String editUser(@RequestParam("id") Long id, @ModelAttribute("user") User user) {
		if (user != null && user.getId() != null) {
			userService.editUser(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(), user.getAge());
		}
		return "redirect:/admin";
	}
	// -----------------------------------------------------------
}
