package com.example.ingestion_backend.controller;
import com.example.ingestion_backend.dto.ClickHouseConfigDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.sql.*;
import java.util.Properties;

@RestController
@RequestMapping("/api/clickhouse")
public class ClickHouseController {

    @PostMapping("/connect")
    public ResponseEntity<String> connectToClickHouse(@RequestBody ClickHouseConfigDTO config) {
        String url = "jdbc:clickhouse://" + config.host + ":" + config.port + "/" + config.database;

        Properties props = new Properties();
        props.setProperty("user", config.user);
        props.setProperty("ssl", String.valueOf(config.port == 8443 || config.port == 9440)); // enable SSL if secure port
        props.setProperty("sslmode", "strict");

        // Use the JWT token in header
        props.setProperty("custom_http_headers", "Authorization=Bearer " + config.jwtToken);

        try (Connection conn = DriverManager.getConnection(url, props)) {
            // Simple test query to validate connection
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT 1");
            if (rs.next()) {
                return ResponseEntity.ok("Connected to ClickHouse successfully!");
            }
        } catch (SQLException e) {
            return ResponseEntity.status(500).body("Connection failed: " + e.getMessage());
        }

        return ResponseEntity.status(500).body("Unknown error while connecting.");
    }
}

