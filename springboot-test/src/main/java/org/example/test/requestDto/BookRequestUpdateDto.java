package org.example.test.requestDto;

import lombok.*;
import org.example.test.entity.Category;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookRequestUpdateDto {
    private String book_title;
    private String book_author;
    private Category book_category;

}