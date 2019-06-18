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
import onWindowFocus from "./utils/onWindowFocus";
import AppHeader from "./AppHeader";

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
  locationNicknames: Map<string, string>,
  search: string,
  mapLinks: {
    [name: string]: string
  },
  fetchError: boolean,
  loading: boolean
};

class App extends React.Component<{}, AppState> {
  state = {
    selectedLocations: getSavedImmutable("selectedLocations") || Set(),
    locations: getSavedImmutable("locations") || Map(),
    locationNicknames: getSavedImmutable("locationsNicknames") || Map(),
    search: "",
    mapLinks: {},
    fetchError: false,
    loading: false
  };

  componentDidMount() {
    this.getLocations();
    onWindowFocus(this.getLocations);
  }

  getLocations = () => {
    this.setState({
      loading: true
    });
    fetchEcars()
      .then(({ locations, mapLinks }) => {
        localStorage.setItem("locations", JSON.stringify(locations.toJS()));
        this.setState({
          locations,
          mapLinks,
          fetchError: false,
          loading: false
        });
      })
      .catch((...error) => {
        console.error(...error);
        this.setState({
          fetchError: true,
          loading: false
        });
      });
  };

  addLocation = (location: string) => {
    const selectedLocations = this.state.selectedLocations.add(location);
    this.setSelected(selectedLocations);
  };

  removeLocation = (location: string) => {
    const selectedLocations = this.state.selectedLocations.remove(location);
    this.setSelected(selectedLocations);
  };

  clearSelected = () => {
    this.setSelected(Set());
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
  };

  setSearch = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      search: event.target.value || ""
    });
  };

  setLocationNickname = (key: string, nickname: string) => {
    const locationNicknames = this.state.locationNicknames.set(key, nickname);
    this.setState({
      locationNicknames
    });
    localStorage.setItem(
      "locationsNicknames",
      JSON.stringify(locationNicknames.toJS())
    );
  };

  render() {
    const {
      locations,
      selectedLocations,
      locationNicknames,
      search,
      mapLinks,
      fetchError,
      loading
    } = this.state;

    return (
      <div className="App">
        <AppHeader
          search={search}
          fetchError={fetchError}
          loading={loading}
          setSearch={this.setSearch}
          getLocations={this.getLocations}
        />
        <div style={{ paddingTop: 60 }}>
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
              setLocationNickname={this.setLocationNickname}
              mapLinks={mapLinks}
              locationNicknames={locationNicknames}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
