package com.example.reservationapi.service;

import com.example.reservationapi.domain.Todo;
import com.example.reservationapi.dto.PageRequestDTO;
import com.example.reservationapi.dto.PageResponseDTO;
import com.example.reservationapi.dto.TodoDTO;
import com.example.reservationapi.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    @Override
    public PageResponseDTO<TodoDTO> list(PageRequestDTO pageRequestDTO) {

        //pageable 생성
        Pageable pageable= PageRequest.of(
                pageRequestDTO.getPage()-1,
                pageRequestDTO.getSize(),
                Sort.by("tno").descending()
        );
        //todorepository 호출
        Page<Todo> result=todoRepository.findAll(pageable); //조회는 엔티티가 아닌 dto 타입이 나와야함으로 변환

        List<TodoDTO> dtoList = result.getContent().stream()
                .map(todo -> modelMapper.map(todo, TodoDTO.class))
                .collect(Collectors.toList());
        long totalCount = result.getTotalElements();



        PageResponseDTO<TodoDTO> responseDTO = PageResponseDTO.<TodoDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();
        return responseDTO;
    }
}
