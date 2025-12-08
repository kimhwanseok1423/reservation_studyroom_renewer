package com.example.reservationapi.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Data
public class PageResponseDTO<E> {

    private List<E> dtoList; //목록 데이터
    private List<Integer> pageNumList;// 페이지 번호 목록 ex) 22면   21~30   11이면 10~20
    private PageRequestDTO pageRequestDTO; //페이지 요청 정보
    private boolean prev, next; //이전, 다음
    private int totalCount, prevPage, nextPage, totalPage, current; //클릭시 정보

    @Builder(builderMethodName = "withAll")
    public PageResponseDTO(List<E> dtoList, PageRequestDTO pageRequestDTO, long totalCount) {
        this.dtoList = dtoList;
        this.pageRequestDTO = pageRequestDTO;
        this.totalCount = (int)totalCount;
        int end = (int)(Math.ceil( pageRequestDTO.getPage() / 10.0 )) * 10;
        int start = end - 9;
        int last = (int)(Math.ceil((totalCount/(double)pageRequestDTO.getSize())));
        end = end > last ? last: end;
        this.prev = start > 1;
        this.next = totalCount > end * pageRequestDTO.getSize();
        this.pageNumList = IntStream.rangeClosed(start,end).boxed().collect(Collectors.toList());
        if(prev)
            this.prevPage = start -1;
        if(next)
            this.nextPage = end + 1;
        this.totalPage = this.pageNumList.size();
        this.current = pageRequestDTO.getPage();
    }

}