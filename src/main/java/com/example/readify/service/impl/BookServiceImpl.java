package com.example.readify.service.impl;

import com.example.readify.model.Book;
import com.example.readify.model.User;
import com.example.readify.repository.BookRepository;
import com.example.readify.repository.UserRepository;
import com.example.readify.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private  UserRepository userRepository;

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
        Book existingBook = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + bookId));
        existingBook.setTitle(book.getTitle());
        existingBook.setAuthor(book.getAuthor());
        existingBook.setPrice(book.getPrice());
        existingBook.setCategory(book.getCategory());
        return bookRepository.save(existingBook);
    }

    @Override
    public void deleteBookById(Long bookId) {
        bookRepository.deleteById(bookId);
    }

    public void likeBook(Long bookId) {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));


        book.getLikedBy().add(currentUser);
        bookRepository.save(book);
    }

    public List<Book> getBooksLikedByUser(String username) {
        System.out.println("getbooklikedbyuser ok");
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return bookRepository.findAllByLikedByEmail(username);
    }


}
