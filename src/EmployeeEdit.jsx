import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const EmployeeEdit = () => {
  const location = useLocation();
  const { employee } = location.state || {};
  const [formData, setFormData] = useState({
    employeeNo: '',
    name: '',
    nameKana: '',
    email: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!employee) {
      // 新規登録の場合、フォームをリセット
      setFormData({
        employeeNo: '',
        name: '',
        nameKana: '',
        email: '',
      });
    } else if (employee.id) {
      fetchEmployeeById(employee.id);
    }
  }, [employee]);

  const fetchEmployeeById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/employees/${id}`);
      setFormData(response.data);
    } catch (err) {
      setError('従業員情報の取得に失敗しました。');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 保存ロジックをここに実装
  };

  return (
    <div>
      <h1>従業員情報編集</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="employeeNo"
          value={formData.employeeNo}
          onChange={handleChange}
          placeholder="従業員番号"
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="名前"
        />
        <input
          type="text"
          name="nameKana"
          value={formData.nameKana}
          onChange={handleChange}
          placeholder="かな名"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="メール"
        />
        <button type="submit">保存</button>
      </form>
    </div>
  );
};

export default EmployeeEdit;
