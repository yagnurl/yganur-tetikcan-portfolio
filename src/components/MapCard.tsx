'use client';

import React, { useEffect, useRef } from 'react';
// @ts-ignore
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './PuzzlePiece.module.css';

interface MapCardProps {
  accessToken: string;
}

export default function MapCard({ accessToken }: MapCardProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // İzmir Saat Kulesi (Clock Tower) - Wikipedia coordinates
  const IZMIR_LNG = 27.1286678;
  const IZMIR_LAT = 38.4188690;

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = accessToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [IZMIR_LNG, IZMIR_LAT],
      zoom: 18,
      minZoom: 7,  // Limit zoom out (allows zooming out to see more of Turkey)
      maxZoom: 30,  // Limit zoom in
      pitch: 45,
      bearing: -20,
      interactive: false, // Disable all interactions except scroll zoom
      attributionControl: false
    });

    // Enable only scroll zoom after map loads
    map.current.on('load', () => {
      if (!map.current) return;
      
      // Enable scroll zoom
      map.current.scrollZoom.enable();
      
      // Add 3D building layer
      const layers = map.current.getStyle().layers;
      const labelLayerId = layers?.find(
        (layer: any) => layer.type === 'symbol' && layer.layout?.['text-field']
      )?.id;

      map.current.addLayer(
        {
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.8
          }
        },
        labelLayerId
      );
    });

    // Add custom marker for user location
    const markerEl = document.createElement('div');
    markerEl.className = styles.mapMarker;
    markerEl.innerHTML = `
      <div class="${styles.markerPulse}"></div>
      <div class="${styles.markerDot}"></div>
    `;

    new mapboxgl.Marker({ element: markerEl })
      .setLngLat([IZMIR_LNG, IZMIR_LAT])
      .addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [accessToken]);

  return (
    <div className={styles.mapContainer}>
      <div ref={mapContainer} className={styles.mapCanvas} />
      
      {/* Location Badge */}
      <div className={styles.locationBadge}>
        Based in İzmir, Türkiye
      </div>
    </div>
  );
}
