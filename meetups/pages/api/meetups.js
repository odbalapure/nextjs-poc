import { MongoClient } from "mongodb";

/**
 * @desc Get all meetups
 * @param {*} req 
 * @param {*} res 
 */
async function meetups(req, res) {
  if (req.method == "GET") {
    // Setup db connection
    const client = await MongoClient.connect("mongodb+srv://ombalapure7:nodejsprojects@nodejsprojects.9b6xe.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();

    // Get collection
    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.find().toArray();
    console.log();

    // Close db connection
    client.close();

    // Return response
    res.status(200).json(result);
  }
}

export default meetups;