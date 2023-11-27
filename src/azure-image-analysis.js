async function analyzeImage(imageUrl) {
  try {
    const response = await fetch(`https://ejercicioimagen.cognitiveservices.azure.com/vision/v3.2/analyze?visualFeatures=Description`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': process.env.REACT_APP_AZURE_VISION_KEY,
      },
      body: JSON.stringify({ url: imageUrl }),
    });

    if (!response.ok) {
      // Si la respuesta no es exitosa, lanza un error
      throw new Error('Error en la solicitud de análisis de imágenes');
    }

    // Espera a que la respuesta se convierta en JSON
    const responseData = await response.json();

    // Retorna los resultados
    return responseData;
  } catch (error) {
    // Maneja los errores y devuelve un objeto JSON válido
    console.error('Error en analyzeImage:', error);
    return { error: true, message: 'Error en la solicitud de análisis de imágenes' };
  }
}

export default analyzeImage;
