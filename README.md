# SFS School, Alanagayam - Management App

A simple school management web app built with React and Tailwind CSS.

## Features
- Dashboard with student/staff/fee overview
- Student records (add, search, remove)
- Daily attendance tracking by class
- Fee tracking and payment recording
- Staff directory

## Setup

```bash
npm install
npm start
```

App runs at `http://localhost:3000`.

## Build for production

```bash
npm run build
```

## Deploy to GitHub Pages

1. Push this folder to a new GitHub repository.
2. Install gh-pages (already in devDependencies):
   ```bash
   npm install
   ```
3. In `package.json`, set the `homepage` field to your repo URL, e.g.:
   ```json
   "homepage": "https://<your-username>.github.io/sfs-school-app"
   ```
4. Deploy:
   ```bash
   npm run deploy
   ```
5. In your repo's Settings -> Pages, set the source branch to `gh-pages`.

Your app will be live at `https://<your-username>.github.io/sfs-school-app`.

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - SFS School Alanagayam app"
git branch -M main
git remote add origin https://github.com/<your-username>/sfs-school-app.git
git push -u origin main
```
