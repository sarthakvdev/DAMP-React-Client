import Fetch from './Fetch';

const URL = 'https://api.studio.thegraph.com/query/4817/dam-protocol/0.0.1.7';

export const GetPools = async () => {
  const query = {
    query: `
      {
        comptrollers {
          id
          pool {
            id
            name
            assetName
          }
          requestedAmount
          deployer
          Managers {
            id
          }
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

export const GetPool = async (address) => {
  const query = {
    query: `
      {
        comptroller(id: "${address.toLowerCase()}") {
          id
          pool {
            name
            assetName
            id
          }
          Managers {
            id
          }
          requestedAmount
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

export const GetWithdrawals = async ({ user, comptroller }) => {
  const id = `${user.toLowerCase()}-${comptroller.toLowerCase()}`;
  const query = {
    query: `
      {
        userComptroller(id: "${id}") {
          id
          withdrawals
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
