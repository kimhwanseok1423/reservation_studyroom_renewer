package com.example.reservationapi.repository;

import com.example.reservationapi.domain.Todo;
import com.example.reservationapi.repository.search.TodoSearch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo,Long> , TodoSearch {
//   title로 검색하는 페이징 처리

    Page<Todo> findByTitleContaining(String title, Pageable pageable);
}
