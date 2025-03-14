import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// スタイリングの定義
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  input {
    padding: 10px;
    font-size: 16px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  @media (max-width: 768px) {
    th, td {
      padding: 12px;
    }
  }
`;

const EmployeeManagement = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setError('検索条件を入力してください。');
      return;
    }
    setError(null);
    try {
      const response = await axios.get('http://localhost:8080/api/employees');
      const fetchedEmployees = response.data;
      const filteredEmployees = fetchedEmployees.filter(emp =>
//        emp.name.includes(searchTerm) || emp.nameKana.includes(searchTerm) || emp.email.includes(searchTerm)
        emp.name.includes(searchTerm)
      );
      setEmployees(filteredEmployees);
    } catch (error) {
      setError('従業員データの取得に失敗しました。');
    }
  };
    
  const handleClearSearch = () => {
    setSearchTerm('');
    setEmployees([]); // Reset employees to initial empty array
    setError(null); // Clear any error messages
  };

  const handleEdit = (employee) => {
    navigate('/edit', { state: { employee } });
  }; 

  return (
    <Container>
      <Header>従業員情報管理</Header>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <SearchContainer>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="検索条件を入力" 
        />
        <button onClick={handleSearch}>検索</button>
        <button onClick={handleClearSearch}>クリア</button>
        <button onClick={() => navigate('/register')}>登録</button> {/* 新しい登録ボタン */}
      </SearchContainer>
      <Table>
        <thead>
          <tr>
            <th>編集</th>
            <th>従業員番号</th>
            <th>名前</th>
            <th>かな名</th>
            <th>メール</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.employeeNo}>
              <td><button onClick={() => handleEdit(emp)}>編集</button></td>
              <td>{emp.employeeNo}</td>
              <td>{emp.name}</td>
              <td>{emp.nameKana}</td>
              <td>{emp.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default EmployeeManagement;
