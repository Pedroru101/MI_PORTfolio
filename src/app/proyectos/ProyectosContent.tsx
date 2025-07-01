'use client';

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ThreeBackground } from '@/components/ThreeBackground';

// Definición de herramientas con sus colores y descripciones
const tools = [
  { 
    id: "n8n", 
    name: "n8n", 
    color: "#8866FF", 
    description: "Plataforma de automatización de flujos de trabajo que conecta diferentes aplicaciones y servicios sin necesidad de código.",
    imgSrc: "/icons/n8n.png",
    gallery: [
      { title: "Workflow de Monitoreo", src: "/icons/n8n.png" },
      { title: "Integración con APIs", src: "/icons/n8n.png" },
      { title: "Automatización Email", src: "/icons/n8n.png" },
      { title: "Dashboard de Control", src: "/icons/n8n.png" }
    ]
  },
  { 
    id: "powerbi", 
    name: "Power BI", 
    color: "#F2C811", 
    description: "Automatización de informes y dashboards interactivos para visualización y análisis de datos empresariales.",
    imgSrc: "/icons/powerbi.svg",
    gallery: [
      { title: "Portada del Informe", src: "/projects/powerbi/portada.jpg.png" },
      { title: "Informe General", src: "/projects/powerbi/informe_general.jpg.png" },
      { title: "Informe EE.UU.", src: "/projects/powerbi/informe_eeuu.jpg.png" },
      { title: "Modelo de Datos", src: "/projects/powerbi/modelo_datos.jpg.png" }
    ]
  },
  { 
    id: "python", 
    name: "Python", 
    color: "#3776AB", 
    description: "Lenguaje de programación versátil para análisis de datos, machine learning y automatización de procesos.",
    imgSrc: "/icons/python.png",
    gallery: [
      { title: "Análisis de Datos", src: "/icons/python.png" },
      { title: "Web Scraping", src: "/icons/python.png" },
      { title: "Machine Learning", src: "/icons/python.png" },
      { title: "Automatización ETL", src: "/icons/python.png" }
    ]
  },
  { 
    id: "sql", 
    name: "SQL Server", 
    color: "#CC2927", 
    description: "Gestión y análisis de bases de datos relacionales para extraer información valiosa y generar reportes.",
    imgSrc: "/icons/sql.png",
    gallery: [
      { title: "Consultas Avanzadas", src: "/icons/sql.png" },
      { title: "Modelado de Datos", src: "/icons/sql.png" },
      { title: "Optimización de Queries", src: "/icons/sql.png" },
      { title: "Reportes Automáticos", src: "/icons/sql.png" }
    ]
  },
  { 
    id: "sheets", 
    name: "Google Sheets", 
    color: "#0F9D58", 
    description: "Hojas de cálculo colaborativas con automatización para gestión de datos y reportes en tiempo real.",
    imgSrc: "/icons/google-sheets.png",
    gallery: [
      { title: "Dashboards Dinámicos", src: "/icons/google-sheets.png" },
      { title: "Automatización con Apps Script", src: "/icons/google-sheets.png" },
      { title: "Integración con APIs", src: "/icons/google-sheets.png" },
      { title: "Reportes Automáticos", src: "/icons/google-sheets.png" }
    ]
  }
];

// Componente para la galería de imágenes con lightbox y zoom
function ImageGallery({ images, toolColor, onLightboxChange }: { images: {title: string, src: string}[], toolColor: string, onLightboxChange: (isOpen: boolean) => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100); // 100% es el tamaño normal
  const [isZoomed, setIsZoomed] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  // Definir un tipo para dragStart que incluya pinchDistance
  interface DragState {
    x: number;
    y: number;
    pinchDistance?: number;
  }
  
  const dragStart = useRef<DragState>({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  
  // Notificar al componente padre cuando cambia el estado del lightbox
  useEffect(() => {
    onLightboxChange(showLightbox);
  }, [showLightbox, onLightboxChange]);

  // Efecto para manejar clics fuera del lightbox
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showLightbox && lightboxRef.current && !lightboxRef.current.contains(event.target as Node)) {
        setShowLightbox(false);
        resetZoom();
      }
    };
    
    if (showLightbox) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLightbox]);
  
  // Detectar si estamos en un dispositivo móvil
  const [isMobile, setIsMobile] = useState(false);
  
  // Detectar dispositivo móvil al montar el componente
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    // Resetear zoom y posición al cambiar de imagen
    resetZoom();
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    // Resetear zoom y posición al cambiar de imagen
    resetZoom();
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Alternar entre zoom normal y 150%
    if (isZoomed) {
      resetZoom();
    } else {
      setZoomLevel(150);
      setIsZoomed(true);
    }
  };

  // Función para verificar si el cursor está sobre la imagen
  const isMouseOverContainer = (clientX: number, clientY: number): boolean => {
    if (!imageContainerRef.current) return false;
    
    const rect = imageContainerRef.current.getBoundingClientRect();
    return (
      clientX >= rect.left && 
      clientX <= rect.right && 
      clientY >= rect.top && 
      clientY <= rect.bottom
    );
  };

  // Manejador de rueda para zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (!isMouseOverContainer(e.clientX, e.clientY)) return;
    
    e.preventDefault(); // Prevenir el desplazamiento de la página
    
    // Ajustar zoom con la rueda del ratón
    const delta = e.deltaY * -0.01;
    // Limitar el zoom entre 100% (tamaño original) y 175% (máximo zoom)
    const newZoom = Math.min(Math.max(zoomLevel + delta * 10, 100), 175);
    setZoomLevel(newZoom);
    if (newZoom > 100) {
      setIsZoomed(true);
    } else {
      setIsZoomed(false);
      setDragPosition({ x: 0, y: 0 });
    }
  };

  const resetZoom = () => {
    setZoomLevel(100);
    setIsZoomed(false);
    setDragPosition({ x: 0, y: 0 });
  };

  const increaseZoom = () => {
    const newZoom = Math.min(zoomLevel + 15, 175);
    setZoomLevel(newZoom);
    if (newZoom > 100) {
      setIsZoomed(true);
    }
  };

  const decreaseZoom = () => {
    const newZoom = Math.max(zoomLevel - 15, 100);
    setZoomLevel(newZoom);
    if (newZoom === 100) {
      setIsZoomed(false);
      setDragPosition({ x: 0, y: 0 });
    }
  };

  // Calcular los límites de arrastre basados en el nivel de zoom y el tamaño del contenedor
  const calculateDragLimits = () => {
    if (!imageContainerRef.current || !imageRef.current) return { maxX: 50, maxY: 50 };
    
    const containerRect = imageContainerRef.current.getBoundingClientRect();
    const imageRect = imageRef.current.getBoundingClientRect();
    
    // El límite es proporcional al nivel de zoom
    const zoomFactor = zoomLevel / 100;
    const maxX = Math.max(0, (imageRect.width * zoomFactor - containerRect.width) / (2 * zoomFactor));
    const maxY = Math.max(0, (imageRect.height * zoomFactor - containerRect.height) / (2 * zoomFactor));
    
    return { maxX, maxY };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Solo procesar clic izquierdo
    
    if (isZoomed) {
      setIsDragging(true);
      dragStart.current = { x: e.clientX - dragPosition.x, y: e.clientY - dragPosition.y };
      e.preventDefault(); // Prevenir selección de texto
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && isZoomed) {
      const newX = e.clientX - dragStart.current.x;
      const newY = e.clientY - dragStart.current.y;
      
      // Calcular límites de arrastre
      const { maxX, maxY } = calculateDragLimits();
      
      // Limitar el arrastre para que la imagen no se salga completamente de la vista
      const clampedX = Math.max(Math.min(newX, maxX), -maxX);
      const clampedY = Math.max(Math.min(newY, maxY), -maxY);
      
      setDragPosition({ x: clampedX, y: clampedY });
      e.preventDefault(); // Prevenir selección de texto durante el arrastre
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      if (isZoomed) {
        setIsDragging(true);
        dragStart.current = { 
          x: e.touches[0].clientX - dragPosition.x, 
          y: e.touches[0].clientY - dragPosition.y 
        };
      }
    } else if (e.touches.length === 2) {
      // Implementar zoom con pellizco (pinch)
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );
      
      // Guardar la distancia inicial para calcular el zoom
      dragStart.current = { ...dragStart.current, pinchDistance: distance };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging && isZoomed) {
      const newX = e.touches[0].clientX - dragStart.current.x;
      const newY = e.touches[0].clientY - dragStart.current.y;
      
      // Calcular límites de arrastre
      const { maxX, maxY } = calculateDragLimits();
      
      // Limitar el arrastre para que la imagen no se salga completamente de la vista
      const clampedX = Math.max(Math.min(newX, maxX), -maxX);
      const clampedY = Math.max(Math.min(newY, maxY), -maxY);
      
      setDragPosition({ x: clampedX, y: clampedY });
      e.preventDefault(); // Prevenir el desplazamiento de la página
    } else if (e.touches.length === 2 && dragStart.current.pinchDistance) {
      // Implementar zoom con pellizco (pinch)
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );
      
      // Calcular el factor de zoom basado en la diferencia de distancia
      const pinchRatio = distance / dragStart.current.pinchDistance;
      const newZoom = Math.min(Math.max(zoomLevel * pinchRatio, 100), 175);
      
      setZoomLevel(newZoom);
      if (newZoom > 100) {
        setIsZoomed(true);
      }
      
      // Actualizar la distancia para el próximo cálculo
      dragStart.current = { ...dragStart.current, pinchDistance: distance };
      e.preventDefault(); // Prevenir el desplazamiento de la página
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      setIsDragging(false);
      // Limpiar la distancia de pellizco
      dragStart.current = { ...dragStart.current, pinchDistance: undefined };
    }
  };

  // Asegurarse de que el arrastre se detenga incluso si el mouse sale del contenedor
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  // Efecto para manejar el evento de rueda a nivel de documento
  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      if (!showLightbox || !imageContainerRef.current) return;
      
      // Verificar si el cursor está sobre la imagen
      if (isMouseOverContainer(e.clientX, e.clientY)) {
        e.preventDefault(); // Prevenir el desplazamiento de la página
        
        // Ajustar zoom con la rueda del ratón
        const delta = e.deltaY * -0.01;
        const newZoom = Math.min(Math.max(zoomLevel + delta * 10, 100), 175);
        setZoomLevel(newZoom);
        if (newZoom > 100) {
          setIsZoomed(true);
        } else {
          setIsZoomed(false);
          setDragPosition({ x: 0, y: 0 });
        }
      }
    };

    // Agregar el evento a nivel de documento
    if (showLightbox) {
      window.addEventListener('wheel', handleGlobalWheel, { passive: false });
    }
    
    return () => {
      window.removeEventListener('wheel', handleGlobalWheel);
    };
  }, [showLightbox, zoomLevel, isZoomed]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="grid grid-cols-2 gap-1 flex-grow">
        {images.map((image, idx) => (
          <div key={idx} className="relative aspect-video bg-gray-800/50 rounded-sm overflow-hidden cursor-pointer group" onClick={() => {
            setCurrentImageIndex(idx);
            setShowLightbox(true);
            resetZoom();
          }}>
            <Image 
              src={image.src} 
              alt={image.title} 
              fill 
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-0.5 text-[8px] md:text-[10px] text-white truncate">
              {image.title}
            </div>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-black/60 rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox con funcionalidad de zoom */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setShowLightbox(false)}>
          <div 
            ref={lightboxRef}
            className="relative max-w-[95%] max-h-[90vh] w-full" 
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              ref={imageContainerRef}
              className="relative bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center"
              style={{ 
                width: '100%', 
                height: '80vh',
                cursor: isZoomed ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
              }}
              onDoubleClick={handleDoubleClick}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                ref={imageRef}
                className="relative w-full h-full flex items-center justify-center p-4"
              >
                <div 
                  className="transition-transform duration-200"
                  style={{ 
                    transform: `scale(${zoomLevel / 100}) translate(${dragPosition.x / (zoomLevel / 100)}px, ${dragPosition.y / (zoomLevel / 100)}px)`,
                    transformOrigin: 'center center',
                    maxWidth: '90%',
                    maxHeight: '90%',
                    position: 'relative'
                  }}
                >
                  <Image 
                    src={images[currentImageIndex].src} 
                    alt={images[currentImageIndex].title} 
                    width={1200}
                    height={800}
                    sizes="90vw"
                    className="object-contain"
                    priority
                    draggable={false}
                    style={{
                      objectFit: 'contain',
                      maxHeight: '70vh',
                      width: 'auto',
                      height: 'auto'
                    }}
                  />
                </div>
              </div>
              
              {/* Instrucciones de uso */}
              <div className="absolute top-4 left-4 bg-black/70 rounded-lg px-3 py-1 text-white text-xs opacity-70 hidden md:block">
                <p>Doble clic: Zoom 150% | Rueda: Ajustar zoom | Arrastrar: Mover imagen</p>
              </div>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <div className="bg-black/70 rounded-full px-4 py-2 text-white text-sm">
                {images[currentImageIndex].title} {isZoomed ? `(${Math.round(zoomLevel)}%)` : ''}
              </div>
            </div>
            {/* Botones de zoom */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/80 transition-colors text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  decreaseZoom();
                }}
              >
                <span className="text-lg">-</span>
              </button>
              <button
                className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/80 transition-colors text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  resetZoom();
                }}
              >
                <span className="text-xs">100%</span>
              </button>
              <button
                className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/80 transition-colors text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  increaseZoom();
                }}
              >
                <span className="text-lg">+</span>
              </button>
            </div>
            <button 
              className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/80 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              style={{color: toolColor}}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/80 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              style={{color: toolColor}}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setShowLightbox(false);
              }}
            >
              Volver atrás
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ExpandableDescription({ html, collapsed, onToggle, index, toolColor }: { html: string, collapsed: boolean, onToggle: (index: number) => void, index: number, toolColor: string }) {
  let firstPart = html;
  let secondPart = '';

  const splitMarker = "🚧 <b>Retos Técnicos:</b>";
  const splitIndex = html.indexOf(splitMarker);

  if (splitIndex !== -1) {
    firstPart = html.substring(0, splitIndex);
    secondPart = html.substring(splitIndex);
  } else {
    // Fallback si no se encuentra el marcador
    const fallbackMarker = "<br/><br/>";
    const fallbackIndex = html.indexOf(fallbackMarker);
    if (fallbackIndex !== -1) {
        firstPart = html.substring(0, fallbackIndex);
        secondPart = html.substring(fallbackIndex);
    }
  }

  return (
    <div className="text-gray-300 text-xs md:text-sm">
      <div className="line-clamp-6 md:line-clamp-none leading-tight md:leading-normal" dangerouslySetInnerHTML={{ __html: firstPart }} />
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ overflow: 'hidden' }}
          >
            <div dangerouslySetInnerHTML={{ __html: secondPart }} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* El botón ya no se muestra aquí, se renderiza en el componente padre */}
    </div>
  );
}

interface Project {
  title: string;
  description: string;
  tags: string[];
}

export default function ProyectosContent() {
  const projects: Project[] = [
    {
      title: "Visualizando el Rendimiento de Adventure Works Cycles",
      description: `🧩 <b>Necesidad / Problema Inicial:</b><br/>Adventure Works Cycles (AWC) necesitaba un análisis integral de ventas para optimizar su estrategia comercial en Norteamérica, Europa y Asia. El objetivo era transformar datos dispersos en SQL Server en un tablero interactivo que revelara tendencias, rentabilidad y desempeño regional.<br/><br/>🚧 <b>Retos Técnicos:</b><ul><li><b>Limpieza de Datos Multilingües:</b> Eliminación de columnas redundantes en varios idiomas para optimizar el modelo.</li><li><b>Optimización del Modelo Relacional:</b> Creación de relaciones eficientes entre tablas (FactInternetSales, DimProduct, DimCustomer) para análisis multidimensionales.</li><li><b>Generación de Métricas Clave:</b> Cálculo de ingresos, utilidad neta y márgenes usando DAX.</li><li><b>Visualización Efectiva:</b> Diseño de mockups para guiar el desarrollo del tablero, priorizando claridad e interactividad.</li></ul><br/>⚙️ <b>Solución (Flujo del Proyecto):</b><br/>El proyecto comenzó con la extracción de datos desde SQL Server y su transformación en Power BI, eliminando columnas irrelevantes y creando una tabla de calendario con DAX. Se estructuró un esquema en estrella con FactInternetSales como tabla central y se segmentaron los datos por categorías (Bikes, Accessories, Clothing) y regiones (EE.UU., Canadá, Europa). Las visualizaciones incluyeron KPIs generales ($1.98M en ingresos, 8K unidades vendidas), mapas geográficos, análisis de márgenes por región y tablas comparativas de periodos.<br/><br/>🚀 <b>Resultados y Beneficios:</b><ul><li><b>Toma de Decisiones Ágil:</b> Identificación de Bikes como categoría más rentable y Canadá como mercado clave.</li><li><b>Ahorro de Tiempo:</b> Automatización de reportes antes manuales.</li><li><b>Escalabilidad:</b> Modelo adaptable para nuevos mercados o métricas.</li></ul><br/>🧪 <b>Ejemplo de uso real:</b><br/>El equipo de ventas utiliza el tablero para detectar oportunidades (como el margen bruto del 65% en Northwest), optimizar inventario reduciendo stock en subcategorías de baja rotación, y planificar promociones ajustando descuentos en meses con menor ingreso basándose en tendencias históricas.`,
      tags: ["powerbi", "SQL Server", "DAX", "Visualización de Datos", "Análisis de Ventas", "KPI", "Modelado de Datos"],
    },
    {
      title: "Sistema de Monitoreo de Medios para Riesgo Político",
      description: `🧩 <b>Necesidad / Problema Inicial:</b><br/>Un alto cargo político necesita un resumen diario y automatizado de todas las noticias (prensa, radio, TV, digital) para detectar riesgos reputacionales, crisis o asuntos de interés sin tener que revisar manually cientos de fuentes. El objetivo es recibir una alerta temprana y concisa directamente en su correo para una toma de decisiones ágil.<br/><br/>🚧 <b>Retos Técnicos:</b><ul><li><b>Gestión de Grandes Volúmenes:</b> Procesar cientos de noticias diarias requirió implementar un sistema de división en lotes (SplitInBatches) para manejar los datos de forma eficiente sin sobrecargar los servicios.</li><li><b>Análisis Semántico Profundo:</b> Para entender el contexto real más allá de palabras clave, se utilizó la vectorización de texto (embeddings) con un modelo de IA local (Ollama), permitiendo un análisis de sentimiento y relevancia mucho más preciso.</li><li><b>Orquestación Multi-Agente:</b> Se diseñó una arquitectura de dos agentes de IA. El primero analiza pequeños fragmentos de noticias, y el segundo consolida esos análisis para generar un informe ejecutivo final, superando las limitaciones de contexto de los modelos de lenguaje.</li></ul><br/>⚙️ <b>Solución (Descripción del Flujo):</b><br/>El flujo se conecta a una API de medios para descargar las noticias del día. Cada noticia es procesada y convertida en un vector numérico (embedding) usando un modelo de IA local. Un primer agente de IA analiza estos vectores en lotes para una pre-evaluación. Luego, un segundo agente consolida estos análisis, genera un informe ejecutivo final y determina si existe una alerta. Finalmente, el sistema formatea este informe en un correo HTML profesional y lo envía por Gmail, con un asunto dinámico que cambia según el nivel de riesgo detectado.<br/><br/>🚀 <b>Resultados y Beneficios:</b><ul><li><b>Ahorro de Tiempo:</b> Automatiza por completo el monitoreo de medios, liberando más de 3 horas de trabajo manual al día.</li><li><b>Detección Proactiva:</b> Permite identificar riesgos y oportunidades con antelación gracias al análisis semántico, superando la simple búsqueda por palabras clave.</li><li><b>Escalabilidad:</b> El sistema está diseñado para procesar miles de noticias sin problemas gracias a la gestión por lotes y la arquitectura de IA.</li><li><b>Información Consolidada:</b> Entrega un único informe ejecutivo, eliminando el ruido informativo y permitiendo tomar decisiones rápidas y basadas en datos.</li></ul><br/>🧪 <b>Ejemplo de uso real:</b><br/>Un asesor de comunicación programa el workflow para ejecutarse cada mañana. El sistema descarga todas las menciones al "Cabildo de Gran Canaria". Si detecta una noticia sobre una protesta o una transcripción de radio con críticas a la gestión, el presidente recibe un correo a primera hora con el asunto "🚨 ¡Alerta! Riesgos detectados..." y un resumen de los puntos clave, permitiéndole preparar una respuesta antes del inicio de su jornada.`,
      tags: ["n8n", "IA", "Ollama", "API", "Automatización", "Embeddings", "JavaScript", "ngrok", "HTML", "DeepSeek-R1"],
    },
    {
      title: "Generador Avanzado de Informes de ROI y Clipping de Medios",
      description: `🧩 <b>Necesidad / Problema Inicial:</b><br/>Una agencia de comunicación necesitaba automatizar por completo la creación de informes de clipping y ROI para sus clientes. El proceso manual era extremadamente lento e implicaba consolidar datos de TV, radio, prensa y medios digitales, calcular métricas financieras (VPE y VC), generar gráficos y presentar todo en un formato profesional, tanto en HTML como en PDF.<br/><br/>🚧 <b>Retos Técnicos:</b><ul><li><b>Orquestación de Datos Compleja:</b> Se requería una autenticación de varios pasos con una API propietaria. El mayor reto fue procesar y enriquecer los datos en paralelo, generando enlaces de visualización únicos y seguros para cada noticia mediante una doble codificación en Base64.</li><li><b>Generación Dinámica de Contenido Visual:</b> El sistema debía crear sobre la marcha no solo un informe HTML complejo, sino también gráficos de barras y tarta. Para ello, se desarrolló un <b>microservicio en Python con Matplotlib, desplegado en Render</b>, que recibe los datos, genera los gráficos y los devuelve como imágenes listas para ser incrustadas en el correo.</li><li><b>Manejo de Múltiples Formatos de Salida:</b> El workflow fue diseñado para entregar el informe en dos formatos distintos: un correo HTML detallado para visualización inmediata y un archivo PDF adjunto para un registro formal, lo que exigió crear dos flujos de salida paralelos.</li><li><b>Cálculos Financieros y Agregación:</b> Toda la lógica para calcular el Valor Publicitario Equivalente (VPE), el Valor de Contenido (VC) y las audiencias se implementó en nodos de código, agregando los totales por tipo de medio y a nivel global de forma precisa.</li></ul><br/>⚙️ <b>Solución (Descripción del Flujo):</b><br/>El workflow se inicia con los parámetros del cliente (ID, fechas). Primero, se autentica en la API de medios y obtiene todas las noticias. Los datos se dividen por tipo de medio (TV, Radio, etc.) y se procesan para generar enlaces seguros. Un nodo central de código agrega toda la información, calcula las métricas de ROI y construye la estructura HTML del informe. Al mismo tiempo, envía los datos agregados al <b>microservicio en Render, que utiliza Python y Matplotlib para generar los gráficos</b> y devolverlos como imágenes. Finalmente, un nodo ensambla el correo electrónico final, incrusta los gráficos en el cuerpo del HTML y lo envía. Una rama paralela puede generar una versión en PDF del mismo informe y adjuntarla a otro correo.<br/><br/>🚀 <b>Resultados y Beneficios:</b><ul><li><b>Automatización Completa (End-to-End):</b> Se eliminó el 99% del trabajo manual, reduciendo el tiempo de entrega de informes de varias horas o días a tan solo unos minutos.</li><li><b>Informes Enriquecidos y Profesionales:</b> La entrega de informes visualmente atractivos, con gráficos y datos precisos, mejoró drásticamente la percepción de valor por parte del cliente.</li><li><b>Cero Errores Humanos:</b> La automatización de los cálculos y la maquetación eliminó por completo los errores humanos, garantizando consistencia y fiabilidad.</li><li><b>Flexibilidad y Escalabilidad:</b> El sistema es capaz de generar informes para cualquier cliente y período con solo cambiar los parámetros de entrada, siendo totalmente escalable.</li></ul><br/>🧪 <b>Ejemplo de uso real:</b><br/>Un gestor de cuentas necesita el informe de impacto mediático del último mes para un cliente corporativo. Ejecuta el workflow, y en menos de 5 minutos, recibe en su bandeja de entrada un correo profesional con tablas de resumen, gráficos de distribución de medios y enlaces directos a cada noticia. Puede reenviar este correo directamente a los directivos del cliente.`, 
      tags: ["n8n", "API", "Automatización", "JavaScript", "HTML", "ROI", "Reporting", "Gmail", "Python", "PDF", "Chart Generation", "Data Visualization", "Base64", "Clipping", "Matplotlib", "Render"],
    },
    {
      title: "Sistema Integral de Clipping y ROI con Salida Dual (HTML/PDF)",
      description: `🧩 <b>Necesidad / Problema Inicial:</b><br/>Un cliente estratégico requería una solución de reporting que no solo automatizara la recolección de datos y el cálculo de ROI, sino que también entregara los resultados en dos formatos distintos simultáneamente: un correo HTML interactivo para análisis rápido y un documento PDF formal para archivo y distribución ejecutiva.<br/><br/>🚧 <b>Retos Técnicos:</b><ul><li><b>Gestión de Flujos Paralelos:</b> El principal desafío fue diseñar un workflow capaz de ejecutar y sincronizar dos ramas de salida completamente diferentes (HTML y PDF) a partir de un único conjunto de datos procesados, asegurando que ambas entregas fueran consistentes.</li><li><b>Generación de Enlaces Seguros y Únicos:</b> Para garantizar la confidencialidad de cada noticia, se implementó un sistema de doble codificación Base64 para generar URLs de visualización únicas y seguras, impidiendo el acceso no autorizado.</li><li><b>Orquestación de Múltiples Servicios:</b> El sistema debía coordinar de forma asíncrona la autenticación con la API de medios, el procesamiento de datos en nodos de código, la generación de gráficos a través del microservicio en Render y el ensamblaje final de dos correos distintos.</li><li><b>Potencial de IA Conversacional:</b> Se incluyó un agente de LangChain (actualmente desactivado) diseñado para permitir la solicitud de informes a través de un bot de Telegram, añadiendo una capa de complejidad en la interpretación de lenguaje natural.</li></ul><br/>⚙️ <b>Solución (Descripción del Flujo):</b><br/>El workflow se inicia, se autentica en la API de medios y obtiene los datos. Procesa cada noticia para generar un enlace seguro mediante doble codificación Base64. Agrega los datos y los envía al microservicio de Python/Matplotlib en Render para crear los gráficos. Un nodo Merge centraliza todos los activos (datos y gráficos). A partir de aquí, el flujo se bifurca: una rama construye un correo HTML detallado con gráficos incrustados y lo envía; la otra rama genera un PDF y lo adjunta a un segundo correo, logrando una entrega dual y simultánea.<br/><br/>🚀 <b>Resultados y Beneficios:</b><ul><li><b>Máxima Eficiencia y Flexibilidad:</b> Se satisface la necesidad del cliente de tener dos formatos de informe (operativo y ejecutivo) con una sola ejecución, ahorrando tiempo y esfuerzo.</li><li><b>Seguridad de Datos Reforzada:</b> La técnica de doble codificación de enlaces protege la integridad y confidencialidad de la información mediática.</li><li><b>Calidad de Entrega Superior:</b> La combinación de un correo HTML interactivo y un PDF profesional elevó la percepción de valor del servicio.</li><li><b>Preparado para el Futuro:</b> La arquitectura con el agente de IA demuestra la capacidad de evolucionar hacia interfaces conversacionales avanzadas.</li></ul><br/>🧪 <b>Ejemplo de uso real:</b><br/>Un director de comunicación solicita el informe trimestral. El sistema se ejecuta y, en minutos, recibe dos correos: uno con el informe HTML que puede explorar y reenviar a su equipo, y otro con el PDF oficial que presenta directamente en la reunión del comité directivo.`,
      tags: ["n8n", "API", "Automatización", "JavaScript", "HTML", "PDF", "ROI", "Clipping", "Gmail", "Chart Generation", "Python", "Matplotlib", "Render", "Base64", "LangChain", "AI Agent"],
    },
    {
      title: "Generación Automática de Artículos WordPress sobre Licitaciones",
      description: `🧩 <b>Necesidad / Problema Inicial:</b><br/>Automatizar la generación y publicación de artículos sobre licitaciones públicas en WordPress, extrayendo datos desde APIs oficiales, generando contenido único y evitando repeticiones. El objetivo es mantener actualizado un portal de noticias sin intervención manual, asegurando calidad y diversidad temática.<br/><br/>🚧 <b>Retos Técnicos:</b><ul><li><b>Obtención y Procesamiento de Datos Masivos:</b> La API de licitaciones devuelve cientos de entradas diarias. Se implementó procesamiento por lotes (batch) para evitar cuellos de botella y gestionar eficientemente la memoria.</li><li><b>Generación de Contenido con IA y Memoria Contextual:</b> Para evitar artículos repetidos, se utilizó un modelo de IA (OpenRouter/Gemini) con memoria de contexto, permitiendo que cada artículo generado sea único y relevante, recordando los temas ya tratados.</li><li><b>Automatización de Publicación en WordPress:</b> Se integró la API de WordPress para crear borradores de artículos automáticamente, formateando el contenido en HTML y asignando etiquetas y categorías de forma dinámica.</li><li><b>Gestión de Errores y Reintentos:</b> El workflow incluye lógica de reintentos ante fallos de red o errores de autenticación, asegurando la robustez del proceso.</li></ul><br/>⚙️ <b>Solución (Descripción del Flujo):</b><br/>El flujo comienza consultando la API oficial de licitaciones, filtrando resultados relevantes y dividiéndolos en lotes manejables. Cada lote es procesado por un nodo de IA que, utilizando memoria contextual, redacta artículos originales sobre cada licitación. El contenido generado se formatea en HTML y se publica automáticamente como borrador en WordPress a través de su API, asignando etiquetas según el sector y la región. El sistema registra los IDs de licitaciones ya procesadas para evitar duplicados y realiza reintentos automáticos en caso de error.<br/><br/>🚀 <b>Resultados y Beneficios:</b><ul><li><b>Actualización Continua y Sin Esfuerzo:</b> El portal de noticias se mantiene actualizado en tiempo real sin intervención humana.</li><li><b>Contenido Original y No Redundante:</b> Gracias a la memoria de contexto, se evita la repetición de temas y se mejora la calidad editorial.</li><li><b>Escalabilidad:</b> El sistema puede adaptarse fácilmente a otras fuentes de datos o a diferentes portales WordPress.</li><li><b>Reducción de Errores Manuales:</b> Al automatizar todo el flujo, se eliminan los errores asociados a la gestión manual de contenidos.</li></ul><br/>🧪 <b>Ejemplo de uso real:</b><br/>Un portal de noticias regional activa el workflow para cubrir licitaciones públicas. Cada mañana, el sistema publica automáticamente entre 10 y 20 borradores de artículos, listos para revisión y publicación final, asegurando una cobertura exhaustiva y profesional de oportunidades públicas.`,
      tags: ["n8n", "API", "Automatización", "WordPress", "HTML", "Batch", "OpenRouter", "Gemini", "IA", "Content Generation", "Memory", "Error Handling"],
    },
    {
      title: "Reporte Diario de Consumo OpenAI vía Gmail",
      description: `🧩 <b>Necesidad / Problema Inicial:</b><br/>Monitorizar y controlar el coste diario del consumo de modelos OpenAI (por ejemplo, gpt-4o-mini) de forma automática, recibiendo un resumen detallado y preciso cada mañana por correo electrónico, sin necesidad de acceder manualmente a la consola de OpenAI.<br/><br/>🚧 <b>Retos Técnicos:</b><ul><li><b>Cálculo Automático de Fechas:</b> El sistema determina cada día la fecha anterior para consultar el consumo exacto.</li><li><b>Integración con la API de OpenAI:</b> Se requiere autenticación segura y manejo de tokens para obtener los datos de uso diarios.</li><li><b>Cálculo Dinámico de Costos:</b> El workflow suma los tokens de entrada/salida y aplica los precios oficiales por millón de tokens, diferenciando entre contexto y generación.</li><li><b>Manejo de Errores y Ausencia de Datos:</b> Si no hay consumo o la API falla, el sistema informa el error y asegura que el reporte llegue igualmente.</li><li><b>Automatización del Envío:</b> El resumen se formatea y envía automáticamente por Gmail, incluyendo desglose y costo total en USD.</li></ul><br/>⚙️ <b>Solución (Descripción del Flujo):</b><br/>Un Schedule Trigger ejecuta el flujo cada mañana. Un nodo calcula la fecha de ayer. Luego, un HTTP Request consulta la API de OpenAI para obtener el consumo de ese día. Un nodo de código procesa la respuesta, suma los tokens y calcula el coste según los precios oficiales. Finalmente, otro nodo envía un correo Gmail con el resumen: fecha, modelos usados, tokens de entrada y salida, y el costo total estimado.<br/><br/>🚀 <b>Resultados y Beneficios:</b><ul><li><b>Transparencia y Control:</b> El usuario recibe un desglose diario de su gasto en OpenAI, permitiendo tomar decisiones informadas y evitar sorpresas.</li><li><b>Automatización Total:</b> No requiere intervención manual; el reporte llega puntualmente cada día.</li><li><b>Adaptabilidad:</b> Puede ajustarse fácilmente a otros modelos, cuentas o monedas.</li><li><b>Prevención de Errores:</b> El sistema maneja la ausencia de datos y errores de red, asegurando siempre un reporte útil.</li></ul><br/>🧪 <b>Ejemplo de uso real:</b><br/>Cada mañana, el usuario recibe en su bandeja de entrada un correo titulado "📊 Reporte Diario de Consumo OpenAI" con el costo en USD, tokens usados y fecha exacta. Si algún día no hubo consumo, el email lo indica claramente, evitando confusiones o sustos inesperados.`,
      tags: ["n8n", "API", "Automatización", "OpenAI", "Gmail", "JavaScript", "Reporting", "Cost Management", "Token Usage"],
    },
    {
      title: "Clasificación Automática de Correos de Soporte con Gemini",
      description: `🧩 <b>Necesidad / Problema Inicial:</b><br/>
Un equipo de soporte técnico recibe diariamente decenas de correos con incidencias, dudas y solicitudes muy variadas. Clasificar manualmente cada email según su tipo (problema técnico, facturación, información) es lento, propenso a errores y dificulta la priorización y la trazabilidad de casos.<br/><br/>
🚧 <b>Retos Técnicos:</b>
<ul>
  <li><b>Procesamiento Automático y Preciso:</b> Se requiere una IA capaz de analizar el contenido de cada correo y asignar la categoría correcta, incluso si el lenguaje es ambiguo o poco estructurado.</li>
  <li><b>Integración Multi-API:</b> El workflow debe conectar Gmail (para recibir y enviar correos), Gemini (para la clasificación IA) y Google Drive (para registrar logs de incidencias en un CSV global), gestionando autenticaciones y permisos de manera segura.</li>
  <li><b>Gestión de Archivos Dinámica:</b> El sistema debe comprobar si el archivo de registro existe en Drive, descargarlo, añadir la nueva fila y volver a subirlo, o crearlo si no existe, evitando duplicados y garantizando la integridad del histórico.</li>
  <li><b>Resiliencia y Manejo de Errores:</b> El flujo debe manejar casos como archivos bloqueados, errores de red, credenciales expiradas o correos malformateados, asegurando que ningún caso se pierda.</li>
</ul><br/>
⚙️ <b>Solución (Descripción del Flujo):</b><br/>
El flujo se activa automáticamente al recibir un correo nuevo en una etiqueta específica de Gmail. El contenido se envía a un modelo Gemini (Google AI), que responde únicamente con la categoría asignada. Un switch enruta el correo según la categoría: "Problema Técnico", "Consulta de Facturación" o "Solicitud de Información", reenviando el mensaje con un asunto clasificado. Paralelamente, se preparan los datos clave (timestamp, remitente, asunto, categoría IA, preview del cuerpo) y se formatea una fila CSV. El sistema busca el archivo de registro en Google Drive; si existe, lo descarga y añade la nueva fila, si no, lo crea con cabecera y primer registro. Finalmente, el archivo actualizado se sube a Drive, manteniendo un histórico global de incidencias.<br/><br/>
🚀 <b>Resultados y Beneficios:</b>
<ul>
  <li><b>Clasificación Instantánea y Precisa:</b> El equipo recibe los correos ya clasificados y priorizados, acelerando la respuesta y reduciendo errores humanos.</li>
  <li><b>Histórico Centralizado:</b> Todas las incidencias quedan registradas en un único CSV en Drive, facilitando auditorías, métricas y reporting.</li>
  <li><b>Automatización Total:</b> El flujo funciona 24/7 sin intervención manual, escalando para cualquier volumen de correos.</li>
  <li><b>Flexibilidad y Seguridad:</b> El sistema es adaptable a nuevas categorías y cumple buenas prácticas de seguridad OAuth2.</li>
</ul><br/>
🧪 <b>Ejemplo de uso real:</b><br/>
Un correo con asunto "No puedo acceder a la plataforma" llega a la bandeja de soporte. El sistema lo clasifica como "Problema Técnico", lo reenvía con el asunto "[CLASIFICADO] Soporte Técnico: ..." y añade una línea al CSV global con todos los detalles clave. El responsable de soporte puede filtrar el CSV para ver solo problemas técnicos o consultas de facturación, generando reportes automáticos en segundos.
`,
      tags: ["n8n", "Gmail", "Gemini", "Google Drive", "Automatización", "Clasificación IA", "Soporte", "CSV", "OAuth2", "JavaScript", "Logging", "Switch", "Email Routing"],
    },
    {
      title: "Generador Automático de Contenido sobre Licitaciones",
      description: `🧩 <b>Necesidad / Problema Inicial:</b><br/>Generar contenido de alto valor y de forma constante para un blog especializado en licitaciones públicas. El proceso manual de detectar contratos por vencer, investigar detalles, redactar un análisis y publicarlo en un CMS es lento y repetitivo, limitando la escalabilidad de la estrategia de contenidos.<br/><br/>🚧 <b>Retos Técnicos:</b><br/>Los desafíos incluyeron la integración con una API externa para obtener datos dinámicos de contratos. Fue crucial el diseño de un <i>prompt</i> avanzado para un Agente de IA, instruyéndolo para generar contenido periodístico en un formato estructurado. Se implementó un sistema de memoria para que la IA evitara repetir ideas de artículos anteriores, garantizando originalidad.<br/><br/>⚙️ <b>Solución (Descripción del Flujo):</b><br/>El flujo se inicia automáticamente con un <b>Schedule Trigger</b>. Un nodo <b>HTTP Request</b> consulta una API para obtener contratos por vencer. Un bucle (<b>Loop Over Items</b>) procesa cada contrato. Dentro del bucle, un <b>AI Agent</b> redacta un artículo de análisis. Un nodo <b>Code</b> (JavaScript) valida y enriquece los datos generados. Finalmente, un nodo <b>CMS</b> crea un borrador del artículo, listo para revisión.<br/><br/>🚀 <b>Resultados y Beneficios:</b><br/>Este workflow logra una <b>automatización completa</b> del marketing de contenidos, transformando una tarea de horas en minutos. Esto permite <b>optimización</b> del tiempo, <b>escalabilidad</b> total de la estrategia y <b>reducción de errores</b>, generando un flujo constante de publicaciones SEO-optimizadas.<br/><br/>🧪 <b>Ejemplo de uso real:</b><br/>El workflow se ejecuta de forma autónoma. Detecta que un contrato de un servicio público relevante está por vencer. Automáticamente, el sistema redacta y publica un borrador en el CMS analizando las claves del contrato y las oportunidades para nuevas empresas, sin intervención humana.`,
      tags: ["n8n", "IA Generativa", "Automatización", "Marketing de Contenidos", "CMS", "API"],
    },
    {
      title: "Pipeline de Contenido IA para Licitaciones",
      description: `🧩 <b>Necesidad / Problema Inicial:</b><br/>Mantener un blog actualizado con noticias sobre nuevas licitaciones públicas requiere un esfuerzo manual considerable para buscar, analizar y redactar contenido a diario. Este proceso limita la capacidad de cubrir todas las oportunidades de interés para la audiencia.<br/><br/>🚧 <b>Retos Técnicos:</b><br/>El principal reto fue orquestar un proceso de IA confiable. Esto implicó crear un <i>prompt</i> muy específico para que un modelo de lenguaje genere contenido periodístico y datos estructurados (JSON) de forma consistente, implementar un nodo de código para validar la salida del LLM y usar una memoria conversacional para evitar redundancia y mejorar la calidad de cada artículo.<br/><br/>⚙️ <b>Solución (Descripción del Flujo):</b><br/>El workflow se activa diariamente con un <b>Schedule Trigger</b>. Un nodo <b>HTTP Request</b> consulta una API para obtener las licitaciones publicadas el día anterior. Los resultados se procesan uno a uno en un bucle (<b>SplitInBatches</b>). Para cada licitación, un <b>AI Agent</b>, apoyado en un modelo de lenguaje y una memoria de contexto, redacta un artículo de análisis optimizado para SEO. Un nodo <b>Code</b> limpia la respuesta y, finalmente, el nodo <b>CMS</b> publica el artículo como borrador.<br/><br/>🚀 <b>Resultados y Beneficios:</b><br/>Se automatiza por completo el pipeline de creación de contenido, desde la obtención de datos hasta la publicación. Permite generar múltiples artículos de alta calidad diariamente con cero intervención manual, asegurando un tono y estilo coherentes y fortaleciendo la autoridad del sitio.<br/><br/>🧪 <b>Ejemplo de uso real:</b><br/>El sistema detecta una nueva licitación para servicios de consultoría. De forma autónoma, genera un artículo analizando el presupuesto y plazos, y lo publica como borrador en el blog. El equipo de marketing solo necesita revisarlo y hacer clic en "Publicar".`,
      tags: ["n8n", "AI Agent", "LLM", "Web Scraping", "API", "Wordpress", "Automatización"],
    },
  ];

  const [collapsedArr, setCollapsedArr] = useState(Array(projects.length).fill(true));
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeImageLightbox, setActiveImageLightbox] = useState<boolean>(false);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const clickOutsideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const clickCountRef = useRef<number>(0);

  // Efecto para manejar clics fuera de las tarjetas
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Si no hay herramienta seleccionada, no hacemos nada
      if (!selectedTool) return;
      
      // Si hay un lightbox activo, dejamos que el lightbox maneje el clic
      if (activeImageLightbox) return;
      
      // Verificar si el clic fue fuera del contenedor de proyectos
      if (projectsContainerRef.current && !projectsContainerRef.current.contains(event.target as Node)) {
        // Incrementar contador de clics
        clickCountRef.current += 1;
        
        // Limpiar cualquier temporizador existente
        if (clickOutsideTimerRef.current) {
          clearTimeout(clickOutsideTimerRef.current);
        }
        
        // Configurar un nuevo temporizador para detectar doble clic
        clickOutsideTimerRef.current = setTimeout(() => {
          // Si hubo un solo clic, no hacemos nada
          // Si hubo doble clic, cerramos la selección de herramientas
          if (clickCountRef.current >= 2) {
            setSelectedTool(null);
          }
          
          // Reiniciar contador
          clickCountRef.current = 0;
        }, 300); // 300ms es un tiempo estándar para detectar doble clic
      }
    };
    
    // Agregar el event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Limpieza
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (clickOutsideTimerRef.current) {
        clearTimeout(clickOutsideTimerRef.current);
      }
    };
  }, [selectedTool, activeImageLightbox]);

  const handleToggle = (index: number) => {
    setCollapsedArr(prev => {
      const newArr = [...prev];
      newArr[index] = !newArr[index];
      return newArr;
    });
  };

  // Función para manejar el clic en una tarjeta de herramienta
  const handleToolClick = (toolId: string) => {
    if (isAnimating) return; // Evitar múltiples clics durante la animación
    
    setIsAnimating(true);
    
    // Si ya está seleccionada, deseleccionamos
    if (selectedTool === toolId) {
      // Primero contraer los proyectos
      setSelectedTool(null);
      setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Tiempo de la animación de contracción
    } else {
      // Si hay una herramienta seleccionada, primero contraemos los proyectos
      if (selectedTool) {
        setSelectedTool(null);
        setTimeout(() => {
          // Luego seleccionamos la nueva herramienta
          setSelectedTool(toolId);
          
          // Efecto de parpadeo
          const toolElement = document.getElementById(`tool-${toolId}`);
          if (toolElement) {
            toolElement.classList.add('tool-blink');
            setTimeout(() => {
              toolElement.classList.remove('tool-blink');
              setIsAnimating(false);
            }, 1000);
          } else {
            setIsAnimating(false);
          }
        }, 500); // Tiempo de la animación de contracción
      } else {
        // Si no hay herramienta seleccionada, seleccionamos directamente
        setSelectedTool(toolId);
        
        // Efecto de parpadeo
        const toolElement = document.getElementById(`tool-${toolId}`);
        if (toolElement) {
          toolElement.classList.add('tool-blink');
          setTimeout(() => {
            toolElement.classList.remove('tool-blink');
            setIsAnimating(false);
          }, 1000);
        } else {
          setIsAnimating(false);
        }
      }
    }
  };

  // Función para actualizar el estado del lightbox
  const handleLightboxChange = (isOpen: boolean) => {
    setActiveImageLightbox(isOpen);
  };

  // Filtrar proyectos según la herramienta seleccionada
  const filteredProjects = selectedTool 
    ? projects.filter(project => project.tags.includes(selectedTool)) 
    : [];

  return (
    <div className="min-h-screen bg-grid-white/[0.03] relative overflow-hidden">
      {/* Fondo con gradiente y grilla */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-950 via-black to-gray-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      </div>
      {/* Fondo de partículas animadas */}
      <ThreeBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Botón de volver */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver al inicio
          </Link>
        </motion.div>

        {/* Título */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Mis Proyectos
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-left leading-relaxed">
            <span className="text-lg font-bold text-cyan-400">¿Sientes que las tareas repetitivas frenan tu potencial?</span>
            <br /><br />
            Imagina recuperar esas horas. Mis proyectos son la respuesta: automatizaciones inteligentes que actúan como un equipo dedicado, 24/7.
            <br /><br />
            <span className="flex items-center mb-1"><span className="text-green-500 mr-3">✓</span><span>Convierto procesos manuales en flujos de trabajo eficientes.</span></span>
            <span className="flex items-center mb-1"><span className="text-green-500 mr-3">✓</span><span>Libero tu tiempo para que te centres en la estrategia.</span></span>
            <span className="flex items-center mb-2"><span className="text-green-500 mr-3">✓</span><span>Transformo datos en contenido de valor, automáticamente.</span></span>
            <br />
            Descubre a continuación cómo lo hago.
          </p>
        </motion.div>

        {/* Tarjetas de herramientas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool) => (
              <motion.div
                key={tool.id}
                id={`tool-${tool.id}`}
                whileHover={{ 
                  y: -5,
                  boxShadow: `0 10px 30px -10px ${tool.color}33`,
                  borderColor: `${tool.color}66`
                }}
                onClick={() => handleToolClick(tool.id)}
                className={`bg-white/5 backdrop-blur-sm border rounded-xl p-4 transition-all cursor-pointer w-[120px] flex flex-col items-center
                  ${selectedTool === tool.id ? `border-2 shadow-lg` : 'border-gray-600 hover:border-gray-500'}`}
                style={{borderColor: selectedTool === tool.id ? tool.color : ''}}
              >
                <div className="p-3 bg-gray-800/30 rounded-full mb-2">
                  <Image 
                    src={tool.imgSrc} 
                    alt={`${tool.name} icon`} 
                    width={40} 
                    height={40} 
                    className="w-10 h-10 object-contain rounded-md" 
                  />
                </div>
                <h3 className="text-sm font-medium text-white text-center">{tool.name}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Lista de proyectos filtrados */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div 
              key="projects-list"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col gap-6 overflow-hidden"
              ref={projectsContainerRef}
            >
              {filteredProjects.map((project, index) => {
                // Obtener el color de la herramienta principal del proyecto
                const mainToolId = project.tags.find(tag => tools.find(t => t.id === tag)) || "";
                const mainTool = tools.find(t => t.id === mainToolId) || tools[0];
                const toolColor = mainTool.color;
                
                // Determinar si hay contenido expandible
                let hasExpandableContent = false;
                const splitMarker = "🚧 <b>Retos Técnicos:</b>";
                if (project.description.indexOf(splitMarker) !== -1 || project.description.indexOf("<br/><br/>") !== -1) {
                  hasExpandableContent = true;
                }
                
                return (
                  <div className="py-4 md:py-6" key={`container-${project.title}`}>
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + (index * 0.1), duration: 0.3 }}
                      whileHover={{ y: -5, boxShadow: `0 10px 30px -10px ${toolColor}33` }}
                      className={`bg-white/5 backdrop-blur-sm border rounded-xl p-3 md:p-5 transition-all border-gray-600 hover:border-gray-500 w-[95%] mx-auto`}
                      style={{ borderColor: mainToolId ? `${toolColor}66` : undefined }}
                    >
                      <div className="flex flex-col items-center text-center gap-1 mb-2 md:mb-3">
                        <div className="p-2 bg-gray-500/10 rounded-lg" style={{ backgroundColor: `${toolColor}22` }}>
                          <Image 
                            src={mainTool.imgSrc || "/icons/n8n.png"} 
                            alt="Project icon" 
                            width={24} 
                            height={24} 
                            className="w-6 h-6 object-cover rounded-md" 
                          />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-white">{project.title}</h3>
                      </div>
                      
                      {/* En móviles: primero galería (arriba) y luego texto (abajo) */}
                      {/* En desktop: texto (75% izquierda) y galería (25% derecha) */}
                      <div className="flex flex-col-reverse md:flex-row gap-2 md:gap-3">
                        {/* Contenido de texto - 75% */}
                        <div className="w-full md:w-3/4 mt-2 md:mt-0">
                          <ExpandableDescription
                            html={project.description}
                            collapsed={collapsedArr[index]}
                            onToggle={handleToggle}
                            index={index}
                            toolColor={toolColor}
                          />
                        </div>
                        
                        {/* Galería de imágenes - 25% */}
                        {project.tags.some(tag => tools.find(t => t.id === tag)?.gallery) && (
                          <div className="w-full md:w-1/4 min-h-[100px] md:min-h-[180px] flex flex-col">
                            <h4 className="text-xs font-semibold text-white mb-1" style={{ color: toolColor }}>Galería</h4>
                            <div className="flex-grow">
                              <ImageGallery 
                                images={mainTool.gallery || []} 
                                toolColor={toolColor}
                                onLightboxChange={handleLightboxChange}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Botón "Ver más detalles" centrado */}
                      {hasExpandableContent && (
                        <div className="w-full flex justify-center mt-2 mb-2">
                          <button
                            className="px-4 md:px-6 py-1.5 md:py-2.5 rounded-full font-extrabold text-xs md:text-base shadow-lg focus:outline-none tracking-wide scale-90 md:scale-60"
                            style={{
                              color: '#000000',
                              background: `linear-gradient(90deg, ${toolColor}BB 10%, ${toolColor} 90%)`,
                              boxShadow: `0 0 10px 2px ${toolColor}99, 0 0 20px 4px ${toolColor}66`,
                              border: `2px solid ${toolColor}`,
                              animation: 'button-blink 1.2s infinite alternate',
                            }}
                            onClick={() => handleToggle(index)}
                          >
                            {collapsedArr[index] ? 'VER MAS DETALLES' : 'OCULTAR DETALLES'}
                          </button>
                          <style jsx>{`
                            @keyframes button-blink {
                              0% { filter: brightness(1.1) drop-shadow(0 0 8px ${toolColor}); }
                              50% { filter: brightness(1.6) drop-shadow(0 0 20px ${toolColor}); }
                              100% { filter: brightness(1.2) drop-shadow(0 0 12px ${toolColor}); }
                            }
                          `}</style>
                        </div>
                      )}
                      
                      {/* Tags debajo del botón "Ver más detalles" */}
                      <div className="flex flex-wrap justify-center gap-2 mt-2">
                        {project.tags.map((tag: string, tagIndex: number) => {
                          // Usar el color de la herramienta principal para todas las etiquetas
                          // con ligeras variaciones para crear una paleta armónica
                          const baseColor = toolColor;
                          let tagColor = baseColor;
                          
                          // Si la etiqueta es la herramienta principal, usar su color exacto
                          // Si no, usar una variación del color principal
                          if (tag !== mainToolId) {
                            // Crear variaciones sutiles del color principal para las etiquetas relacionadas
                            const hueOffset = (tagIndex * 10) % 40 - 20; // Variación de tono entre -20 y +20
                            const satOffset = (tagIndex * 5) % 20 - 10;  // Variación de saturación entre -10 y +10
                            
                            // Convertir el color hexadecimal a HSL para poder ajustarlo
                            const r = parseInt(baseColor.slice(1, 3), 16);
                            const g = parseInt(baseColor.slice(3, 5), 16);
                            const b = parseInt(baseColor.slice(5, 7), 16);
                            
                            // Usar el color base con ligeras variaciones
                            tagColor = baseColor;
                          }
                          
                          return (
                            <span
                              key={tagIndex}
                              className={`px-2 py-1 text-xs rounded bg-opacity-20 border`}
                              style={{
                                backgroundColor: `${tagColor}22`,
                                borderColor: `${tagColor}66`,
                                color: tagColor
                              }}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          ) : selectedTool ? (
            <motion.div
              key="no-projects"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12 overflow-hidden"
            >
              <p className="text-gray-400 text-lg">Próximamente</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
