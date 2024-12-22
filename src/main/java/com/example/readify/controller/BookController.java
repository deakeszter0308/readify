package com.example.readify.controller;

import com.example.readify.dto.LikedBooksResponse;
import com.example.readify.model.Book;
import com.example.readify.model.User;
import com.example.readify.repository.BookRepository;
import com.example.readify.repository.UserRepository;
import com.example.readify.service.BookService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
public class BookController {

    @Autowired private BookService bookService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

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
    @PutMapping("/api/books/{id}")
    public Book updateBook(@RequestBody Book book,
                     @PathVariable("id") Long bookId)
    {
        return bookService.updateBook(
                book, bookId);
    }

    // Delete operation
    @DeleteMapping("/api/books/{id}")

    public String deleteBookById(@PathVariable("id")
                                       Long bookId)
    {
        bookService.deleteBookById(
                bookId);
        return "Deleted Successfully";
    }

    @PostMapping("/api/books/{bookId}/like")
    public ResponseEntity<String> likeBook(@PathVariable Long bookId, Principal principal) {

        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));


        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));


        book.getLikedBy().add(user);
        bookRepository.save(book);

        return ResponseEntity.ok("Book liked successfully");
    }

    @GetMapping("/liked")
    public ResponseEntity<LikedBooksResponse>getBooksLikedByUser(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        System.out.println("Fetching liked books for user: " + email);

        List<Book> books = bookService.getBooksLikedByUser(email);
        System.out.println("Found " + books.size() + " liked books");
        if (books.isEmpty()) {
            System.out.println("No liked books found for user: " + email);
        } else {
            System.out.println("Found " + books.size() + " liked books");
        }


        LikedBooksResponse response = new LikedBooksResponse(email, books);
        System.out.println("Response created for user: {}" +email);


        return ResponseEntity.ok(response);
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint(@AuthenticationPrincipal UserDetails userDetails) {
        System.out.println(("Test endpoint is called by user: {}, auth: {}" +userDetails.getUsername() + userDetails.getAuthorities()));
        return ResponseEntity.ok("Test endpoint successfuly called!");
    }



}
