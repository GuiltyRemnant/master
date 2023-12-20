import axios from 'axios';

const strapiUrl: string | undefined = process.env.STRAPI_URL;

interface SignInResponse {
  user: string;
  jwt: string;
}

export async function signIn({ token }: { token: string }): Promise<SignInResponse> {
  try {
    if (!strapiUrl) {
      throw new Error('STRAPI_URL environment variable is not defined.');
    }

    const res = await axios.post<SignInResponse>(`${strapiUrl}/api/passwordless/login?loginToken=${token}`);
    return res.data;
  } catch (error) {
    // Handle error here
    throw error;
  }
}



