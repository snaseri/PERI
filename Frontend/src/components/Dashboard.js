import React, {useEffect, useState} from "react";
import {Box, Heading} from "@chakra-ui/react";
import AuthService from "../services/auth.service";
import {MenuGroup, MenuItem} from "@chakra-ui/menu";
import BoardDesigner from "./Dashboards/BoardDesigner";
import BoardAdmin from "./Dashboards/BoardAdmin";
import BoardTechnical from "./Dashboards/BoardTechnical";

const Dashboard = () => {
    const [showTechnicalBoard, setShowTechnicalBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [showDesignerBoard, setShowDesignerBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);


    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowTechnicalBoard(user.roles.includes("ROLE_TECHNICAL"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
            setShowDesignerBoard(user.roles.includes("ROLE_DESIGNER"));
        }
    }, []);

    return (
        <div>
            {currentUser ? (
            <Box bg="brand.background" m={10} p={20} boxShadow={"dark-lg"}>
                <Heading>
                    You've logged in as: {currentUser.email} Your Details are Below
                </Heading>

                {showDesignerBoard && (
                    <BoardDesigner/>
                )}
                {showTechnicalBoard && (
                    <BoardTechnical/>
                )}
                {showAdminBoard && (
                    <BoardAdmin/>
                )}
            </Box>
            ) : (
            <div>
                Not Logged in
            </div>
            )}
        </div>

    )
}
export default Dashboard;