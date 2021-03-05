import React, { useCallback, useEffect, useRef, useState } from "react";
import AuthService from "../../services/auth.service";
import ProjectFilter from "./ProjectFilter";
import ProjectList from "./ProjectList";
import ProjectService from "../../services/project.service";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/react";

const ProjectsSection = () => {
    let authenticatedUser = AuthService.getCurrentUser();
    let allEngineerProjects = useRef();
    const [projectsDisplayed, setProjectsDisplayed] = useState([]);
    const projectBreakpoint = useBreakpointValue({ base: "sm", lg: "md" });
    let count = 0;

    const getProjects = useCallback(() => {
        ProjectService.getProjectsWithDesignEngineersByEngineerID(
            authenticatedUser.id
        ).then((projects) => {
            allEngineerProjects.current = projects;
            setProjectDisplayedToAllEngineerProjects();
        });
    }, [authenticatedUser.id]);

    const setProjectDisplayedToAllEngineerProjects = () => {
        setProjectsDisplayed(allEngineerProjects.current);
    };

    const updateUnfilteredProjects = (projectUpdated) => {
        let indexOfItemToUpdate = allEngineerProjects.current.findIndex(
            (x) => x._id === projectUpdated._id
        );
        allEngineerProjects.current[indexOfItemToUpdate] = projectUpdated;
        setProjectsDisplayed([...allEngineerProjects.current]);
    };

    useEffect(() => {
        getProjects();
    }, [getProjects]);

    return (
        <Flex>
            <Box bg="brand.grey" width="100%" boxShadow="dark-md">
                <Box borderTop="1px" borderBottom="1px" bg="brand.background">
                    <Text textAlign="center" p={2} fontSize="3xl">
                        Available Projects
                    </Text>
                </Box>

                <Box>
                    <ProjectFilter
                        count={count}
                        authenticatedId={authenticatedUser.id}
                        projectsDisplayed={projectsDisplayed}
                        setProjectsParent={setProjectsDisplayed}
                        setProjectDisplayedToAllEngineerProjects={
                            setProjectDisplayedToAllEngineerProjects
                        }
                        projectBreakpoint={projectBreakpoint}
                    />
                </Box>

                <Box height="auto" width="auto" m={0} bg="brand.background">
                    <ProjectList
                        projectsToDisplay={projectsDisplayed}
                        count={count}
                        authenticatedRole={authenticatedUser.roles}
                        updateParent={updateUnfilteredProjects}
                        projectBreakpoint={projectBreakpoint}
                    />
                </Box>
            </Box>
        </Flex>
    );
};

export default ProjectsSection;
