import React from "react";
import { Link } from "@react-navigation/native";
import { View } from 'react-native';

const NavBss = () => {
    return (
        <View>
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
                to="/StationDashboard"
                style={{ color: "#58AA42", fontWeight: "bold" }}
            >
                Station Dashboard
            </Link>

            <Link
                to="/StationPerformance"
                style={{ color: "#58AA42", fontWeight: "bold" }}
            >
                Station Performance
            </Link>

            <Link
                to="/TechnicalSupportBss"
                style={{ color: "#58AA42", fontWeight: "bold" }}
            >
                Technical Support BSS
            </Link>

            <Link
                to="/ScheduleMaintenance"
                style={{ color: "#58AA42", fontWeight: "bold" }}
            >
                Schedule Maintenance
            </Link>

            <Link
                to="/BatteryInformationStation"
                style={{ color: "#58AA42", fontWeight: "bold" }}
            >
               Battery Information Station
            </Link>
        </View>
    );
}

export default NavBss;