import { getAllData } from './covid-data.service';
import { sendEmail } from './sendgrid.service';
import { getAllUsers } from './user.service';

function getDataToSendForUser(user, data) {
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

function sendCovidUpdateEmail(user, covidData) {
  const { email, stateName } = user;
  const message = createUpdateMessage(stateName, covidData);
  const subject = `Here is your daily Covid-19 update for ${stateName}`;
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
