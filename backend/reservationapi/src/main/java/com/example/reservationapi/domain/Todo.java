package com.example.reservationapi.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
@Entity
@Table(name = "tbl_todo")
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Todo {

    //tno,title ,writer,complete,dueDate
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tno;
    private String title;
    private String writer;
    private boolean complete;
    private LocalDate dueDate;

    public void setTitle(String updateTitle) {
    }
    public void setComplete(boolean b) {
    }

    public void setDueDate(LocalDate of) {
    }
}
