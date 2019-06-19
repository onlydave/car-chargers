// @flow
import React from "react";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faTimes } from "@fortawesome/free-solid-svg-icons";

type HeaderProps = {
  search: string,
  fetchError: boolean,
  loading: boolean,
  setSearch: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  getLocations: (event: SyntheticInputEvent<HTMLInputElement>) => void
};

const AppHeader = (props: HeaderProps) => {
  const { search, fetchError, loading, setSearch, getLocations } = props;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        background: "white"
      }}
    >
      <input
        onChange={setSearch}
        value={search}
        placeholder="Search Locations..."
        style={{
          width: 10,
          flexGrow: 1,
          padding: 10,
          fontSize: 23,
          border: "1px solid black",
          borderRight: "none",
          borderRadius: 0,
          margin: 0,
          height: 28,
          boxShadow: "none",
          WebkitAppearance: "none"
        }}
      />
      <div
        onClick={setSearch}
        value=""
        style={{
          paddingRight: 10,
          paddingTop: 8,
          paddingBottom: 8,
          background: "none",
          border: "1px solid black",
          borderLeft: "none"
        }}
      >
        <FontAwesomeIcon icon={faTimes} size="2x" color="gray" />
      </div>
      <div onClick={getLocations} style={{ padding: 10 }}>
        <FontAwesomeIcon
          icon={faSync}
          size="2x"
          color={fetchError ? "red" : "teal"}
          spin={loading}
        />
      </div>
    </div>
  );
};

export default AppHeader;
