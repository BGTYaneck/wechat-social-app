import React from 'react';
import {
    Button,
    Center,
    Input,
    Textarea,
    FormControl,
    FormLabel,
    Flex,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { GiFeather } from 'react-icons/all';

interface Post {
    message: string;
    attachment: File;
}

const PostSchema = Yup.object().shape({
    message: Yup.string()
        .max(300, "Posts can't be longer than 300 letters.")
        .required('Post cannot be empty.'),
    attachment: Yup.mixed().test(
        'fileSize',
        'The file is too large',
        (value) => {
            if (!value.length) return true;
            return value[0].size <= 200000000;
        }
    ),
});

const CreatePostForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Post>({
        defaultValues: {},
        resolver: yupResolver(PostSchema),
    });

    const onSubmit = (data: Post) => {
        data;
    };
    return (
        <Center>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                }}
            >
                <FormControl>
                    <FormLabel
                        fontSize="md"
                        fontWeight="md"
                    >
                        What do you want to post about today?
                    </FormLabel>
                    <Textarea
                        errorBorderColor="red.500"
                        focusBorderColor="red.300"
                        placeholder="I had a really really good day today!"
                        resize={'vertical'}
                        style={{ height: '10rem' }}
                        {...register('message')}
                    />
                    <p
                        style={{
                            color: 'red',
                            fontSize: '12px',
                            fontWeight: 'bold',
                        }}
                    >
                        {errors.message?.message}
                    </p>
                </FormControl>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <Input
                        style={{ width: '8rem' }}
                        placeholder={'Attach files'}
                    />
                    <Button
                        leftIcon={<GiFeather />}
                        variant="outline"
                        colorScheme="red"
                        type="submit"
                        className="outlineHover"
                        style={{ width: '8rem' }}
                    >
                        Publish
                    </Button>
                </div>
            </form>
        </Center>
    );
};

export default CreatePostForm;
