/*
 * Filename: /Users/suraj.sanwal/Desktop/projects/react-native/jetX/src/containers/Find.js
 * Path: /Users/suraj.sanwal/Desktop/projects/react-native/jetX
 * Created Date: Wednesday, August 21st 2019, 6:56:20 pm
 * Author: Suraj Sanwal
 *
 * Copyright (c) 2019 smartData Inc
 */

import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import SafeView from "../components/common/SafeView";
import { push } from "../actions";
import constants from "../constants";
// import { moderateScale } from "../helpers/ResponsiveFonts";
import DropdownView from "../components/common/DropdownView";

class componentName extends Component {
  constructor(props) {
    super(props);
  }
  navigate = screen => {
    this.props.push(this.props.componentId, screen);
  };

  render() {
    let data = [
      {
        value: "Banana"
      },
      {
        value: "Mango"
      },
      {
        value: "Pear"
      }
    ];

    return (
      <SafeView title={"Find"}>
        <View>
          <Text style={{ color: constants.Colors.White }}>
            What are you looking for?
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <DropdownView data={data} label={"Service Type"} />
          <DropdownView data={data} label={"Machine Type"} />
          <GooglePlacesAutocomplete
            placeholder="Search"
            minLength={2}
            autoFocus={false}
            returnKeyType={"search"}
            keyboardAppearance={"light"}
            listViewDisplayed={true} // true/false/undefined
            fetchDetails={true}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log("data iiiii===>", data, details);
            }}
            query={{
              key: constants.DevKeys.GooglePlaceAPIKey,
              language: "en" // language of the results
              // types: "(cities)" // default: 'geocode'
            }}
            styles={{
              container: {
                backgroundColor: constants.Colors.Black,
                borderWidth: 0
              },
              description: {
                color: constants.Colors.Turquoise
              },
              textInputContainer: {
                backgroundColor: constants.Colors.Black,
                borderBottomColor: constants.Colors.Turquoise,
                borderBottomWidth: 1,
                borderTopWidth: 0
              },
              textInput: {
                backgroundColor: constants.Colors.Black,
                color: constants.Colors.Turquoise,
                marginLeft: 0,
                marginRight: 0
              },
              loader: {},
              listView: {},
              poweredContainer: {
                backgroundColor: constants.Colors.Black,
                display: "none"
              },
              separator: {},
              row: {
                backgroundColor: constants.Colors.Black
              },
              predefinedPlacesDescription: {
                color: constants.Colors.MedBlue
              }
            }}
            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          />
        </View>
      </SafeView>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  { push }
)(componentName);
