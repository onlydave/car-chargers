// @flow
import React from "react";
import "./App.css";

import type { Locations } from "./api/fetchEcars";

import SelectList from "./selectList";
import { Map, Set, fromJS, isKeyed } from "immutable";
import fetchEcars from "./api/fetchEcars";
import LocationStatusList from "./LocationStatusList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faTimes } from "@fortawesome/free-solid-svg-icons";

const getSavedImmutable = (key = "selectedLocations") => {
  const localLocations = localStorage.getItem(key);
  if (!localLocations) return false;
  const response = fromJS(JSON.parse(localLocations), function(key, value) {
    return isKeyed(value) ? value.toMap() : value.toSet();
  });
  return (response: any);
};

type AppState = {
  selectedLocations: Set<string>,
  locations: Locations,
  search: string,
  mapLinks: {
    [name: string]: string
  },
  fetchError: boolean
};

class App extends React.Component<{}, AppState> {
  state = {
    selectedLocations: getSavedImmutable("selectedLocations") || Set(),
    locations: getSavedImmutable("locations") || Map(),
    search: "",
    mapLinks: {},
    fetchError: false
  };

  componentDidMount() {
    this.getLocations();
  }

  getLocations = () => {
    fetchEcars()
      .then(({ locations, mapLinks }) => {
        localStorage.setItem("locations", JSON.stringify(locations.toJS()));
        this.setState({ locations, mapLinks, fetchError: false });
      })
      .catch(() => {
        this.setState({
          fetchError: true
        });
      });
  };

  addLocation = (location: string) => {
    const selectedLocations = this.state.selectedLocations.add(location);
    return this.setSelected(selectedLocations);
  };

  removeLocation = (location: string) => {
    const selectedLocations = this.state.selectedLocations.remove(location);
    return this.setSelected(selectedLocations);
  };

  clearSelected = () => {
    return this.setSelected(Set());
  };

  setSelected = (
    selectedLocations: $PropertyType<AppState, "selectedLocations">
  ) => {
    this.setState({
      selectedLocations
    });
    localStorage.setItem(
      "selectedLocations",
      JSON.stringify(selectedLocations.toJS())
    );
    return null;
  };

  setSearch = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      search: event.target.value
    });
  };

  render() {
    const {
      locations,
      selectedLocations,
      search,
      mapLinks,
      fetchError
    } = this.state;

    return (
      <div className="App">
        <div style={{ display: "flex" }}>
          <input
            onChange={this.setSearch}
            value={search}
            placeholder="Search Locations..."
            style={{
              width: 10,
              flexGrow: 1,
              padding: 10,
              fontSize: 30,
              border: "1px solid black",
              borderRight: "none"
            }}
          />
          <button
            onClick={this.setSearch}
            value=""
            style={{
              paddingRight: 20,
              background: "none",
              border: "1px solid black",
              borderLeft: "none"
            }}
          >
            <FontAwesomeIcon icon={faTimes} size="3x" />
          </button>
          <button onClick={this.getLocations} style={{ width: 70 }}>
            <FontAwesomeIcon
              icon={faSync}
              size="3x"
              color={fetchError ? "red" : "lime"}
            />
          </button>
        </div>
        {search || !selectedLocations.size ? (
          <SelectList
            search={search}
            locations={locations}
            selectedLocations={selectedLocations}
            removeLocation={this.removeLocation}
            addLocation={this.addLocation}
          />
        ) : (
          <LocationStatusList
            locations={locations}
            selectedLocations={selectedLocations}
            removeLocation={this.removeLocation}
            mapLinks={mapLinks}
          />
        )}
      </div>
    );
  }
}

export default App;
