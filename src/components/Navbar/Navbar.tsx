import React from 'react';
import { logOut } from '../../supabase/auth';
import {
    Center,
    Button,
    Image,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Divider,
} from '@chakra-ui/react';
import {
    GiExitDoor,
    GiFeather,
    GiRingingBell,
    GiPsychicWaves,
} from 'react-icons/all';
import wechatLogo from '../../assets/logo.png';
import { useDisclosure } from '@chakra-ui/react';

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const LogOutBtn = (e: React.MouseEvent<HTMLElement>) => {
        logOut().then((value) => {
            window.location.href = '/login';
        });
    };

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader style={{ display: 'flex' }}>
                        <Center>
                            <Image
                                style={{
                                    width: '50px',
                                    height: '25px',
                                    cursor: 'pointer',
                                }}
                                src={wechatLogo}
                                alt="WeChat Logo"
                                objectFit="cover"
                            />
                            Your chats
                        </Center>
                    </DrawerHeader>
                    <Divider />

                    <DrawerBody></DrawerBody>
                    <DrawerFooter></DrawerFooter>
                </DrawerContent>
            </Drawer>
            <div
                style={{
                    position: 'fixed',
                    top: '0',
                    width: '100vw',
                    borderBottom: '1px solid lightgrey',
                    height: '4rem',
                    backgroundColor: '#fffdfd',
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Center>
                    <Image
                        style={{
                            width: '100px',
                            height: '50px',
                            borderRight: '1px solid lightgrey',
                            cursor: 'pointer',
                        }}
                        src={wechatLogo}
                        alt="WeChat Logo"
                        objectFit="cover"
                    />
                </Center>
                <Center style={{ marginLeft: '20px', gap: '10px' }}>
                    <Button
                        size="lg"
                        variant="outline"
                        style={{ borderRadius: '50%', padding: '0' }}
                    >
                        <GiFeather />
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        style={{ borderRadius: '50%', padding: '0' }}
                    >
                        <GiRingingBell />
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        style={{ borderRadius: '50%', padding: '0' }}
                        onClick={onOpen}
                    >
                        <GiPsychicWaves />
                    </Button>
                </Center>
                <Center
                    style={{
                        position: 'fixed',
                        right: '0',
                        margin: '10px 10px 0 0',
                    }}
                >
                    <Button
                        colorScheme="red"
                        rightIcon={
                            <GiExitDoor
                                style={{ width: '24px', height: '24px' }}
                            />
                        }
                        onClick={LogOutBtn}
                    >
                        Log Out
                    </Button>
                </Center>
            </div>
        </>
    );
};

export default Navbar;
