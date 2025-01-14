package dev.michaelcao512.socialmedia.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.michaelcao512.socialmedia.Entities.Role;

@Repository
public interface RoleRepository  extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(Role.ERole name);
}
