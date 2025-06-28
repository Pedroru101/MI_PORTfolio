'client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import dynamic from 'next/dynamic';
import EarthWrapper from '@/components/EarthWrapper';
import { ThreeBackground } from '@/components/ThreeBackground';

export default function ProyectosContent() {
  const projects = [
    {
      title: "Automatización de Reportes",
      description: "Flujo n8n que consolida datos de múltiples fuentes y genera informes diarios en Power BI, reduciendo tiempo manual en un 80%.",
      tags: ["n8n", "Power BI", "REST APIs"],
      icon: "database",
      color: "cyan"
    },
    {
      title: "Dashboard Comercial",
      description: "Panel interactivo en Power BI con análisis de ventas, KPIs y pronósticos, integrado con SQL Server y actualizado en tiempo real.",
      tags: ["Power BI", "DAX", "SQL Server"],
      icon: "bar-chart-2",
      color: "blue"
    },
    {
      title: "Chatbot de Soporte",
      description: "Integración de n8n con GPT-4 para resolver consultas, con conexión a base de conocimiento y escalamiento a agentes.",
      tags: ["n8n", "GPT-4", "Webhooks"],
      icon: "message-square",
      color: "purple"
    },
  ];

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'database':
        return <div className="p-2 bg-cyan-500/10 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-cyan-400"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg></div>;
      case 'bar-chart-2':
        return <div className="p-2 bg-blue-500/10 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-400"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>;
      case 'message-square':
        return <div className="p-2 bg-purple-500/10 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-purple-400"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>;
      default:
        return <div className="p-2 bg-gray-500/10 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-400"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg></div>;
    }
  };

  const getColorClasses = (color: string) => {
    switch(color) {
      case 'cyan':
        return 'border-cyan-500/20 hover:border-cyan-400/40';
      case 'blue':
        return 'border-blue-500/20 hover:border-blue-400/40';
      case 'purple':
        return 'border-purple-500/20 hover:border-purple-400/40';
      default:
        return 'border-gray-600 hover:border-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-grid-white/[0.03] relative overflow-hidden">
      {/* Fondo con gradiente y grilla */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-950 via-black to-gray-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      </div>
      {/* Fondo de partículas animadas */}
      <ThreeBackground />
      {/* Tierra 3D */}
      <EarthWrapper />
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
          <p className="text-gray-400 max-w-2xl mx-auto">
            Una colección de mis proyectos más recientes y destacados. Cada uno representa un desafío único y una solución innovadora.
          </p>
        </motion.div>

        {/* Lista de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(6, 182, 212, 0.2)' }}
              className={`bg-white/5 backdrop-blur-sm border rounded-xl p-6 transition-all ${getColorClasses(project.color)}`}
            >
              <div className="flex items-center gap-3 mb-4">
                {getIcon(project.icon)}
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className={`px-2 py-1 text-xs rounded ${
                      project.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-300' :
                      project.color === 'blue' ? 'bg-blue-500/20 text-blue-300' :
                      project.color === 'purple' ? 'bg-purple-500/20 text-purple-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tierra 3D */}
      <EarthWrapper />

      {/* Redes Sociales */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
        <a href="https://github.com/Pedroru101" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors" aria-label="GitHub">
          <Github className="w-5 h-5 text-gray-300" />
        </a>
        <a href="https://www.linkedin.com/in/dataquintanapedro" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors" aria-label="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </a>
      </div>
    </div>
  );
}
