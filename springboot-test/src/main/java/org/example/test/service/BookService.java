package org.example.test.service;

import lombok.RequiredArgsConstructor;

import org.example.test.entity.Book;
import org.example.test.repository.BookRepository;
import org.example.test.responseDto.BookResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;


    // 2. 전체 책 조회
    public List<BookResponseDto> getAllBooks() {
        return bookRepository.findAll()
                .stream()
                .map(this::convertToResponseDto)
                // .map((book) -> convertToResponseDto(book))
                .collect(Collectors.toList());
    }

    // 3. 특정 ID 책 조회
    public BookResponseDto getBookById(Long id) {
        try {
            Book book = bookRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("책을 찾을 수 없습니다: " + id));
            return convertToResponseDto(book);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new BookResponseDto();
        }
    }

    // Entity -> Response Dto 변환
    private BookResponseDto convertToResponseDto(Book book) {
        return new BookResponseDto(
                book.getId(), book.getBook_title(), book.getBook_author(), book.getBook_category()
        );
    }
}