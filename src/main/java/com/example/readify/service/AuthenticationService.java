package com.example.readify.service;

import com.example.readify.dao.request.SignInRequest;
import com.example.readify.dao.request.SignUpRequest;
import com.example.readify.dao.response.JwtAuthenticationResponse;


public interface AuthenticationService {
    JwtAuthenticationResponse signup(SignUpRequest request);

    JwtAuthenticationResponse signin(SignInRequest request);
}