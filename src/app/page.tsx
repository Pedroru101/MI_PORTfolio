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
  loading: () => null,
});

export default function Home() {
  const [showCanvas, setShowCanvas] = useState(false);
  useEffect(() => { setShowCanvas(true); }, []);

  return (
    <div className="min-h-screen bg-grid-white/[0.03] relative overflow-hidden">

      {/* Fondo con efecto de partículas */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-950 via-black to-gray-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      </div>

      {/* Planeta 3D – Un solo contenedor responsive (solo en cliente) */}
      {showCanvas && (
        <div className="absolute z-0 pointer-events-none opacity-80
         w-32 h-32 top-6 right-4        /*  (A) valores para móviles  */
         lg:w-96 lg:h-96                /*  tamaño en escritorio      */
         lg:top-1/2                     /*  (B) ancla vertical         */
         lg:left-9                     /*  (C) ancla horizontal       */
         lg:-translate-x-1/2            /*  (D) ajuste fino horizontal */
         lg:-translate-y-1/2            /*  (E) ajuste fino vertical   */
        ">
          <EarthCanvas />
        </div>
      )}


      {/* Contenedor principal de dos columnas */}
      <main className="relative max-w-7xl mx-auto min-h-screen items-start px-4 sm:px-6 lg:px-8 py-24">

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

              <div className="mt-10 flex flex-col items-center lg:items-start gap-6 w-full max-w-2xl mx-auto lg:mx-0 px-4 lg:px-0">
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
                
              </div>
            </div>
          </motion.section>

            {/* Sección central: Stack de Tecnologías y Proyectos (solo escritorio) */}
            <section className="hidden lg:col-span-12 lg:flex flex-col items-center gap-16 order-2 my-0 lg:-mt-10">

              {/* Stack de Tecnologías Centrando */}
              <div className="w-full flex justify-center">
                <OrbitalStack />
              </div>

              {/* Proyectos Destacados - Escritorio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-6xl"
              >
                <h2 className="text-2xl font-bold text-white font-orbitron mb-8 text-center">Últimos Proyectos Destacados</h2>
                <div className="grid grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <motion.div whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(6, 182, 212, 0.3)' }} className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all flex flex-col h-full">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-cyan-500/10 rounded-lg"><Brain className="w-6 h-6 text-cyan-400" /></div>
                        <h3 className="text-xl font-bold text-white">Monitoreo de Medios con IA</h3>
                      </div>
                      <p className="text-gray-300 text-sm mb-4">Workflow que usa IA para analizar noticias políticas, identificar riesgos y generar resúmenes diarios de inteligencia para la toma de decisiones.</p>
                      <div className="mt-4 p-3 bg-cyan-900/20 border border-cyan-500/20 rounded-lg text-xs text-left">
                        <p className="font-bold text-cyan-300 mb-1 flex items-center gap-2"><Lightbulb className="w-4 h-4" />Dato Curioso</p>
                        <p className="text-gray-400">¿Sabías que es posible "traducir" texto a un lenguaje que la IA entiende (vectorización) usando un PC normal? En este proyecto, creamos embeddings localmente para dar un contexto súper preciso al modelo, mejorando drásticamente la calidad de los resúmenes.</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded">n8n</span>
                      <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded">IA</span>
                      <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">Análisis de Medios</span>
                    </div>
                  </motion.div>

                  {/* Card 2 */}
                  <motion.div whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(14, 165, 233, 0.3)' }} className="bg-white/5 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-400/40 transition-all flex flex-col h-full">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg"><Zap className="w-6 h-6 text-blue-400" /></div>
                        <h3 className="text-xl font-bold text-white">Generación de Contenido SEO</h3>
                      </div>
                      <p className="text-gray-300 text-sm mb-4">Workflow n8n que extrae licitaciones públicas, usa IA para generar artículos optimizados para SEO y los publica como borradores en WordPress.</p>
                      <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/20 rounded-lg text-xs text-left">
                        <p className="font-bold text-blue-300 mb-1 flex items-center gap-2"><Lightbulb className="w-4 h-4" />Dato Curioso</p>
                        <p className="text-gray-400">Para evitar que la IA se repita, este workflow tiene 'memoria'. Recuerda los artículos ya generados para asegurar que cada nueva publicación sea única, manteniendo el blog siempre fresco y relevante.</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded">WordPress</span>
                      <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded">SEO</span>
                      <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-300 rounded">n8n</span>
                    </div>
                  </motion.div>

                  {/* Card 3 */}
                  <motion.div whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(168, 85, 247, 0.3)' }} className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/40 transition-all flex flex-col h-full">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-500/10 rounded-lg"><Code className="w-6 h-6 text-purple-400" /></div>
                        <h3 className="text-xl font-bold text-white">Alertas de Vencimiento de Contratos</h3>
                      </div>
                      <p className="text-gray-300 text-sm mb-4">Sistema que monitorea portales públicos, detecta vencimientos de contratos y envía alertas proactivas al equipo comercial para no perder oportunidades.</p>
                      <div className="mt-4 p-3 bg-purple-900/20 border border-purple-500/20 rounded-lg text-xs text-left">
                        <p className="font-bold text-purple-300 mb-1 flex items-center gap-2"><Lightbulb className="w-4 h-4" />Dato Curioso</p>
                        <p className="text-gray-400">Este sistema no solo lee datos, ¡los vigila! Un script de Python actúa como un centinela digital en portales públicos, detectando cambios que un humano pasaría por alto y asegurando que ninguna oportunidad de negocio se escape.</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">n8n</span>
                      <span className="px-2 py-1 text-xs bg-pink-500/20 text-pink-300 rounded">Python</span>
                      <span className="px-2 py-1 text-xs bg-gray-500/20 text-gray-300 rounded">Web Scraping</span>
                    </div>
                  </motion.div>
                </div>

                {/* Botón Ver más proyectos */}
                <div className="text-center mt-12">
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
                      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(6, 182, 212, 0.3)', opacity: 1 }}
                      className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold rounded-lg px-6 py-3 transition-all hover:bg-cyan-500/20 hover:border-cyan-400/50"
                    >
                      Ver más proyectos
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </section>


          {/* Columna Derecha: Sobre mí y Proyectos */}
          <div className="lg:col-span-5 flex flex-col gap-12 order-1 lg:order-1">
            {/* Sección Sobre Mí */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:bg-transparent lg:backdrop-blur-0 lg:border-0 lg:p-0 lg:mt-60"
            >
              <h2 className="text-2xl font-bold text-white font-orbitron mb-4">Sobre mí</h2>
              <div className="text-gray-300 text-sm leading-relaxed space-y-3">
                <p>
                  Como <b>Analista de Datos y especialista en Automatización</b>, mi misión es simple: liberar tu tiempo. Convierto procesos manuales y complejos en flujos de trabajo inteligentes y autónomos.
                </p>
                <p>
                  Utilizando herramientas como <span className="font-semibold text-cyan-300">n8n</span>, <span className="font-semibold text-cyan-300">Python</span> y <span className="font-semibold text-cyan-300">Power BI</span>, he desarrollado soluciones que:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2 text-gray-400">
                  <li><b>Generan contenido optimizado para SEO</b> de forma automática, analizando datos públicos y creando artículos listos para publicar.</li>
                  <li><b>Monitorizan vencimientos de contratos</b> y notifican a los equipos comerciales, asegurando que ninguna oportunidad se pierda.</li>
                  <li><b>Orquestan y limpian datos</b> de múltiples fuentes para alimentar dashboards en tiempo real.</li>
                </ul>
                <p>
                  ¡Listo para aportar estas soluciones innovadoras a tu equipo!
                </p>
              </div>
              
            </motion.div>

           </div>

          {/* Tierra 3D para escritorio */}
          <div className="hidden lg:block absolute top-0 right-0 w-[750px] h-[750px] z-0 opacity-70 -mr-[495px] -mt-[495px] pointer-events-none">
            <EarthCanvas />
          </div>

        </div>

       

{/* Proyectos Destacados - Móvil */}
<section className="block lg:hidden mt-12 px-4">
  <h2 className="text-2xl font-bold text-white font-orbitron mb-8 text-center">Últimos Proyectos Destacados</h2>
  <div className="flex flex-col gap-8">
    {/* Card 1 */}
    <motion.div whileHover={{ y: -2 }} className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 hover:border-cyan-400/40 transition-all flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-cyan-500/10 rounded-lg"><Brain className="w-6 h-6 text-cyan-400" /></div>
          <h3 className="text-lg font-bold text-white">Monitoreo de Medios con IA</h3>
        </div>
        <p className="text-gray-300 text-xs mb-2">Workflow que usa IA para analizar noticias políticas, identificar riesgos y generar resúmenes diarios de inteligencia para la toma de decisiones.</p>
        <div className="mt-2 p-2 bg-cyan-900/20 border border-cyan-500/20 rounded-lg text-xs text-left">
          <p className="font-bold text-cyan-300 mb-1 flex items-center gap-2"><Lightbulb className="w-4 h-4" />Dato Curioso</p>
          <p className="text-gray-400">¿Sabías que es posible "traducir" texto a un lenguaje que la IA entiende (vectorización) usando un PC normal? En este proyecto, creamos embeddings localmente para dar un contexto súper preciso al modelo, mejorando drásticamente la calidad de los resúmenes.</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded">n8n</span>
        <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded">IA</span>
        <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">Análisis de Medios</span>
      </div>
    </motion.div>
    {/* Card 2 */}
    <motion.div whileHover={{ y: -2 }} className="bg-white/5 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4 hover:border-blue-400/40 transition-all flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-500/10 rounded-lg"><Zap className="w-6 h-6 text-blue-400" /></div>
          <h3 className="text-lg font-bold text-white">Generación de Contenido SEO</h3>
        </div>
        <p className="text-gray-300 text-xs mb-2">Workflow n8n que extrae licitaciones públicas, usa IA para generar artículos optimizados para SEO y los publica como borradores en WordPress.</p>
        <div className="mt-2 p-2 bg-blue-900/20 border border-blue-500/20 rounded-lg text-xs text-left">
          <p className="font-bold text-blue-300 mb-1 flex items-center gap-2"><Lightbulb className="w-4 h-4" />Dato Curioso</p>
          <p className="text-gray-400">Para evitar que la IA se repita, este workflow tiene 'memoria'. Recuerda los artículos ya generados para asegurar que cada nueva publicación sea única, manteniendo el blog siempre fresco y relevante.</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded">WordPress</span>
        <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded">SEO</span>
        <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-300 rounded">n8n</span>
      </div>
    </motion.div>
    {/* Card 3 */}
    <motion.div whileHover={{ y: -2 }} className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 hover:border-purple-400/40 transition-all flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-500/10 rounded-lg"><Code className="w-6 h-6 text-purple-400" /></div>
          <h3 className="text-lg font-bold text-white">Alertas de Vencimiento de Contratos</h3>
        </div>
        <p className="text-gray-300 text-xs mb-2">Sistema que monitorea portales públicos, detecta vencimientos de contratos y envía alertas proactivas al equipo comercial para no perder oportunidades.</p>
        <div className="mt-2 p-2 bg-purple-900/20 border border-purple-500/20 rounded-lg text-xs text-left">
          <p className="font-bold text-purple-300 mb-1 flex items-center gap-2"><Lightbulb className="w-4 h-4" />Dato Curioso</p>
          <p className="text-gray-400">Este sistema no solo lee datos, ¡los vigila! Un script de Python actúa como un centinela digital en portales públicos, detectando cambios que un humano pasaría por alto y asegurando que ninguna oportunidad de negocio se escape.</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">n8n</span>
        <span className="px-2 py-1 text-xs bg-pink-500/20 text-pink-300 rounded">Python</span>
        <span className="px-2 py-1 text-xs bg-gray-500/20 text-gray-300 rounded">Web Scraping</span>
      </div>
    </motion.div>
  </div>
  {/* Botón Ver más proyectos */}
  <div className="text-center mt-8">
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
        whileHover={{ y: -2, boxShadow: '0 6px 12px rgba(6, 182, 212, 0.3)', opacity: 1 }}
        className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold rounded-lg px-6 py-3 transition-all hover:bg-cyan-500/20 hover:border-cyan-400/50"
      >
        Ver más proyectos
      </motion.div>
    </Link>
  </div>
</section>

      {/* Sección de Redes Sociales */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
        <a href="https://github.com/Pedroru101" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors" aria-label="GitHub">
          <Github className="w-5 h-5 text-gray-300" />
        </a>
        <a href="https://www.linkedin.com/in/dataquintanapedro" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors" aria-label="LinkedIn">
          <Linkedin className="w-5 h-5 text-gray-300" />
        </a>
      </div>
    </main>
    </div>
  );
}
