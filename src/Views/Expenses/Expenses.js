import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Expenses.css";

const ExpensesList = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("AGO");
  const [expenses, setExpenses] = useState([
    { id: 1, date: "20 JUL", description: "Dental Ourinhos 1/5", amount: "R$ 233,00" },
    { id: 2, date: "20 JUL", description: "Pag*Lunnie Açaí", amount: "R$ 130,00" },
    { id: 3, date: "17 JUL", description: "Casa de Ração", amount: "R$ 41,00" },
    { id: 4, date: "16 JUL", description: "Super Muffato", amount: "R$ 289,95" },
    { id: 5, date: "15 JUL", description: "Supermercado Bom Jesus", amount: "R$ 113,93" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);

  const back = () => {
    navigate("/dashboard");
  };

  const handleEdit = (expense) => {
    setCurrentExpense(expense);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleSave = () => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === currentExpense.id ? currentExpense : expense
      )
    );
    setIsModalOpen(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="expenses-container">
          {/* Header com Mês/Ano */}
          <div className="expenses-header">
            <button onClick={() => setSelectedMonth("JUL")}>JUL</button>
            <button className="selected-month">{selectedMonth}</button>
            <button onClick={() => setSelectedMonth("SET")}>SET</button>
          </div>

          {/* Resumo */}
          <div className="expenses-summary">
            <h2>R$ 627,63</h2>
          </div>

          {/* Lista de despesas */}
          <div className="expenses-list">
            {expenses.map((expense) => (
              <div key={expense.id} className="expense-item">
                <span className="expense-date">{expense.date}</span>
                <span className="expense-description">{expense.description}</span>
                <span className="expense-amount">{expense.amount}</span>
                <div className="expense-actions">
                  <i
                    className="fas fa-edit edit-icon"
                    onClick={() => handleEdit(expense)}
                  ></i>
                  <i
                    className="fas fa-trash delete-icon"
                    onClick={() => handleDelete(expense.id)}
                  ></i>
                </div>
              </div>
            ))}
          </div>

          {/* Botão de ação */}
          <div className="expenses-footer">
            <button className="pay-button" onClick={back}>
              Voltar
            </button>
          </div>
        </div>
      </div>

      {/* Modal de edição */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar Despesa</h3>
            <input
              type="text"
              placeholder="Data"
              value={currentExpense?.date}
              onChange={(e) =>
                setCurrentExpense({ ...currentExpense, date: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Descrição"
              value={currentExpense?.description}
              onChange={(e) =>
                setCurrentExpense({
                  ...currentExpense,
                  description: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Valor"
              value={currentExpense?.amount}
              onChange={(e) =>
                setCurrentExpense({ ...currentExpense, amount: e.target.value })
              }
            />
            <div className="modal-actions">
              <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
              <button onClick={handleSave}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesList;
