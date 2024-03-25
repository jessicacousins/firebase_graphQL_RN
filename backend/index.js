const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

const serviceAccountPath = process.env.SERVICE_ACCOUNT_PATH;
const databaseURL = process.env.DATABASE_URL;

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL,
});

const typeDefs = gql`
  type Mutation {
    signUp(phoneNumber: String!, password: String!): String
  }
  type Query {
    verifyIdToken(token: String!): User
  }
  type User {
    uid: String
    email: String
    phoneNumber: String
  }
`;

const resolvers = {
  Mutation: {
    signUp: async (_, { phoneNumber, password }) => {
      try {
        const userRecord = await admin.auth().createUser({
          phoneNumber: phoneNumber,
          password: password,
        });
        return userRecord.uid;
      } catch (error) {
        throw error;
      }
    },
  },
  Query: {
    verifyIdToken: async (_, { token }) => {
      try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (decodedToken) {
          return {
            uid: decodedToken.uid,
            email: decodedToken.email,
            phoneNumber: decodedToken.phone_number,
          };
        }
        throw new Error("Invalid token");
      } catch (error) {
        throw error;
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(cors());
app.use(express.json());

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;
  app.listen(port, () =>
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
}

startServer();

app.post("/verifyToken", async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.json({
      uid: decodedToken.uid,
      email: decodedToken.email,
      phoneNumber: decodedToken.phone_number,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});
