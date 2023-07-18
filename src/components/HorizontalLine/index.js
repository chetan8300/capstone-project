import React from "react";
import { View } from "react-native";

const HorizontalLine = ({ color, height }) => (
  <View style={{ borderBottomColor: color, borderBottomWidth: height, }} />
);

export default HorizontalLine;
