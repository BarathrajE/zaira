"use client";
import React, {
  useState,
  useRef,
  useEffect,
  DragEvent,
  MouseEvent,
} from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

interface DesignElement {
  id: string | number;
  type: "text" | "image" | "shape";
  content: string;
  style: string;
  x?: number;
  y?: number;
}

const ProductCustomizer: React.FC = () => {
  const baseColors = [
    { name: "Navy", value: "#1f2937" },
    { name: "Black", value: "#000000" },
    { name: "White", value: "#ffffff" },
    { name: "Red", value: "#dc2626" },
    { name: "Blue", value: "#2563eb" },
    { name: "Green", value: "#16a34a" },
  ];

  function Model() {
    const obj = useLoader(OBJLoader, "/assets/homeSlide_image/base.obj");
    return <primitive object={obj} scale={1} />;
  }
  const designElements: DesignElement[] = [
    {
      id: 1,
      type: "text",
      content: "UNLEASHED",
      style: "font-bold text-4xl text-orange-500",
    },
    {
      id: 2,
      type: "text",
      content: "VINTAGE",
      style: "font-bold text-2xl text-white",
    },
    {
      id: 3,
      type: "text",
      content: "RETRO",
      style: "font-bold text-3xl text-yellow-400",
    },
    { id: 4, type: "image", content: "🚗", style: "text-6xl" },
    { id: 5, type: "image", content: "⭐", style: "text-4xl text-yellow-400" },
    { id: 6, type: "image", content: "🔥", style: "text-5xl" },
    { id: 7, type: "shape", content: "●", style: "text-6xl text-red-500" },
    { id: 8, type: "shape", content: "■", style: "text-5xl text-blue-500" },
  ];

  const [selectedColor, setSelectedColor] = useState<string>("#1f2937");
  const [customColor, setCustomColor] = useState<string>("#ff6b35");
  const [droppedElements, setDroppedElements] = useState<DesignElement[]>([
    {
      id: "default-1",
      type: "text",
      content: "UNLEASHED",
      x: 150,
      y: 100,
      style: "font-bold text-4xl text-orange-500",
    },
    {
      id: "default-2",
      type: "image",
      content: "🚗",
      x: 200,
      y: 200,
      style: "text-6xl",
    },
  ]);
  const [draggedElement, setDraggedElement] = useState<DesignElement | null>(
    null
  );
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedElement, setSelectedElement] = useState<DesignElement | null>(
    null
  );
  const [rotation, setRotation] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  const productRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRotating) {
      const interval = setInterval(() => {
        setRotation((prev) => (prev + 2) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isRotating]);

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    element: DesignElement
  ) => {
    setDraggedElement(element);
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggedElement || !productRef.current) return;

    const rect = productRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newElement: DesignElement = {
      ...draggedElement,
      id: `dropped-${Date.now()}`,
      x: x - 25,
      y: y - 25,
    };

    setDroppedElements((prev) => [...prev, newElement]);
    setDraggedElement(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleElementDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    element: DesignElement
  ) => {
    setSelectedElement(element);
    setIsDragging(true);
  };

  const handleElementDrag = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !selectedElement || !productRef.current) return;
    const rect = productRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDroppedElements((prev) =>
      prev.map((el) =>
        el.id === selectedElement.id ? { ...el, x: x - 25, y: y - 25 } : el
      )
    );
  };

  const handleElementDragEnd = () => {
    setIsDragging(false);
    setSelectedElement(null);
  };

  const removeElement = (elementId: string | number) => {
    setDroppedElements((prev) => prev.filter((el) => el.id !== elementId));
  };

  const updateElementStyle = (elementId: string | number, newStyle: string) => {
    setDroppedElements((prev) =>
      prev.map((el) => (el.id === elementId ? { ...el, style: newStyle } : el))
    );
  };

  return (
    <div className="p-4">
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            3D Product Customizer
          </h1>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Controls */}
            <div className="lg:col-span-1 space-y-6">
              {/* Color Picker */}
              <div className="bg-white rounded-xl shadow-lg p-4">
                <h3 className="font-bold text-lg mb-4 text-gray-800">
                  Background Color
                </h3>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {baseColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-12 h-12 rounded-lg border-2 transition-all ${
                        selectedColor === color.value
                          ? "border-blue-500 scale-105"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Custom Color
                  </label>
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => {
                      setCustomColor(e.target.value);
                      setSelectedColor(e.target.value);
                    }}
                    className="w-full h-10 rounded-lg border border-gray-300"
                  />
                </div>
              </div>

              {/* Design Elements Palette */}
              <div className="bg-white rounded-xl shadow-lg p-4">
                <h3 className="font-bold text-lg mb-4 text-gray-800">
                  Design Elements
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {designElements.map((element) => (
                    <div
                      key={element.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, element)}
                      className=" hover:bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-3 cursor-grab active:cursor-grabbing transition-all hover:border-blue-400 flex items-center justify-center"
                    >
                      <span className={element.style}>{element.content}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Drag elements onto the product to customize
                </p>
              </div>

              {/* 3D Controls */}
              <div className="bg-white rounded-xl shadow-lg p-4">
                <h3 className="font-bold text-lg mb-4 text-gray-800">
                  3D Controls
                </h3>
                <div className="space-y-4">
                  <button
                    onClick={() => setIsRotating(!isRotating)}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                      isRotating
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    {isRotating ? "⏸️ Stop Rotation" : "▶️ Auto Rotate"}
                  </button>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Manual Rotation
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={rotation}
                      onChange={(e) => {
                        setRotation(parseInt(e.target.value));
                        setIsRotating(false);
                      }}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 text-center">
                      {rotation}°
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Product Area */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-2xl p-8 min-h-[600px] flex items-center justify-center">
                <div
                  ref={productRef}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onMouseMove={handleElementDrag}
                  onMouseUp={handleElementDragEnd}
                  className="relative w-96 h-96 rounded-lg shadow-lg transition-all duration-300 cursor-crosshair"
                  style={{
                    backgroundColor: selectedColor,
                    transform: `rotateY(${rotation}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* T-shirt outline */}
                  <div className="absolute">
                    <div className="w-full h-[500px]">
                      <Canvas camera={{ position: [0, 0, 5] }}>
                        <ambientLight />
                        <directionalLight position={[2, 2, 2]} />
                        <Model />
                        <OrbitControls />
                      </Canvas>
                    </div>
                  </div>

                  {/* Dropped Elements */}
                  {droppedElements.map((element) => (
                    <div
                      key={element.id}
                      draggable
                      onDragStart={(e) => handleElementDragStart(e, element)}
                      className="absolute cursor-move hover:scale-105 transition-transform group"
                      style={{
                        left: element.x,
                        top: element.y,
                        transform: `rotateY(${-rotation}deg)`,
                      }}
                    >
                      <span className={element.style}>{element.content}</span>
                      <button
                        onClick={() => removeElement(element.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {/* Drop zone indicator */}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Properties */}
            <div className="lg:col-span-1 space-y-6">
              {/* Layer Management */}
              <div className="bg-white rounded-xl shadow-lg p-4">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Layers</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {droppedElements.map((element, index) => (
                    <div
                      key={element.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{element.content}</span>
                      </div>
                      <button
                        onClick={() => removeElement(element.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                  {droppedElements.length === 0 && (
                    <p className="text-gray-500 text-sm text-center py-4">
                      No elements added yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCustomizer;
