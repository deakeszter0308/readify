package com.example.readify.service.impl;

import com.example.readify.dao.request.SignInRequest;
import com.example.readify.dao.request.SignUpRequest;
import com.example.readify.dao.response.JwtAuthenticationResponse;
import com.example.readify.model.User;
import com.example.readify.service.AuthenticationService;
import com.example.readify.repository.UserRepository;

import com.example.readify.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    public AuthenticationServiceImpl(UserRepository userRepository,
                                     PasswordEncoder passwordEncoder,
                                     JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }
    @Override
    public JwtAuthenticationResponse signup(SignUpRequest request) {
        try{
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                throw new IllegalArgumentException("Email is already in use");
            }
        }catch (Exception e){
            e.printStackTrace();
        }

        // Create a new user entity
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Hash the password

        // Save the user to the database
        userRepository.save(user);


        String token = jwtService.generateToken(user);

        return new JwtAuthenticationResponse();
    }

    @Override
    public JwtAuthenticationResponse signin(SignInRequest request) {
        // TODO
        return new JwtAuthenticationResponse();
    }
}

