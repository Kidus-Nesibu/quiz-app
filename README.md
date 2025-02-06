📚 Quiz App

An AI-powered interactive quiz platform designed to enhance learning through engaging multiple-choice questions. The app leverages AI to generate questions, provide explanations, and adapt to users' performance for a personalized experience.
🚀 Tech Stack

    Frontend: React, Tailwind CSS, Vite
    Backend: TriviaDB API (for fetching quiz questions)
    Deployment: Not yet hosted

🛠 Installation & Setup
1️⃣ Clone the Repository

git clone https://github.com/yourusername/quiz-app.git
cd quiz-app

2️⃣ Install Dependencies

npm install

3️⃣ Set Up Environment Variables

Create a .env file in the root directory and add your API keys (if required). Example:

VITE_API_BASE_URL=https://opentdb.com/api.php

4️⃣ Start the Development Server

npm run dev

Then, open your browser and visit:
🔗 http://localhost:5173 (Vite’s default port)
🎮 Usage

    Select a quiz category to begin.
    Answer multiple-choice questions and receive instant feedback.
    View your score at the end of the quiz.
    Retake quizzes to improve your knowledge.

📄 Documentation
Project Structure

quiz-app/
│── public/         # Static assets
│── src/
│   ├── components/ # Reusable UI components
│   ├── pages/      # Main app pages
│   ├── utils/      # Helper functions
│   ├── hooks/      # Custom React hooks
│   ├── api/        # API calls (TriviaDB integration)
│   ├── styles/     # Tailwind CSS configurations
│── .env            # Environment variables
│── package.json    # Dependencies & scripts
│── README.md       # Project documentation

API Integration (TriviaDB API)

    Base URL: https://opentdb.com/api.php
    Endpoints Used:
        https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
        Parameters:
            amount: Number of questions
            category: Quiz category
            difficulty: Easy, Medium, Hard
            type: multiple (Multiple-choice)

👨‍💻 Contributing

Contributions are welcome! To contribute:

    Fork the repository
    Create a new branch

git checkout -b feature-name

Commit your changes

git commit -m "Add new feature"

Push your branch

    git push origin feature-name

    Open a Pull Request 🚀

📜 License

This project is licensed under the MIT License.
📞 Contact

For any inquiries, reach out to:
📧 Kidus Nesibu | ✉️ knesibu3@gmail.com
📺 Demo Video

▶️ Watch Demo (YouTube video of the app in action)