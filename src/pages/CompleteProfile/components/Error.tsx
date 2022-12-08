import React from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
const Error = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    return (
        <Box
            textAlign="center"
            py={10}
            px={6}
        >
            <WarningIcon
                boxSize={'50px'}
                color={'red.500'}
            />
            <Heading
                as="h2"
                size="xl"
                mt={6}
                mb={2}
            >
                An error occured
            </Heading>
            <Text color={'gray.500'}>
                There was an error creating your profile. Try again later.
                <br /> {params.get('message')}
            </Text>
            <Button
                colorScheme="red"
                bgGradient="linear(to-r, red.400, red.500, red.600)"
                color="white"
                variant="solid"
                style={{ width: '12rem', marginTop: '2rem' }}
                onClick={() => navigate('/complete-profile')}
            >
                Try Again
            </Button>
        </Box>
    );
};

export default Error;
