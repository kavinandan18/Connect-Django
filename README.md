# YouTube Downloader

## Overview

YouTube Downloader is a web application that allows users to download YouTube videos. It has a Django backend with Django REST Framework for handling video downloads and a React frontend for a user-friendly interface.

## Backend (Django + Django REST Framework)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/kavinandan18/Connect-Django-With-React.git
    ```

2. Change to the backend directory:

    ```bash
    cd backend
    ```

3. Create a virtual environment:

    ```bash
    python -m venv venv
    ```

4. Activate the virtual environment:

    - On Windows:

        ```bash
        .\venv\Scripts\activate
        ```

    - On macOS and Linux:

        ```bash
        source venv/bin/activate
        ```

5. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

6. Apply migrations:

    ```bash
    python manage.py migrate
    ```

7. Run the development server:

    ```bash
    python manage.py runserver
    ```

### API Endpoints

List and describe the available API endpoints for downloading YouTube videos.

- `POST http://localhost:8000/api/download/`: Submit a YouTube video URL for download.

### Frontend (React)

#### Installation

1. Change to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

#### Development

1. Start the development server:

    ```bash
    npm start
    ```

2. Open your browser and navigate to:

    ```bash
    http://localhost:3000
    ```

#### Usage

Explain how users can interact with the frontend to submit YouTube video URLs for download.

1. Open the web application in your browser.

2. Paste the YouTube video URL into the input field.

3. Click the "Download" button to initiate the download.

## Contributing

If you would like to contribute to the project, follow the guidelines on how to submit issues, propose new features, or create pull requests.

## License

Include licensing information for your project.

## Acknowledgments

Give credit to contributors, libraries, or resources that have been helpful during the development of your project.
