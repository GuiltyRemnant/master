"use client";

import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { uploadVideo } from './api';
import { useState } from 'react';
// @ts-ignore
import { MailSend } from '@styled-icons/boxicons-regular/MailSend';
import { UploadField } from './uppyVideoUploadField'

import { Registration } from "./registration";
import MultiSelectField from "./multiSelectField";

export const UploadForm = ({ msg = "Upload", session = null }: any) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [title, setTitle] = React.useState('');
    const [video, setVideo] = React.useState('');
    const [authorId, setAuthorId] = React.useState('');
    const [tags, setTags] = React.useState('');

    /* const [emailValue, setEmailValue] = React.useState('');
    const validateEmail = (value: string) => value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/i);
    const isEmailInvalid = React.useMemo(() => {
        if (emailValue === "") return false;
        return validateEmail(emailValue) ? false : true;
    }, [emailValue]); */

    const isTitleInvalid = React.useMemo(() => {
        const validateTitle = (value: string) => value.match(/^.{8,}$/i);
        if (title === "") return false;
        return validateTitle(title) ? false : true;
    }, [title]);


    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [error, setError] = useState({ message: 'no error' });

    /* console.log(session); */

    const handleUpload = async () => {
        try {

            const data = {
                data: {
                    title: title,
                    video: video,
                    authorId: authorId,
                    tags: tags
                }
            }
            await uploadVideo(data);

            // Link wurde erfolgreich gesendet
            setUploadSuccess(true);
        } catch (err: any) {
            console.error('Error sending login link:', err);
            setError({ message: err });
        }
    };


    return (
        <>
            {!session &&
                <Registration msg="Upload" size="sm" />
            }
            {session &&

                <>

                    <Button size="sm" onPress={onOpen} className="text-white bg-gradient-to-tr from-violet-900 to-blue-500 dark:from-violet-900 dark:to-pink-500">
                        {msg}
                    </Button>
                    <Modal
                        backdrop={'blur'}
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        placement="center"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">
                                        {uploadSuccess && 'Thanks!'}
                                        {!uploadSuccess && 'Upload'}
                                    </ModalHeader>
                                    <ModalBody>
                                        {uploadSuccess &&
                                            <div className="p-3 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large flex gap-3">
                                                <div className="w-8 relative  shadow-black/5 shadow-none rounded-small">
                                                    <MailSend />
                                                </div>
                                                <p>Thanks for the Upload.</p>
                                            </div>
                                        }
                                        {!uploadSuccess &&
                                            <Input
                                                autoFocus
                                                required
                                                value={title}
                                                isInvalid={true}
                                                color={isTitleInvalid ? "danger" : "success"}
                                                errorMessage={isTitleInvalid && "Please enter a title"}
                                                onValueChange={setTitle}
                                                type="text"
                                                label="Title"
                                                placeholder="Give your Video a title ..."
                                                variant="bordered"
                                            />
                                        }
                                        <UploadField userId={session.id} />
                                        <MultiSelectField />
                                    </ModalBody>
                                    <ModalFooter>

                                        <>
                                            <Button color="danger" variant="flat" onPress={onClose}>
                                                Close
                                            </Button>
                                            {!uploadSuccess &&
                                                <Button color="primary" onPress={handleUpload}>
                                                    Save
                                                </Button>

                                            }
                                        </>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>

                </>

            }

        </>
    );
}
