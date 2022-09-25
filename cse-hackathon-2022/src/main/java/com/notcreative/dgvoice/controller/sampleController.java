package com.notcreative.dgvoice.controller;

import com.notcreative.dgvoice.service.sampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class sampleController {

    @Autowired
    sampleService service;

    @GetMapping(value="/hello")
    @ResponseBody
    public List<String> hello() {
        return service.helloService();
    }
}
