package com.example.ingestion_backend.service;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.sql.SQLException;

public class CsvService {

    // public List<CSVRecord> readCsv(String filePath) throws IOException {
    //     try (Reader reader = Files.newBufferedReader(Paths.get(filePath))) {
    //         return CSVFormat.DEFAULT.withFirstRecordAsHeader().parse(reader).getRecords();
    //     }
    // }

    // public void writeCsv(String filePath, List<String[]> data) throws IOException {
    //     try (Writer writer = Files.newBufferedWriter(Paths.get(filePath));
    //          CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT)) {
    //         for (String[] record : data) {
    //             csvPrinter.printRecord(record);
    //         }
    //     }
    // }

    // public void uploadCsvToClickHouse(List<CSVRecord> records) throws SQLException {
    //     // Code to batch insert CSV records into ClickHouse
    // }
}
