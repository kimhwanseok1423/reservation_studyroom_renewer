package com.example.reservationapi.repository.search;

import com.example.reservationapi.domain.QTodo;
import com.example.reservationapi.domain.Todo;
import com.example.reservationapi.dto.PageRequestDTO;
import com.example.reservationapi.dto.PageResponseDTO;
import com.example.reservationapi.dto.TodoDTO;
import com.querydsl.core.QueryFactory;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.JPQLQueryFactory;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
@Log4j2
public class TodoSearchImpl implements  TodoSearch{

    private final JPQLQueryFactory queryFactory;


    @Override
    public PageResponseDTO<TodoDTO> search(String keyword, PageRequestDTO pageRequest) {

        QTodo todo=QTodo.todo;
        JPQLQuery<Todo> query =queryFactory.selectFrom(todo);
        query.where(todo.title.contains(keyword));
        //tno 역순으로 정렬
        query.orderBy(todo.tno.desc());

        //페이징 처리
        Pageable pageable= PageRequest.of(pageRequest.getPage()-1,pageRequest.getSize() );
        query.offset(pageable.getOffset()); // 어디서 부터 데이터를 뽑아야한다는 위치 offset
        query.limit(pageable.getPageSize());
    log.info("------");
    log.info(query);


        return null;
    }
}
