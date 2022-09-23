package com.notcreative.dgvoice.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class sampleService {

    public List<String> helloService() {
        return Arrays.asList("This is a test string", "from SpringBoot backend");
    }
}
