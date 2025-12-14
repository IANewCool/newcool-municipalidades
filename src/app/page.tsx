'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Municipalidades principales
const MUNICIPALIDADES = [
  // Region Metropolitana
  { id: 1, nombre: 'Santiago', alcalde: 'Mario Desbordes', direccion: 'Plaza de Armas s/n', region: 'Metropolitana', telefono: '22 713 6000', web: 'www.munistgo.cl', poblacion: 404495, tipo: 'Urbana Grande' },
  { id: 2, nombre: 'Providencia', alcalde: 'Evelyn Matthei', direccion: 'Av. Providencia 333', region: 'Metropolitana', telefono: '22 340 5000', web: 'www.providencia.cl', poblacion: 142079, tipo: 'Urbana Grande' },
  { id: 3, nombre: 'Las Condes', alcalde: 'Daniela Penaranda', direccion: 'Apoquindo 3400', region: 'Metropolitana', telefono: '22 580 5000', web: 'www.lascondes.cl', poblacion: 294838, tipo: 'Urbana Grande' },
  { id: 4, nombre: 'Nunoa', alcalde: 'Emilia Rios', direccion: 'Av. Irarrazaval 3360', region: 'Metropolitana', telefono: '22 496 5000', web: 'www.nunoa.cl', poblacion: 208237, tipo: 'Urbana Grande' },
  { id: 5, nombre: 'Maipu', alcalde: 'Tomas Vodanovic', direccion: '5 de Abril 696', region: 'Metropolitana', telefono: '22 394 9000', web: 'www.maipu.cl', poblacion: 521627, tipo: 'Urbana Grande' },
  { id: 6, nombre: 'Puente Alto', alcalde: 'Matias Toledo', direccion: 'Concha y Toro 1350', region: 'Metropolitana', telefono: '22 484 3000', web: 'www.mpuentealto.cl', poblacion: 568106, tipo: 'Urbana Grande' },
  { id: 7, nombre: 'La Florida', alcalde: 'Daniel Reyes', direccion: 'Av. Vicuna Mackenna 7210', region: 'Metropolitana', telefono: '22 761 5000', web: 'www.laflorida.cl', poblacion: 366916, tipo: 'Urbana Grande' },
  { id: 8, nombre: 'Vitacura', alcalde: 'Camila Merino', direccion: 'Av. Bicentenario 3800', region: 'Metropolitana', telefono: '22 480 7000', web: 'www.vitacura.cl', poblacion: 85384, tipo: 'Urbana' },
  { id: 9, nombre: 'Recoleta', alcalde: 'Fares Jadue', direccion: 'Av. Recoleta 2774', region: 'Metropolitana', telefono: '22 750 2100', web: 'www.recoleta.cl', poblacion: 157851, tipo: 'Urbana Grande' },
  { id: 10, nombre: 'Penalolen', alcalde: 'Miguel Concha', direccion: 'Av. Grecia 8735', region: 'Metropolitana', telefono: '22 483 7000', web: 'www.penalolen.cl', poblacion: 241599, tipo: 'Urbana Grande' },
  // Valparaiso
  { id: 11, nombre: 'Valparaiso', alcalde: 'Jorge Sharp', direccion: 'Condell 1490', region: 'Valparaiso', telefono: '32 293 9000', web: 'www.municipalidaddevalparaiso.cl', poblacion: 296655, tipo: 'Urbana Grande' },
  { id: 12, nombre: 'Vina del Mar', alcalde: 'Macarena Ripamonti', direccion: 'Arlegui 672', region: 'Valparaiso', telefono: '32 226 9000', web: 'www.vinadelmarchile.cl', poblacion: 334248, tipo: 'Urbana Grande' },
  { id: 13, nombre: 'Quilpue', alcalde: 'Valeria Melgarejo', direccion: 'Diego Portales 400', region: 'Valparaiso', telefono: '32 282 7500', web: 'www.quilpue.cl', poblacion: 151708, tipo: 'Urbana' },
  // Biobio
  { id: 14, nombre: 'Concepcion', alcalde: 'Alvaro Ortiz', direccion: "O'Higgins 525", region: 'Biobio', telefono: '41 226 5000', web: 'www.concepcion.cl', poblacion: 223574, tipo: 'Urbana Grande' },
  { id: 15, nombre: 'Talcahuano', alcalde: 'Henry Campos', direccion: 'Blanco Encalada 1160', region: 'Biobio', telefono: '41 291 0000', web: 'www.talcahuano.cl', poblacion: 163915, tipo: 'Urbana Grande' },
  // La Araucania
  { id: 16, nombre: 'Temuco', alcalde: 'Roberto Neira', direccion: 'Prat 650', region: 'La Araucania', telefono: '45 297 3000', web: 'www.temuco.cl', poblacion: 282415, tipo: 'Urbana Grande' },
  // Los Lagos
  { id: 17, nombre: 'Puerto Montt', alcalde: 'Gervoy Paredes', direccion: 'San Martin 170', region: 'Los Lagos', telefono: '65 226 1600', web: 'www.puertomontt.cl', poblacion: 245902, tipo: 'Urbana Grande' },
  { id: 18, nombre: 'Osorno', alcalde: 'Emeterio Carrillo', direccion: 'Mackenna 851', region: 'Los Lagos', telefono: '64 223 2400', web: 'www.municipalidadosorno.cl', poblacion: 161460, tipo: 'Urbana' },
  // Antofagasta
  { id: 19, nombre: 'Antofagasta', alcalde: 'Wilson Diaz', direccion: 'Washington 2563', region: 'Antofagasta', telefono: '55 238 2000', web: 'www.antofagasta.cl', poblacion: 361873, tipo: 'Urbana Grande' },
  { id: 20, nombre: 'Calama', alcalde: 'Eliecer Chamorro', direccion: 'Latorre 1501', region: 'Antofagasta', telefono: '55 246 0000', web: 'www.calama.cl', poblacion: 165731, tipo: 'Urbana' },
  // Coquimbo
  { id: 21, nombre: 'La Serena', alcalde: 'Roberto Jacob', direccion: 'Prat 571', region: 'Coquimbo', telefono: '51 220 6000', web: 'www.laserena.cl', poblacion: 221054, tipo: 'Urbana Grande' },
  { id: 22, nombre: 'Coquimbo', alcalde: 'Ali Manouchehri', direccion: 'Melgarejo 550', region: 'Coquimbo', telefono: '51 231 5000', web: 'www.coquimbo.cl', poblacion: 227730, tipo: 'Urbana Grande' },
  // Maule
  { id: 23, nombre: 'Talca', alcalde: 'Juan Carlos Diaz', direccion: '1 Oriente 1130', region: 'Maule', telefono: '71 222 4000', web: 'www.talca.cl', poblacion: 220357, tipo: 'Urbana Grande' },
  // OHiggins
  { id: 24, nombre: 'Rancagua', alcalde: 'Juan Ramon Godoy', direccion: 'German Riesco 370', region: 'OHiggins', telefono: '72 229 9000', web: 'www.rancagua.cl', poblacion: 241774, tipo: 'Urbana Grande' },
  // Magallanes
  { id: 25, nombre: 'Punta Arenas', alcalde: 'Claudio Radonich', direccion: 'Plaza Munoz Gamero 727', region: 'Magallanes', telefono: '61 229 1100', web: 'www.puntaarenas.cl', poblacion: 131592, tipo: 'Urbana' },
];

const REGIONES = ['Todas', 'Metropolitana', 'Valparaiso', 'Biobio', 'La Araucania', 'Los Lagos', 'Antofagasta', 'Coquimbo', 'Maule', 'OHiggins', 'Magallanes'];

// Tramites municipales
const TRAMITES = [
  {
    id: 'patente',
    nombre: 'Patente Comercial',
    icon: '🏪',
    descripcion: 'Autorizacion para ejercer actividad comercial',
    requisitos: ['Iniciacion de actividades SII', 'Permiso de edificacion', 'Resolucion sanitaria', 'Escritura local o contrato arriendo'],
    plazo: '15-30 dias',
    costo: 'Variable segun capital'
  },
  {
    id: 'circulacion',
    nombre: 'Permiso de Circulacion',
    icon: '🚗',
    descripcion: 'Autorizacion anual para circular con vehiculo',
    requisitos: ['Revision tecnica vigente', 'SOAP vigente', 'Permiso anterior', 'Pago de multas TAG'],
    plazo: 'Inmediato',
    costo: '1.5% avaluo fiscal'
  },
  {
    id: 'edificacion',
    nombre: 'Permiso de Edificacion',
    icon: '🏗️',
    descripcion: 'Autorizacion para construir o modificar',
    requisitos: ['Planos arquitectura', 'Certificado informaciones previas', 'Informe sanitario', 'Estudio de suelos'],
    plazo: '30-60 dias',
    costo: '1.5% presupuesto obra'
  },
  {
    id: 'aseo',
    nombre: 'Derechos de Aseo',
    icon: '🗑️',
    descripcion: 'Pago por retiro de basura domiciliaria',
    requisitos: ['Ser propietario o arrendatario', 'Rol de propiedad'],
    plazo: 'Pago anual o semestral',
    costo: '$3.000-$15.000/mes'
  },
  {
    id: 'obra-menor',
    nombre: 'Permiso Obra Menor',
    icon: '🔨',
    descripcion: 'Reparaciones o ampliaciones hasta 100m2',
    requisitos: ['Formulario solicitud', 'Croquis de la obra', 'Titulo de dominio'],
    plazo: '5-15 dias',
    costo: '0.5% presupuesto'
  },
  {
    id: 'subsidio',
    nombre: 'Ficha de Proteccion Social',
    icon: '📋',
    descripcion: 'Registro para acceder a beneficios estatales',
    requisitos: ['Cedula de identidad', 'Certificado de residencia', 'Ingresos del hogar'],
    plazo: '30 dias',
    costo: 'Gratuito'
  }
];

// Calculadora de patentes
const TASAS_PATENTE = {
  comercial: 0.005, // 0.5% del capital
  industrial: 0.004,
  profesional: 0.003,
  alcoholes: 0.008,
  minimo: 25000, // 1 UTM aprox
  maximo: 8000000 // 320 UTM aprox
};

// Permisos de circulacion por tipo
const TASAS_CIRCULACION = {
  auto: 0.015,
  moto: 0.01,
  camion: 0.02,
  taxi: 0.025,
  bus: 0.025
};

export default function MunicipalidadesModule() {
  const [busqueda, setBusqueda] = useState('');
  const [regionFiltro, setRegionFiltro] = useState('Todas');
  const [seccionActiva, setSeccionActiva] = useState<'buscador' | 'tramites' | 'patentes' | 'circulacion' | 'estructura' | 'glosario'>('buscador');

  // Calculadora de patentes
  const [capitalPatente, setCapitalPatente] = useState('');
  const [tipoPatente, setTipoPatente] = useState('comercial');

  // Calculadora permiso circulacion
  const [avaluoVehiculo, setAvaluoVehiculo] = useState('');
  const [tipoVehiculo, setTipoVehiculo] = useState('auto');

  const municipalidadesFiltradas = MUNICIPALIDADES.filter(m => {
    const coincideBusqueda = busqueda === '' ||
      m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.alcalde.toLowerCase().includes(busqueda.toLowerCase());
    const coincideRegion = regionFiltro === 'Todas' || m.region === regionFiltro;
    return coincideBusqueda && coincideRegion;
  });

  const calcularPatente = () => {
    const capital = parseFloat(capitalPatente) || 0;
    const tasa = TASAS_PATENTE[tipoPatente as keyof typeof TASAS_PATENTE] || TASAS_PATENTE.comercial;

    if (typeof tasa === 'number') {
      const patente = capital * tasa;
      return Math.max(Math.min(patente, TASAS_PATENTE.maximo), TASAS_PATENTE.minimo);
    }
    return TASAS_PATENTE.minimo;
  };

  const calcularPermiso = () => {
    const avaluo = parseFloat(avaluoVehiculo) || 0;
    const tasa = TASAS_CIRCULACION[tipoVehiculo as keyof typeof TASAS_CIRCULACION] || TASAS_CIRCULACION.auto;
    return avaluo * tasa;
  };

  const formatearPesos = (valor: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };

  const formatearNumero = (valor: number) => {
    return new Intl.NumberFormat('es-CL').format(valor);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 border-b border-blue-500/20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-5xl mb-3 block">🏛️</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Municipalidades <span className="text-blue-400">Chile</span>
            </h1>
            <p className="text-blue-200/70">
              Buscador de municipios, tramites y calculadoras de patentes
            </p>
          </motion.div>
        </div>
      </header>

      {/* Navegacion */}
      <nav className="bg-black/20 border-b border-blue-500/10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-2">
            {[
              { id: 'buscador', label: '🔍 Buscador', sublabel: 'Municipios' },
              { id: 'tramites', label: '📋 Tramites', sublabel: 'Tipos' },
              { id: 'patentes', label: '🧮 Patentes', sublabel: 'Calculadora' },
              { id: 'circulacion', label: '🚗 Circulacion', sublabel: 'Permiso' },
              { id: 'estructura', label: '🏢 Estructura', sublabel: 'Municipal' },
              { id: 'glosario', label: '📖 Glosario', sublabel: 'Terminos' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSeccionActiva(tab.id as typeof seccionActiva)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  seccionActiva === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-blue-200 hover:bg-blue-500/20'
                }`}
              >
                <span className="block">{tab.label}</span>
                <span className="text-xs opacity-70">{tab.sublabel}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Buscador de Municipalidades */}
        {seccionActiva === 'buscador' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🔍</span> Buscar Municipalidad
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-blue-200 text-sm mb-2">Buscar por comuna o alcalde</label>
                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Ej: Santiago, Providencia, Matthei..."
                    className="w-full px-4 py-3 bg-black/30 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-blue-200 text-sm mb-2">Region</label>
                  <select
                    value={regionFiltro}
                    onChange={(e) => setRegionFiltro(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    {REGIONES.map(r => (
                      <option key={r} value={r} className="bg-slate-800">{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-sm text-blue-200/60">
                Mostrando {municipalidadesFiltradas.length} de {MUNICIPALIDADES.length} municipalidades
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {municipalidadesFiltradas.map((muni, i) => (
                <motion.div
                  key={muni.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/5 backdrop-blur border border-blue-500/20 rounded-xl p-5 hover:border-blue-500/40 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-white text-lg">{muni.nombre}</h3>
                      <p className="text-blue-400 text-sm">Alcalde: {muni.alcalde}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      muni.tipo === 'Urbana Grande' ? 'bg-blue-500/20 text-blue-300' : 'bg-gray-500/20 text-gray-300'
                    }`}>
                      {muni.tipo}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400 flex items-center gap-2">
                      <span>📍</span> {muni.direccion}
                    </p>
                    <p className="text-gray-400 flex items-center gap-2">
                      <span>📞</span> {muni.telefono}
                    </p>
                    <p className="text-gray-400 flex items-center gap-2">
                      <span>🌐</span> {muni.web}
                    </p>
                    <p className="text-gray-400 flex items-center gap-2">
                      <span>👥</span> {formatearNumero(muni.poblacion)} habitantes
                    </p>
                    <p className="text-gray-400 flex items-center gap-2">
                      <span>🗺️</span> Region {muni.region}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {municipalidadesFiltradas.length === 0 && (
              <div className="text-center py-12">
                <span className="text-4xl mb-4 block">🔍</span>
                <p className="text-gray-400">No se encontraron municipalidades con esos criterios</p>
              </div>
            )}
          </motion.section>
        )}

        {/* Tramites Municipales */}
        {seccionActiva === 'tramites' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Tramites Municipales</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TRAMITES.map((tramite, i) => (
                <motion.div
                  key={tramite.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur border border-blue-500/20 rounded-xl p-5"
                >
                  <span className="text-3xl mb-3 block">{tramite.icon}</span>
                  <h3 className="font-bold text-white mb-2">{tramite.nombre}</h3>
                  <p className="text-gray-400 text-sm mb-4">{tramite.descripcion}</p>

                  <div className="space-y-2 mb-4">
                    <p className="text-blue-400 text-xs font-medium">Requisitos:</p>
                    {tramite.requisitos.slice(0, 3).map((req, j) => (
                      <p key={j} className="text-gray-500 text-xs">• {req}</p>
                    ))}
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-blue-300">⏱️ {tramite.plazo}</span>
                    <span className="text-green-300">💰 {tramite.costo}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl p-6 border border-blue-500/30">
              <h3 className="font-bold text-white mb-4">📝 Tramites Online</h3>
              <p className="text-gray-300 text-sm mb-4">
                Muchas municipalidades ofrecen tramites en linea a traves de sus portales web.
                Consulta en la pagina de tu municipio los servicios disponibles.
              </p>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div className="bg-black/20 rounded-lg p-3">
                  <span className="text-2xl block mb-1">💳</span>
                  <p className="text-white text-sm font-medium">Pagos Online</p>
                  <p className="text-gray-500 text-xs">Patentes, permisos</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <span className="text-2xl block mb-1">📄</span>
                  <p className="text-white text-sm font-medium">Certificados</p>
                  <p className="text-gray-500 text-xs">Residencia, numero</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <span className="text-2xl block mb-1">📅</span>
                  <p className="text-white text-sm font-medium">Agenda Horas</p>
                  <p className="text-gray-500 text-xs">Tramites presenciales</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <span className="text-2xl block mb-1">📢</span>
                  <p className="text-white text-sm font-medium">Reclamos</p>
                  <p className="text-gray-500 text-xs">OIRS municipal</p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Calculadora de Patentes */}
        {seccionActiva === 'patentes' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-blue-500/20">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>🧮</span> Calculadora de Patente Comercial
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-blue-200 text-sm mb-2">Tipo de Patente</label>
                    <select
                      value={tipoPatente}
                      onChange={(e) => setTipoPatente(e.target.value)}
                      className="w-full px-4 py-3 bg-black/30 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="comercial" className="bg-slate-800">Comercial (0.5%)</option>
                      <option value="industrial" className="bg-slate-800">Industrial (0.4%)</option>
                      <option value="profesional" className="bg-slate-800">Profesional (0.3%)</option>
                      <option value="alcoholes" className="bg-slate-800">Alcoholes (0.8%)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-blue-200 text-sm mb-2">Capital Propio ($)</label>
                    <input
                      type="number"
                      value={capitalPatente}
                      onChange={(e) => setCapitalPatente(e.target.value)}
                      placeholder="Ej: 50000000"
                      className="w-full px-4 py-3 bg-black/30 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Capital declarado en iniciacion de actividades</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-500/20 rounded-xl">
                  <p className="text-blue-200 text-sm mb-1">Patente Anual Estimada</p>
                  <p className="text-3xl font-bold text-white">{formatearPesos(calcularPatente())}</p>
                  <p className="text-xs text-blue-200/60 mt-2">
                    Se paga en 2 cuotas semestrales
                  </p>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  * Valores referenciales. El monto final depende de cada municipalidad.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-blue-500/20">
                <h3 className="text-lg font-bold text-white mb-4">📋 Tipos de Patentes</h3>

                <div className="space-y-4">
                  {[
                    { tipo: 'Patente Comercial', tasa: '0.25% - 0.5%', desc: 'Comercio, servicios, retail', icon: '🏪' },
                    { tipo: 'Patente Industrial', tasa: '0.25% - 0.4%', desc: 'Fabricas, manufactura', icon: '🏭' },
                    { tipo: 'Patente Profesional', tasa: '0.2% - 0.3%', desc: 'Oficinas profesionales', icon: '💼' },
                    { tipo: 'Patente Alcoholes', tasa: '0.5% - 1%', desc: 'Venta de bebidas alcoholicas', icon: '🍺' },
                    { tipo: 'Patente Provisoria', tasa: 'Variable', desc: 'Ferias, eventos temporales', icon: '🎪' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-black/20 rounded-lg">
                      <span className="text-2xl">{item.icon}</span>
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.tipo}</p>
                        <p className="text-gray-500 text-xs">{item.desc}</p>
                      </div>
                      <span className="text-blue-400 text-sm">{item.tasa}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <p className="text-yellow-300 text-xs">
                    ⚠️ La patente se calcula sobre el capital propio declarado. El minimo es 1 UTM y maximo 8.000 UTM.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Permiso de Circulacion */}
        {seccionActiva === 'circulacion' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-blue-500/20">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>🚗</span> Calculadora Permiso de Circulacion
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-blue-200 text-sm mb-2">Tipo de Vehiculo</label>
                    <select
                      value={tipoVehiculo}
                      onChange={(e) => setTipoVehiculo(e.target.value)}
                      className="w-full px-4 py-3 bg-black/30 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="auto" className="bg-slate-800">Automovil (1.5%)</option>
                      <option value="moto" className="bg-slate-800">Motocicleta (1%)</option>
                      <option value="camion" className="bg-slate-800">Camion (2%)</option>
                      <option value="taxi" className="bg-slate-800">Taxi / Colectivo (2.5%)</option>
                      <option value="bus" className="bg-slate-800">Bus (2.5%)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-blue-200 text-sm mb-2">Avaluo Fiscal del Vehiculo ($)</label>
                    <input
                      type="number"
                      value={avaluoVehiculo}
                      onChange={(e) => setAvaluoVehiculo(e.target.value)}
                      placeholder="Ej: 8000000"
                      className="w-full px-4 py-3 bg-black/30 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Consulta el avaluo en www.sii.cl</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-500/20 rounded-xl">
                  <p className="text-blue-200 text-sm mb-1">Permiso de Circulacion Estimado</p>
                  <p className="text-3xl font-bold text-white">{formatearPesos(calcularPermiso())}</p>
                  <p className="text-xs text-blue-200/60 mt-2">
                    Vence el 31 de marzo de cada ano
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-blue-500/20">
                <h3 className="text-lg font-bold text-white mb-4">📅 Plazos y Requisitos</h3>

                <div className="space-y-4">
                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <p className="text-green-400 font-medium mb-2">✅ Requisitos</p>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Revision tecnica vigente</li>
                      <li>• SOAP (seguro obligatorio) vigente</li>
                      <li>• Permiso de circulacion anterior</li>
                      <li>• Multas TAG pagadas</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <p className="text-yellow-400 font-medium mb-2">⚠️ Fechas Importantes</p>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• <strong>Febrero:</strong> 50% primera cuota</li>
                      <li>• <strong>Marzo:</strong> 50% restante o total</li>
                      <li>• <strong>Abril en adelante:</strong> + intereses</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <p className="text-blue-400 font-medium mb-2">💰 Distribucion del Pago</p>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• 62.5% para la municipalidad</li>
                      <li>• 37.5% Fondo Comun Municipal</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Estructura Municipal */}
        {seccionActiva === 'estructura' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Estructura Municipal</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-blue-500/20">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <span>👔</span> Autoridades
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <p className="text-blue-400 font-medium">Alcalde</p>
                    <p className="text-gray-400 text-sm">Maxima autoridad. Electo por votacion popular por 4 anos. Dirige la administracion municipal.</p>
                  </div>
                  <div className="p-3 bg-black/20 rounded-lg">
                    <p className="text-white font-medium">Concejo Municipal</p>
                    <p className="text-gray-400 text-sm">6-10 concejales electos. Fiscalizan al alcalde y aprueban ordenanzas, presupuesto y planes.</p>
                  </div>
                  <div className="p-3 bg-black/20 rounded-lg">
                    <p className="text-white font-medium">COSOC</p>
                    <p className="text-gray-400 text-sm">Consejo de la Sociedad Civil. Organo consultivo de participacion ciudadana.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-blue-500/20">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <span>🏢</span> Direcciones
                </h3>
                <div className="space-y-2">
                  {[
                    { nombre: 'Obras Municipales', desc: 'Permisos de edificacion y urbanismo' },
                    { nombre: 'Transito', desc: 'Permisos de circulacion y licencias' },
                    { nombre: 'Desarrollo Comunitario', desc: 'DIDECO - Programas sociales' },
                    { nombre: 'Aseo y Ornato', desc: 'Limpieza y areas verdes' },
                    { nombre: 'Administracion y Finanzas', desc: 'Patentes y rentas municipales' },
                    { nombre: 'Control', desc: 'Fiscalizacion municipal' },
                    { nombre: 'Juridica', desc: 'Asesoria legal' },
                    { nombre: 'Secretaria Municipal', desc: 'Actas y decretos' }
                  ].map((dir, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-blue-500/10">
                      <p className="text-white text-sm">{dir.nombre}</p>
                      <p className="text-gray-500 text-xs">{dir.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30">
              <h3 className="font-bold text-white mb-4">📊 Financiamiento Municipal</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-black/20 rounded-lg">
                  <span className="text-3xl block mb-2">💰</span>
                  <p className="text-white font-medium">Ingresos Propios</p>
                  <p className="text-gray-500 text-xs">Patentes, permisos, derechos</p>
                  <p className="text-blue-400 text-sm mt-1">~35%</p>
                </div>
                <div className="text-center p-4 bg-black/20 rounded-lg">
                  <span className="text-3xl block mb-2">🏛️</span>
                  <p className="text-white font-medium">Fondo Comun</p>
                  <p className="text-gray-500 text-xs">FCM redistribuido</p>
                  <p className="text-blue-400 text-sm mt-1">~40%</p>
                </div>
                <div className="text-center p-4 bg-black/20 rounded-lg">
                  <span className="text-3xl block mb-2">📋</span>
                  <p className="text-white font-medium">Transferencias</p>
                  <p className="text-gray-500 text-xs">Gobierno central</p>
                  <p className="text-blue-400 text-sm mt-1">~20%</p>
                </div>
                <div className="text-center p-4 bg-black/20 rounded-lg">
                  <span className="text-3xl block mb-2">🏠</span>
                  <p className="text-white font-medium">Contribuciones</p>
                  <p className="text-gray-500 text-xs">Impuesto territorial</p>
                  <p className="text-blue-400 text-sm mt-1">~5%</p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Glosario */}
        {seccionActiva === 'glosario' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Glosario Municipal</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { termino: 'Patente Municipal', definicion: 'Tributo que grava el ejercicio de actividades comerciales, industriales o profesionales en la comuna.' },
                { termino: 'Permiso de Circulacion', definicion: 'Autorizacion anual para que un vehiculo pueda transitar por las vias publicas del pais.' },
                { termino: 'Derechos de Aseo', definicion: 'Cobro por el servicio de recoleccion de residuos domiciliarios que presta la municipalidad.' },
                { termino: 'Permiso de Edificacion', definicion: 'Autorizacion municipal para construir, reconstruir, reparar, alterar o demoler edificaciones.' },
                { termino: 'Ordenanza Municipal', definicion: 'Norma general dictada por el Concejo Municipal aplicable en toda la comuna.' },
                { termino: 'Fondo Comun Municipal', definicion: 'Mecanismo de redistribucion de ingresos entre municipios ricos y pobres.' },
                { termino: 'DIDECO', definicion: 'Direccion de Desarrollo Comunitario. Ejecuta programas sociales y de participacion.' },
                { termino: 'DOM', definicion: 'Direccion de Obras Municipales. Otorga permisos de edificacion y recepciones.' },
                { termino: 'SECPLAN', definicion: 'Secretaria de Planificacion. Elabora planes de desarrollo comunal.' },
                { termino: 'OIRS', definicion: 'Oficina de Informacion, Reclamos y Sugerencias. Atencion ciudadana.' },
                { termino: 'Concejo Municipal', definicion: 'Organo colegiado de caracter normativo, resolutivo y fiscalizador de la gestion municipal.' },
                { termino: 'PLADECO', definicion: 'Plan de Desarrollo Comunal. Instrumento de planificacion a mediano y largo plazo.' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/5 rounded-xl p-4 border border-blue-500/20"
                >
                  <h3 className="font-bold text-blue-400 mb-2">{item.termino}</h3>
                  <p className="text-gray-400 text-sm">{item.definicion}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-500/20 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Municipalidades Chile - Parte de{' '}
            <a href="https://newcool-informada.vercel.app" className="text-blue-400 hover:underline">
              NewCooltura Informada
            </a>
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Informacion referencial. Consulte directamente con su municipalidad.
          </p>
        </div>
      </footer>
    </div>
  );
}
