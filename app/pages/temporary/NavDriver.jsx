import React from "react";
import { Link } from "@react-navigation/native";
import { View } from 'react-native';

const NavDriver = () => {
    return (
        <View style={{marginTop:40}}>
            <Link
                to="/ChangePassword"
                style={{ color: "#58AA42", fontWeight: "bold" }}
            >
                Change Password
            </Link>

            <Link
                to="/UpdateProfile"
                style={{ color: "#58AA42", fontWeight: "bold" }}
            >
                Update Profile
            </Link>

            <Link
                to="/DriverDashboard"
                style={{ color: "#58AA42", fontWeight: "bold" }}
            >
                Driver Dashboard
            </Link>

            <Link
                to="/TechnicalSupportDriver"
                style={{ color: "#58AA42", fontWeight: "bold" }}
            >
                Technical Support Driver
            </Link>

            <Link
                to="/BatteryInformationDriver"
                style={{ color: "#58AA42", fontWeight: "bold" }}
            >
                Battery Information Driver
            </Link>

            <Link
                to="/SignUpOption"
                style={{ color: "#58AA42", fontWeight: "bold" }}
            >
                Change Password
            </Link>

            {/* <Link
                to="/SignUpOption"
                style={{ color: "#58AA42", fontWeight: "bold" }}
            >
                Package
            </Link> */}
        </View>
    );
}

export default NavDriver;