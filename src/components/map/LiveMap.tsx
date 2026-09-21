import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  Navigation, 
  Layers, 
  Plus, 
  Minus, 
  Cross, 
  Shield, 
  Flame, 
  Pill, 
  Share2, 
  Hospital, 
  Info,
  Maximize2
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { Facility, FacilityType } from '../../types';
import { soundManager } from '../../utils/audio';
import { FacilityDetailModal } from './FacilityDetailModal';

export const LiveMap: React.FC<{ isWidget?: boolean }> = ({ isWidget = false }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const { 
    facilities, 
    incidents, 
    selectedFacility, 
    setSelectedFacility, 
    addNotification, 
    activeIncident, 
    setActiveTab 
  } = useEmergency();

  const [activeFilter, setActiveFilter] = useState<'all' | FacilityType | 'incidents'>('all');
  const [showDrawer, setShowDrawer] = useState(false);

  const userCoords = React.useMemo<[number, number]>(() => [19.0760, 72.8777], []);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Create Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: userCoords,
      zoom: isWidget ? 13 : 14,
      zoomControl: false,
      attributionControl: false,
    });

    // Add CartoDB Dark Matter tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [isWidget]);

  // Update Markers when facilities, incidents, or filter changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    const layer = markersLayerRef.current;
    layer.clearLayers();

    // 1. Add User Location Pulsing Beacon Marker
    const userBeaconIcon = L.divIcon({
      className: 'user-marker-icon',
      html: `
        <div class="relative flex items-center justify-center w-8 h-8">
          <div class="absolute w-8 h-8 rounded-full bg-cyan/30 animate-ping"></div>
          <div class="absolute w-6 h-6 rounded-full bg-cyan/50 animate-pulse"></div>
          <div class="w-3.5 h-3.5 rounded-full bg-cyan border-2 border-white shadow-glow-cyan"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    L.marker(userCoords, { icon: userBeaconIcon })
      .bindPopup(`
        <div style="font-family: 'Inter', sans-serif;">
          <div style="color: #00F0FF; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">YOUR LOCATION</div>
          <div style="font-weight: 600; font-size: 13px; color: #fff; margin-top: 2px;">Mumbai Metro Sector 4</div>
          <div style="font-size: 11px; color: #94A3B8; margin-top: 2px;">Lock Accuracy: ±3m</div>
        </div>
      `)
      .addTo(layer);

    // 2. Add Facility Markers
    facilities.forEach(facility => {
      if (activeFilter !== 'all' && activeFilter !== 'incidents' && activeFilter !== facility.type) {
        return;
      }

      let iconColor = '#00F0FF';
      let symbol = '🏥';
      if (facility.type === 'hospital') {
        iconColor = '#FF3B30';
        symbol = '✚';
      } else if (facility.type === 'police') {
        iconColor = '#00F0FF';
        symbol = '🛡';
      } else if (facility.type === 'fire_station') {
        iconColor = '#F59E0B';
        symbol = '🔥';
      } else if (facility.type === 'pharmacy') {
        iconColor = '#00E599';
        symbol = '💊';
      } else if (facility.type === 'safe_zone') {
        iconColor = '#A78BFA';
        symbol = '🛖';
      }

      const facilityIcon = L.divIcon({
        className: 'facility-marker',
        html: `
          <div style="
            width: 32px;
            height: 32px;
            background: #0B101B;
            border: 2px solid ${iconColor};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 14px ${iconColor}66;
            color: #fff;
            font-size: 13px;
            cursor: pointer;
          ">
            ${symbol}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([facility.lat, facility.lng], { icon: facilityIcon });
      marker.on('click', () => {
        soundManager.playClick();
        setSelectedFacility(facility);
      });
      marker.bindPopup(`
        <div style="font-family: 'Inter', sans-serif;">
          <div style="color: ${iconColor}; font-weight: 700; font-size: 10px; text-transform: uppercase;">${facility.type.replace('_', ' ')}</div>
          <div style="font-weight: 700; font-size: 13px; color: #fff; margin-top: 2px;">${facility.name}</div>
          <div style="font-size: 11px; color: #94A3B8; margin-top: 3px;">${facility.distanceKm} km away • ${facility.etaMinutes} mins ETA</div>
        </div>
      `);
      marker.addTo(layer);
    });

    // 3. Add Incident Markers
    if (activeFilter === 'all' || activeFilter === 'incidents') {
      incidents.forEach(inc => {
        let pinColor = '#FF3B30';
        if (inc.status === 'resolved') pinColor = '#00E599';
        else if (inc.priority === 'high') pinColor = '#F59E0B';
        else if (inc.priority === 'medium') pinColor = '#EAB308';

        const incidentIcon = L.divIcon({
          className: 'incident-marker',
          html: `
            <div style="
              width: 30px;
              height: 30px;
              background: ${pinColor}22;
              border: 2px solid ${pinColor};
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${pinColor};
              font-weight: 800;
              font-size: 11px;
              box-shadow: 0 0 12px ${pinColor}88;
            ">
              !
            </div>
          `,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        const incMarker = L.marker([inc.location.lat, inc.location.lng], { icon: incidentIcon });
        incMarker.bindPopup(`
          <div style="font-family: 'Inter', sans-serif;">
            <div style="color: ${pinColor}; font-weight: 800; font-size: 10px; text-transform: uppercase;">INCIDENT #${inc.id}</div>
            <div style="font-weight: 700; font-size: 12px; color: #fff; margin-top: 2px;">${inc.title}</div>
            <div style="font-size: 10px; color: #94A3B8; margin-top: 2px;">Status: ${inc.status.toUpperCase()}</div>
          </div>
        `);
        incMarker.addTo(layer);
      });
    }
  }, [facilities, incidents, activeFilter, userCoords, setSelectedFacility]);

  // Controls
  const handleLocateMe = () => {
    soundManager.playSonar();
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(userCoords, 15, { duration: 1.2 });
    }
  };

  const handleZoomIn = () => {
    soundManager.playClick();
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    soundManager.playClick();
    mapInstanceRef.current?.zoomOut();
  };

  const handleShareLocation = () => {
    soundManager.playSonar();
    addNotification(
      'Live Location Shared',
      'Encrypted telemetry lock broadcasted to trusted contacts & local responders.',
      'success',
      'map'
    );
  };

  return (
    <div className={`relative w-full ${isWidget ? 'h-72 rounded-2xl overflow-hidden' : 'h-[calc(100vh-4rem)]'} bg-[#06080C]`}>
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Header Overlay for Live Map view */}
      {!isWidget && (
        <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          <div className="flex items-center gap-2 bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl shadow-2xl pointer-events-auto">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan animate-ping" />
            <div>
              <span className="text-xs font-display font-bold uppercase tracking-wider text-white">
                Tactical Operations Map
              </span>
              <span className="text-[10px] font-mono text-slate-400 block">
                9 SAT LOCK • REAL-TIME MESH
              </span>
            </div>
          </div>

          {/* Layer Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl shadow-2xl overflow-x-auto pointer-events-auto">
            {[
              { id: 'all', label: 'All Layers' },
              { id: 'hospital', label: 'Hospitals' },
              { id: 'police', label: 'Police' },
              { id: 'fire_station', label: 'Fire' },
              { id: 'pharmacy', label: 'Pharmacy' },
              { id: 'incidents', label: 'Incidents' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveFilter(tab.id as any);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-cyan text-black font-bold shadow-glow-cyan-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Control Stack (Right Side) */}
      <div className="absolute right-4 bottom-24 sm:bottom-6 z-10 flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={handleLocateMe}
          className="p-3 rounded-2xl bg-[#0B101B]/90 backdrop-blur-xl border border-cyan/40 text-cyan hover:bg-surface-50 shadow-2xl transition-all"
          title="Locate Me (Center Telemetry)"
        >
          <Navigation className="w-5 h-5" />
        </button>

        <button
          onClick={handleShareLocation}
          className="p-3 rounded-2xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 text-slate-200 hover:text-cyan hover:bg-surface-50 shadow-2xl transition-all"
          title="Share My Location"
        >
          <Share2 className="w-5 h-5" />
        </button>

        <div className="flex flex-col bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <button
            onClick={handleZoomIn}
            className="p-3 text-slate-300 hover:text-white hover:bg-white/5 border-b border-white/10"
            title="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-3 text-slate-300 hover:text-white hover:bg-white/5"
            title="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {isWidget && (
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('map');
            }}
            className="p-3 rounded-2xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 text-slate-200 hover:text-cyan hover:bg-surface-50 shadow-2xl transition-all"
            title="Expand Full Tactical Map"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Bottom Floating Facilities Carousel / Drawer for Full Map */}
      {!isWidget && (
        <div className="absolute bottom-6 left-4 right-20 sm:right-24 z-10 pointer-events-none hidden md:block">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 pointer-events-auto">
            {facilities.map(fac => (
              <div
                key={fac.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedFacility(fac);
                  mapInstanceRef.current?.flyTo([fac.lat, fac.lng], 15);
                }}
                className="shrink-0 w-64 p-3 rounded-2xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 hover:border-cyan/40 cursor-pointer shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="text-cyan uppercase font-bold">{fac.type.replace('_', ' ')}</span>
                  <span className="text-emerald-400 font-semibold">{fac.etaMinutes}m ETA</span>
                </div>
                <div className="text-xs font-display font-bold text-white truncate">
                  {fac.name}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {fac.distanceKm} km away • {fac.emergencyCapacity.split('•')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Facility Detail Modal */}
      <FacilityDetailModal
        facility={selectedFacility}
        onClose={() => setSelectedFacility(null)}
      />
    </div>
  );
};
