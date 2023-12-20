import axios from 'axios';

const strapiUrl: string | undefined = process.env.STRAPI_URL;

interface SendLoginLinkParams {
  email: string;
  username: string;
  context?: Record<string, any>;
}

interface GetTokenParams {
  token: string;
}

interface StrapiUser {
  jwt: string;
}

interface UploadVideo {
  data: {
    title: string;
    authorId: string;
    video: string;
    tags: any;
  }
}

export const sendLoginLink = async ({ email, username, context }: SendLoginLinkParams) => {
    await axios.post(`${strapiUrl}/api/passwordless/send-link`, {
        email,
        username,
        context,
      }); 
};

export const uploadVideo = async ({ data }: UploadVideo) => {

  const authToken = 'DEIN_TOKEN_HIER';

  // Definieren Sie den Header, der das Token enthält
  const headers = {
    'Authorization': `Bearer ${authToken}`,
  };


  axios
  .post('http://localhost:1337/api/restaurants/?populate=categories', data, { headers }) // Fügen Sie den Header zur Anfrage hinzu
  .then(response => {
    console.log(response);
  });
};

export const getToken = async ({ token }: GetTokenParams): Promise<null | undefined | StrapiUser> => {
  try {
  const answer = await axios.get(`${strapiUrl}/api/passwordless/login?loginToken=${token}`);
  // @ts-ignore
  return answer;
  } catch (error) {
    return null;
  }
};
