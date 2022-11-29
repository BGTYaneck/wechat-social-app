import React from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();
    return (
        <Box
            textAlign="center"
            py={10}
            px={6}
        >
            <CheckCircleIcon
                boxSize={'50px'}
                color={'red.500'}
            />
            <Heading
                as="h2"
                size="xl"
                mt={6}
                mb={2}
            >
                Success!
            </Heading>
            <Text color={'gray.500'}>
                Your account has been successfully created - click on the button
                below to be redirected to the homepage!
            </Text>
            <Button
                colorScheme="red"
                bgGradient="linear(to-r, red.400, red.500, red.600)"
                color="white"
                variant="solid"
                style={{ width: '12rem', marginTop: '2rem' }}
                onClick={() => navigate('/')}
            >
                Go to Home
            </Button>
        </Box>
    );
};

export default Success;
