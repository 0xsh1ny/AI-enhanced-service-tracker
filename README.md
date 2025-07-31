# AI-Enhanced Service Work Tracker

A modern, responsive service work tracking application with AI-powered task summaries and Notion integration.

## Features

- 📊 **Dashboard**: Real-time analytics and task overview
- ✅ **Task Management**: Add, edit, complete, and track tasks
- 🤖 **AI Summaries**: Automated task summaries for quick insights
- 📱 **Responsive Design**: Works perfectly on all devices
- 🔗 **Notion Integration**: Sync tasks with your Notion workspace
- 🎨 **Glassmorphism UI**: Modern, beautiful interface design

## Quick Start

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/0xsh1ny/AI-enhanced-service-tracker
cd ai-service-tracker
```

2. Build and run with Docker Compose:
```bash
docker-compose up -d
```

3. Open your browser to `http://localhost`

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Docker Deployment

### Build Docker Image

```bash
docker build -t ai-service-tracker .
```

### Run Container

```bash
docker run -p 3000:3000 ai-service-tracker
```

### Docker Compose (with Nginx)

```bash
docker-compose up -d
```

This will start:
- The React app on port 3000
- Nginx reverse proxy on port 80

## GitHub Actions CI/CD

Create `.github/workflows/deploy.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Build Docker Image
      run: docker build -t ai-service-tracker .
    
    - name: Deploy to Production
      run: |
        # Add your deployment commands here
        echo "Deploying to production..."
```

## Configuration

### Notion Integration

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Create a new integration
3. Copy the integration token
4. Create a database in Notion with "Name" and "Description" properties
5. Share the database with your integration
6. Copy the database ID from the URL
7. Enter both values in the Settings page

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── TasksView.tsx   # Task management
│   ├── Settings.tsx    # Configuration
│   └── ...
├── utils/              # Utility functions
│   └── aiSummary.ts   # AI summary generation
├── App.tsx            # Main app component
└── main.tsx          # Entry point
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Docker** - Containerization
- **Lucide React** - Icons

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
