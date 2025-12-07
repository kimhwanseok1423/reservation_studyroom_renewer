package com.example.reservationapi.repository;

import com.example.reservationapi.domain.QTodo;
import com.example.reservationapi.domain.Todo;
import com.querydsl.jpa.JPQLQueryFactory;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@SpringBootTest
@Log4j2
public class TodoRepositoryTest {

    @Autowired
    private TodoRepository todoRepository;
@Autowired
private JPQLQueryFactory queryFactory;
    @Test
    public void testInsert() {

        for (int i = 0; i < 100; i++) {
            Todo todo = Todo.builder()
                    .title("Title")
                    .writer("writer")
                    .dueDate(LocalDate.of(2024, 4, 1))
                    .build();
            Todo result = todoRepository.save(todo);
        }


    }

    @Test
    public void testRead() {
        Long tno = 1L;
        Optional<Todo> result = todoRepository.findById(tno);
        Todo todo = result.orElseThrow();
        log.info(todo);
    }

    @Test
    public void testUpdate() {
        Long tno = 1L;
        Optional<Todo> result = todoRepository.findById(tno);
        Todo todo = result.orElseThrow();
        todo.setTitle("update title");
        todo.setComplete(true);
        todo.setDueDate(LocalDate.of(2024, 4, 2));
        todoRepository.save(todo);
    }

    @Test
    public void testDelete() {
        Long tno = 1L;
        todoRepository.deleteById(tno);
    }

    @Test
    public void testPaging(){
        Pageable pageable =PageRequest.of(0, 10, Sort.by("tno").descending());

        Page<Todo> result=todoRepository.findAll(pageable);

        log.info(result.getTotalPages());
        log.info(result.getTotalElements());
    }
    //title로 검색하는 페이징처리
    @Test
    public void testSearchPaging(){
        Pageable pageable = PageRequest.of(0,10,Sort.by("tno").descending());
        Page<Todo> result = todoRepository.findByTitleContaining("1",pageable);

        result.get().forEach(todo -> log.info(todo));
    }
@Test
    public void testSearchPaging2(){
        Pageable pageable = PageRequest.of(0,10,Sort.by("tno").descending());
        //JPQLQueryFactory를 이용해서 검색
        // QTodo 객체 생성
        QTodo qTodo = QTodo.todo;

        // 쿼리 실행
        List<Todo> list=queryFactory.selectFrom(qTodo)
                .where(qTodo.title.contains("11"))
                .orderBy(qTodo.tno.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

log.info(list);

    }
}
