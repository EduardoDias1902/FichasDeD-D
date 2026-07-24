import React from 'react';
import { ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { Button } from '../ui/Button';
import { StepIdentity } from './StepIdentity';
import { StepRace } from './StepRace';
import { StepClass } from './StepClass';
import { StepAbilityScores } from './StepAbilityScores';
import { StepBackground } from './StepBackground';
import { StepEquipment } from './StepEquipment';
import { StepSpells } from './StepSpells';
import { StepReview } from './StepReview';

const WIZARD_STEPS = [
  { step: 1, title: 'Identidade & Narrativa' },
  { step: 2, title: 'Raça & Sub-raça' },
  { step: 3, title: 'Classe & Perícias' },
  { step: 4, title: 'Atributos' },
  { step: 5, title: 'Antecedente' },
  { step: 6, title: 'Equipamentos' },
  { step: 7, title: 'Magias' },
  { step: 8, title: 'Revisão Final' },
];

export const WizardContainer: React.FC = () => {
  const { wizardStep, setWizardStep, nextWizardStep, prevWizardStep } = useCharacterStore();

  const renderStepContent = () => {
    switch (wizardStep) {
      case 1: return <StepIdentity />;
      case 2: return <StepRace />;
      case 3: return <StepClass />;
      case 4: return <StepAbilityScores />;
      case 5: return <StepBackground />;
      case 6: return <StepEquipment />;
      case 7: return <StepSpells />;
      case 8: return <StepReview />;
      default: return <StepIdentity />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Step Indicator Header Bar */}
      <div className="bg-[#12131c]/90 p-4 rounded-xl border border-amber-500/30 backdrop-blur-md shadow-glass">
        <div className="flex items-center justify-between overflow-x-auto gap-2 pb-2">
          {WIZARD_STEPS.map((s) => {
            const isActive = wizardStep === s.step;
            const isCompleted = wizardStep > s.step;

            return (
              <button
                key={s.step}
                onClick={() => setWizardStep(s.step)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-cinzel whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold shadow-gold-glow'
                    : isCompleted
                    ? 'bg-slate-900 border-slate-700 text-amber-400/80'
                    : 'bg-slate-950/50 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                  isActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {s.step}
                </span>
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Progress Line */}
        <div className="w-full h-1.5 bg-slate-900 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 transition-all duration-300 shadow-gold-glow"
            style={{ width: `${(wizardStep / 8) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Main View */}
      <div className="min-h-[500px]">
        {renderStepContent()}
      </div>

      {/* Footer Navigation Bar */}
      <div className="bg-[#12131c]/90 p-4 rounded-xl border border-amber-500/30 flex items-center justify-between gap-4 shadow-glass">
        <Button
          variant="secondary"
          size="md"
          disabled={wizardStep === 1}
          icon={<ChevronLeft className="w-4 h-4" />}
          onClick={prevWizardStep}
        >
          Etapa Anterior
        </Button>

        <span className="text-xs font-mono text-amber-400/80 hidden sm:inline">
          Etapa {wizardStep} de 8
        </span>

        {wizardStep < 8 && (
          <Button
            variant="gold"
            size="md"
            icon={<ChevronRight className="w-4 h-4 text-slate-950" />}
            onClick={nextWizardStep}
          >
            Próxima Etapa
          </Button>
        )}
      </div>
    </div>
  );
};
