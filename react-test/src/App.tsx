import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

interface GetBookCategoryResponseDto {
  book_title: string;
  book_author: string;
  book_category: string;
}

function App() {
  const [category, setCategory] = useState<string>("");
  const [results, setResults] = useState<GetBookCategoryResponseDto[]>([]);
  const [bookId, setBookId] = useState<string>("");

  // const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCategory(e.target.value);
  // };
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookId(e.target.value);
  };
  // 검색 : 카테고리별 조회
  const fetchBookData = async (category: string) => {
    if (category.trim()) {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/test/books/category",
          { params: { category } }
        );
        const data = response.data;
        setResults(data);
      } catch (error) {
        setResults([]);
        console.error("Error fetching data: ", error);
      }
    }
  };

// id: 단건 조회
const searchGetIdBooksData = async (bookId: string) => {
  if (bookId.trim()) {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/test/books/${bookId}`
      );
      const data = response.data;
      console.log(data);
      setResults([data]); // 단건 데이터를 배열로 감싸기
    } catch (error) {
      setResults([]);
      console.error("Error get Id data : ", error);
    }
  }
};
  // 버튼 : 전체 조회
  const handleGetAllBooksData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/test/books");
      const data = response.data;
      setResults(data);
    } catch (error) {
      setResults([]);
      console.error("Error GET ALL BOOKS LIST DATA ", error);
    }
  };

  useEffect(() => {
    if (category) {
      fetchBookData(category);
    } else {
      searchGetIdBooksData(bookId);
    }
  }, [category, bookId]);

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        {/* <TextField
          sx={{
            width: "200px",
            "& .MuiOutlinedInput-root": {
              height: "40px",
            },
            "& .MuiOutlinedInput-input": {
              padding: "0 20px",
            },
          }}
          variant="outlined"
          required
          value={category}
          onChange={handleCategoryChange}
          placeholder="인문, 사회, 과학기술, 기타"
        /> */}
        <TextField
          sx={{
            width: "200px",
            "& .MuiOutlinedInput-root": {
              height: "40px",
            },
            "& .MuiOutlinedInput-input": {
              padding: "0 20px",
            },
          }}
          variant="outlined"
          required
          value={bookId}
          onChange={handleIdChange}
          placeholder="id 값 단건 조회"
        />
        <Button
          sx={{
            width: "100px",
            height: "40px",
          }}
          variant="contained"
          color="primary"
          onClick={handleGetAllBooksData}
        >
          전체 조회
        </Button>
        <Button
          sx={{
            width: "100px",
            height: "40px",
          }}
          variant="contained"
          color="secondary"
        >
          추가
        </Button>
      </Box>
      {Array.isArray(results) &&
        results.map((result, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <Card
              sx={{
                maxWidth: 400,
                margin: "0 auto",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxShadow: 3,
                "&:hover": {
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  제목 : {result.book_title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  저자 : {result.book_author}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  분류 : {result.book_category}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
    </>
  );
}

export default App;
