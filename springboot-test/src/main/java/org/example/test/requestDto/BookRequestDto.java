package org.example.test.requestDto;

import lombok.*;
import org.example.test.entity.Category;

// 책 생성 시 클라이언트가 서버에 전달하는 데이터
// : 요청에 대한 데이터
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookRequestDto {
    private String book_title;
    private String book_author;
    private Category book_category;
}