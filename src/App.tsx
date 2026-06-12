import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Smile, DollarSign, ArrowRight, ShieldCheck, PlayCircle, Trophy, RotateCcw, Loader2 } from 'lucide-react';
import { GameState, StatImpact, Option, Scenario } from './types';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Stats
  const [stats, setStats] = useState({
    efficiency: 100,
    csat: 100,
    budget: 100
  });

  // Turn state
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const fetchNextScenario = async (turnIndex: number, currentStats: typeof stats, previousContext?: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-scenario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          turn: turnIndex + 1,
          currentStats,
          previousScenarioContext: previousContext,
        }),
      });
      if (!response.ok) throw new Error('Falha ao gerar cenário');
      
      const newScenario: Scenario = await response.json();
      // Safety mapping to ensure options structure
      if (newScenario.options && newScenario.options.length) {
         setCurrentScenario(newScenario);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return; // Can implement error state here if needed
    }
    setIsLoading(false);
  };

  const handleStart = async () => {
    setGameState('playing');
    await fetchNextScenario(0, stats, undefined);
  };

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option);
  };

  const handleConfirmAction = () => {
    if (!selectedOption) return;

    // Apply stats
    setStats((prev) => ({
      efficiency: Math.max(0, Math.min(200, prev.efficiency + selectedOption.impact.efficiency)),
      csat: Math.max(0, Math.min(200, prev.csat + selectedOption.impact.csat)),
      budget: Math.max(0, Math.min(200, prev.budget + selectedOption.impact.budget)),
    }));

    setGameState('feedback');
  };

  const handleNextTurn = async () => {
    if (stats.efficiency <= 0 || stats.csat <= 0 || stats.budget <= 0) {
      setGameState('gameover');
      return;
    }

    // Win condition - finish after 15 dynamic turns for example, or keep going?
    // Let's make it a 15-turn challenge
    if (currentScenarioIndex + 1 < 15) {
      const nextIndex = currentScenarioIndex + 1;
      setCurrentScenarioIndex(nextIndex);
      setSelectedOption(null);
      setGameState('playing');
      const previousContext = currentScenario?.context;
      setCurrentScenario(null); // Clear to show loader properly if needed, but loader itself handles
      await fetchNextScenario(nextIndex, stats, previousContext);
    } else {
      setGameState('victory');
    }
  };

  const handleRestart = () => {
    setStats({ efficiency: 100, csat: 100, budget: 100 });
    setCurrentScenarioIndex(0);
    setCurrentScenario(null);
    setSelectedOption(null);
    setGameState('intro');
  };

  // Helper values for Progress Bars
  const getProgressColor = (value: number) => {
    if (value >= 100) return 'bg-emerald-500';
    if (value > 50) return 'bg-blue-500';
    if (value > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col md:flex-row">
      {/* Sidebar: Dashboard / Stats */}
      <aside className="w-full md:w-80 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col gap-8 shadow-xl z-10">
        <div>
          <div className="flex items-center gap-2 mb-2 text-emerald-400">
            <ShieldCheck className="w-8 h-8" />
            <h1 className="text-xl font-bold tracking-tight">TechVanguard</h1>
          </div>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase mt-1">
            ITIL 4 Master Sim
          </p>
        </div>

        {gameState !== 'intro' && (
          <div className="space-y-6 flex-1">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Métricas do Serviço
            </h2>
            
            {/* Efficiency */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-slate-300">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Eficiência TI
                </span>
                <span className="font-mono font-medium">{stats.efficiency} / 200</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.efficiency / 200) * 100}%` }}
                  className={`h-full ${getProgressColor(stats.efficiency)}`}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* CSAT */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-slate-300">
                  <Smile className="w-4 h-4 text-emerald-400" />
                  CSAT (Clientes)
                </span>
                <span className="font-mono font-medium">{stats.csat} / 200</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.csat / 200) * 100}%` }}
                  className={`h-full ${getProgressColor(stats.csat)}`}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-slate-300">
                  <DollarSign className="w-4 h-4 text-emerald-300" />
                  Orçamento
                </span>
                <span className="font-mono font-medium">{stats.budget} / 200</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.budget / 200) * 100}%` }}
                  className={`h-full ${getProgressColor(stats.budget)}`}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* INTRO STATE */}
          {gameState === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center p-8 max-w-2xl mx-auto text-center"
            >
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Bem-vindo à TechVanguard</h2>
              <p className="text-slate-400 mb-8 leading-relaxed max-w-lg">
                Você acaba de ser contratado como o novo <strong>Diretor de TI</strong> desta startup em hipercrescimento. 
                Sua missão é estruturar os serviços para garantir que a empresa possa escalar com sucesso usando o framework <strong>ITIL 4</strong>.
                <br/><br/>
                Tome decisões baseadas nos princípios, dimensões e práticas da ITIL. Gerencie orçamentos, mantenha os clientes satisfeitos e a operação eficiente para evitar falência.
              </p>
              <button 
                onClick={handleStart}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-8 py-4 rounded-xl flex items-center gap-3 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <PlayCircle className="w-5 h-5" />
                Iniciar Turno 1
              </button>
            </motion.div>
          )}

          {/* PLAYING STATE */}
          {gameState === 'playing' && (
             <motion.div 
              key={`scenario-container`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 overflow-y-auto p-4 md:p-12 w-full max-w-4xl mx-auto flex flex-col"
            >
              {isLoading || !currentScenario ? (
                 <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-4">
                   <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
                   <p className="animate-pulse">A Diretiva está analisando a performance da operação ITIL...</p>
                 </div>
              ) : (
                <>
                  <header className="mb-8">
                    <span className="text-emerald-400 font-mono text-sm tracking-wide uppercase mb-2 block">
                      Turno {currentScenarioIndex + 1} / 15
                    </span>
                    <h2 className="text-2xl font-bold text-slate-200 mb-4">{currentScenario.phase}</h2>
                    <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 leading-relaxed text-slate-300">
                      {currentScenario.context}
                    </div>
                  </header>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-slate-200 mb-6 flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 mt-1 shrink-0 text-emerald-400" /> 
                      {currentScenario.question}
                    </h3>
                    
                    <div className="space-y-4">
                      {currentScenario.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleSelectOption(option)}
                          className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                            selectedOption?.id === option.id 
                              ? 'bg-slate-800 border-emerald-500 ring-4 ring-emerald-500/20 shadow-lg' 
                              : 'bg-slate-900 border-transparent hover:border-slate-700 hover:bg-slate-800'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <span className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center font-bold text-sm ${
                              selectedOption?.id === option.id ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {option.id}
                            </span>
                            <span className="text-slate-300 leading-relaxed pt-1">
                              {option.text}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="py-6 border-t border-slate-800 flex justify-end">
                    <button
                      onClick={handleConfirmAction}
                      disabled={!selectedOption}
                      className="bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 hover:bg-emerald-400 text-slate-950 font-semibold px-8 py-4 rounded-xl flex items-center gap-3 transition-colors shadow-lg shadow-emerald-500/20"
                    >
                      <ShieldCheck className="w-5 h-5" />
                      Confirmar Decisão
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* FEEDBACK STATE */}
          {gameState === 'feedback' && currentScenario && selectedOption && (
            <motion.div 
              key={`feedback-${currentScenario.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 overflow-y-auto w-full p-4 md:p-12"
            >
              <div className="max-w-3xl mx-auto mt-12 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden text-center md:text-left">
                {/* Result header banner */}
                <div className={`p-8 ${selectedOption.isCorrect ? 'bg-emerald-500/10 border-b border-emerald-500/20' : 'bg-red-500/10 border-b border-red-500/20'}`}>
                   <h2 className={`text-3xl font-bold flex items-center justify-center md:justify-start gap-4 ${selectedOption.isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                     {selectedOption.isCorrect ? (
                       <>
                         <span>Decisão Correta!</span>
                         <span className="inline-block bg-emerald-500/20 text-emerald-300 text-sm py-1 px-3 rounded-full border border-emerald-500/30">+1 Nível ITIL</span>
                       </>
                     ) : 'Decisão Incorreta'}
                   </h2>
                </div>

                <div className="p-8">
                  <div className="prose prose-invert prose-emerald max-w-none">
                    <p className="text-lg leading-relaxed text-slate-300 mb-8 whitespace-pre-wrap">
                      {currentScenario.explanation}
                    </p>
                  </div>

                  <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800/50 mt-8 space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4 text-center md:text-left">
                      Impacto da Decisão
                    </h3>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                       <ImpactBadge label="Eficiência" value={selectedOption.impact.efficiency} icon={Zap} />
                       <ImpactBadge label="CSAT" value={selectedOption.impact.csat} icon={Smile} />
                       <ImpactBadge label="Orçamento" value={selectedOption.impact.budget} icon={DollarSign} />
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-800 flex justify-center md:justify-end">
                    <button
                      onClick={handleNextTurn}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-8 py-4 rounded-xl flex items-center gap-3 transition-colors shadow-lg shadow-emerald-500/20"
                    >
                      Avançar Turno
                      <ArrowRight className="w-5 h-5 shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* GAMEOVER / VICTORY STATES */}
          {(gameState === 'gameover' || gameState === 'victory') && (
            <motion.div 
              key="endscreen"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center p-8 text-center"
            >
               <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-2xl ${gameState === 'victory' ? 'bg-emerald-500/20 text-emerald-400 shadow-emerald-500/20' : 'bg-red-500/20 text-red-400 shadow-red-500/20'}`}>
                {gameState === 'victory' ? <Trophy className="w-12 h-12" /> : <ShieldCheck className="w-12 h-12 opacity-50" />}
              </div>
              
              <h2 className="text-4xl font-bold mb-4">{gameState === 'victory' ? 'Certificação Aprovada!' : 'Startup Falida...'}</h2>
              
              <p className="text-slate-400 max-w-md mx-auto mb-8 text-lg">
                 {gameState === 'victory' 
                  ? 'Você concluiu os cenários com sucesso e evitou a falência da TechVanguard. Sua compreensão do núcleo da ITIL 4 é exemplar.' 
                  : 'Suss métricas caíram muito baixo. Sem orçamento, sem eficiência ou com clientes irritados demais, o Conselho decidiu demiti-lo.'}
              </p>

              <button 
                onClick={handleRestart}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-4 rounded-xl flex items-center gap-3 transition-colors border border-slate-700 hover:border-slate-600"
              >
                <RotateCcw className="w-5 h-5" />
                Reiniciar Simulação
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function ImpactBadge({ label, value, icon: Icon }: { label: string, value: number, icon: any }) {
  const getImpactColor = (val: number) => {
    if (val > 0) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    if (val < 0) return 'bg-red-500/10 text-red-500 border-red-500/30';
    return 'bg-slate-800 text-slate-400 border-slate-700';
  };

  const formattedValue = value > 0 ? `+${value}` : value === 0 ? '--' : `${value}`;

  return (
    <div className={`px-4 py-3 rounded-xl border flex items-center gap-3 ${getImpactColor(value)}`}>
      <Icon className="w-5 h-5" />
      <div className="flex flex-col items-start leading-none gap-1">
        <span className="text-xs uppercase tracking-wider opacity-80">{label}</span>
        <span className="font-bold font-mono">{formattedValue}</span>
      </div>
    </div>
  );
}

