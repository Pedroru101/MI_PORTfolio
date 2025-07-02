'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  BarChart2,
  Code,
  Database,
  Cpu,
  Brain,
  Zap,
  ArrowRight,
  ArrowDown,
  Github,
  Linkedin,
  Lightbulb,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

const OrbitalStack = dynamic(() => import('@/components/OrbitalStack'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[400px] flex items-center justify-center">
      <p className="text-white">Cargando animación...</p>
    </div>
  ),
});

const EarthCanvas = dynamic(() => import('@/components/Earth'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse text-cyan-400">Cargando planeta...</div>
    </div>
  ),
});

export default function Home() {
  const [showCanvas, setShowCanvas] = useState(false);
  
  // Mejorar la lógica de carga para evitar parpadeos
  useEffect(() => { 
    // Pequeño retraso para asegurar que el componente esté listo
    const timer = setTimeout(() => {
      setShowCanvas(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-grid-white/[0.03] relative overflow-hidden">
      {/* Fondo con efecto de partículas */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-950 via-black to-gray-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      </div>

      {/* Planeta 3D – Contenedor Responsivo */}
      <div className="absolute z-50 pointer-events-auto cursor-pointer
       /* AJUSTES PARA MÓVILES */
       w-32 h-32                    /* Tamaño base en móviles (128x128px) */
       top-6                        /* Distancia desde arriba: 24px */
       right-4                      /* Distancia desde la derecha: 16px */
       
       /* AJUSTES PARA ESCRITORIO (lg) */
       lg:w-[700px] lg:h-[700px]   /* Tamaño en escritorio (700x700px) - Aumentar para acercar, reducir para alejar */
       lg:top-[-400px]              /* Distancia desde arriba: -400px - Valores negativos lo suben más */
       lg:right-[-55px]             /* Distancia desde la derecha: -55px - Valores negativos lo mueven más a la derecha */
       
       /* AJUSTES DE OPACIDAD Y EFECTOS */
       opacity-90                   /* Transparencia global (0-100) */
       hover:opacity-100            /* Aumenta opacidad al pasar el mouse */
       transition-opacity          /* Suaviza cambios de opacidad */
       
       /* INTERACTIVIDAD */
       select-none                 /* Evita selección de texto al hacer clic */
       
       /* GUÍA DE AJUSTES:
       1. Para mover más arriba: usa valores más negativos en lg:top-[-X] (ej: lg:top-[-500px])
       2. Para mover más a la derecha: usa valores más negativos en lg:right-[-X] (ej: lg:right-[-100px])
       3. Para acercar/agrandar: aumenta los valores de lg:w-[Xpx] y lg:h-[Xpx]
       4. Para alejar/reducir: disminuye los valores de lg:w-[Xpx] y lg:h-[Xpx]
       */
      ">
        {showCanvas && <EarthCanvas />}
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32 lg:pb-40 z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:items-start">
          {/* Columna izquierda: Foto y presentación */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col items-center lg:items-start gap-6 text-center lg:text-left"
          >
            <div className="flex flex-col items-center lg:items-start gap-4">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-cyan-500 shadow-neon-blue z-10">
                <Image src="/pedro.jpg" alt="Foto de Pedro Quintana" fill sizes="(max-width: 768px) 128px, 160px" className="object-cover" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-orbitron">
                Hola, soy Pedro Quintana
              </h2>
              <motion.div
                animate={{ textShadow: ['0 0 8px rgba(0, 191, 255, 0.5)', '0 0 15px rgba(138, 43, 226, 0.6)', '0 0 8px rgba(0, 191, 255, 0.5)'] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block px-4 py-1.5 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full border border-white/10 text-cyan-400"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Transformando datos en acciones
                </span>
              </motion.div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-200 to-cyan-400 pb-4">
              Automatización <br className="hidden sm:block" />
              <span className="text-2xl sm:text-3xl md:text-3xl font-bold tracking-tight font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-teal-200 animate-text-gradient">con Inteligencia Artificial</span>
            </h1>
            
            <p className="text-lg text-gray-300 max-w-2xl">
              Impulso a las empresas con automatizaciones basadas en IA que transforman horas de trabajo en segundos de resultado. Desde dashboards inteligentes hasta flujos end-to-end, colaboro con equipos que quieren escalar sin fricciones.
            </p>
          </motion.div>

          {/* Columna derecha: Sobre mí */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 lg:pl-8 lg:mt-0 lg:pt-80"
          >
            <h2 className="text-2xl font-bold text-white font-orbitron mb-4">Sobre mí</h2>
            <div className="text-gray-300 text-sm leading-relaxed space-y-3">
              <p>
                Soy un <b>apasionado de la Inteligencia Artificial y la Automatización</b>; diseño soluciones que aceleran la toma de decisiones y liberan el potencial de los equipos.
              </p>
              <p>
                Mi experiencia con <span className="font-semibold text-cyan-300">n8n</span>, <span className="font-semibold text-cyan-300">Python</span> y <span className="font-semibold text-cyan-300">Power BI</span> me permite desarrollar:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-gray-400">
                <li><b>Sistemas de análisis predictivo</b> que ayudan a anticipar tendencias y tomar decisiones estratégicas basadas en datos.</li>
                <li><b>Plataformas de automatización empresarial</b> que integran múltiples departamentos y mejoran la colaboración interna.</li>
                <li><b>Soluciones de Business Intelligence</b> que proporcionan visibilidad en tiempo real sobre KPIs críticos para el negocio.</li>
              </ul>
              <p>
                Busco alianzas a largo plazo con organizaciones que abracen el cambio: aprendamos y evolucionemos juntos para mantenernos siempre a la vanguardia.
              </p>
            </div>
          </motion.div>

          {/* Stack de Tecnologías - Centrado */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-12 flex justify-center mt-12"
          >
            <OrbitalStack />
          </motion.div>

          {/* Últimos Proyectos Destacados */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-12 mt-12"
          >
            <h2 className="text-2xl font-bold text-white font-orbitron mb-8 text-center">Últimos Proyectos Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Tarjeta 1: Sistema de Monitoreo de Medios (n8n) */}
              <motion.div whileHover={{ y: -5 }} className="bg-white/5 backdrop-blur-sm border border-violet-500/20 rounded-xl p-6 hover:border-violet-400/40 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-violet-500/10 rounded-lg">
                    <Brain className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Monitoreo de Medios con IA</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Workflow n8n que analiza cientos de noticias, detecta riesgos reputacionales y envía un informe ejecutivo cada mañana.
                </p>
                <div className="mt-4 p-3 bg-violet-900/20 border border-violet-500/20 rounded-lg text-xs">
                  <p className="font-bold text-violet-300 mb-1 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />Dato Curioso
                  </p>
                  <p className="text-gray-400">
                    Utiliza una arquitectura <i>multi-agente</i> y embeddings generados localmente para comprender el contexto real detrás de cada titular.
                  </p>
                </div>
              </motion.div>

              {/* Tarjeta 2: Dashboard Power BI */}
              <motion.div whileHover={{ y: -5 }} className="bg-white/5 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6 hover:border-amber-400/40 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <BarChart2 className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Dashboard Adventure Works</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Informe interactivo en Power BI que revela tendencias de ventas y márgenes clave para Adventure Works Cycles en tres continentes.
                </p>
                <div className="mt-4 p-3 bg-amber-900/20 border border-amber-500/20 rounded-lg text-xs">
                  <p className="font-bold text-amber-300 mb-1 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />Dato Curioso
                  </p>
                  <p className="text-gray-400">
                    El modelo DAX calcula KPIs en tiempo real sobre un esquema en estrella optimizado: 1.98&nbsp;M US$ de ingresos en segundos.
                  </p>
                </div>
              </motion.div>

              {/* Tarjeta 3: Clipping & ROI Triple Salida (n8n) */}
              <motion.div whileHover={{ y: -5 }} className="bg-white/5 backdrop-blur-sm border border-violet-500/20 rounded-xl p-6 hover:border-violet-400/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-violet-500/10 rounded-lg">
                      <Database className="w-6 h-6 text-violet-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Clipping & ROI 3-en-1</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Sistema n8n que genera simultáneamente informe HTML, PDF y PPTX con métricas de ROI y gráficos dinámicos.
                  </p>
                  <div className="mt-4 p-3 bg-violet-900/20 border border-violet-500/20 rounded-lg text-xs">
                    <p className="font-bold text-violet-300 mb-1 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />Dato Curioso
                    </p>
                    <p className="text-gray-400">
                      Un microservicio Python en Render crea las presentaciones PPTX sobre la marcha con gráficos generados en Matplotlib.
                    </p>
                  </div>
                </div>
                {/* Enlace al video */}
                <div className="mt-6 flex justify-center">
                  <a
                    href="https://youtu.be/lDFzFftjdNo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-300 hover:text-violet-400 text-sm font-semibold underline flex items-center gap-1"
                  >
                    Ver demo en YouTube
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Botón Ver más proyectos y Sección de Contacto */}
          <div className="lg:col-span-12 text-center mt-12 flex flex-col items-center gap-8">
            <Link href="/proyectos" passHref>
              <motion.div
                initial={{ opacity: 1 }}
                animate={{
                  opacity: [1, 0.7, 1],
                  boxShadow: [
                    '0 0 32px 8px #ff0000, 0 0 0px #00ff00, 0 0 0px #0000ff',
                    '0 0 32px 8px #00ff00, 0 0 0px #0000ff, 0 0 0px #ff0000',
                    '0 0 32px 8px #0000ff, 0 0 0px #ff0000, 0 0 0px #00ff00',
                    '0 0 32px 8px #ff0000, 0 0 0px #00ff00, 0 0 0px #0000ff',
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'linear',
                }}
                whileHover={{ y: -5, scale: 1.08, boxShadow: '0 0 48px 16px #fff, 0 0 32px 8px #00fff7, 0 0 32px 8px #ff00ea', opacity: 1 }}
                className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold rounded-lg px-12 py-6 text-2xl transition-all hover:bg-cyan-500/20 hover:border-cyan-400/50 shadow-lg"
              >
                Ver más proyectos
              </motion.div>
            </Link>

            {/* Sección de Contacto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-6"
            >
              <Button asChild className="group bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-blue-700 hover:to-cyan-500 text-white px-8 py-6 text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                <a href="https://wa.me/5491139044027" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  Contactar
                  <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
                </a>
              </Button>
              <a href="mailto:QUINTANAPEDRORUBEN79@GMAIL.COM" 
                className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-300 font-ibm-plex-mono text-sm text-center"
              >
                <Image 
                  src="/icons/gmail.png" 
                  alt="Gmail logo" 
                  width={48} 
                  height={48} 
                  className="rounded-full" 
                />
                <span>QUINTANAPEDRORUBEN79@GMAIL.COM</span>
              </a>
            </motion.div>
          </div>

          {/* Sección de Redes Sociales */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
            <a href="https://github.com/Pedroru101" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group" aria-label="GitHub">
              <Github className="w-5 h-5 text-gray-300 group-hover:text-[#F05033] transition-colors duration-300" />
            </a>
            <a href="https://www.linkedin.com/in/dataquintanapedro" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300" />
            </a>
            <a href="https://wa.me/5491139044027" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group" aria-label="WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className="w-5 h-5 text-gray-300 group-hover:text-green-400 transition-colors duration-300"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.824-2.205C13.7 27.597 14.83 27.8 16 27.8c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.8c-1.04 0-2.062-.162-3.03-.48l-.215-.07-4.65 1.31 1.25-4.44-.14-.22C7.13 19.13 6.2 17.13 6.2 15c0-5.42 4.38-9.8 9.8-9.8s9.8 4.38 9.8 9.8-4.38 9.8-9.8 9.8zm5.13-7.13c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.28.7-.9.86-1.08.16-.18.32.2.6.07.28-.14 1.18-.44 2.25-1.4 8.33-1.65 1.39-.83.74-1.39 1.65-1.55 1.93-.16.28-.02.43.12.57.12.12.28.32.46.48.14.16.18.28.28.46.09.18.05.34.02.48.07.14.61 1.47.84 2.01.22.53.45.46.61.47.16.01.34.01.52.01.18 0 .48.07.73.34.25.27.97.95.97 2.3 0 1.35.99 2.65 1.13 2.83.14.18 1.95 2.98 4.73 4.06.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z" fill="currentColor"/></svg>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

