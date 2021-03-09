import {
    Box,
    Heading,
    Table,
    Tbody,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import UserTableRow from "./UserTableRow/UserTableRow";

const UserTable = (props) => {
    const breakpoint = useBreakpointValue({ base: "sm", lg: "md", xl: "lg" });

    if (props.users.length > 0) {
        return (
            <Table variant="simple" colorScheme="teal" size={breakpoint}>
                <Thead>
                    <Tr>
                        <Th> Name </Th>
                        <Th> Email </Th>
                        <Th> </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {props.users.map((user) => (
                        <UserTableRow
                            updateUser={props.updateUser}
                            deleteUser={props.deleteUser}
                            key={user._id}
                            user={user}
                        />
                    ))}
                </Tbody>
            </Table>
        );
    } else {
        return (
            <Box py={2} px={3}>
                <Heading>No results found</Heading>
                <Heading size="md">Not with this query at least</Heading>
            </Box>
        );
    }
};

export default UserTable;
