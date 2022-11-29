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
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Tooltip,
} from '@chakra-ui/react';
import {
    GiExitDoor,
    GiFeather,
    GiRingingBell,
    GiPsychicWaves,
} from 'react-icons/all';
import wechatLogo from '../../assets/logo.png';
import { useDisclosure } from '@chakra-ui/react';
import '../../index.css';

const Navigation = () => {
    const {
        isOpen: isOpenModal,
        onOpen: onOpenModal,
        onClose: onCloseModal,
    } = useDisclosure();
    const {
        isOpen: isOpenDrawer,
        onOpen: onOpenDrawer,
        onClose: onCloseDrawer,
    } = useDisclosure();

    const LogOutBtn = (e: React.MouseEvent<HTMLElement>) => {
        logOut().then((value) => {
            window.location.href = '/login';
        });
    };

    return (
        <>
            <Drawer
                isOpen={isOpenDrawer}
                placement="right"
                onClose={onCloseDrawer}
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

                    <DrawerBody>{/*Znajomi*/}</DrawerBody>
                    <DrawerFooter></DrawerFooter>
                </DrawerContent>
            </Drawer>

            <Modal
                isOpen={isOpenModal}
                onClose={onCloseModal}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody></ModalBody>

                    <ModalFooter>
                        <Button
                            variant="outline"
                            colorScheme="red"
                        >
                            Create post
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
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
                    <Tooltip label="Create a post">
                        <Button
                            size="lg"
                            variant="outline"
                            style={{ borderRadius: '50%', padding: '0' }}
                            onClick={onOpenModal}
                        >
                            <GiFeather />
                        </Button>
                    </Tooltip>
                    <Menu>
                        <Tooltip label="Notifications">
                            <MenuButton
                                className="cantDoHoverInline"
                                style={{
                                    borderRadius: '50%',
                                    border: '1px solid #e2e8f0',
                                    padding: '14px',
                                }}
                            >
                                <GiRingingBell
                                    style={{ width: '20px', height: '20px' }}
                                />
                            </MenuButton>
                        </Tooltip>
                        <MenuList>
                            <MenuGroup title="Your notifications"> </MenuGroup>
                        </MenuList>
                    </Menu>
                    <Tooltip label="Friends">
                        <Button
                            size="lg"
                            variant="outline"
                            style={{ borderRadius: '50%', padding: '0' }}
                            onClick={onOpenDrawer}
                        >
                            <GiPsychicWaves />
                        </Button>
                    </Tooltip>
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

export default Navigation;
