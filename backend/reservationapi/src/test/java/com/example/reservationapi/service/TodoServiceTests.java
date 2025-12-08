package com.example.reservationapi.service;

import com.example.reservationapi.dto.PageRequestDTO;
import com.example.reservationapi.dto.PageResponseDTO;
import com.example.reservationapi.dto.TodoDTO;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDate;

@SpringBootTest
@Log4j2
public class TodoServiceTests {

    @Autowired
    private TodoService todoService;
    @Disabled
    @Test
    public void testRegister() {
        TodoDTO todoDTO = TodoDTO.builder()
                .title("Test Todo")
                .writer("Test User")
                .dueDate(LocalDate.of(2025,12,31))
                .build();

        Long tno = todoService.register(todoDTO);
        log.info("Registered TNO: " + tno);
    }

    @Test
    public void testRead(){
        Long tno=2L;
        TodoDTO todoDTO = todoService.get(tno);
        log.info(todoDTO);
    }

    @Test
    public void testModify(){
        TodoDTO todoDTO = TodoDTO.builder()
                .tno(1L)
                .title("Test Modify")
                .dueDate(LocalDate.of(2025, 12, 31))
                .complete(true)
                .build();
        todoService.modify(todoDTO);
    }
    //list() 에 대한 테스트
    @Test
    public void testList(){
        log.info("--------------");
        PageRequestDTO pageRequestDTO=PageRequestDTO.builder().page(3).build();
        PageResponseDTO<TodoDTO> dto = todoService.list(pageRequestDTO);

    log.info(dto.getPageNumList());

    }
}
