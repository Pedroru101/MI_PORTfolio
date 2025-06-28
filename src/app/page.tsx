'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
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
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

const OrbitalStack = dynamic(() => import('@/components/OrbitalStack'), {
  ssr: false,
  loading: () => <div className="w-full min-h-[400px] flex items-center justify-center"><p className='text-white'>Cargando animación...</p></div>,
});

const EarthCanvas = dynamic(() => import('@/components/Earth'), {
  ssr: false,
  loading: () => null,
});

export default function Home() {

  return (
    <div className="min-h-screen bg-grid-white/[0.03] relative overflow-hidden">
      {/* Fondo con efecto de partículas */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-950 via-black to-gray-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      </div>

      {/* Contenedor principal de dos columnas */}
      <main className="relative max-w-7xl mx-auto min-h-screen items-start px-4 sm:px-6 lg:px-8 py-24">
        {/* Contenedor para la Tierra 3D en móviles (arriba a la derecha) */}
        <div className="lg:hidden absolute top-6 right-4 w-32 h-32 z-0 opacity-70 pointer-events-none">
          <EarthCanvas />
        </div>

        {/* Contenido principal - Ordenado para móviles */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
          {/* Columna Izquierda: Foto y Presentación */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col order-1"
          >
            <div className="flex flex-col items-center lg:items-start gap-6 text-center lg:text-left">
              {/* Foto y nombre */}
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

              {/* Texto de presentación - Visible solo en móviles */}
              <p className="lg:hidden text-lg text-gray-300 max-w-2xl">
                Diseño sistemas a medida con n8n que resuelven tareas por ti: desde reportes automáticos y alertas proactivas hasta flujos inteligentes que previenen errores y crecen con tu negocio.
              </p>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-200 to-cyan-400 pb-4">
                Automatización Inteligente
              </h1>
              
              {/* Texto de presentación - Solo en escritorio */}
              <p className="hidden lg:block text-lg sm:text-xl text-gray-300 max-w-2xl">
                Diseño sistemas a medida con n8n que resuelven tareas por ti: desde reportes automáticos y alertas proactivas hasta flujos inteligentes que previenen errores y crecen con tu negocio.
              </p>

              <div className="mt-10 flex flex-col items-center gap-6 w-full max-w-2xl mx-auto px-4">
                <Button asChild className="group bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-blue-700 hover:to-cyan-500 text-white px-8 py-6 text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                  <Link href="#contacto" className="flex items-center justify-center">
                    Contactar
                    <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
                  </Link>
                </Button>
                <a href="mailto:QUINTANAPEDRORUBEN79@GMAIL.COM" className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-300 font-ibm-plex-mono text-sm">
                  <Image src="/icons/gmail.png" alt="Gmail logo" width={48} height={48} className="rounded-full" />
                  <span>QUINTANAPEDRORUBEN79@GMAIL.COM</span>
                </a>
                <OrbitalStack />
              </div>
            </div>
          </motion.section>

          {/* Columna Derecha: Sobre mí y Proyectos */}
          <div className="lg:col-span-5 flex flex-col gap-12 order-3 lg:order-2">
            {/* Sección Sobre Mí */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:bg-transparent lg:backdrop-blur-0 lg:border-0 lg:p-0 lg:pt-[14rem]"
            >
              <h2 className="text-2xl font-bold text-white font-orbitron mb-4">Sobre mí</h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                Analista de datos especializado en <span className="font-semibold text-cyan-300">Python</span>, <span className="font-semibold text-cyan-300">SQL</span> y <span className="font-semibold text-cyan-300">Power&nbsp;BI</span>. Creo automatizaciones que transforman la forma en que trabajas.
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-4">
                <li>ETL, limpieza y orquestación de datos.</li>
                <li>Flujos con n8n y scripts en Python.</li>
              </ul>
              <p className="text-gray-300 text-sm">¡Listo para aportar soluciones innovadoras a tu equipo!</p>
            </motion.div>

            {/* Sección Proyectos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white font-orbitron mb-6">Últimos Proyectos Destacados</h2>
              {/* Proyecto n8n - Automatización de Reportes */}
              <motion.div 
                whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(6, 182, 212, 0.3)' }}
                className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all mb-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Database className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Automatización de Reportes</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">Flujo n8n que consolida datos de múltiples fuentes y genera informes diarios en Power BI, reduciendo tiempo manual en un 80%.</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded">n8n</span>
                  <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded">Power BI</span>
                  <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">REST APIs</span>
                </div>
              </motion.div>

              {/* Proyecto Power BI - Dashboard Comercial */}
              <motion.div 
                whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(14, 165, 233, 0.3)' }}
                className="bg-white/5 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-400/40 transition-all mb-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <BarChart2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Dashboard Comercial</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">Panel interactivo en Power BI con análisis de ventas, KPIs y pronósticos, integrado con SQL Server y actualizado en tiempo real.</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded">Power BI</span>
                  <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded">DAX</span>
                  <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-300 rounded">SQL Server</span>
                </div>
              </motion.div>

              {/* Proyecto n8n - Chatbot de Soporte */}
              <motion.div 
                whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(168, 85, 247, 0.3)' }}
                className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/40 transition-all mb-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Chatbot de Soporte</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">Integración de n8n con GPT-4 para resolver consultas, con conexión a base de conocimiento y escalamiento a agentes.</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">n8n</span>
                  <span className="px-2 py-1 text-xs bg-pink-500/20 text-pink-300 rounded">GPT-4</span>
                  <span className="px-2 py-1 text-xs bg-gray-500/20 text-gray-300 rounded">Webhooks</span>
                </div>
              </motion.div>

              {/* Ver más proyectos */}
              <Link href="/proyectos" passHref>
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{
                    opacity: [1, 0.5, 1],
                    boxShadow: ['0 0 0px rgba(6, 182, 212, 0)', '0 0 10px rgba(6, 182, 212, 0.3)', '0 0 0px rgba(6, 182, 212, 0)']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                  }}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: '0 10px 20px rgba(6, 182, 212, 0.3)',
                    opacity: 1
                  }}
                  className="bg-transparent border border-cyan-500/40 rounded-xl p-6 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all text-center cursor-pointer flex items-center justify-center gap-3 group"
                >
                  <h3 className="text-lg font-semibold text-cyan-300 group-hover:text-white transition-colors">Ver más proyectos</h3>
                  <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors" />
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Tierra 3D para escritorio */}
          <div className="hidden lg:block absolute top-0 right-0 w-[750px] h-[750px] z-0 opacity-70 -mr-[495px] -mt-[495px] pointer-events-none">
            <EarthCanvas />
          </div>
        </div>
      </main>

      {/* Sección de Redes Sociales */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
        <a href="https://github.com/Pedroru101" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors" aria-label="GitHub">
          <Github className="w-5 h-5 text-gray-300" />
        </a>
        <a href="https://www.linkedin.com/in/dataquintanapedro" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors" aria-label="LinkedIn">
          <Linkedin className="w-5 h-5 text-gray-300" />
        </a>
        
      </div>
    </div>
  );
}
