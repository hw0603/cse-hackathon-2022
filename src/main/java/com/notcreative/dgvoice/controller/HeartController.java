package com.notcreative.dgvoice.controller;

import com.notcreative.dgvoice.dto.HeartDto;
import com.notcreative.dgvoice.service.HeartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/heart")
public class HeartController {
    private final HeartService heartService;

    @PostMapping
    public ResponseEntity<HeartDto> heart(@RequestBody HeartDto heartDto) throws IOException {
        heartService.heart(heartDto);
        return new ResponseEntity<>(heartDto, HttpStatus.CREATED);
    }
    @DeleteMapping
    public ResponseEntity<HeartDto> unHeart(@RequestBody HeartDto heartDto) throws IOException {
        heartService.unHeart(heartDto);
        return new ResponseEntity<>(heartDto, HttpStatus.OK);
    }
}
