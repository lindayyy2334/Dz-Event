# Commands TODO:


1. clone the repo: 
git clone <repository_url>                  # i sent you the URL 
cd <DZ-EVENT->                              # Our project name 
2. move to the <dev> branch:  
git checkout dev                            # j insiste de pusher sur dev branch tt d'abord (PAS DANS LE MAIN)
4. Pull Latest Changes from <dev-branch>:
git pull origin dev
5. Create a Feature Branch: 
git checkout -b feature/<feature_name> 
  #everyone work on his branch <feature-name> when u finish: Push ur Feature Branch to GitHub =>
6. try push ur <feature-branch>: 
git add .
git commit -m "Add <feature_description>"
git push origin feature/<feature_name> >  # aaaand  ^^ ur job finish here

7. whenever someone finish pushing his branche <feature-name> , i will do merge to the <dev> branch , then u can : 

8. Clean Up the Feature Branch:
git branch -d feature/<feature_name>   # Delete locally
git push origin --delete feature/<feature_name>   # Delete remotely









# Dz-Event-
Développer une plateforme web permettant aux utilisateurs de trouver, réserver et gérer des prestataires événementiels (salles, traiteurs, photographes, etc.) pour organiser des événements en toute simplicité.



/Dz-Event-
  ├── /backend               # Backend-related code (Node.js, Express)
  │   ├── /config            # Configuration files (e.g., database config)
  │   ├── /controllers       # Logic for handling routes and requests
  │   ├── /models            # Database models (e.g., MongoDB models)
  │   ├── /routes            # Express routes
  │   ├── /middleware        # Authentication, authorization middleware
  │   ├── /services          # Business logic layer, API calls
  │   └── /tests             # Backend tests (Jest, Mocha, etc.)
  ├── /frontend              # Frontend-related code (React)
  │   ├── /public            # Static files (index.html, images, etc.)
  │   ├── /src
  │   │   ├── /components    # React components (UI elements)
  │   │   ├── /contexts      # React contexts for global state management
  │   │   ├── /hooks         # Custom React hooks
  │   │   ├── /pages         # React pages (views for routes)
  │   │   ├── /services      # API calls to the backend (Axios, Fetch)
  │   │   ├── /styles        # CSS or styled-components
  │   │   ├── /utils         # Utility functions (formatters, validators)
  │   │   └── /tests         # Frontend tests (Jest, React Testing Library)
  ├── /scripts               # Build, deploy, and other utility scripts
  ├── /node_modules          # Dependencies
  ├── /package.json          # Project metadata, scripts, dependencies
  ├── /package-lock.json     # Locked dependencies (for reproducible installs)
  ├── /README.md             # Project documentation
  ├── /docker-compose.yml    # Docker configuration (if using Docker)
  ├── /Dockerfile            # Docker configuration for backend
  ├── .gitignore             # Files to ignore in git (e.g., node_modules, build)
  └── .env                   # Environment variables (e.g., API keys, database URIs)
