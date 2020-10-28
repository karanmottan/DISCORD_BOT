const dialogFlow = require('@google-cloud/dialogflow');
const {
    private_key,
    client_email,
    project_id
} = require('./dialogConfig.json');

const sessionId = "151120";
const languageCode = "en";

const sessionClient = new dialogFlow.SessionsClient({
    credentials: {
        private_key,
        client_email
      },
});

const detectIntent = async(query) => {
    const sessionPath = sessionClient.projectAgentSessionPath(
      project_id,
      sessionId
    );
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: languageCode,
        },
      },
    };
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    return result.fulfillmentText;
}

const getResponseText = async (query) => {
    try {
      const textResponse = await detectIntent(query);
      return textResponse;
    } catch (error) {
      console.log(error);
    }
  };

module.exports = {getResponseText};