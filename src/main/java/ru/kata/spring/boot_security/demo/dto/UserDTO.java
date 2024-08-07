package ru.kata.spring.boot_security.demo.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import ru.kata.spring.boot_security.demo.entities.Role;

import java.util.List;

@Data
public class UserDTO {
    private Long id;
    private String username;

    private String password;

    private String email;

    private int age;

    private List<Role> roles;

}
