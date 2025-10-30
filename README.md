# React Crypto Tracker

## Overview
React Crypto Tracker is a full-stack web application that tracks cryptocurrency prices and stores historical data for analysis.

## Tech Stack
- **Frontend:** React  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  

## Cron Job
A scheduled cron job runs every 1 hour.  
It performs the following tasks:
1. Fetches the latest cryptocurrency data from the **CoinGecko API**.  
2. Stores the fetched data into the **History Data** collection in MongoDB.

## Deployment Links
- **Frontend:** [https://rct-prince.netlify.app](https://rct-prince.netlify.app)  
- **Backend:** [https://react-crypto-tracker-p0ov.onrender.com](https://react-crypto-tracker-p0ov.onrender.com/api/coins)

### Sample Database Data
![Database Screenshot](https://ibb.co/d4xRxCyF)
