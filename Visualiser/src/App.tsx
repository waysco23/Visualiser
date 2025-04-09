import React, { useState } from 'react';
import { Leaf, ShoppingCart } from 'lucide-react';
import { ProductViewer } from './components/ProductViewer';

const colorSchemes = [
  {
    name: 'Forest Blend',
    colors: ['#2d5a27', '#4a8f3e', '#76b852']
  },
  {
    name: 'Ocean Depths',
    colors: ['#1e3d59', '#3d6b99', '#5e9cd3']
  },
  {
    name: 'Autumn Sunset',
    colors: ['#8b4513', '#d2691e', '#deb887']
  },
  {
    name: 'Galaxy Night',
    colors: ['#2c3e50', '#8e44ad', '#2980b9']
  }
];

const models = [
  { id: 'cube', name: 'Eco Cube' },
  { id: 'vase', name: 'Plant Vase' },
  { id: 'bowl', name: 'Eco Bowl' },
  { id: 'ring', name: 'Infinity Ring' }
];

function App() {
  const [selectedModel, setSelectedModel] = useState(models[0].id);
  const [selectedColorScheme, setSelectedColorScheme] = useState(colorSchemes[0]);
  const [cart, setCart] = useState<Array<{ model: string; colors: string[] }>>([]);

  const addToCart = () => {
    setCart([...cart, { model: selectedModel, colors: selectedColorScheme.colors }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-semibold text-gray-900">Eco Products</h1>
            </div>
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ProductViewer selectedModel={selectedModel} colors={selectedColorScheme.colors} />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Choose Your Model</h2>
              <div className="grid grid-cols-2 gap-4">
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedModel === model.id
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-green-400'
                    }`}
                  >
                    {model.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Select Color Scheme</h2>
              <div className="grid grid-cols-2 gap-4">
                {colorSchemes.map((scheme) => (
                  <button
                    key={scheme.name}
                    onClick={() => setSelectedColorScheme(scheme)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedColorScheme.name === scheme.name
                        ? 'border-green-600'
                        : 'border-gray-200 hover:border-green-400'
                    }`}
                  >
                    <div className="text-sm font-medium mb-2">{scheme.name}</div>
                    <div className="flex h-8 rounded-md overflow-hidden">
                      {scheme.colors.map((color) => (
                        <div
                          key={color}
                          className="flex-1"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">Eco-friendly Materials</h3>
              <p className="text-gray-600 mb-4">
                Our products are made from 100% recycled materials, contributing to a sustainable future.
              </p>
              <button
                onClick={addToCart}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;