// import { useRouter } from "next/router";

import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  // NOTE: useRouter can be used in "Components" not in "Pages" function
  // const router = useRouter();
  // const meetupId = router.query.meetupId;
  // console.log(meetupId);

  return (
    <Fragment>
      <Head>
        <title>Meetup details</title>
        <meta name="description" content="See meetup details" />
      </Head>
      <MeetupDetail
        image={props.meetup.image}
        title={props.meetup.title}
        address={props.meetup.address}
        description={props.meetup.description}
      />
    </Fragment>
  );
}

/**
 * Tell NextJs that for which dynamic parameter value this page should pe pre-generated
 * @returns getStaticPaths object
 */
export async function getStaticPaths() {
  const client = await MongoClient.connect("mongodb+srv://ombalapure7:nodejsprojects@nodejsprojects.9b6xe.mongodb.net/meetups?retryWrites=true&w=majority");
  const db = client.db();

  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();

  // For getStaticProps, the page is pregenerated during build process
  // NextJS should know for which ID value the page should regenerate
  // There should be list of all the possible ID values
  return {
    // False: we have all supported parameter values (eg: IDs).
    // True: don't have all the supported parameter values (generate a page on the fly).
    // Blocking: NextJS will not put 404 error if page not found immediately. A page will be generated on demand and then gets cached.
    // NOTE: true returns page immediately and pull down the dynamic data.
    fallback: blocking,
    // paths: [
    //   {
    //     params: {
    //       meetupId: "1"
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "2"
    //     }
    //   }
    // ]
    paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } }))
  }
}

/**
 * Get details of a meetup
 * @param {*} context 
 * @returns Meetup
 */
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect("mongodb+srv://ombalapure7:nodejsprojects@nodejsprojects.9b6xe.mongodb.net/meetups?retryWrites=true&w=majority");
  const db = client.db();

  const meetupCollection = db.collection("meetups");
  const singleMeetup = await meetupCollection.findOne(
    { _id: ObjectId(meetupId) }
  );

  client.close();

  return {
    props: {
      meetup: {
        id: singleMeetup._id.toString(),
        title: singleMeetup.title,
        address: singleMeetup.address,
        image: singleMeetup.image,
        description: singleMeetup.description
      }
    }
  }
}

export default MeetupDetails;