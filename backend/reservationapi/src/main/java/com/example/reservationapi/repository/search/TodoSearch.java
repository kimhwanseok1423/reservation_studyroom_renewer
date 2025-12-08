package com.example.reservationapi.repository.search;

import com.example.reservationapi.dto.PageRequestDTO;
import com.example.reservationapi.dto.PageResponseDTO;
import com.example.reservationapi.dto.TodoDTO;

public interface TodoSearch {

        PageResponseDTO<TodoDTO> search(String keyword, PageRequestDTO pageRequestDTO);

}
