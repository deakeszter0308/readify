package com.example.readify.repository;

import com.example.readify.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
    // Testreszabott lekérdezések, pl.: List<Book> findByAuthor(String author);
}
