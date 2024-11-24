import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/logo-41.png";
import simplelogo from "../../Assets/logo-alone.png";
import facebook from "../../Assets/facebook.png";
import google from "../../Assets/google.png";
import apple from "../../Assets/apple.png";
import "./Login.css";

const Login = () => {
  const handleDisabled = (message) => {
    setMessage(message);
    setIsMessageModalOpen(true);
    /*alert(`Login com ${platform} ainda está em desenvolvimento.`);*/
  };

  const [email, setUsername] = useState("");
  const [senha, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    console.log("Entrou no Submit");
    e.preventDefault(); // Previne o reload da página

    const data = { email, senha };
    console.log(JSON.stringify(data));

    try {
      console.log("0");
      const response = await fetch("http://127.0.0.1:8000/usuarios/login/", {
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
      }

      // Converte o corpo da resposta em JSON
      const result = await response.json();
      console.log("Response:", JSON.stringify(result));
      console.log("Response:", result.mensagem);

      setResponseMessage(result.mensagem);
      alert("Olá e " + responseMessage);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro:", error);
      setResponseMessage("Algo deu errado!");
      alert(responseMessage);
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
                  <span>E-mail</span>
                  <input
                    type="email"
                    placeholder="@mail.com"
                    value={email}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div class="input-box">
                  <span>Senha</span>
                  <input
                    type="password"
                    placeholder="password"
                    value={senha}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div class="input-box">
                  <input type="submit" value="Entrar" />
                </div>

                <div class="input-box">
                  <p>
                    Não Tem Uma Conta? <a href="/Register">Inscrever-se</a>
                  </p>
                </div>
              </form>
              <h3>Logar Com</h3>
              <ul class="ul">
                <li>
                  <img
                    src={facebook}
                    onClick={() =>
                      handleDisabled(
                        "Login com Facebook ainda está em desenvolvimento."
                      )
                    }
                    alt="Logotipo FaceBook"
                    class="inactive-img"
                  />
                </li>
                <li>
                  <img
                    src={google}
                    onClick={() =>
                      handleDisabled(
                        "Login com Google ainda está em desenvolvimento."
                      )
                    }
                    alt="Logotipo Google"
                    class="inactive-img"
                  />
                </li>
                <li>
                  <img
                    src={apple}
                    onClick={() =>
                      handleDisabled(
                        "Login com Apple ainda está em desenvolvimento."
                      )
                    }
                    alt="Logotipo Apple"
                    class="inactive-img"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Modal para Mensagem */}
        {isMessageModalOpen && (
          <div className="message-modal">
            <div className="message-content">
              <span
                className="close-button"
                onClick={() => setIsMessageModalOpen(false)}
              >
                ×
              </span>
              <p>{message}</p>
            </div>
          </div>
        )}

        {isMessageModalOpen && (
          <div className="message-modal">
            <div className="message-content">
              <span
                className="close-button"
                onClick={() => setIsMessageModalOpen(false)}
              >
                ×
              </span>
              <p>{message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
