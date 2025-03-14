import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeEdit = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employees');
      setEmployees(response.data);
    } catch (err) {
      setError('従業員情報の取得に失敗しました。');
      console.error(err);
    }
  };

  const updateEmployee = async (employee) => {
    try {
      await axios.put(`/api/employees/${employee.id}`, employee);
      fetchEmployees(); // 更新後に再取得
    } catch (err) {
      setError('従業員情報の更新に失敗しました。');
      console.error(err);
    }
  };

  const handleSearch = () => {
    const filtered = employees.filter(emp => 
      emp.name.includes(searchTerm) || emp.nameKana.includes(searchTerm) || emp.employeeNo.includes(searchTerm)
    );
    setEmployees(filtered);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    fetchEmployees();
  };

  const handleEdit = (employee) => {
    // 編集ボタンのクリックハンドラ
    console.log('Edit employee:', employee);
    // ここで編集ロジックを実装
  };

  return (
    <div>
      <h1>従業員情報管理</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="検索条件を入力" 
        />
        <button onClick={handleSearch}>検索</button>
        <button onClick={handleClearSearch}>クリア</button>
      </div>
      <table>
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
      </table>
    </div>
  );
};

export default EmployeeEdit
