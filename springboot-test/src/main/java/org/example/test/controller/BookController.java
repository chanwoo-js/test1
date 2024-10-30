package org.example.test.controller;

import lombok.RequiredArgsConstructor;

import org.example.test.common.constant.ApiMappingPattern;
import org.example.test.entity.Category;
import org.example.test.requestDto.BookRequestDto;
import org.example.test.requestDto.BookRequestUpdateDto;
import org.example.test.responseDto.BookResponseDto;
import org.example.test.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// 쓰는게 가능하다 끌어다 쓰는게 가능하다?
@RestController
@RequestMapping(ApiMappingPattern.BOOK)
@RequiredArgsConstructor // 의존성 주입 ( 무조건 필요한 매개변수 생성자) / 생성자를 통해서 의존성을 주입한다.
// 초기화 되지 않은 final 필드나 @NonNull 붙은 필드에 대해 생성자를 생성
public class BookController {
    // Service 객체를 주입 받아 사용하는 변수
    private final BookService bookService;


    // 전체 책 조회
    @GetMapping
    public ResponseEntity<List<BookResponseDto>> getAllBooks() {
        List<BookResponseDto> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    // 단건 책 조회
    @GetMapping("/{id}")
    public ResponseEntity<BookResponseDto> getBookById(@PathVariable Long id) {
        BookResponseDto book = bookService.getBookById(id);
        return ResponseEntity.ok(book);
    }


}