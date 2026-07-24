import React, { useState } from 'react';
import { Package, Plus, Trash2, Shield, DollarSign } from 'lucide-react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { calculateCombatStats } from '../../services/rulesEngine';

export const TabInventory: React.FC = () => {
  const { activeCharacter, toggleEquipItem, removeItemFromInventory, updateCurrency, addItemToInventory } = useCharacterStore();
  const [newItemName, setNewItemName] = useState('');

  if (!activeCharacter) return null;

  const combatStats = calculateCombatStats(activeCharacter);
  const totalWeight = activeCharacter.inventory.reduce((acc, item) => acc + (item.weight * (item.quantity || 1)), 0);

  const handleAddCustomItem = () => {
    if (!newItemName.trim()) return;
    addItemToInventory({
      id: `custom_${Date.now()}`,
      name: newItemName.trim(),
      category: 'Diversos',
      costInGp: 1,
      weight: 1,
      description: 'Item personalizado adicionado ao inventário.',
      equipped: false,
      quantity: 1
    });
    setNewItemName('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Info: Weight & Gold */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="gold" className="p-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-slate-400 block">Capacidade Carga:</span>
            <span className="text-lg font-bold text-amber-300 font-mono">{totalWeight.toFixed(1)} / {combatStats.carryingCapacity} lbs</span>
          </div>
          <Badge variant="gold">Peso Total</Badge>
        </Card>

        <Card variant="gold" className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-amber-400" />
            <div className="flex gap-3 text-sm font-mono font-bold">
              <span><strong className="text-amber-300">{activeCharacter.currency.gp}</strong> PO</span>
              <span><strong className="text-slate-300">{activeCharacter.currency.sp}</strong> PS</span>
              <span><strong className="text-amber-600">{activeCharacter.currency.cp}</strong> PC</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Add Custom Item Row */}
      <Card className="p-4 flex items-center gap-3">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Adicionar item personalizado (Ex: Anel Amaldiçoado de Prata)..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
        />
        <Button variant="gold" size="sm" icon={<Plus className="w-4 h-4 text-slate-950" />} onClick={handleAddCustomItem}>
          Adicionar
        </Button>
      </Card>

      {/* Categorized Inventory List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeCharacter.inventory.map((item) => (
          <Card key={item.id} className="p-4 flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-cinzel font-bold text-sm text-slate-100 truncate">{item.name}</h4>
                {item.equipped && <Badge variant="gold" className="text-[9px]">Equipado</Badge>}
              </div>
              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{item.description}</p>
              <div className="flex gap-2 text-[10px] font-mono text-amber-400/80 mt-1">
                <span>{item.weight} lbs</span>
                <span>•</span>
                <span>{item.category}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {(item.category === 'Armaduras' || item.category === 'Armas') && (
                <button
                  onClick={() => toggleEquipItem(item.id)}
                  className={`px-2 py-1 rounded text-[10px] font-mono border ${
                    item.equipped ? 'bg-amber-500/20 border-amber-400 text-amber-200' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {item.equipped ? 'Desequipar' : 'Equipar'}
                </button>
              )}
              <button
                onClick={() => removeItemFromInventory(item.id)}
                className="p-1 rounded text-slate-500 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
