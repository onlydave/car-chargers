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

import type { Locations, MapLinks } from "./api/fetchEcars";

import { Map, Set } from "immutable";

export type StatusListProps = {
  removeLocation: string => void,
  setLocationNickname: (string, string) => void,
  locationNicknames: Map<string, string>,
  locationDistances: Map<string, Map<string, Map<string, string | number>>>,
  selectedLocations: Set<string>,
  locations: Locations,
  mapLinks: MapLinks
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
    const nickname = event.currentTarget.dataset.nickname;
    const newNickname = window.prompt(name, nickname);
    if (newNickname || newNickname === "") {
      this.props.setLocationNickname(name, newNickname);
    }
  };

  render() {
    const {
      locations,
      selectedLocations,
      locationNicknames,
      mapLinks,
      locationDistances
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
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ fontSize: 35, lineHeight: 0.8 }}>
                      {nickname}
                    </div>
                    <div
                      className="ellipsis"
                      style={{
                        fontSize: 10,
                        color: "gray",
                        marginTop: 5,
                        marginLeft: 2
                      }}
                    >
                      {name}
                    </div>
                  </div>
                ) : (
                  name
                )}
                <div
                  style={{
                    marginLeft: 5,
                    padding: "5px 0",
                    border: "1px solid teal",
                    textAlign: "center",
                    width: 60
                  }}
                >
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    size="2x"
                    onClick={this.openMap}
                    data-maplink={mapLinks[name] && mapLinks[name].url}
                    color="teal"
                    style={{ width: 60 }}
                  />
                  <span
                    style={{
                      fontSize: 9,
                      whiteSpace: "nowrap",
                      overflow: "hidden"
                    }}
                  >
                    {locationDistances.getIn([
                      name,
                      "duration_in_traffic",
                      "text"
                    ]) || "maps"}
                  </span>
                </div>
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
                  data-nickname={nickname}
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
