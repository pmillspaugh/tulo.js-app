import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';

export default async function fetchUserIdHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if token is an array, save the first element (to satisfy accessToken type checking in find query below)
  let token = req.query.token;
  if (Array.isArray(token)) token = token[0];

  // connect to the database
  const db = await dbConnect();

  // if the request is a GET request, send back the session document of the current user
  if (req.method === 'GET') {
    try {
      // access sessions collection from the database
      const sessionsCollection = await db.collection('sessions');
      // query sessions collection for document matching user access token
      const session = await sessionsCollection.findOne({
        accessToken: token,
      });
      // send the session associated with the user back to the client-side
      return res.status(200).json(session);
    } catch (error) {
      // TODO: add more robust error-handling
      console.log({ error });
      return res.status(500).send('Error retrieving user session information.');
    }
  } else {
    return res.status(500).send('fetch request to api/:token not handled');
  }
}
