/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   StatusBar,
 } from "react-native";
 
 import HomeScreen from "src/screens/HomeScreen/HomeScreen";
 import NoUser from "src/screens/HomeScreen/Nouser";
 import VehicleInfoScreen from "src/screens/underwriting/VehicleInfoScreen";
 import SelectCoverScreen from "src/screens/underwriting/SelectCover";
 import VehiclePhotosScreen from "src/screens/underwriting/VehiclePhotos";
 import PayScreen from "src/screens/PayScreen";
 import SelectCarScreen from "src/screens/Claim/SelectCar";
 import DriverDetailsScreen from "src/screens/Claim/DriverDetailsScreen";
 import AccidentDetailsScreen from "src/screens/Claim/AccidentDetails";
 import InsuredDamagePhotosScreen from "src/screens/Claim/DamagePhotos/InsuredDamagePhotosScreen";
 import ThirdPartyDamagePhotosScreen from "src/screens/Claim/DamagePhotos/ThirdPartyDamagePhotosScreen";
 import ThirdPartyDetailsScreen from "src/screens/Claim/ThirdPartyDetails";
 import SupportingDocumentsScreen from "src/screens/Claim/SupportingDocumentsScreen";
 import BankDetailsScreen from "src/screens/Claim/BankDetailsScreen";
 import ClaimsScreen from "src/screens/Claim/ClaimsScreen";
 import ClaimInfoScreen from "src/screens/Claim/ClaimInfoScreen";
 import LoginScreen from "src/screens/Auth/LoginScreen";
 import RegisterScreen from "src/screens/Auth/RegisterScreen";
 import LogoutScreen from "src/screens/Auth/LogoutScreen";
 import ForgotPasswordScreen from "src/screens/Auth/ForgotPassword/ForgotPasswordScreen";
 import Icon from "react-native-vector-icons/Ionicons";
 import R from "res/R";
 
 import CustomDrawer from "./src/library/components/CustomDrawer";
 import AsyncStorage from "@react-native-async-storage/async-storage";
 
 import {
   createDrawerNavigator,
   DrawerContentScrollView,
   DrawerItemList,
 } from "@react-navigation/drawer";
 import { NavigationContainer } from "@react-navigation/native";
 import { createStackNavigator } from "@react-navigation/stack";
 import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
 import { useEffect } from "react";
 import { useState } from "react";
 
 const HomeStack = createStackNavigator();
 
 function HomeStackScreen() {
   return (
     <HomeStack.Navigator>
       <HomeStack.Screen
         name="HomeScreen"
         component={BottomTabsScreen}
         options={{ headerShown: false }}
       />
       <HomeStack.Screen
         name="VehicleInfo"
         component={VehicleInfoScreen}
         options={{ headerShown: true, title: "Enter Car Information" }}
       />
       <HomeStack.Screen
         name="SelectCoverScreen"
         component={SelectCoverScreen}
         options={{ headerShown: true, title: "Select Cover Type" }}
       />
       <HomeStack.Screen
         name="VehiclePhotosScreen"
         component={VehiclePhotosScreen}
         options={{ headerShown: true, title: "Take Photos of Your Car" }}
       />
       <HomeStack.Screen
         name="PayScreen"
         component={PayScreen}
         options={{ headerShown: true, title: "Make Payment" }}
       />
       <HomeStack.Screen
         name="SelectCarScreen"
         component={SelectCarScreen}
         options={{ headerShown: true, title: "Select Your Car" }}
       />
       <HomeStack.Screen
         name="DriverDetailsScreen"
         component={DriverDetailsScreen}
         options={{ headerShown: true, title: "Driver Details" }}
       />
       <HomeStack.Screen
         name="AccidentDetails"
         component={AccidentDetailsScreen}
         options={{ headerShown: true, title: "Details of Accident" }}
       />
       <HomeStack.Screen
         name="InsuredDamagePhotos"
         component={InsuredDamagePhotosScreen}
         options={{ headerShown: true, title: "Damage Photos of your Car" }}
       />
       <HomeStack.Screen
         name="ThirdPartyDamagePhotos"
         component={ThirdPartyDamagePhotosScreen}
         options={{ headerShown: true, title: "Damage Photos of third party" }}
       />
       <HomeStack.Screen
         name="ThirdPartyDetails"
         component={ThirdPartyDetailsScreen}
         options={{ headerShown: true, title: "Details of Third Party" }}
       />
       <HomeStack.Screen
         name="SupportingDocuments"
         component={SupportingDocumentsScreen}
         options={{
           headerShown: true,
           title: "Add Documents to Support your claim.",
         }}
       />
       <HomeStack.Screen
         name="BankDetails"
         component={BankDetailsScreen}
         options={{ headerShown: true, title: "Bank Account Details" }}
       />
       <HomeStack.Screen
         name="Claims"
         component={ClaimsScreen}
         options={{ headerShown: true, title: "Claims History" }}
       />
       <HomeStack.Screen
         name="ClaimInfo"
         component={ClaimInfoScreen}
         options={{ headerShown: true, title: "Claim Details" }}
       />
       <HomeStack.Screen
         name="RegisterScreen"
         component={RegisterScreen}
         options={{ headerShown: true, title: "Join the Family" }}
       />
       <HomeStack.Screen
         name="ForgotPasswordScreen"
         component={ForgotPasswordScreen}
         options={{ headerShown: false, title: "Join the Family" }}
       />
       <HomeStack.Screen
         name="LoginScreen"
         component={LoginScreen}
         options={{ headerShown: true, title: "PMyCar - Sign In." }}
       />
     </HomeStack.Navigator>
   );
 }
 
 function HomeStackScreenNuser() {
   return (
     <HomeStack.Navigator>
       <HomeStack.Screen
         name="HomeScreenNU"
         component={NoUser}
         options={{ headerShown: false }}
       />
       <HomeStack.Screen
         name="VehicleInfo"
         component={VehicleInfoScreen}
         options={{ headerShown: false, title: "Enter Car Information" }}
       />
       <HomeStack.Screen
         name="SelectCoverScreen"
         component={SelectCoverScreen}
         options={{ headerShown: true, title: "Select Cover Type" }}
       />
       <HomeStack.Screen
         name="VehiclePhotosScreen"
         component={VehiclePhotosScreen}
         options={{ headerShown: true, title: "Take Photos of Your Car" }}
       />
       <HomeStack.Screen
         name="PayScreen"
         component={PayScreen}
         options={{ headerShown: true, title: "Make Payment" }}
       />
       <HomeStack.Screen
         name="SelectCarScreen"
         component={SelectCarScreen}
         options={{ headerShown: true, title: "Select Your Car" }}
       />
       <HomeStack.Screen
         name="DriverDetailsScreen"
         component={DriverDetailsScreen}
         options={{ headerShown: true, title: "Driver Details" }}
       />
       <HomeStack.Screen
         name="AccidentDetails"
         component={AccidentDetailsScreen}
         options={{ headerShown: true, title: "Details of Accident" }}
       />
       <HomeStack.Screen
         name="InsuredDamagePhotos"
         component={InsuredDamagePhotosScreen}
         options={{ headerShown: true, title: "Damage Photos of your Car" }}
       />
       <HomeStack.Screen
         name="ThirdPartyDamagePhotos"
         component={ThirdPartyDamagePhotosScreen}
         options={{ headerShown: true, title: "Damage Photos of third party" }}
       />
       <HomeStack.Screen
         name="ThirdPartyDetails"
         component={ThirdPartyDetailsScreen}
         options={{ headerShown: true, title: "Details of Third Party" }}
       />
       <HomeStack.Screen
         name="SupportingDocuments"
         component={SupportingDocumentsScreen}
         options={{
           headerShown: true,
           title: "Add Documents to Support your claim.",
         }}
       />
       <HomeStack.Screen
         name="BankDetails"
         component={BankDetailsScreen}
         options={{ headerShown: true, title: "Bank Account Details" }}
       />
       <HomeStack.Screen
         name="Claims"
         component={ClaimsScreen}
         options={{ headerShown: true, title: "Claims History" }}
       />
       <HomeStack.Screen
         name="ClaimInfo"
         component={ClaimInfoScreen}
         options={{ headerShown: true, title: "Claim Details" }}
       />
       <HomeStack.Screen
         name="RegisterScreen"
         component={RegisterScreen}
         options={{ headerShown: false, title: "Join the Family" }}
       />
       <HomeStack.Screen
         name="ForgotPasswordScreen"
         component={ForgotPasswordScreen}
         options={{ headerShown: false, title: "Reset Password" }}
       />
       <HomeStack.Screen
         name="LoginScreen"
         component={LoginScreen}
         options={{ headerShown: false, title: "PMyCar - Sign In." }}
       />
     </HomeStack.Navigator>
   );
 }
 
 const UnderwritingStack = createStackNavigator();
 
 function underwritingStackScreens() {
   return (
     <UnderwritingStack.Navigator>
       <UnderwritingStack.Screen
         name="VehicleInfo"
         component={VehicleInfoScreen}
         options={{ headerShown: true, title: "Enter car information" }}
       />
     </UnderwritingStack.Navigator>
   );
 }
 
 const ViewClaimStack = createStackNavigator();
 
 function ViewClaimStackScreens() {
   return (
     <ViewClaimStack.Navigator>
       <ViewClaimStack.Screen
         name="Claims"
         component={ClaimsScreen}
         options={{ headerShown: true, title: "Claims History" }}
       />
       <ViewClaimStack.Screen
         name="ClaimInfo"
         component={ClaimInfoScreen}
         options={{ headerShown: true, title: "Claim Details" }}
       />
     </ViewClaimStack.Navigator>
   );
 }
 const Drawer = createDrawerNavigator();
 
 function CustomDrawerContent(props) {
   return (
     <DrawerContentScrollView {...props}>
       <CustomDrawer />
       <DrawerItemList {...props} />
     </DrawerContentScrollView>
   );
 }
 
 function MainDrawer() {
   const [user, setUser] = useState(null);
 
   useEffect(() => {
     (async () => {
       const appUser = await AsyncStorage.getItem("@user");
       if (appUser) {
         setUser(appUser);
       }
     })();
   });
 
   if (!user) {
     console.log("No User");
     return (
       <Drawer.Navigator
       drawerStyle={{ backgroundColor: "#272727" }}

       >
         <Drawer.Screen
           name="Home"
           component={HomeStackScreenNuser}
           options={{
             drawerIcon: () => (
               <Icon
                 name="home"
                 size={25}
                 style={styles.drawerItemIcon}
                 color="#000"
               />
             ),
           }}
         />
         <Drawer.Screen
           name="Login"
           component={LoginScreen}
           options={{
             drawerIcon: () => (
               <Icon
                 name="share"
                 size={25}
                 style={styles.drawerItemIcon}
                 color="#000"
               />
             ),
           }}
         />
         <Drawer.Screen
           name="Register"
           component={RegisterScreen}
           options={{
             drawerIcon: () => (
               <Icon
                 name="bookmarks"
                 size={25}
                 style={styles.drawerItemIcon}
                 color="#000"
               />
             ),
           }}
         />
         <Drawer.Screen
           name="Share App"
           component={HomeScreen}
           options={{
             drawerIcon: () => (
               <Icon
                 name="share"
                 size={25}
                 style={styles.drawerItemIcon}
                 color="#000"
               />
             ),
           }}
         />
         <Drawer.Screen
           name="Report a Problem"
           component={HomeScreen}
           options={{
             drawerIcon: () => (
               <Icon
                 name="bookmarks"
                 size={25}
                 style={styles.drawerItemIcon}
                 color="#000"
               />
             ),
           }}
         />
       </Drawer.Navigator>
     );
   }
   return (
     <Drawer.Navigator
       drawerType={"back"}
       drawerContent={(props) => <CustomDrawerContent {...props} />}
       drawerStyle={{ backgroundColor: "#fff" }}
       drawerContentOptions={{
         labelStyle: {
           color: R.colors.appPrimary,
         },
       }}
     >
       <Drawer.Screen
         name="Home"
         component={HomeStackScreen}
         options={{
           drawerIcon: () => (
             <Icon
               name="home"
               size={25}
               style={styles.drawerItemIcon}
               color="#000"
             />
           ),
         }}
       />
 
       <Drawer.Screen
         name="My Insured Vehicles"
         component={HomeScreen}
         options={{
           drawerIcon: () => (
             <Icon
               name="archive"
               size={25}
               style={styles.drawerItemIcon}
               color="#000"
             />
           ),
         }}
       />
       <Drawer.Screen
         name="My Claims "
         component={ViewClaimStackScreens}
         options={{
           drawerIcon: () => (
             <Icon
               name="analytics"
               size={25}
               style={styles.drawerItemIcon}
               color="#000"
             />
           ),
         }}
       />
       <Drawer.Screen
         name="Share App"
         component={HomeScreen}
         options={{
           drawerIcon: () => (
             <Icon
               name="share"
               size={25}
               style={styles.drawerItemIcon}
               color="#000"
             />
           ),
         }}
       />
       <Drawer.Screen
         name="Report a Problem"
         component={HomeScreen}
         options={{
           drawerIcon: () => (
             <Icon
               name="bookmarks"
               size={25}
               style={styles.drawerItemIcon}
               color="#000"
             />
           ),
         }}
       />
       {/* <Drawer.Screen
           name="Settings"
           component={HomeScreen}
           options={{ drawerIcon: () => <Icon name="cogs" size={25} style={styles.drawerItemIcon} color="#000" /> }}
         /> */}
       <Drawer.Screen
         name="Log Out"
         component={LogoutScreen}
         options={{
           drawerIcon: () => (
             <Icon
               name="camera-sharp"
               size={25}
               style={styles.drawerItemIcon}
               color="#000"
             />
           ),
         }}
       />
     </Drawer.Navigator>
   );
 }
 
 const BottomTab = createBottomTabNavigator();
 
 function BottomTabsScreen() {
   return (
     <BottomTab.Navigator
       screenOptions={({ route }) => ({
         tabBarIcon: ({ focused, color, size }) => {
           let iconName;
 
           if (route.name === "Home") {
             iconName = "home-outline";
           } else if (route.name === "Favorites") {
             iconName = "heart-outline";
           } else if (route.name == "My Account") {
             iconName = "person-outline";
           } else if (route.name == "Settings") {
             iconName = "settings-outline";
           } else if (route.name == "Help") {
             iconName = "information-outline";
           }
 
           // You can return any component that you like here!
           return <Icon name={iconName} size={size} color={color} />;
         },
       })}
       tabBarOptions={{
         activeTintColor: "tomato",
         inactiveTintColor: "gray",
       }}
     >
       <BottomTab.Screen name="Home" component={HomeScreen} />
       <BottomTab.Screen name="My Account" component={HomeScreen} />
       <BottomTab.Screen
         name="insureItem"
         component={underwritingStackScreens}
         options={{
           tabBarLabel: "",
           // tabBarVisible:false,
           tabBarIcon: ({ color }) => (
             <View
               style={{
                 position: "absolute",
                 bottom: 0, // space from bottombar
                 height: 60,
                 width: 60,
                 borderRadius: 90,
                 justifyContent: "center",
                 alignItems: "center",
                 backgroundColor: "white",
               }}
             >
               <Icon
                 name="add-circle-outline"
                 color="#EF4A37"
                 size={55}
                 backgroundColor="pink"
               />
               <Text style={{ fontSize: 10 }}>Add Item</Text>
             </View>
           ),
         }}
       />
       <BottomTab.Screen name="Settings" component={HomeScreen} />
       <BottomTab.Screen name="Help" component={HomeScreen} />
     </BottomTab.Navigator>
   );
 }
 
 const styles = StyleSheet.create({
   drawerItemIcon: {
     color: R.colors.appPrimary,
   },
 });
 
 const AppStack = createStackNavigator();
 
 function App() {
   return (
     <NavigationContainer>
       <AppStack.Navigator>
         <AppStack.Screen
           name="MainScreen"
           component={MainDrawer}
           options={{ headerShown: false }}
         />
       </AppStack.Navigator>
     </NavigationContainer>
   );
 }
 
 export default App;
 