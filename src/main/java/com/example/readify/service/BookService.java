package com.example.readify.service;

import com.example.readify.model.Book;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookService {

    Book saveBook(Book book);

    //Read
    List<Book> fetchBookList();

    //Update
    Book updateBook(Book book, Long bookId);

    //Delete
    void deleteBookById(Long bookId);
}
