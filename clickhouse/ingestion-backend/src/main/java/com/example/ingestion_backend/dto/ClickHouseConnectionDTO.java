package com.example.ingestion_backend.dto;

public class ClickHouseConnectionDTO {
    public String host;
    public int port;
    public String database;
    public String user;
    public String jwtToken;
    public String table; // used in /columns endpoint
}