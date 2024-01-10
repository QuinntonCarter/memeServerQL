const { Meme } = require("../models/meme.js");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLError,
} = require("graphql");

const MemeType = new GraphQLObjectType({
  name: "Meme",
  fields: () => ({
    id: { type: GraphQLID },
    imgSrc: { type: GraphQLString },
    initialUrl: { type: GraphQLString },
    _api_id: { type: GraphQLString },
    created: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    memes: {
      type: new GraphQLList(MemeType),
      resolve(parentValue, args) {
        return Meme.find();
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMeme: {
      type: MemeType,
      args: {
        imgSrc: { type: new GraphQLNonNull(GraphQLString) },
        initialUrl: { type: new GraphQLNonNull(GraphQLString) },
        _api_id: { type: new GraphQLNonNull(GraphQLString) },
        created: { type: GraphQLString },
      },
      async resolve(parentValue, args) {
        const createdMeme = new Meme({
          imgSrc: args.imgSrc,
          initialUrl: args.initialUrl,
          _api_id: args._api_id,
          created: args.created,
        });
        const newMeme = await createdMeme.save();
        if (!createdMeme || !newMeme) {
          return new GraphQLError("Server error with meme creation", {
            extensions: { code: "INTERNAL_SERVER_ERROR" },
          });
        } else {
          return newMeme;
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
