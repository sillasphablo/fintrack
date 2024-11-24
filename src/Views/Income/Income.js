import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Income.css";

const IncomesList = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("AGO");
  const [Incomes, setIncomes] = useState([
    { id: 1, date: "05 JUL", description: "Salário", amount: "R$ 3526,99" },
    { id: 2, date: "20 JUL", description: "Agiota", amount: "R$ 1500,00" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIncome, setCurrentIncome] = useState(null);

  const back = () => {
    navigate("/dashboard");
  };

  const handleEdit = (Income) => {
    setCurrentIncome(Income);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setIncomes(Incomes.filter((Income) => Income.id !== id));
  };

  const handleSave = () => {
    setIncomes(
      Incomes.map((Income) =>
        Income.id === currentIncome.id ? currentIncome : Income
      )
    );
    setIsModalOpen(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="Incomes-container">
          {/* Header com Mês/Ano */}
          <div className="Incomes-header">
            <button onClick={() => setSelectedMonth("JUL")}>JUL</button>
            <button className="selected-month">{selectedMonth}</button>
            <button onClick={() => setSelectedMonth("SET")}>SET</button>
          </div>

          {/* Resumo */}
          <div className="Incomes-summary">
          <h2>R$ 4026,99</h2>
          </div>

          {/* Lista de despesas */}
          <div className="Incomes-list">
            {Incomes.map((Income) => (
              <div key={Income.id} className="Income-item">
                <span className="Income-date">{Income.date}</span>
                <span className="Income-description">{Income.description}</span>
                <span className="Income-amount">{Income.amount}</span>
                <div className="Income-actions">
                  <i
                    className="fas fa-edit edit-icon"
                    onClick={() => handleEdit(Income)}
                  ></i>
                  <i
                    className="fas fa-trash delete-icon"
                    onClick={() => handleDelete(Income.id)}
                  ></i>
                </div>
              </div>
            ))}
          </div>

          {/* Botão de ação */}
          <div className="Incomes-footer">
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
              value={currentIncome?.date}
              onChange={(e) =>
                setCurrentIncome({ ...currentIncome, date: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Descrição"
              value={currentIncome?.description}
              onChange={(e) =>
                setCurrentIncome({
                  ...currentIncome,
                  description: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Valor"
              value={currentIncome?.amount}
              onChange={(e) =>
                setCurrentIncome({ ...currentIncome, amount: e.target.value })
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

export default IncomesList;
