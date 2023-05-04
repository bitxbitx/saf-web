// import { IgApiClient } from 'instagram-private-api';
const IgApiClient = require('instagram-private-api').IgApiClient;
// import { sample } from 'lodash';
require('dotenv').config();

// const IG_PASSWORD = "7130168Icxz99.";
// const IG_USERNAME = "isaaacly";

const IG_PASSWORD = "sn8886810";
const IG_USERNAME = "stanley.nws";

console.log("IG_USERNAME: " + IG_USERNAME);
console.log("IG_PASSWORD: " + IG_PASSWORD);



const ig = new IgApiClient();
// You must generate device id's before login.
// Id's generated based on seed
// So if you pass the same value as first argument - the same id's are generated every time
ig.state.generateDevice(IG_USERNAME);
// Optionally you can setup proxy url
// ig.state.proxyUrl = process.env.IG_PROXY;
(async () => {
  // Execute all requests prior to authorization in the real Android application
  // Not required but recommended
  await ig.simulate.preLoginFlow();
  const loggedInUser = await ig.account.login(IG_USERNAME, IG_PASSWORD);
  // The same as preLoginFlow()
  // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
  process.nextTick(async () => await ig.simulate.postLoginFlow());
  // Create UserFeed instance to get loggedInUser's posts
  const userFeed = ig.feed.user(loggedInUser.pk);
  const myPostsFirstPage = await userFeed.items();
  // All the feeds are auto-paginated, so you just need to call .items() sequentially to get next page
  const myPostsSecondPage = await userFeed.items();
//   await ig.media.like({
//     // Like our first post from first page or first post from second page randomly
//     mediaId: sample([myPostsFirstPage[0].id, myPostsSecondPage[0].id]),
//     moduleInfo: {
//       module_name: 'profile',
//       user_id: loggedInUser.pk,
//       username: loggedInUser.username,
//     },
//     d: sample([0, 1]),
//   });
    console.log(myPostsFirstPage);
    console.log(myPostsSecondPage);
})();