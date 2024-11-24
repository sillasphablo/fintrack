import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const navigate = useNavigate();

  const [totalReceita, setTotalReceita] = useState(0);
  const [totalDespesa, setTotalDespesa] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    tipo: "receita",
    valor: "",
    descricao: "",
    origem: "",
    data: "",
  });

  const userId = 1; // Substitua pelo ID do usuário logado

  // Use useEffect para inicializar os valores
  useEffect(() => {
    setTotalReceita(4026.99); // Inicializa o valor da receita
    setTotalDespesa(627.63); // Inicializa o valor da despesa
  }, []); // O array vazio garante que isso execute apenas uma vez

  const goToPersonalData = () => {
    setMessage("Dados pessoais em desenvolvimento.");
    setIsMessageModalOpen(true);
    setIsSidebarOpen(false); // Fecha a barra lateral
  };
  const handleInsightsClick = () => {
    setMessage("Este recurso está em desenvolvimento.");
    setIsMessageModalOpen(true);
  };
  const handleLogout = () => {
    setMessage("Você saiu com sucesso.");
    setIsMessageModalOpen(true);
    setIsSidebarOpen(false);
    navigate("/");

  };
  const handleCloseMessage = () =>{
    setIsMessageModalOpen(false);
     }
  const handleRelatorioClick = () => {
    setMessage("Este recurso está em desenvolvimento.");
    setIsMessageModalOpen(true);
  };
  const goToCreditCards = () => {
    setMessage("Cartões de crédito em desenvolvimento.");
    setIsMessageModalOpen(true);
    setIsSidebarOpen(false); // Fecha a barra lateral
  };

  const goToExpenses = () => {
    navigate("/expenses");
  };

  const goToIncomes = () => {
    navigate("/incomes");
  };
  const handleAdd = async () => {
    try {
      // Configura os dados para envio
      const data = { ...formData, userId };

      // Envia os dados para o backend
      const response = await fetch("http://127.0.0.1:8000/api/transacoes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error("Erro ao adicionar transação");
      }

      const result = await response.json();
      console.log("Resposta do servidor:", result);

      // Atualiza os valores totais
      if (formData.tipo === "receita") {
        setTotalReceita((prev) => prev + parseFloat(formData.valor));
      } else {
        setTotalDespesa((prev) => prev + parseFloat(formData.valor));
      }

      // Limpa os dados do formulário e fecha o modal
      setFormData({
        tipo: "receita",
        valor: "",
        descricao: "",
        origem: "",
        data: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="top-bar">
          <div
            className="circular-icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ≡
          </div>
          {/* Adicione outros elementos na barra superior, se necessário */}
        </div>

        {/* Barra Lateral */}
        {isSidebarOpen && (
          <div className="sidebar">
            <div className="sidebar-header">
              <div
                className="circular-icon sidebar-icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                ≡
              </div>
            </div>
            <hr className="sidebar-divider" />
            <div className="sidebar-options">
              <button onClick={goToPersonalData}>Seus Dados Pessoais</button><br />
              <button onClick={goToCreditCards}>Seus Cartões de Crédito</button><br />
              <button onClick={handleLogout}>Sair</button>
            </div>
          </div>
        )}
        <div className="dashboard">
          <div className="top-buttons">
            <button className="button_showing receita" onClick={goToIncomes}>
              Receitas: <br />
              <p><br />R$ {totalReceita.toFixed(2)}</p>
            </button>
            <button
              className="button_insert adicionar"
              onClick={() => setIsModalOpen(true)}
            >
              Adicionar
            </button>
            <button className="button_showing despesa" onClick={goToExpenses}>
              Despesas: <p> <br />R$ {totalDespesa.toFixed(2)}</p>
            </button>
          </div>

          <div className="chart-container">
            <Pie
              data={{
                labels: ["Receitas", "Despesas"],
                datasets: [
                  {
                    label: "Receitas vs Despesas",
                    data: [totalReceita, totalDespesa],
                    backgroundColor: ["#36A2EB", "#FF6384"],
                  },
                ],
              }}
              height={300} // Altura do gráfico
              width={300} // Largura do gráfico
              options={{
                maintainAspectRatio: false, // Permite ajustar altura e largura manualmente
              }}
            />
          </div>

          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h3>Adicionar Transação</h3>
                <div className="radio-buttons">
                  <button
                    className={`radio-button ${
                      formData.tipo === "receita" ? "active" : ""
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, tipo: "receita" })
                    }
                  >
                    Receita
                  </button>
                  <button
                    className={`radio-button ${
                      formData.tipo === "despesa" ? "active" : ""
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, tipo: "despesa" })
                    }
                  >
                    Despesa
                  </button>
                </div>
                <input
                  type="number"
                  placeholder="Valor"
                  value={formData.valor}
                  onChange={(e) =>
                    setFormData({ ...formData, valor: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Descrição"
                  value={formData.descricao}
                  onChange={(e) =>
                    setFormData({ ...formData, descricao: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Origem"
                  value={formData.origem}
                  onChange={(e) =>
                    setFormData({ ...formData, origem: e.target.value })
                  }
                />
                <input
                  type="date"
                  placeholder="Data"
                  value={formData.data}
                  onChange={(e) =>
                    setFormData({ ...formData, data: e.target.value })
                  }
                />
                <button onClick={handleAdd}>Adicionar</button>
                <button onClick={() => setIsModalOpen(false)}>Fechar</button>
              </div>
            </div>
          )}
        </div>
      </div>
      {isMessageModalOpen && (
        <div className="message-modal">
          <div className="message-content">
            <span
              className="close-button"
              onClick={() => handleCloseMessage()}
            >
              ×
            </span>
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
