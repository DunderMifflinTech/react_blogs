const { ObjectID } = require('bson');
const multer = require('multer');
const mongoose = require('mongoose');
// const __DBURL =
//   'mongodb+srv://admin:admin123@mastercluster.dxy63ez.mongodb.net/General?retryWrites=true&w=majority';
// mongoose.set('strictQuery', false);
// mongoose.connect(__DBURL, () => console.log('Post DB connected'));

const postsSchema = mongoose.Schema({
    owner: {
        type: ObjectID,
    },

    headerImg: {
        data: Buffer,
        contentType: String
    },

    body: {
        heading: {
            type: String,
            required: true,
            minLength: [3, "Invalid heading length"]
        },

        mainBody: {
            type: String,
            required: true,
            minLength: [150, "Body length less than 150 characters"],
            maxLength: [1000, "body length more than 1000 characters"]
        }
    },

    likes: [{
        type: ObjectID,
    }],

    comments: [{
        owner: ObjectID,
        type: String,
        likes: [{
            type: ObjectID
        }]
    }]
})

const postsModel = mongoose.model('posts', postsSchema);
module.exports = postsModel;