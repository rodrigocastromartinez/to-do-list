const mongodb = require('mongodb')

const { MongoClient, ObjectId } = mongodb

const client = new MongoClient('mongodb://127.0.0.1:27017/data')

client.connect()
    .then(connection => {
        const users = connection.db().collection('users')
        const posts = connection.db().collection('posts')

        // return users.insertOne({ name: 'Pepita Grilla', email: 'pepita@grilla.com', password: '123123123'})
        // return posts.insertOne({ author: new ObjectId("6492c912a531dc9f747efebb"), image: "http://www.image.com/hello.jpg", text: "hello", date: new Date})
        return posts.find({ author: new ObjectId("6492c912a531dc9f747efebb") }).toArray()
    })
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.error(error)
    })
    .finally(() => client.close())