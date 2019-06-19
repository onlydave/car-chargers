// @flow
import React from "react";
import "./App.css";

import type { Locations, MapLinks } from "./api/fetchEcars";

import SelectList from "./selectList";
import { Map, Set, fromJS, isKeyed } from "immutable";
import fetchEcars from "./api/fetchEcars";
import LocationStatusList from "./LocationStatusList";
import onWindowFocus from "./utils/onWindowFocus";
import AppHeader from "./AppHeader";
import getDistance from "./api/distanceMatrix";

const tenMinutes = 10 * 60 * 1000;

const getSavedImmutable = (
  key = "selectedLocations",
  options: ?{ expire: number }
) => {
  if (options && options.expire) {
    const lastSet = localStorage.getItem(`${key}-last-set`);
    if (
      !lastSet ||
      new Date().getTime() - new Date(lastSet).getTime() > options.expire
    ) {
      return false;
    }
  }
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
  locationDistances: Map<string, Map<string, Map<string, string | number>>>,
  search: string,
  mapLinks: MapLinks,
  fetchError: boolean,
  loading: boolean
};

class App extends React.Component<{}, AppState> {
  state = {
    selectedLocations: getSavedImmutable("selectedLocations") || Set(),
    locations: getSavedImmutable("locations") || Map(),
    locationNicknames: getSavedImmutable("locationsNicknames") || Map(),
    locationDistances:
      getSavedImmutable("locationDistances", { expire: tenMinutes }) || Map(),
    search: "",
    mapLinks: {},
    fetchError: false,
    loading: false
  };

  lastDistancesFetch = new Date(
    localStorage.getItem(`locationDistances-last-set`) || 0
  );

  componentDidMount() {
    this.getLocations();
    onWindowFocus(this.getLocations);
  }

  getDistances = () => {
    const { selectedLocations, mapLinks, locationDistances } = this.state;

    if (
      !selectedLocations.size ||
      (locationDistances.size &&
        new Date().getTime() - this.lastDistancesFetch.getTime() < tenMinutes)
    ) {
      return;
    }
    this.lastDistancesFetch = new Date();

    const destinations = selectedLocations.map(locationName => {
      return {
        lat: Number(mapLinks[locationName].lat),
        lng: Number(mapLinks[locationName].lng)
      };
    });

    getDistance(destinations.toJS()).then(res => {
      const locationNames = selectedLocations.toJS();

      let locationDistances = Map();

      res.rows[0].elements.forEach((element, index) => {
        if (element.status === "OK") {
          locationDistances = locationDistances.set(
            locationNames[index],
            element
          );
        }
      });
      localStorage.setItem(
        "locationDistances",
        JSON.stringify(locationDistances.toJS())
      );
      localStorage.setItem(
        "locationDistances-last-set",
        new Date().toISOString()
      );
      this.setState({
        locationDistances
      });
    });
  };

  getLocations = () => {
    this.setState({
      loading: true
    });
    fetchEcars()
      .then(({ locations, mapLinks }) => {
        localStorage.setItem("locations", JSON.stringify(locations.toJS()));
        this.setState(
          {
            locations,
            mapLinks,
            fetchError: false,
            loading: false
          },
          this.getDistances
        );
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
      locationDistances,
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
              locationDistances={locationDistances}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
