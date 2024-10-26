import React, { useState } from 'react';
import './App.css';

function App() {
  const [link, setLink] = useState('');

  async function baixarVideo() {
    const response = await fetch('http://127.0.0.1:5000/baixar_video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ link })
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'video.mp4'; // Define o nome do arquivo para download
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      console.error("Falha ao baixar o vídeo");
    }
  }

  return (
    <div>
      <img src="./unnamed.png" alt="Logo" />
      <div id="container">
        <input
          id="main-input"
          type="text"
          placeholder="Coloca o link aqui, amor!"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button id="main-button" onClick={baixarVideo}>
          Aperta aqui pra baixar, meu amor! 🎀
        </button>
      </div>
    </div>
  );
}

export default App;
