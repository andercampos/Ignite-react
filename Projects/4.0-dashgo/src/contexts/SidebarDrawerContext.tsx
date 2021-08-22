import { createContext, ReactNode, useContext, useEffect } from 'react';
import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

type SidebarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export const SidebarDrawerProvider = ({
  children,
}: SidebarDrawerProviderProps) => {
  const disclosure = useDisclosure();
  const router = useRouter();

  const { onClose } = disclosure;

  useEffect(() => {
    onClose();
  }, [router.asPath, onClose]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
};

export function useSidebarDrawer() {
  const context = useContext(SidebarDrawerContext);

  if (!context) {
    throw new Error(
      'useSidebarDrawer must be used within a SidebarDrawerProvider'
    );
  }

  return context;
}
