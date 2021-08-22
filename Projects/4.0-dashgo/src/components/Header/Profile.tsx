import { Flex, Text, Box, Avatar } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData?: boolean;
}

export const Profile = ({ showProfileData = true }: ProfileProps) => {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Anderson Campos</Text>
          <Text color="gray.300" fontSize="small">
            anderson@gmail.con
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Anderson Campos"
        src="https://github.com/andercampos.png"
      />
    </Flex>
  );
};
