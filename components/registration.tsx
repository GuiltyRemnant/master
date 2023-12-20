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
import { sendLoginLink } from './api';
import { useState } from 'react';
// @ts-ignore
import {MailSend} from '@styled-icons/boxicons-regular/MailSend';


export const Registration = ({ msg = "Sign In", size = "lg" }: any) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [emailValue, setEmailValue] = React.useState('');
    const validateEmail = (value: string) => value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/i);
    const isEmailInvalid = React.useMemo(() => {
        if (emailValue === "") return false;
        return validateEmail(emailValue) ? false : true;
    }, [emailValue]);

    const [linkSent, setLinkSent] = useState(false);
    const [error, setError] = useState({ message: 'no error' });

    const handleSendLink = async () => {
        try {
            const email = emailValue; // Hier die E-Mail-Adresse einfügen

            await sendLoginLink({ email, username: email });

            // Link wurde erfolgreich gesendet
            setLinkSent(true);
        } catch (err: any) {
            console.error('Error sending login link:', err);
            setError({ message: err });
        }
    };


    return (
        <>
            <Button size={size} onPress={onOpen} className="text-white bg-gradient-to-tr from-violet-900 to-blue-500 dark:from-violet-900 dark:to-pink-500">
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
                                {linkSent && 'Thanks!'}
                                {!linkSent && 'Log in'}
                            </ModalHeader>
                            <ModalBody>
                                {linkSent &&
                                    <div className="p-3 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large flex gap-3">
                                        <div className="w-8 relative  shadow-black/5 shadow-none rounded-small">
                                            <MailSend />
                                        </div>
                                        <p>Please confirm the link we just sent you.</p>
                                    </div>
                                }
                                {!linkSent &&
                                    <Input
                                        autoFocus
                                        required
                                        value={emailValue}
                                        isInvalid={true}
                                        color={isEmailInvalid ? "danger" : "success"}
                                        errorMessage={isEmailInvalid && "Please enter a valid email"}
                                        onValueChange={setEmailValue}
                                        type="email"
                                        label="Email"
                                        placeholder="Enter your email"
                                        variant="bordered"
                                    />
                                }
                            </ModalBody>
                            <ModalFooter>
                                {!linkSent &&
                                    <>
                                        <Button color="danger" variant="flat" onPress={onClose}>
                                            Close
                                        </Button>

                                        {!isEmailInvalid && emailValue !== '' &&
                                            <Button color="primary" onPress={handleSendLink}>
                                                Sign in
                                            </Button>
                                        }
                                    </>

                                }
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
