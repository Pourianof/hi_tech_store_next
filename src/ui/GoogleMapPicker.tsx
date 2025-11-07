"use client";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAddressPicking } from "./form/addressPicker/addressPickingContext";

let googleScriptLoaded = false;

export default function GoogleMapPicker({ className }: { className?: string }) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [hasScriptLoaded, setHasScriptLoaded] = useState(false);
  const { state, actions } = useAddressPicking();

  const isScriptLoaded = useCallback(
    function isScriptLoaded() {
      return googleScriptLoaded || hasScriptLoaded;
    },
    [hasScriptLoaded]
  );

  useEffect(() => {
    if (!isScriptLoaded() || !mapRef.current || !window.google) return;

    const gMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 35.6892, lng: 51.389 },
      zoom: 13,
    });

    setMap(gMap);
  }, [isScriptLoaded]);

  useEffect(() => {
    if (!isScriptLoaded()) return;
    if (!map) return;

    const listener = map.addListener(
      "click",
      async (e: google.maps.MapMouseEvent) => {
        if (!e.latLng) return;

        const lat = e.latLng.lat();
        const lng = e.latLng.lng();

        if (marker) marker.setMap(null);

        const newMarker = new window.google.maps.Marker({
          position: { lat, lng },
          map,
        });

        setMarker(newMarker);

        actions.addressIsLoading();
        // use nominatim api for geocoding -> convert cordination to full address
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=fa`
        );

        actions.addressLoaded();

        const data = await res.json();
        if (!data.display_name) {
          actions.addressErrored("Adress not found!");
        } else if (state.addressError) {
          actions.removeError();
        }

        actions.addressChanged({
          coordination: { lat, lng },
          address: data.display_name,
        });
      }
    );

    return () => google.maps.event.removeListener(listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, marker, hasScriptLoaded, map]);

  return (
    <div className={"space-y-4 relative " + (className ?? "")}>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_CONSOLE_API_KEY}&libraries=places`}
        onLoad={() => {
          setHasScriptLoaded(true);
          googleScriptLoaded = true;
        }}
      />
      <div ref={mapRef} className="w-full h-full rounded-xl shadow" />
    </div>
  );
}
