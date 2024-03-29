// @flow

import { Map } from "immutable";

import matchAll from "string.prototype.matchall";

const convert = require("xml-js");

export const topaz =
  "Circle K / Topaz Service Station, Templeville Road, Dublin 6, County Dublin";
const typeStatusRegex = /([\w\s()-.]*kW\s)\(([\w\s-,]{3,})\)/gim;

export type Locations = Map<string, Map<string, string>>;

export type MapLinks = {
  [name: string]: {
    url: string,
    lat: string,
    lng: string
  }
};

type Placemark = {
  name: { _text: string },
  description: { _cdata: string }
};

export const fetchEcars = () =>
  fetch(
    "https://cors-anywhere.herokuapp.com/https://www.esb.ie/ECARS/kml/charging-locations.kml"
  )
    .then(response => response.text())
    .then(xml => {
      const json = convert.xml2js(xml, { compact: true });

      const chargers = json.kml.Document.Placemark;

      let locations: Locations = Map({});
      const mapLinks: MapLinks = {};

      chargers.forEach((place: Placemark) => {
        const name = place.name._text;
        const description = place.description._cdata;

        const matches = [...matchAll(description, typeStatusRegex)];

        const mapLink = description.match(
          /(https:\/\/www.google.com\/maps\/place\/([\d.]*),(\S*))"/
        );
        if (mapLink) {
          mapLinks[name] = {
            url: mapLink[1],
            lat: mapLink[2],
            lng: mapLink[3]
          };
        }

        matches.forEach(match => {
          const status = /Note:/i.test(description)
            ? "Unknown"
            : match[2].trim();
          locations = locations.setIn([name, match[1].trim()], status);
        });
        if (!matches.length) {
          console.warn("no match:", description);
        }
      });

      return { mapLinks, locations };
    });

export default fetchEcars;
