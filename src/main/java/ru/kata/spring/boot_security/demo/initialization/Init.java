package ru.kata.spring.boot_security.demo.initialization;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.dao.RoleRepository;
import ru.kata.spring.boot_security.demo.dao.UserRepository;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;

import javax.annotation.PostConstruct;
import java.util.Set;

@Component
public class Init {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public Init(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @PostConstruct
    public void postConstruct() {
        if (userRepository.findByUsername("admin") == null) {
            roleRepository.save(new Role(1L, "ROLE_ADMIN"));
            User admin = new User("admin", "admin", "admin@mail.ru", 20, roleRepository.findAll());
            userRepository.save(admin);
        }
        if (userRepository.findByUsername("user") == null) {
            roleRepository.save(new Role(2L, "ROLE_USER"));
            User user = new User("user", "user", "user@mail.ru", 22, roleRepository.findById(2L).stream().toList());
            userRepository.save(user);
        }
    }
}
