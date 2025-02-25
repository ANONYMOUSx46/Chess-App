# ♔ Royal Chess-World ♕
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Royal Chess is an interactive chess game application that allows players to enjoy single-player matches against a bot or engage in multiplayer 1v1 games with friends. The app also includes a reward system, customizable skins, and a side panel for managing inventory, missions, and shop items.

## 🌟 Features

### Core Features
- **Single-Player Mode**: Play against a computer-controlled bot.
- **Multiplayer Mode**: Challenge your friends in real-time 1v1 matches.
- **Reward System**: Earn silver pieces and stars based on your performance.
- **Customizable Skins**: Personalize your chessboard and pieces with unique skins.
- **Save/Load Games**: Save your progress and load games at any time.
- **Game Rooms**: Create or join game rooms for multiplayer matches.

### Additional Features
- **Side Panel**:
  - **Shop**: Purchase new skins and items.
  - **Inventory**: Manage your purchased items.
  - **Missions**: Track your progress and earn rewards.
- **Settings Menu**:
  - Profile settings.
  - Theme customization.
  - Game preferences.
- **Real-Time Updates**: Synchronize moves and game states in multiplayer mode using Firebase Realtime Database.

## 🛠️ Technologies Used

### Frontend
- React.js
- TypeScript
- Vite (Build Tool)
- Tailwind CSS (Styling)
- React Query (State Management)
- Zustand (Global State Management)

### Backend
- Firebase Authentication
- Firebase Realtime Database

### Game Logic
- chess.js (Chess Engine)
- and Stockfish

### Other Tools
- Confetti.js (Visual Effects)
- Sonner (Toasts/Notifications)
- Lucide React (Icons)

## 🚀 Getting Started

### Prerequisites
Before running the project, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. **Clone the Repository**:
    ```bash
    git clone https://github.com/ANONYMOUSx46/Chess-App.git
    cd Chess-App
    ```
2. **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```
   
3. **Run the Development Server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
4. **Build for Production**:
    ```bash
    npm run build
    # or
    yarn build
    ```

## 🎮 How to Play

### Single-Player Mode
- Start a new game against the bot.
- Make your moves on the chessboard and watch the bot respond.

### Multiplayer Mode (NOT ACTIVATED YET)
- Click "Create Game Room" to generate a unique game ID.
- Share the game ID with your friend.
- Your friend can join the game by entering the game ID and clicking "Join Game Room".
- Take turns making moves in real-time.

### Rewards
- Win games to earn silver pieces and stars.
- Use silver pieces to purchase skins and items in the shop.

### Settings
- Customize your profile, theme, and game preferences in the settings menu.
