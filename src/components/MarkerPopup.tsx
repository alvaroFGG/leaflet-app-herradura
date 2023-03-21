import { IWaypoint } from "@/backend/models/interfaces";
import React from "react";
import { Popup } from "react-leaflet";

type Props = {
  waypoint: IWaypoint;
};

export const MarkerPopup: React.FC<Props> = ({ waypoint }) => {
  return (
    <Popup>
      <div>
        <h3>{waypoint.name}</h3>
        <p>{waypoint.description}</p>
      </div>
    </Popup>
  );
};
