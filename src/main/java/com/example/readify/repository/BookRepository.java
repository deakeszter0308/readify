package com.example.readify.repository;

import com.example.readify.model.Book;
import com.example.readify.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findAllByLikedByEmail(String email);

}
