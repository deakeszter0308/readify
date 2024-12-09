package com.example.readify.service.impl;

import com.example.readify.model.Book;
import com.example.readify.repository.BookRepository;
import com.example.readify.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    //Read
    @Override
    public List<Book> fetchBookList(){
        return (List<Book>)
                bookRepository.findAll();
    }

    @Override
    public Book updateBook(Book book, Long bookId) {
        return null;
    }

    @Override
    public void deleteBookById(Long bookId) {
        bookRepository.deleteById(bookId);
    }


}
