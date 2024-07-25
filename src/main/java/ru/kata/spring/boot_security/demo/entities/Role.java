package ru.kata.spring.boot_security.demo.entities;

import lombok.Data;
import javax.persistence.*;

@Entity
@Data
@Table(name = "user_roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "role")
    private String name;

    public Role() { }

    public Role(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
