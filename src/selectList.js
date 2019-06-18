// @flow

import React from "react";

import logo from "./logo.svg";

import type { Locations } from "./api/fetchEcars";

import { Set } from "immutable";

export type SelectListProps = {
  removeLocation: string => null,
  addLocation: string => null,
  selectedLocations: Set<string>,
  locations: Locations,
  search: string
};

class SelectList extends React.Component<SelectListProps> {
  handleInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const {
      target: { name, checked }
    } = event;

    if (checked) {
      this.props.addLocation(name);
    } else {
      this.props.removeLocation(name);
    }
  };

  render() {
    const { locations, search } = this.props;
    const searchRegex = search
      .split(" ")
      .map(searchString => new RegExp(searchString, "gmi"));
    if (!locations.size) {
      return (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      );
    }

    return (
      <div>
        {locations.keySeq().map(key => {
          if (
            search &&
            !!searchRegex.find(thisSearchRegex => !thisSearchRegex.test(key))
          ) {
            return null;
          }
          return (
            <label key={key} className="selectortron">
              <div className="">{key}</div>
              <input
                name={key}
                type="checkbox"
                checked={this.props.selectedLocations.has(key)}
                onChange={this.handleInputChange}
              />
            </label>
          );
        })}
      </div>
    );
  }
}

export default SelectList;
