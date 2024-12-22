package com.example.readify.service;

import com.example.readify.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {
    UserDetailsService userDetailsService();



    User findByUsername(String username);
}
