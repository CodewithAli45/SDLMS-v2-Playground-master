"use strict";

const dashboard = module.exports;
const db = require("../../database");
const { google } = require('googleapis');
const credentials = require('./credentials.json');
dashboard.get = async function (req, res, next) {
    var dashboard = {};
    // console.log("err")
    dashboard.title = 'Dashboard application manager';
    // dashboard.sidebar = utils.sidebar(sidebar, 'dashboard',{
    //     classes: 'active'
    // });
//    await getSheetsdata()
    res.render('applicationManager/dashboard', dashboard);
};

async function getSheetsdata(){
    // Import required libraries

// Set up Google Sheets API credentials

const client = new google.auth.OAuth2(
  credentials.client_id,
  credentials.client_secret,
  credentials.redirect_uris[0]
);

// Authenticate with Google Sheets API
client.setCredentials(credentials);
const sheetsAPI = google.sheets({ version: 'v4', auth: client });

// Fetch Google Form responses from Google Sheets
async function fetchFormResponses() {
  try {
    // Fetch response data from Google Sheets
    const response = await sheetsAPI.spreadsheets.values.get({
      spreadsheetId: '1LOSMG1bdcbw8wIMt1nhU7w_uUnIYkQlIcDyULmHd0zk',
      range: 'Sheet1!A2:F', // Update range to match your sheet's range
    });

        // Extract and transform responses into an object
        const responses = response.data.values.map(row => ({
            timestamp: row[0],
            companyName: row[1],
            companyIllustrationLink: row[2],
            role: row[3],
            aboutAssignment: row[4],
            videoLink: row[5],
            numSteps: parseInt(row[6]),
            numObservationDays: parseInt(row[7]),
            selectionProcess: row[8],
          }));

    // Specify the collection name
    const collectionName = 'responses'; // Update with your collection name

    // Get the MongoDB database

    // Insert responses into the collection
    await db.collection(collectionName).insertMany(responses);

    console.log('Responses stored in MongoDB successfully');

    // Close the MongoDB connection
    console.log('Responses stored in MongoDB successfully');
  } catch (err) {
    console.error('Error fetching and storing responses:', err);
  }
}

fetchFormResponses();

}