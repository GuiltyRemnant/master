import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                token: { label: "Token", type: "text" },
            },
            async authorize(credentials: any, req) {
                /* const crypto = require("crypto");
                const id = crypto.randomBytes(20).toString('hex');
                return {
                    id: id,
                    Token: credentials.token,
                }; */

                // return (
                /**
                 * This function is used to define if the user is authenticated or not.
                 * If authenticated, the function should return an object contains the user data.
                 * If not, the function should return `null`.
                 */
                if (credentials == null) return null;
                /**
                 * credentials is defined in the config above.
                 * We can expect it contains one property: `token`
                 */

                // using axios is recommended but optional. You can use native fetch() or other libraries.
                try {
                    const { user, jwt } =
                        (await axios
                            .get(`${process.env.STRAPI_URL}/api/passwordless/login?loginToken=${credentials.token}`)
                            .then((response) => {
                                return response.data;
                            })
                            .catch((error) => {
                                console.log(error.response);
                                throw new Error(error.response.data.message);
                            })) || null;

                    return { jwt, ...user };
                } catch (error) {
                    console.warn(error);
                    // Sign In Fail
                    // return null;
                }
            },
        }),
    ],
    

    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                // @ts-ignore
                token.jwt = user.jwt;
                // @ts-ignore
                token.username = user.username; /* ### */
            }
            return Promise.resolve(token);
        },
        session: async ({ session, token }) => {
            // @ts-ignore
            session.id = token.id;
            // @ts-ignore
            session.jwt = token.jwt; /* ### */
            return Promise.resolve(session);
        },
    },
};