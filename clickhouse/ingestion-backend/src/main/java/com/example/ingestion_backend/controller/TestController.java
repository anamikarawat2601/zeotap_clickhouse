package com.example.ingestion_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController { 
    @GetMapping("/")
    public @ResponseBody String root() {
        return "Hello World!";
    }

    @GetMapping("/ping")
    public @ResponseBody String ping() {
        return "pong";
    } 
}