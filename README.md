# Pei's Personal Blog

This repository hosts the source code for Pei's personal blog, built using Node.js and the EJS templating engine. The blog is a platform to share insights, projects, and personal experiences.

## Features

- **Dynamic Content Rendering**: Uses EJS for server-side HTML rendering.
- **Modular Structure**: Organized into views, public assets, and backend logic for scalability.
- **Responsive Design**: Optimized for viewing across devices.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Amanda70106/Pei-s-personal-blog.git
   cd Pei-s-personal-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and go to `http://localhost:3000`.

## MongoDB Installation
1. Install mongodb-community via homebrew
   ```bash
      brew install mongodb-community
   ```
2. Prepare a Data Directory
   ```bash
      mkdir -p ~/data/db
      sudo chown -R $(whoami) ~/data/db
   ```
3. Start MongoDB
   ```bash
      mongod --dbpath ~/data/db --port 27017
   ```
4. Connect Using mongosh
   ```bash
      mongosh
   ```
## Technologies Used
- **Node.js** – Server-side JavaScript runtime.
- **EJS** – Templating engine for dynamic HTML.
- **CSS** – Styling for layout and design.

## Contributing

Contributions are welcome! Fork the repository, create a branch, and submit a pull request with your changes.

## License

This project is licensed under the MIT License.

