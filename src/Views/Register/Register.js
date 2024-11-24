import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/logo-41.png";
import simplelogo from "../../Assets/logo-alone.png";
import "./Register.css";

const Register = () => {
  const [nome, setUsername] = useState("");
  const [sobrenome, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const navigate = useNavigate(); // Hook para navegar entre rotas

  const goToLoginPage = () => {
    navigate("/"); // Redireciona para a rota "/login"
  };

  const register = () => {
    alert("Cadastrado com Sucesso");
    navigate("/"); // Redireciona para a rota "/login"
  };
  const handleSubmit = async (e) => {
    console.log("Entrou no Submit");
    e.preventDefault(); // Previne o reload da página

    const data = { nome, sobrenome, email, senha };
    console.log(JSON.stringify(data));

    try {
      console.log("0");
      const response = await fetch("http://127.0.0.1:8000/usuarios/cadastro/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Verifica se a requisição foi bem-sucedida
      if (!response.ok) {
        console.log("Erro na resposta do servidor");
        // Converte o corpo da resposta em JSON
        const result = await response.json();
        console.log("Response:", result);
        throw new Error("Erro na requisição: " + response.statusText);
      }else{
        alert("Cadastrado com Sucesso, agora você pode realizar o seu login");
        navigate("/");
      }

      // Converte o corpo da resposta em JSON
      const result = await response.json();
      console.log("Response:", result);

      // Exemplo: Acessar uma propriedade do JSON retornado
      if (result.email) {
        console.log("Email recebido:", result.email);
      } else {
        console.log("Email não encontrado na resposta.");
      }

      setResponseMessage(result.message || "Requisição bem-sucedida!");
    } catch (error) {
      console.error("Erro:", error);
      setResponseMessage("Algo deu errado!");
    }
  };

  return (
    <div class="login-page">
      <div class="login-container">
        <div class="container-login">
          <div class="img-box">
            <img src={logo} alt="Logotipo da FinTrack" />
          </div>
          <div class="content-box">
            <div class="form-box">
              <div class="img-box-login">
                <img src={simplelogo} alt="Logotipo Simplificado da FinTrack" />
              </div>
              <form onSubmit={handleSubmit}>
                <div class="input-box">
                  <span>Nome</span>
                  <input
                    type="text"
                    placeholder="nome"
                    value={nome}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div class="input-box">
                  <span>Sobrenome</span>
                  <input
                    type="text"
                    placeholder="sobrenome"
                    value={sobrenome}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
                <div class="input-box">
                  <span>E-mail</span>
                  <input
                    type="email"
                    placeholder="@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="input-box">
                  <span>Senha</span>
                  <input
                    type="senha"
                    placeholder="password"
                    value={senha}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div class="input-box-buttons">
                  <input type="submit" value="Login" onClick={goToLoginPage} />
                  <input type="submit" value="Cadastrar" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
