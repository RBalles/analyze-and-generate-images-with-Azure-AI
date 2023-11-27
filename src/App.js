// Importa useState y useEffect
import React, { useState, useEffect } from 'react';
import analyzeImage from './azure-image-analysis';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [results, setResults] = useState(null);
  const [inputImage, setInputImage] = useState(null);

  // Utiliza useEffect para cargar la imagen cuando la URL cambie
  useEffect(() => {
    if (imageUrl) {
      setInputImage(imageUrl);
    }
  }, [imageUrl]);

  const handleImageAnalysis = async () => {
    if (!imageUrl) return;

    try {
      const analysisResult = await analyzeImage(imageUrl);
      setResults(analysisResult);
    } catch (error) {
      console.error('Error analyzing image:', error);
    }
  };

  return (
    <div className="App">
      <h1 style={{ color: '#428BCA' }}>Analizar y Generar Imágenes con Azure AI</h1>
      <label htmlFor="imageUrl">URL de la Imagen:</label>
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <button onClick={handleImageAnalysis}>Analizar Imagen</button>

      {inputImage && (
        <div>
          <h2>Imágen:</h2>
          <img src={inputImage} alt="Analize" />
        </div>
      )}

      {results && (
        <div>
          <h2>Resultados de Análisis de Imágenes:</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
