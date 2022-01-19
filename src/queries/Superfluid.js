import Fetch from './Fetch';

const URL =
  'https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-mumbai';

export const GetFlowDetails = async ({ owner, recipient }) => {
  const query = {
    query: `
      flows(where: {
          owner: "${owner.toLowerCase()}"
          recipient: "${recipient.toLowerCase()}"
        }
      ){
        sum
        flowRate
        lastUpdate
        token {
          name
          symbol
        }
      }`,
  };

  try {
    const data = await Fetch(query, URL);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const AllFlowsByUser = async ({ user }) => {
  const query = {
    query: `
      flows(where: {
          owner: "${user.toLowerCase()}"
        }
      ){
        sum
        flowRate
        lastUpdate
        token {
          name
          symbol
        }
        recipient {
          id
        }
      }`,
  };

  try {
    const data = await Fetch(query, URL);
    return data;
  } catch (err) {
    console.log(err);
  }
};
