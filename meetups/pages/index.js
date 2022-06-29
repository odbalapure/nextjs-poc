// import { useEffect, useState } from "react";

import Head from "next/head";
import { Fragment } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "1",
//     title: "Eiffel Tower",
//     image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Paris_vue_d%27ensemble_tour_Eiffel.jpg",
//     address: "Paris France",
//     description: "Our first meetup"
//   },
//   {
//     id: "2",
//     title: "Paris Opera House",
//     image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Paris_Opera_full_frontal_architecture%2C_May_2009_%28cropped%29.jpg",
//     address: "Paris France",
//     description: "Our second meetup"
//   },
// ]

function home(props) {
  /**
   * NOTE: The pre-rendered HTML page does not wait for the 2nd cycle
   * when we have fetched the meetups. Hence the list won't be visible in the
   * source code section (cltr + u).
   * NextJs returns the result of the first component render cycle.
   * There are 2 forms of pre-rendering:
   * - Static generation (good if data does not change frequently)
   * - Server side generation (generates page on every incoming request)
   * 
   * NOTE: "Server side generation" is good as it pre-generates page for every incoming request, 
   * if we want to regenerate the page on the fly and NOT just during "build" process.
   */

  // const [meetups, setMeetups] = useState([]);
  // useEffect(() => {
  //   setMeetups(DUMMY_MEETUPS);
  // }, []);

  return (
    <Fragment>
      <Head>
        <title>NextJS Meetups Home</title>
        <meta name="description" content="Find list of all the meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

/**
 * NOTE: This function works only in Page files
 * And this function is called before the "Page function"
 * and is executed as part of the "build" process
 * 
 * @returns List of meetups
 */
export async function getStaticProps() {
  // NOTE: We can also use the "MongoClient" here itself as this is part
  // of the server side code (technically)
  // const response = await fetch("http://localhost:3000/api/meetups",
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   });

  // const data = await response.json();
  // console.log(data);

  const client = await MongoClient.connect("mongodb+srv://ombalapure7:nodejsprojects@nodejsprojects.9b6xe.mongodb.net/meetups?retryWrites=true&w=majority");
  const db = client.db();

  // Get collection
  const meetupCollection = db.collection("meetups");
  const data = await meetupCollection.find().toArray();

  // Close db connection
  client.close();

  // Now the fetched data is passed as "props" to the "home" function above
  return {
    props: {
      meetups: data.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        // If not done we get a "serialization" errror
        id: meetup._id.toString()
      }))
    },
    // Incremental static generation where NextJS waits for 10 seconds
    // until it generates a page for an incoming request
    // So our data is not older than 10 seconds, this MUST be done
    // to avoid stale data on the client side
    // NOTE: Also we don't need to re-deploy or build our app to get latest data
    revalidate: 10
  }
}

/**
 * This function wont just run during the build but also on the server after deployment
 * This function only runs on the SERVER
 * 
 * NOTE: This is resource intensive. It is useful when the data changes very frequently
 * or incase we have to implement "Authorization" by accessing the "context" object's req/res.
 * If not, then go with "getStaticProps" implementation.
 * 
 * @returns List of meetups
 */
// export function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//     // No need to "revalidate" for every "x" seconds
//   }
// }

export default home;