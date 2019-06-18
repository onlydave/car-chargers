// @flow

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faPlug,
  faMapMarkerAlt,
  faTrash,
  faPen
} from "@fortawesome/free-solid-svg-icons";

import type { Locations } from "./api/fetchEcars";

import { Map, Set } from "immutable";

export type StatusListProps = {
  removeLocation: string => void,
  setLocationNickname: (string, string) => void,
  locationNicknames: Map<string, string>,
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

  changeLocationName = (event: SyntheticInputEvent<HTMLButtonElement>) => {
    const {
      target: { name }
    } = event;
    this.props.setLocationNickname(name, window.prompt(name, ""));
  };

  render() {
    const {
      locations,
      selectedLocations,
      locationNicknames,
      mapLinks
    } = this.props;

    return (
      <div style={{ paddingTop: 10, paddingBottom: 10 }}>
        {selectedLocations.map(name => {
          const location = locations.get(name);
          if (!location) {
            return null;
          }
          const nickname = locationNicknames.get(name);
          return (
            <div key={name} style={{ padding: 10 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between"
                }}
              >
                {!!nickname ? (
                  <div>
                    {nickname}
                    <div style={{ fontSize: 10, color: "gray" }}>{name}</div>
                  </div>
                ) : (
                  name
                )}
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  size="2x"
                  style={{
                    marginLeft: 5,
                    padding: "5px 10px",
                    border: "1px solid teal"
                  }}
                  onClick={this.openMap}
                  data-maplink={mapLinks[name]}
                  color="teal"
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  onClick={this.removeLocation}
                  name={name}
                  style={{
                    padding: 10,
                    border: "1px solid gray",
                    background: "white"
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} color="gray" size="1x" />
                </button>
                <button
                  onClick={this.changeLocationName}
                  name={name}
                  style={{
                    marginLeft: 10,
                    padding: 10,
                    border: "1px solid teal",
                    color: "teal",
                    flexGrow: 1,
                    background: "white"
                  }}
                >
                  Edit name
                  <FontAwesomeIcon
                    icon={faPen}
                    color="teal"
                    style={{ marginLeft: 10 }}
                  />
                </button>
              </div>
              <hr style={{ marginTop: 20 }} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default LocationStatusList;
