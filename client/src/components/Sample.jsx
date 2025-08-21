import { useState } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';

function ImageGenerator() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const defaultGhibliPrompt = (
    "Create an action figure packaging design in the style of a modern tech-themed toy card, similar to the 'Chain Cartel Action Figure' image. The card should have a sleek, dark blue background with circuit-like patterns and a perforated top edge. In the center, feature a small, stylized action figure using my uploaded image. Above the figure, display the text 'music' in bold yellow letters, below that add 'Your profession' in white colour . On the right side, include three accessory compartments: one with a laptop featuring, one with a classic pen, and one with a phone displaying a simple screen. Use a futuristic, high-tech aesthetic with a focus on clean lines and a professional vibe " 
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateImage = async (e) => {
    e.preventDefault();
    if (!uploadedImage) {
      setError('Please upload an image.');
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrl(null);
    
    try {
      const apiKey = 'AIzaSyDb1uuPPv6DtxJ93UsuelfEeFMDPA2nbsY'; 
      const ai = new GoogleGenAI({ apiKey });
    
      // Combine default Ghibli prompt with custom prompt if provided
      const finalPrompt = customPrompt.trim()
        ? `${defaultGhibliPrompt} Additional details: ${customPrompt}`
        : defaultGhibliPrompt;
    
      // Convert base64 image to a format suitable for the API
      const imageData = uploadedImage.split(',')[1];
      const mimeType = uploadedImage.substring(uploadedImage.indexOf(":") + 1, uploadedImage.indexOf(";"));
    
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp-image-generation',
        contents: [
          {
            parts: [
              { text: finalPrompt },
              {
                inlineData: {
                  data: imageData,
                  mimeType: mimeType,
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      });
    
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part?.inlineData) {
          const generatedImageData = part.inlineData.data;
          const imageSrc = `data:${part.inlineData.mimeType};base64,${generatedImageData}`;
          setImageUrl(imageSrc);
        }
      }
    } catch (err) {
      setError('Failed to generate Ghibli-style image. Please check your API key or try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Generate Ghibli-Style Image</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleImageUpload}
          />
        </div>
        {uploadedImage && (
          <div>
            <h3 className="text-lg font-medium">Uploaded Image:</h3>
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-full h-auto rounded-md mt-2 max-h-64 object-contain"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom Prompt (Optional)
          </label>
          <textarea
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Add specific details "
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
          />
        </div>
        <button
          className={`w-full py-2 px-4 rounded-md text-white ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          onClick={handleGenerateImage}
          disabled={loading || !uploadedImage}
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {imageUrl && (
          <div className="mt-4">
            <h3 className="text-lg font-medium">Generated Image:</h3>
            <img
              src={imageUrl}
              alt="Generated Ghibli-Style Image"
              className="w-full h-auto rounded-md mt-2"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageGenerator;