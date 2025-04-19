package com.example.ingestion_backend.service;

import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

@Service
public class ClickHouseService {

    public Connection createConnection(String host, int port, String database, String user, String jwtToken, boolean useHttps) throws Exception {
        String protocol = useHttps ? "https" : "http";
        String url = String.format("jdbc:clickhouse://%s:%d/%s", host, port, database);

        Properties properties = new Properties();
        properties.setProperty("user", user);
        properties.setProperty("password", jwtToken); // Pass the JWT token as password
        properties.setProperty("ssl", String.valueOf(useHttps));

        return DriverManager.getConnection(url, properties);
    }

    public List<String> getTables(Connection conn) throws Exception {
        List<String> tables = new ArrayList<>();
        String query = "SHOW TABLES";

        try (Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(query)) {
            while (rs.next()) {
                tables.add(rs.getString(1));
            }
        } catch (Exception e) {
            // Log the exception (consider using a logging framework)
            throw new Exception("Error fetching tables from ClickHouse", e);
        }

        return tables;
    }
}