package ru.kata.spring.boot_security.demo.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToMany(mappedBy = "roles")
    @ToString.Exclude
    @JsonIgnore
    private List<User> users;

    public Role() { }

    public Role(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getRoleName() {
        String[] roleName = name.split("_");
        return roleName[1];
    }
}
