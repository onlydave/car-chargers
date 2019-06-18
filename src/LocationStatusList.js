// @flow

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faPlug,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";

import type { Locations } from "./api/fetchEcars";

import { Set } from "immutable";

export type StatusListProps = {
  removeLocation: string => null,
  selectedLocations: Set<string>,
  locations: Locations,
  mapLinks: {
    [name: string]: string
  }
};

class LocationStatusList extends React.Component<StatusListProps> {
  openMap = (event: SyntheticInputEvent<HTMLElement>) => {
    const url = event.currentTarget.dataset.maplink;
    if (url) {
      window.open(url, "_blank");
    }
  };

  removeLocation = (event: SyntheticInputEvent<HTMLButtonElement>) => {
    const {
      target: { name }
    } = event;
    this.props.removeLocation(name);
  };

  render() {
    const { locations, selectedLocations, mapLinks } = this.props;

    return (
      <div style={{ paddingTop: 10, paddingBottom: 10 }}>
        {selectedLocations.map(name => {
          const location = locations.get(name);
          if (!location) {
            return null;
          }

          return (
            <div key={name} style={{ padding: 10 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between"
                }}
              >
                {name}
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  size="2x"
                  style={{ paddingRight: 10 }}
                  onClick={this.openMap}
                  data-maplink={mapLinks[name]}
                  color="TEAL"
                />
              </div>
              <div style={{ padding: 5 }}>
                {location.entrySeq().map(([plugName, status]) => {
                  const available = /Available/i.test(status);
                  const iconColor = available ? "lime" : "gray";
                  const color = available ? "black" : "gray";
                  const icon = /DC/.test(plugName) ? faBolt : faPlug;
                  return (
                    <div key={plugName} style={{ color, padding: 5 }}>
                      <FontAwesomeIcon
                        icon={icon}
                        color={iconColor}
                        style={{ paddingRight: 5 }}
                      />
                      {plugName}: {status}
                    </div>
                  );
                })}
              </div>
              <button onClick={this.removeLocation} name={name}>
                remove location
              </button>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

export default LocationStatusList;
