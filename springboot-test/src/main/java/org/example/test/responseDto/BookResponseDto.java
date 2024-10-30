package org.example.test.responseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.test.entity.Category;

// 서버가 클라이언트에 응답할 때 필요한 데이터만 전달
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookResponseDto {
    private Long id;
    private String book_title;
    private String book_author;
    private Category book_category;
}