package com.example.readify.controller;

import com.example.readify.model.Book;
import com.example.readify.service.BookService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class BookController {

    @Autowired private BookService bookService;

    //Save
    @PostMapping("/books")
    public Book saveBook(
            @Validated @RequestBody Book book, HttpServletResponse response){
        response.addHeader("Access-Control-Allow-Origin", "*");
        System.out.println("Post book");
        return bookService.saveBook(book);
    }


    // Read
    @GetMapping("/books")
    public List<Book> fetchBookList() {
        System.out.println("Fetching all books..."); // Naplózás
        return bookService.fetchBookList();
    }
    // Update operation
    @PutMapping("/books/{id}")
    public Book updateBook(@RequestBody Book book,
                     @PathVariable("id") Long bookId)
    {
        return bookService.updateBook(
                book, bookId);
    }

    // Delete operation
    @DeleteMapping("/books/{id}")

    public String deleteDepartmentById(@PathVariable("id")
                                       Long bookId)
    {
        bookService.deleteBookById(
                bookId);
        return "Deleted Successfully";
    }



}
