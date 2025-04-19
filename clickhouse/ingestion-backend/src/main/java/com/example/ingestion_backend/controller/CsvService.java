package com.example.ingestion_backend.controller;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;

@Service
public class CsvService {

    public List<CSVRecord> readCsv(InputStream inputStream) throws IOException {
        CSVParser parser = CSVFormat.DEFAULT
                .withFirstRecordAsHeader()
                .parse(new InputStreamReader(inputStream));
        
        List<CSVRecord> records = new ArrayList<>();
        for (CSVRecord record : parser) {
            records.add(record);
        }
        return records;
    }

    public void uploadCsvToClickHouse(List<CSVRecord> records) throws IOException {
        // Stub: Implement JDBC batch insert logic to ClickHouse here
        for (CSVRecord record : records) {
            // Example: log or print record data
            System.out.println(record);
        }
    }
}
