package com.example.reservationapi.service;


import com.example.reservationapi.dto.TodoDTO;

public interface TodoService {
    Long register(TodoDTO todoDTO);

    TodoDTO get(Long tno);

    //void return 타입보다는 예외
    void modify(TodoDTO todoDTO);
    void remove(Long tno);

}
