'use strict';

const logger = require('../../logger');
const error = require('../../errors');
const { dataReceiverBaseUrl } = require('../../config');
const { usersCount, screens, maxEventCountToBeSent } = require('../../constants');

const { v4: uuid } = require('uuid');
const momentRandom = require('moment-random');
const got = require('got');

module.exports = async (req, res) => {
  const {
    query: { recordCount },
    metadata: { reqId }
  } = req;

  logger.debug({ message: 'Simulating user behavioral data', id: reqId });
  try {
    // generate user-uuids
    let users = [];
    for (let i = 0; i <= usersCount; ++i) {
      users.push(uuid());
    }

    // generate random data
    let randomData = [];
    for (let i = 0; i <= recordCount; ++i) {
      let a = {
        'user-uuid': users[Math.floor(Math.random() * users.length)],
        'screen': screens[Math.floor(Math.random() * screens.length)],
        'timestamp': momentRandom().unix()
      };
      randomData.push(a);
    }

    // Send data by chunks
    const chunkedEvents = randomData.reduce((resultArray, item, index) => { 
      const chunkIndex = Math.floor(index / maxEventCountToBeSent);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }

      resultArray[chunkIndex].push(item)

      return resultArray
    }, []);


    for (let chunk of chunkedEvents) {
      // send the data to DataReceiver
      await got.post(`${dataReceiverBaseUrl}/v1/events`, {
        json: chunk
      });
    }
  } catch (err) {
    throw new error.InternalServerError({ message: err.message });
  }

  res.status(201).end();
};
