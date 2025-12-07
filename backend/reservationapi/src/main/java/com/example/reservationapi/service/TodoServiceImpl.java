package com.example.reservationapi.service;

import com.example.reservationapi.dto.TodoDTO;
import com.example.reservationapi.repository.TodoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
@Log4j2
public class TodoServiceImpl implements  TodoService
{

private final TodoRepository todoRepository;
private final ModelMapper modelMapper;
    @Override
    public Long register(TodoDTO tOdoDTO) {




    }
}
