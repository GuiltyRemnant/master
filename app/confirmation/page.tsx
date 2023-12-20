'use client';
import { getToken } from '@/components/api';
import { signIn } from "next-auth/react";
import { useEffect, useState } from 'react';
import { Button } from "@nextui-org/button";
import { useRouter } from 'next/navigation';
import { Registration } from '@/components/registration';
import { Card, Progress, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";

export default function ConfirmationPage() {
	const signInFailed = 'Sign-in failed. Please try again.';
	const logInFailed = 'Login failed. Please try again.';
	const responseFailed = 'Response failed. Please try again.';
	const tokenParamMissing = 'Token parameter is missing.';
	const signInSuccessRedirect = 'Sign-in successful. Redirecting...';
	const signInSuccessLogin = 'Sign-in successful. Login...';
	const pleaseWait = 'Please wait ...';

	const [status, setStatus] = useState<string>(pleaseWait);
	const { push } = useRouter();

	const handleSignIn = async (tokenFromQuery: string) => {
		await signIn('credentials', {
			token: tokenFromQuery,
			callbackUrl: "/video",
		}).then((data) => {
			if (data?.error) {
				setTimeout(() => setStatus(signInFailed), 5000);
			} else {
				setStatus(signInSuccessRedirect);
			}
		});
	}

	const handleLogin = async () => {
		const searchParams = new URLSearchParams(window.location.search);
		const tokenFromQuery = searchParams.get('loginToken');

		if (tokenFromQuery) {
			await handleSignIn(tokenFromQuery);

			// @ts-ignore
			/* if (response && response.data.jwt) {
				handleSignIn(response);
			} else {
				setTimeout(() => setStatus(responseFailed), 5000);
			} */
		} else {
			setStatus(tokenParamMissing);
		}
	};

	useEffect(() => {
		handleLogin();
	}, []);

	return (
		<>
			<Card className="min-w-[360px]">
				<CardHeader className="flex gap-3">
					<div className="flex flex-col">
						<p className="text-md">BB - Login</p>
					</div>
				</CardHeader>
				{status === pleaseWait ? (
					<>
						<Progress
							isIndeterminate
							size="sm"
							aria-label="Loading..."
							classNames={{
								track: "h-1 drop-shadow-md border border-default",
								indicator: "bg-gradient-to-r from-pink-500 to-purple-500",
							}}

							value={100}
						/>
					</>
				) : (
					<>
					 <Divider className="h-1 " />
					</>
				)}
				<CardBody>
						<>
							<p>{status}</p>
						</>
				</CardBody>
				<Divider />
				<CardFooter>
					{status === pleaseWait || status === signInSuccessRedirect || status === signInSuccessLogin ? (
						<>
							<div className="flex gap-2">
								<Button isDisabled>Sign Up</Button>
								<Button isDisabled>Back to Homepage</Button>
							</div>
						</>
					) : (
						<>
							<div className="flex gap-2">
								<Registration msg='Sign Up' />
								<Button onPress={() => { push('/'); }}>Back to Homepage</Button>
							</div>
						</>
					)}

				</CardFooter>
			</Card>
		</>

	);
}
