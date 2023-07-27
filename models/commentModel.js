const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const __DBURL =
  'mongodb+srv://admin:admin123@mastercluster.dxy63ez.mongodb.net/General?retryWrites=true&w=majority';
mongoose.set('strictQuery', false);
mongoose.connect(__DBURL, () => console.log('Post DB connected'));

const commentsSchema = mongoose.Schema({
  postId: {
    type: ObjectID,
    required: true,
  },
  comments: [
    {
      ownerId: {
        type: ObjectID,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      editedAt: {
        type: Date,
        default: null,
      },
      body: {
        type: String,
        required: true,
        validate: {
            validator: function(v){
            return !v.split(" ").length <= 0
            }
        },
      },
      likes: {
        type: ObjectID,
        default: 0,
      },
      replies: [
        {
          ownerId: {
            type: ObjectID,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now(),
          },
          editedAt: {
            type: Date,
            default: null,
          },
          body: {
            type: String,
            required: true,
            validate: {
                validator: function(v){
                return !v.split(" ").length <= 0
                }
            },
          },
          likes: [
            {
              type: ObjectID,
            },
          ],
        },
      ],
    },
  ],
});

const commentsModel = mongoose.model('comments', commentsSchema);
module.exports = commentsModel;