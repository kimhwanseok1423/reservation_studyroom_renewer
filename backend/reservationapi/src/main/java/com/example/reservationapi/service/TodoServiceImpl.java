package com.example.reservationapi.service;

import com.example.reservationapi.domain.Todo;
import com.example.reservationapi.dto.TodoDTO;
import com.example.reservationapi.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Log4j2
public class TodoServiceImpl implements  TodoService
{

private final TodoRepository todoRepository;
private final ModelMapper modelMapper;
    @Override
    public Long register(TodoDTO todoDTO) {
        Todo todo = modelMapper.map(todoDTO, Todo.class);
        Todo savedTodo = todoRepository.save(todo);
        return savedTodo.getTno();


    }

    @Override
    public TodoDTO get(Long tno) {
        Optional<Todo> result = todoRepository.findById(tno);
        Todo todo = result.orElseThrow();
        TodoDTO dto = modelMapper.map(todo, TodoDTO.class);
        return dto;
    }

    @Override
    public void modify(TodoDTO todoDTO) {
        Optional<Todo> result = todoRepository.findById(todoDTO.getTno());
        Todo todo=result.orElseThrow();

        //title , complete,dueDate 변경
        todo.setTitle(todoDTO.getTitle());
        todo.setComplete(todoDTO.isComplete());
        todo.setDueDate(todoDTO.getDueDate());
        todoRepository.save(todo);


    }

    @Override
    public void remove(Long tno) {

    }
}
