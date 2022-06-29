import { MongoClient } from "mongodb";

/**
 * @desc Create a new meetup
 * @param {*} req 
 * @param {*} res 
 */
async function createNewMeetup(req, res) {
  if (req.method == "POST") {
    const data = req.body;

    // Setup db connection
    const client = await MongoClient.connect("mongodb+srv://ombalapure7:nodejsprojects@nodejsprojects.9b6xe.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();

    // Get collection
    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);
    console.log(result);

    // Close db connection
    client.close();

    // Return response
    res.status(200).json({msg: "Meetup created!"});
  }
}

export default createNewMeetup;