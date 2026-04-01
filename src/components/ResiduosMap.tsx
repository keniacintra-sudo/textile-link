import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const wasteMarkers = [
  { id: 1, name: 'Retalhos de Algodão', weight: '8kg', price: 'R$45', lat: -20.1350, lng: -44.8800 },
  { id: 2, name: 'Sobras de Viscose', weight: '3kg', price: 'R$28', lat: -20.1420, lng: -44.8900 },
  { id: 3, name: 'Malha Mista', weight: '12kg', price: 'R$60', lat: -20.1330, lng: -44.8950 },
  { id: 4, name: 'Jeans Retalho', weight: '5kg', price: 'R$35', lat: -20.1450, lng: -44.8780 },
];

const ResiduosMap = () => {
  return (
    <div className="rounded-xl overflow-hidden border border-border shadow-sm" style={{ height: 380 }}>
      <MapContainer
        center={[-20.1389, -44.8839]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {wasteMarkers.map(m => (
          <Marker key={m.id} position={[m.lat, m.lng]} icon={greenIcon}>
            <Popup>
              <div className="text-center min-w-[140px]">
                <p className="font-semibold text-sm mb-0.5">{m.name}</p>
                <p className="text-xs text-gray-500">{m.weight} · {m.price}</p>
                <button
                  className="mt-2 w-full text-xs font-medium text-white px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
                  style={{ backgroundColor: '#1A7A4A' }}
                  onClick={() => alert(`Solicitação enviada: ${m.name}`)}
                >
                  Solicitar
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ResiduosMap;
