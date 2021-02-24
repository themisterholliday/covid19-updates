import { getAllData } from './covid-data.service';
import { sendEmail } from './sendgrid.service';
import { getAllUsers } from './user.service';

export function getDataToSendForUser(user, data) {
  const selectedState = user.stateAbbreviation;
  const covidData = data.find(
    (x) => x.state.toLowerCase() === selectedState.toLowerCase()
  );
  return covidData;
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function createUpdateMessage(stateName, covidData) {
  const {
    totalTestResultsIncrease,
    positiveIncrease,
    hospitalizedCurrently,
    deathIncrease,
    dateModified,
  } = covidData;
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  if (!dateModified) {
    return null;
  }

  const updatedDate = new Date(dateModified).toLocaleDateString(
    'en-US',
    options
  );

  return `
  The daily reported changes of Covid-19 data in ${stateName} for ${updatedDate}:

  New Tests:
  ${formatNumber(totalTestResultsIncrease)}

  New Cases:
  ${formatNumber(positiveIncrease)}

  Current hospitalizations:
  ${formatNumber(hospitalizedCurrently)}

  New deaths:
  ${formatNumber(deathIncrease)}
  `;
}

export function buildCovidUpdateEmailInfo(user, covidData) {
  const { email, stateName } = user;
  const message = createUpdateMessage(stateName, covidData);
  const subject = `Here is your daily Covid-19 update for ${stateName}`;
  return { email, subject, message };
}

function sendCovidUpdateEmail(user, covidData) {
  const { email, subject, message } = buildCovidUpdateEmailInfo(
    user,
    covidData
  );
  if (!message) {
    console.log(`No message sent for ${user.stateName}`);
    return;
  }
  sendEmail({ toEmail: email, subject, text: message });
}

export async function sendCovidUpdateEmailsToUsers() {
  const covidData = await getAllData();
  const allUsers = await getAllUsers();
  for (const user of allUsers) {
    const usersCovidData = getDataToSendForUser(user, covidData);
    sendCovidUpdateEmail(user, usersCovidData);
  }
}
