import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import * as React from "react";
import SearchBlock from "./SearchBlock";
import FriendSearchResult from "./friendSearchResult";
export default function Friends({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor:"red"}}>
      {/* <SearchBlock navigation={navigation} editable={true} page="same" placeholder='Rechercher un ami' /> */}
      <FriendSearchResult />
    </View>
  );
}
