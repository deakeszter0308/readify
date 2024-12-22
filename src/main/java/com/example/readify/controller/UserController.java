package com.example.readify.controller;

import com.example.readify.dto.UserDTO;
import com.example.readify.model.User;
import com.example.readify.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserController{
    @Autowired
    private UserService userService;

    @GetMapping("/protected-endpoint")
    public ResponseEntity<?> getProtectedData(@AuthenticationPrincipal UserDetails userDetails) {
        System.out.println(userDetails);
        String username = userDetails.getUsername();
        User user =  userService.findByUsername(username);
        System.out.println(user);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Visszaadjuk a felhasználó adatokat JSON-ban
        return ResponseEntity.ok(new UserDTO(user.getUsername(), user.getEmail(), user.getRole()));

    }
}
