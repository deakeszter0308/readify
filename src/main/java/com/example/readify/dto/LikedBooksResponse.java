package com.example.readify.dto;

import com.example.readify.model.Book;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LikedBooksResponse {
    private String email;
    private List<Book> likedBooks;

}
