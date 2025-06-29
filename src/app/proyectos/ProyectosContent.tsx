'client';

import { motion, AnimatePresence } from "framer-motion";
import React from "react";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ThreeBackground } from '@/components/ThreeBackground';

import { useState } from "react";

function ExpandableDescription({ html, collapsed, onToggle, index }: { html: string, collapsed: boolean, onToggle: (index: number) => void, index: number }) {
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
    <div className="text-gray-300 text-sm mb-4">
      <div dangerouslySetInnerHTML={{ __html: firstPart }} />
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
      {secondPart && (
        <div className="w-full flex justify-center">
          <button
            className="mt-4 px-6 py-2.5 rounded-full font-extrabold text-base shadow-lg focus:outline-none tracking-wide scale-60"
            style={{
              color: '#000000',
              background: 'linear-gradient(90deg, #3A8BFF 10%, #0052D4 90%)',
              boxShadow: '0 0 10px 2px #0052D499, 0 0 20px 4px #3A8BFF99',
              border: '2px solid #3A8BFF',
              animation: 'blue-blink 1.2s infinite alternate',
              letterSpacing: '0.05em',
            }}
            onClick={() => onToggle(index)}
          >
            {collapsed ? 'VER MAS DETALLES' : 'OCULTAR DETALLES'}
          </button>
        </div>
      )}
      <style jsx>{`
        @keyframes blue-blink {
          0% { filter: brightness(1.1) drop-shadow(0 0 8px #3A8BFF); }
          50% { filter: brightness(1.6) drop-shadow(0 0 20px #0052D4); }
          100% { filter: brightness(1.2) drop-shadow(0 0 12px #3A8BFF); }
        }
      `}</style>
    </div>
  );
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  // icon?: React.ReactNode;
  // color?: string;
}

export default function ProyectosContent() {
  const projects: Project[] = [
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
    // 8 tarjetas placeholder
    // Insertar el informe real en el lugar del primer placeholder
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
    // Los siguientes placeholders siguen igual
    // Solo 8 tarjetas: 6 profesionales y 2 placeholders
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

  const handleToggle = (index: number) => {
    setCollapsedArr(prev => {
      const newArr = [...prev];
      newArr[index] = !newArr[index];
      return newArr;
    });
  };

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

        {/* Diagrama visual del workflow n8n eliminado por solicitud del usuario */}

        {/* Estado expandido individual para cada tarjeta */}
        {/* Lista de proyectos */}
        <div className="flex flex-col gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(6, 182, 212, 0.2)' }}
              className={`bg-white/5 backdrop-blur-sm border rounded-xl p-6 transition-all border-gray-600 hover:border-gray-500`}
            >
              <div className="flex flex-col items-center text-center gap-3 mb-4">
                <div className="p-2 bg-gray-500/10 rounded-lg">
                  <Image src="/icons/n8n.png" alt="n8n icon" width={24} height={24} className="w-6 h-6 object-cover rounded-md" />
                </div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
              </div>
              <ExpandableDescription
                html={project.description}
                collapsed={collapsedArr[index]}
                onToggle={handleToggle}
                index={index}
              />
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {project.tags.map((tag: string, tagIndex: number) => (
                  <span
                    key={tagIndex}
                    className={`px-2 py-1 text-xs rounded bg-blue-950/50 border border-blue-400/30 text-blue-300`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>


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
