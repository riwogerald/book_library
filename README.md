# Book Library Management System

A modern Ruby on Rails web application for managing a digital book lending library. This system allows users to browse available books, borrow them with automatic due date tracking, and manage their reading history through an intuitive web interface.

## 🚀 Features

### User Management
- **User Registration & Authentication**: Secure email/password authentication system
- **User Profiles**: Personal dashboard showing borrowed books and reading history
- **Session Management**: Secure login/logout functionality

### Book Management
- **Book Catalog**: Browse comprehensive book listings with detailed information
- **Book Details**: View title, author, ISBN, description, and category
- **Availability Tracking**: Real-time status showing available vs. borrowed books
- **ISBN Validation**: Automatic validation of ISBN-10 and ISBN-13 formats

### Borrowing System
- **One-Click Borrowing**: Simple borrowing process for available books
- **Automatic Due Dates**: 2-week lending period with automatic calculation
- **Return Management**: Easy book return process
- **Overdue Tracking**: Visual indicators for overdue books
- **Borrowing History**: Complete record of user's borrowing activity

### User Interface
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Modern Styling**: Clean, professional design with intuitive navigation
- **Real-time Updates**: Dynamic status updates and notifications
- **Accessibility**: WCAG-compliant design patterns

## 🛠 Technology Stack

- **Backend**: Ruby 3.4.1, Rails 8.0.1
- **Database**: PostgreSQL with Active Record ORM
- **Frontend**: HTML5, Tailwind CSS, Stimulus.js, Turbo
- **Authentication**: BCrypt for secure password hashing
- **Testing**: RSpec with FactoryBot, Capybara for system tests
- **Development**: Hot reloading, comprehensive test coverage
- **Deployment**: Docker-ready with Kamal deployment configuration

## 📋 Prerequisites

- Ruby 3.4.1
- Rails 8.0.1
- PostgreSQL 12+
- Node.js (for asset compilation)
- Git

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/book_library.git
cd book_library

# Install dependencies
bundle install

# Setup database
rails db:create
rails db:migrate

# Load sample data (optional)
rails db:seed
```

### 2. Development Server

```bash
# Start the development server with hot reloading
bin/dev

# Or start Rails server only
rails server
```

Visit `http://localhost:3000` to access the application.

### 3. Sample Data

The seed file creates:
- 2 sample users (john@example.com, jane@example.com)
- 4 sample books across different genres
- Password for all sample users: `password123`

## 🧪 Testing

### Run the Complete Test Suite

```bash
# Run all tests
bundle exec rspec

# Run with coverage
bundle exec rspec --format documentation

# Run specific test types
bundle exec rspec spec/models/
bundle exec rspec spec/controllers/
bundle exec rspec spec/system/
```

### Test Coverage

The application includes comprehensive test coverage:
- **Model Tests**: Validations, associations, business logic
- **Controller Tests**: Authentication, authorization, CRUD operations
- **System Tests**: End-to-end user workflows
- **View Tests**: Template rendering and content verification

## 🚀 Deployment

### Production Deployment with Kamal

This application is configured for deployment using Kamal (Rails' official deployment tool):

```bash
# Setup deployment configuration
cp config/deploy.yml.example config/deploy.yml
# Edit config/deploy.yml with your server details

# Setup secrets
cp .kamal/secrets.example .kamal/secrets
# Add your production secrets

# Deploy to production
kamal deploy
```

### Docker Deployment

```bash
# Build the Docker image
docker build -t book_library .

# Run with environment variables
docker run -d \
  -p 80:80 \
  -e RAILS_MASTER_KEY=your_master_key \
  -e DATABASE_URL=your_database_url \
  --name book_library \
  book_library
```

### Environment Variables

Required for production:
- `RAILS_MASTER_KEY`: Rails credentials master key
- `DATABASE_URL`: PostgreSQL connection string
- `RAILS_ENV=production`

Optional:
- `WEB_CONCURRENCY`: Number of Puma workers
- `RAILS_MAX_THREADS`: Threads per worker
- `RAILS_LOG_LEVEL`: Logging level

### Database Setup for Production

```bash
# Run migrations
rails db:migrate RAILS_ENV=production

# Create admin user (optional)
rails runner "User.create!(email: 'admin@yourdomain.com', password: 'secure_password')" RAILS_ENV=production
```

## 🔧 Database Setup Issues & Solutions

### PostgreSQL Connection Issues

If you encounter database connection errors:

1. **Install PostgreSQL** (if not installed):
   ```bash
   # Windows (using Chocolatey)
   choco install postgresql
   
   # macOS (using Homebrew)
   brew install postgresql
   
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   ```

2. **Start PostgreSQL Service**:
   ```bash
   # Windows
   net start postgresql-x64-15
   
   # macOS
   brew services start postgresql
   
   # Linux
   sudo systemctl start postgresql
   ```

3. **Set Environment Variables** (recommended):
   ```bash
   # Create a .env file in your project root
   echo "DATABASE_USERNAME=your_postgres_username" >> .env
   echo "DATABASE_PASSWORD=your_postgres_password" >> .env
   ```

4. **Alternative: Use SQLite for Development**:
   If PostgreSQL setup is problematic, you can temporarily use SQLite:
   ```ruby
   # In Gemfile, replace:
   gem "pg", "~> 1.1"
   # With:
   gem "sqlite3", "~> 1.4" # For development only
   ```

### Database Creation Steps

```bash
# 1. Create the databases
rails db:create

# 2. Run migrations
rails db:migrate

# 3. Load seed data
rails db:seed

# 4. For test database
RAILS_ENV=test rails db:migrate
```

## 📁 Project Structure

```
book_library/
├── app/
│   ├── controllers/     # Request handling and business logic
│   ├── models/         # Data models and business rules
│   ├── views/          # HTML templates and layouts
│   └── assets/         # Stylesheets and JavaScript
├── config/             # Application configuration
├── db/                 # Database migrations and seeds
├── spec/               # Test suite
├── public/             # Static assets
└── docker/             # Docker configuration
```

## 🔧 Configuration

### Database Configuration

Edit `config/database.yml` for your environment:

```yaml
development:
  adapter: postgresql
  database: book_library_development
  username: your_username
  password: your_password
  host: localhost
  port: 5432
```

### Application Settings

Key configuration files:
- `config/application.rb`: Main application settings
- `config/routes.rb`: URL routing
- `config/environments/`: Environment-specific settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for your changes
4. Ensure all tests pass (`bundle exec rspec`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow Rails conventions and best practices
- Write comprehensive tests for new features
- Use semantic commit messages
- Update documentation for significant changes
- Ensure code passes RuboCop linting

## 📊 Performance & Monitoring

### Database Optimization
- Proper indexing on foreign keys and frequently queried columns
- N+1 query prevention with `includes` statements
- Database connection pooling configured

### Caching Strategy
- Fragment caching for book listings
- HTTP caching headers for static assets
- Session storage optimization

### Security Features
- CSRF protection enabled
- SQL injection prevention via parameterized queries
- XSS protection with content security policies
- Secure password hashing with BCrypt

## 🐛 Troubleshooting

### Common Issues

**Database Connection Errors**
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Reset database
rails db:drop db:create db:migrate db:seed
```

**Asset Compilation Issues**
```bash
# Precompile assets
rails assets:precompile

# Clear asset cache
rails tmp:clear
```

**Test Failures**
```bash
# Reset test database
rails db:test:prepare

# Run specific failing test
bundle exec rspec spec/path/to/failing_spec.rb:line_number
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- Built with Ruby on Rails framework
- UI components styled with Tailwind CSS
- Testing framework powered by RSpec
- Deployment automation via Kamal
- Sample data generated with Faker gem

---

For questions, issues, or contributions, please visit our [GitHub repository](https://github.com/yourusername/book_library) or contact the development team.