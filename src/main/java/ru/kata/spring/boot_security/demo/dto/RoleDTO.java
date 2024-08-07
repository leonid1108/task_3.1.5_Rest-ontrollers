package ru.kata.spring.boot_security.demo.dto;

import ru.kata.spring.boot_security.demo.entities.User;

import java.util.List;

public class RoleDTO {

    private String name;

    private List<User> users;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
