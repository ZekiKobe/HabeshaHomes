import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Region { id: string; name: string; }
interface Zone   { id: string; name: string; }
interface Woreda { id: string; name: string; }

interface LocationSelectorProps {
  countryId?: string;
  onRegionChange?:  (id: string, name: string) => void;
  onZoneChange?:    (id: string, name: string) => void;
  onWoredaChange?:  (id: string, name: string) => void;
  defaultRegionId?: string;
  defaultZoneId?:   string;
  defaultWoredaId?: string;
}

const ETHIOPIA_ID = '00000000-0000-0000-0000-000000000001';

export default function LocationSelector({
  onRegionChange,
  onZoneChange,
  onWoredaChange,
  defaultRegionId,
  defaultZoneId,
  defaultWoredaId,
}: LocationSelectorProps) {
  const [regions,  setRegions]  = useState<Region[]>([]);
  const [zones,    setZones]    = useState<Zone[]>([]);
  const [woredas,  setWoredas]  = useState<Woreda[]>([]);
  const [regionId, setRegionId] = useState(defaultRegionId ?? '');
  const [zoneId,   setZoneId]   = useState(defaultZoneId ?? '');
  const [woreda,   setWoreda]   = useState(defaultWoredaId ?? '');

  // Load all regions once
  useEffect(() => {
    supabase
      .from('regions' as never)
      .select('id, name')
      .eq('country_id', ETHIOPIA_ID)
      .order('name')
      .then(({ data }) => { if (data) setRegions(data as Region[]); });
  }, []);

  // Load zones when region changes
  useEffect(() => {
    if (!regionId) { setZones([]); setZoneId(''); return; }
    supabase
      .from('zones' as never)
      .select('id, name')
      .eq('region_id', regionId)
      .order('name')
      .then(({ data }) => { if (data) setZones(data as Zone[]); setZoneId(''); setWoredas([]); setWoreda(''); });
  }, [regionId]);

  // Load woredas when zone changes
  useEffect(() => {
    if (!zoneId) { setWoredas([]); setWoreda(''); return; }
    supabase
      .from('woredas' as never)
      .select('id, name')
      .eq('zone_id', zoneId)
      .order('name')
      .then(({ data }) => { if (data) setWoredas(data as Woreda[]); setWoreda(''); });
  }, [zoneId]);

  const handleRegion = (id: string) => {
    setRegionId(id);
    const name = regions.find(r => r.id === id)?.name ?? '';
    onRegionChange?.(id, name);
  };

  const handleZone = (id: string) => {
    setZoneId(id);
    const name = zones.find(z => z.id === id)?.name ?? '';
    onZoneChange?.(id, name);
  };

  const handleWoreda = (id: string) => {
    setWoreda(id);
    const name = woredas.find(w => w.id === id)?.name ?? '';
    onWoredaChange?.(id, name);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Region */}
      <div>
        <Label className="text-sm font-medium mb-1.5 block">Region</Label>
        <Select value={regionId} onValueChange={handleRegion}>
          <SelectTrigger>
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map(r => (
              <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Zone */}
      <div>
        <Label className="text-sm font-medium mb-1.5 block">Zone / Sub-city</Label>
        <Select value={zoneId} onValueChange={handleZone} disabled={zones.length === 0}>
          <SelectTrigger>
            <SelectValue placeholder={zones.length === 0 ? 'Select region first' : 'Select zone'} />
          </SelectTrigger>
          <SelectContent>
            {zones.map(z => (
              <SelectItem key={z.id} value={z.id}>{z.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Woreda */}
      <div>
        <Label className="text-sm font-medium mb-1.5 block">Woreda</Label>
        <Select value={woreda} onValueChange={handleWoreda} disabled={woredas.length === 0}>
          <SelectTrigger>
            <SelectValue placeholder={woredas.length === 0 ? 'Select zone first' : 'Select woreda'} />
          </SelectTrigger>
          <SelectContent>
            {woredas.map(w => (
              <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
