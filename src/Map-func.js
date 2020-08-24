import "./styles.css";
import React, { useState, useEffect, useRef } from "react";
// import { Button } from "antd";
// let mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoicGFkbWFuc2gyMCIsImEiOiJja2U2cGNoN2cwNDduMnlybjlhNDNudm44In0.TEKnrC1ehJj6oGB3i9Opeg";

const MapFunc = () => {
  // Code from the next few steps will go here
  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(2);

  const mapRef = useRef();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    map.addControl(new mapboxgl.NavigationControl());
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    var geojson = {
      type: "FeatureCollection",
      features: [
        {
          geometry: {
            type: "Point",
            coordinates: [77.498709, 28.752535],
          },
        },
        {
          geometry: {
            type: "Point",
            coordinates: [40.498709, 28.752535],
          },
        },
        {
          geometry: {
            type: "Point",
            coordinates: [20.498709, 28.752535],
          },
        },
      ],
    };

    geojson.features.forEach(function (marker) {
      new mapboxgl.Marker({ color: "red", scale: 1.5 })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
    });

    map.on("load", function () {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [77.443817, 28.699455],
              [77.444438, 28.69986],
              [77.444655, 28.699841],
              [77.445588, 28.699549],
              [77.445588, 28.699464],
              [77.444816, 28.698683],
              [77.444924, 28.698514],
              [77.447585, 28.701337],
              [77.450085, 28.703925],
              [77.453432, 28.707426],
              [77.457219, 28.711312],
              [77.473804, 28.729332],
              [77.477677, 28.733735],
              [77.4836, 28.742633],
              [77.484662, 28.744039],
              [77.485995, 28.745311],
              [77.490796, 28.749116],
              [77.493146, 28.751251],
              [77.495829, 28.754037],
              [77.495935, 28.754057],
              [77.498709, 28.752535],
            ],
          },
        },
      });
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#0055ff",
          "line-width": 8,
          "line-opacity": 0.8,
        },
      });
    });
  }, []);

  return (
    <div>
      <div
        ref={mapRef}
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          left: "0",
          bottom: "0",
          width: "50%",
          height: "50%",
        }}
      />
    </div>
  );
};

export default MapFunc;
