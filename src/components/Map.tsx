import 'leaflet/dist/leaflet.css';

import { Icon } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

interface Map extends React.HTMLAttributes<HTMLDivElement> {
  lat: number | null;
  lng: number | null;
  name: string;
}

const Map: React.FC<Map> = (props) => {
  let { lat, lng, name } = props;
  return (
    <>
      {lat && lng && name && (
        <MapContainer
          center={[lat, lng]}
          zoom={15}
          zoomSnap={1}
          maxZoom={18}
          minZoom={11}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png" />
          <Marker
            icon={
              new Icon({
                iconUrl: '/byte-no-bg.svg',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
            position={[lat, lng]}
          >
            <Popup>{name}</Popup>
          </Marker>
        </MapContainer>
      )}
      {(!lat || !lng || !name) && 'NO MAP'}
    </>
  );
};

export default Map;
