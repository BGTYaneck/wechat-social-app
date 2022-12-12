import React, { useEffect, useState } from 'react';
import { getCurrentUserId, logOut } from '../../supabase/auth';
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
    MenuGroup,
    MenuItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Tooltip,
    Avatar,
} from '@chakra-ui/react';
import {
    GiExitDoor,
    GiFeather,
    GiRingingBell,
    IoIosArrowDown,
    GiPsychicWaves,
    AiFillEdit,
} from 'react-icons/all';
import wechatLogo from '../../assets/logo.png';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CreatePostForm from '../CreatePostForm/CreatePostForm';
import '../../index.css';
import { getFriendsList } from '../../supabase/friends';
import { getAvatar, getProfile } from '../../supabase/profiles';
import UserProfile from '../Profile/UserProfile';

const Navigation = () => {
    const [src, setSrc] = useState(
        'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
    );
    const navigate = useNavigate();
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
        logOut().then((_) => {
            window.location.href = '/login';
        });
    };

    const getFriends = (): any[] => {
        let list;
        getFriendsList().then((value) => {
            list = value;
        });
        if (list === undefined) return [];
        return list;
    };
    let userId: string | null;
    useEffect(() => {
        getCurrentUserId().then((value) => (userId = value));
        getAvatar().then((value) => {
            if (value) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // @ts-ignore
                    setSrc(e.target.result);
                };
                reader.readAsDataURL(value);
            }
        });
    }, []);

    return (
        <>
            <Drawer
                isOpen={isOpenDrawer}
                placement="right"
                onClose={onCloseDrawer}
            >
                <DrawerOverlay />
                <DrawerContent
                    style={{ backgroundColor: '#000b19', color: 'white' }}
                >
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

                    <DrawerBody>
                        {getFriends().length == 0 ? (
                            <Center>
                                <p style={{ color: 'grey', opacity: '50%' }}>
                                    You do not currently have any friends.
                                </p>
                            </Center>
                        ) : (
                            getFriends().map(
                                ({
                                    sender,
                                    recipient,
                                    accepted,
                                    created_at,
                                }) => {
                                    let friendId =
                                        sender === userId ? recipient : sender;
                                    let friendName;
                                    getProfile(friendId).then((value) => {
                                        friendName = value.name;
                                    });
                                    let friendAvatar;
                                    getAvatar(friendId).then((value) => {
                                        friendAvatar = value;
                                    });
                                    return (
                                        <>
                                            <img
                                                alt="Friend profile picture"
                                                src={friendAvatar}
                                            />
                                            {friendName}
                                        </>
                                    );
                                }
                            )
                        )}
                    </DrawerBody>
                    <DrawerFooter></DrawerFooter>
                </DrawerContent>
            </Drawer>

            <Modal
                isOpen={isOpenModal}
                onClose={onCloseModal}
            >
                <ModalOverlay />
                <ModalContent
                    style={{
                        backgroundColor: '#000b19',
                        color: 'white',
                    }}
                >
                    <ModalHeader>Create a post</ModalHeader>
                    <ModalCloseButton />
                    <Divider />
                    <ModalBody>{<CreatePostForm />}</ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>

            <div
                style={{
                    position: 'fixed',
                    top: '0',
                    width: '100vw',
                    borderBottom: '1px solid #333c47',
                    height: '4rem',
                    backgroundColor: '#000b19',
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Center>
                    <Image
                        onClick={() => navigate('/')}
                        style={{
                            width: '100px',
                            height: '50px',
                            borderRight: '1px solid #333c47',
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
                            className="outlineHover"
                            size="lg"
                            variant="ghost"
                            style={{
                                borderRadius: '50%',
                                padding: '0',
                                border: '1px solid #333C47',
                            }}
                            onClick={onOpenModal}
                        >
                            <GiFeather />
                        </Button>
                    </Tooltip>
                    <Menu>
                        <Tooltip label="Notifications">
                            <MenuButton
                                className="outlineHover"
                                style={{
                                    borderRadius: '50%',
                                    border: '1px solid #333c47',
                                    padding: '14px',
                                }}
                            >
                                <GiRingingBell
                                    style={{ width: '20px', height: '20px' }}
                                />
                            </MenuButton>
                        </Tooltip>
                        <MenuList
                            style={{
                                backgroundColor: '#000b19',
                                border: '1px solid #333C47',
                                marginTop: '5px',
                            }}
                        >
                            <MenuGroup title="Your notifications"> </MenuGroup>
                        </MenuList>
                    </Menu>
                    <Tooltip label="Friends">
                        <Button
                            className="outlineHover"
                            size="lg"
                            variant="ghost"
                            style={{
                                borderRadius: '50%',
                                padding: '0',
                                border: '1px solid #333c47',
                            }}
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
                        padding: '10px',
                        gap: '12px',
                    }}
                >
                    <Menu>
                        <MenuButton>
                            <Tooltip label="Your profile">
                                <Center
                                    style={{ gap: '10px', cursor: 'pointer' }}
                                >
                                    <IoIosArrowDown />
                                    <Avatar
                                        style={{
                                            height: '40px',
                                            width: '40px',
                                        }}
                                        name="Place Holder"
                                        src={src}
                                    />
                                </Center>
                            </Tooltip>
                        </MenuButton>
                        <MenuList
                            style={{
                                backgroundColor: '#000b19',
                                border: '1px solid #333C47',
                                marginTop: '15px',
                            }}
                        >
                            <UserProfile />
                        </MenuList>
                    </Menu>

                    <Tooltip label="Log Out">
                        <Button
                            colorScheme="red"
                            variant="outline"
                            className="outlineHover"
                            style={{ padding: '0 0 0 8px' }}
                            leftIcon={
                                <GiExitDoor
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                    }}
                                />
                            }
                            onClick={LogOutBtn}
                        />
                    </Tooltip>
                </Center>
            </div>
        </>
    );
};

export default Navigation;
