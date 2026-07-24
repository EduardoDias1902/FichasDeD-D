import React, { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import { Search, X, BookOpen, Shield, Wand2, User, Sparkles, AlertCircle } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { SPELLS_DATA } from '../../data/spells';
import { RACES_DATA } from '../../data/races';
import { CLASSES_DATA } from '../../data/classes';
import { BACKGROUNDS_DATA } from '../../data/backgrounds';
import { EQUIPMENT_DATA } from '../../data/equipment';
import { FEATS_DATA } from '../../data/feats';
import { CONDITIONS_DATA } from '../../data/conditions';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface SearchItem {
  id: string;
  type: 'Magia' | 'Raça' | 'Classe' | 'Antecedente' | 'Item' | 'Talento' | 'Condição';
  title: string;
  description: string;
  extraInfo?: string;
}

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, toggleSearchModal } = useUIStore();
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<SearchItem | null>(null);

  // Combine all 5e database items into unified search collection
  const allSearchableItems = useMemo<SearchItem[]>(() => {
    const list: SearchItem[] = [];

    SPELLS_DATA.forEach(spell => {
      list.push({
        id: `spell_${spell.id}`,
        type: 'Magia',
        title: spell.name,
        description: spell.description,
        extraInfo: `Nível ${spell.level} • ${spell.school} • ${spell.castingTime}`
      });
    });

    RACES_DATA.forEach(race => {
      list.push({
        id: `race_${race.id}`,
        type: 'Raça',
        title: race.name,
        description: race.lore,
        extraInfo: `Deslocamento: ${race.speed}ft • Tamanho: ${race.size}`
      });
    });

    CLASSES_DATA.forEach(cls => {
      list.push({
        id: `class_${cls.id}`,
        type: 'Classe',
        title: cls.name,
        description: cls.description,
        extraInfo: `Dado de Vida: d${cls.hitDie} • Função: ${cls.role}`
      });
    });

    BACKGROUNDS_DATA.forEach(bg => {
      list.push({
        id: `bg_${bg.id}`,
        type: 'Antecedente',
        title: bg.name,
        description: bg.lore,
        extraInfo: `Perícias: ${bg.skillProficiencies.join(', ')}`
      });
    });

    EQUIPMENT_DATA.forEach(item => {
      list.push({
        id: `item_${item.id}`,
        type: 'Item',
        title: item.name,
        description: item.description,
        extraInfo: `${item.costInGp} po • ${item.weight} lbs • ${item.category}`
      });
    });

    FEATS_DATA.forEach(feat => {
      list.push({
        id: `feat_${feat.id}`,
        type: 'Talento',
        title: feat.name,
        description: feat.description,
        extraInfo: feat.prerequisite ? `Pré-requisito: ${feat.prerequisite}` : undefined
      });
    });

    CONDITIONS_DATA.forEach(cond => {
      list.push({
        id: `cond_${cond.id}`,
        type: 'Condição',
        title: cond.name,
        description: cond.description,
        extraInfo: 'Condição de Regra 5e'
      });
    });

    return list;
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(allSearchableItems, {
      keys: ['title', 'description', 'type', 'extraInfo'],
      threshold: 0.3,
    });
  }, [allSearchableItems]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return allSearchableItems.slice(0, 10);
    return fuse.search(query).map(res => res.item).slice(0, 15);
  }, [query, fuse, allSearchableItems]);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearchModal();
      }
      if (e.key === 'Escape' && isSearchOpen) {
        toggleSearchModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, toggleSearchModal]);

  if (!isSearchOpen) return null;

  const getTypeIcon = (type: SearchItem['type']) => {
    switch (type) {
      case 'Magia': return <Wand2 className="w-4 h-4 text-purple-400" />;
      case 'Raça': return <User className="w-4 h-4 text-amber-400" />;
      case 'Classe': return <Shield className="w-4 h-4 text-red-400" />;
      case 'Antecedente': return <BookOpen className="w-4 h-4 text-blue-400" />;
      case 'Item': return <Sparkles className="w-4 h-4 text-emerald-400" />;
      case 'Talento': return <Sparkles className="w-4 h-4 text-amber-300" />;
      case 'Condição': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-[#10111a] border border-amber-500/40 rounded-xl shadow-gold-glow-lg overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header Search Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-[#161726]/90">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar magias, raças, classes, itens, condições (Ctrl+K)..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none font-sans text-base"
            autoFocus
          />
          <button
            onClick={() => toggleSearchModal(false)}
            className="text-slate-400 hover:text-amber-400 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Section: Split view */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[350px]">
          {/* Results List */}
          <div className="w-full md:w-1/2 overflow-y-auto p-2 border-r border-slate-800 space-y-1">
            {searchResults.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`w-full text-left p-3 rounded-lg transition-all flex items-start gap-3 border ${
                  selectedItem?.id === item.id
                    ? 'bg-amber-500/10 border-amber-500/50 shadow-gold-glow'
                    : 'bg-slate-900/40 border-transparent hover:bg-slate-800/60'
                }`}
              >
                <div className="p-2 rounded-md bg-slate-800/80 shrink-0 mt-0.5">
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-cinzel font-bold text-sm text-slate-100 truncate">{item.title}</h4>
                    <Badge variant="gold" className="text-[10px] shrink-0">{item.type}</Badge>
                  </div>
                  {item.extraInfo && (
                    <p className="text-xs text-amber-400/80 font-mono mt-0.5 truncate">{item.extraInfo}</p>
                  )}
                  <p className="text-xs text-slate-400 line-clamp-1 mt-1 font-sans">{item.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Item Detail View */}
          <div className="w-full md:w-1/2 p-5 overflow-y-auto bg-[#0d0e17]/80 flex flex-col">
            {selectedItem ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                  <div>
                    <h3 className="text-xl font-cinzel font-bold text-amber-300">{selectedItem.title}</h3>
                    <Badge variant="gold" className="mt-1">{selectedItem.type}</Badge>
                  </div>
                </div>
                {selectedItem.extraInfo && (
                  <p className="text-xs font-mono text-amber-400 bg-amber-950/40 p-2 rounded border border-amber-500/30">
                    {selectedItem.extraInfo}
                  </p>
                )}
                <div className="text-sm text-slate-300 leading-relaxed font-sans space-y-2">
                  <p>{selectedItem.description}</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 p-6">
                <Search className="w-12 h-12 mb-3 text-slate-700 animate-pulse" />
                <p className="font-cinzel text-sm">Selecione um item da busca para visualizar os detalhes completos das regras de D&D 5e.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
