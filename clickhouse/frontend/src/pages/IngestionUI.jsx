import React, { useState } from 'react';
import { FaDatabase, FaFileImport, FaCloud, FaArrowRight, FaSpinner } from 'react-icons/fa';

const IngestionUI = () => {
  const [connectionType, setConnectionType] = useState('clickhouse'); // clickhouse or flatfile
  const [targetType, setTargetType] = useState('flatfile');
  const [clickHouseConfig, setClickHouseConfig] = useState({
    host: '',
    port: '',
    database: '',
    user: '',
    jwtToken: '',
  });
  const [flatFilePath, setFlatFilePath] = useState('');
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState('');

  const handleClickHouseChange = (e) => {
    const { name, value } = e.target;
    setClickHouseConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleConnect = async () => {
    setStatus('Connecting...');
    try {
      const response = await fetch('/api/clickhouse/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clickHouseConfig),
      });

      const text = await response.text();
      if (response.ok) {
        setStatus('Connected!');
        setResult(text);
      } else {
        setStatus('Error');
        setResult(text);
      }
    } catch (error) {
      setStatus('Error');
      setResult('Connection failed: ' + error.message);
    }
  };

  const handleLoadTables = async () => {
    setStatus('Fetching Tables...');
    try {
      const response = await fetch('/api/clickhouse/tables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clickHouseConfig),
      });

      const data = await response.json();
      setTables(data.tables || []);
      setStatus('Tables Loaded');
    } catch (err) {
      setStatus('Error loading tables');
    }
  };

  const handleLoadColumns = async () => {
    setStatus('Loading Columns...');
    try {
      const response = await fetch('/api/clickhouse/columns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...clickHouseConfig, table: selectedTable }),
      });

      const data = await response.json();
      setColumns(data.columns || []);
      setStatus('Columns Loaded');
    } catch (err) {
      setStatus('Error loading columns');
    }
  };

  const handleColumnToggle = (col) => {
    setSelectedColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Ingestion Tool</h1>

      {/* Source/Target Selection */}
      <div className="flex gap-4 mb-6">
        <div>
          <label className="font-medium">Source:</label>
          <select
            value={connectionType}
            onChange={(e) => setConnectionType(e.target.value)}
            className="ml-2 p-2 border rounded-lg"
          >
            <option value="clickhouse">ClickHouse</option>
            <option value="flatfile">Flat File</option>
          </select>
        </div>

        <div>
          <label className="font-medium">Target:</label>
          <select
            value={targetType}
            onChange={(e) => setTargetType(e.target.value)}
            className="ml-2 p-2 border rounded-lg"
          >
            <option value="clickhouse">ClickHouse</option>
            <option value="flatfile">Flat File</option>
          </select>
        </div>
      </div>

      {/* Config Inputs */}
      {connectionType === 'clickhouse' ? (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="host"
            placeholder="Host"
            value={clickHouseConfig.host}
            onChange={handleClickHouseChange}
            className="p-2 border rounded-lg"
          />
          <input
            type="text"
            name="port"
            placeholder="Port"
            value={clickHouseConfig.port}
            onChange={handleClickHouseChange}
            className="p-2 border rounded-lg"
          />
          <input
            type="text"
            name="database"
            placeholder="Database"
            value={clickHouseConfig.database}
            onChange={handleClickHouseChange}
            className="p-2 border rounded-lg"
          />
          <input
            type="text"
            name="user"
            placeholder="User"
            value={clickHouseConfig.user}
            onChange={handleClickHouseChange}
            className="p-2 border rounded-lg"
          />
          <input
            type="password"
            name="jwtToken"
            placeholder="JWT Token"
            value={clickHouseConfig.jwtToken}
            onChange={handleClickHouseChange}
            className="p-2 border rounded-lg col-span-2"
          />
        </div>
      ) : (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Flat File Path"
            value={flatFilePath}
            onChange={(e) => setFlatFilePath(e.target.value)}
            className="p-2 border rounded-lg w-full"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={handleConnect}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          <FaCloud className="inline mr-2" /> Connect
        </button>
        <button
          onClick={handleLoadTables}
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
        >
          <FaDatabase className="inline mr-2" /> Load Tables
        </button>
        <button
          onClick={handleLoadColumns}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
        >
          <FaFileImport className="inline mr-2" /> Load Columns
        </button>
      </div>

      {/* Table Selector */}
      {tables.length > 0 && (
        <div className="mb-4">
          <label className="block font-medium mb-1">Select Table:</label>
          <select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="p-2 border rounded-lg w-full"
          >
            <option value="">-- Select a table --</option>
            {tables.map((table) => (
              <option key={table} value={table}>
                {table}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Column Selector */}
      {columns.length > 0 && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Select Columns:</h3>
          <div className="grid grid-cols-2 gap-2">
            {columns.map((col) => (
              <label key={col} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(col)}
                  onChange={() => handleColumnToggle(col)}
                />
                {col}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Status & Result Area */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h4 className="font-medium">Status:</h4>
        <p className="text-sm text-gray-700">{status}</p>

        <h4 className="mt-4 font-medium">Result:</h4>
        <pre className="text-sm bg-white p-2 rounded-lg border mt-1">
          {result}
        </pre>
      </div>
    </div>
  );
};

export default IngestionUI;
