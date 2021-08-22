import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';

import { Logo } from './Logo';
import { Profile } from './Profile';
import { Search } from './Search';
import { NotificationsNav } from './NotificationsNav';

import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { RiMenuLine } from 'react-icons/ri';

export const Header = () => {
  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open sidebar"
          variant="unstyled"
          fontSize="24"
          onClick={onOpen}
          mr="2"
          icon={<Icon as={RiMenuLine} />}
        />
      )}

      <Logo />

      {isWideVersion && <Search />}

      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
};
