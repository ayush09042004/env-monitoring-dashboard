# Environmental Monitoring System (IoT + AI)

This project is a full-stack environmental monitoring system that simulates IoT sensor data, streams it in real time, stores it in MongoDB, applies threshold-based alerts, and optionally uses AI to analyze anomalies. The complete system runs using Docker and Docker Compose.

## Features

- Real-time IoT sensor simulation
- Live dashboard with charts and metrics
- WebSocket streaming using Socket.IO
- Threshold-based alerting system
- Optional AI anomaly explanation using OpenAI
- Optional SMS alerts using Twilio
- MongoDB time-series data storage
- Fully Dockerized frontend, backend, and database

## Tech Stack

### Frontend
- React
- Socket.IO Client
- Recharts

### Backend
- Node.js
- Express
- Socket.IO
- MongoDB
- Mongoose

### Infrastructure
- Docker
- Docker Compose

## Project Structure

Env-monitoring/
├── backend/
│ ├── models/
│ ├── routes/
│ ├── alerts/
│ ├── anomalyDetector.js
│ ├── aiAnalyzer.js
│ ├── iotClientSimulation.js
│ ├── server.js
│ ├── .env.example
│ └── Dockerfile
│
├── frontend/
│ ├── public/
│ ├── src/
│ ├── package.json
│ └── Dockerfile
│
├── docker-compose.yml
└── README.md


## Environment Variables

Create a `.env` file inside the `backend` folder.

MONGO_URI=mongodb://mongo:27017/env_monitor
OPENAI_API_KEY=your_openai_api_key_here
TWILIO_SID=your_twilio_sid
TWILIO_AUTH=your_twilio_auth
TWILIO_PHONE=+1234567890
ALERT_PHONE=+911234567890

pgsql
Copy code

### Notes

- OpenAI and Twilio are optional
- If OpenAI quota is exceeded, the system continues without AI insights
- Do not commit the `.env` file to GitHub

## How to Run the Project

### Step 1: Start all services using Docker

docker compose up --build

nginx
Copy code

This starts:
- Frontend on http://localhost:3000
- Backend on http://localhost:5000
- MongoDB inside Docker

### Step 2: Start IoT sensor simulation in a new terminal

docker compose exec backend node iotClientSimulation.js

powershell
Copy code

This sends sensor data every 2 seconds.

### Step 3: Open the dashboard

http://localhost:3000

markdown
Copy code

## Dashboard Usage

- View live Temperature, Humidity, and Air Quality values
- Observe real-time charts updating continuously
- Click **Set Temperature Threshold (35°C)** to create a rule
- Alerts appear automatically when thresholds are breached

## Threshold Rules

Thresholds are stored in MongoDB and evaluated in real time.

**Example rule**
- Metric: temperature
- Max value: 35

When breached:
- Alert is emitted to the dashboard
- Optional SMS is sent if Twilio is configured

## AI Anomaly Detection

- Uses recent sensor history
- Detects unusual deviations
- Requests a brief explanation from OpenAI
- If OpenAI is unavailable, the system logs a warning and continues

## Docker Notes

- Containers communicate using Docker service names
- MongoDB data persists using Docker volumes
- No local MongoDB installation is required

## Quick Demo Commands

docker compose up --build
docker compose exec backend node iotClientSimulation.js

r
Copy code

Open browser:
http://localhost:3000

shell
Copy code

## Author

Ayush Zindal  
B.Tech Computer Science Engineering

## Disclaimer

This project is intended for learning, demonstration, and evaluation purposes.  
AI and SMS features are optional and fail-safe.
