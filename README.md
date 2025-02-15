# Book Library Application

A Ruby on Rails application for managing a book lending library. Users can browse books, borrow them, and return them.

## Features

- User registration and authentication
- Browse available books
- Borrow and return books
- View currently borrowed books
- Due date tracking (2 weeks from borrowing date)
- ISBN validation
- Comprehensive test coverage

## Requirements

- Ruby 3.2.2
- Rails 7.1.0
- PostgreSQL

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/book_library.git
cd book_library
```

2. Install dependencies:
```bash
bundle install
```

3. Setup database:
```bash
rails db:create
rails db:migrate
```

4. (Optional) Load sample data:
```bash
rails db:seed
```

5. Start the server:
```bash
rails server
```

Visit `http://localhost:3000` in your browser.

## Running Tests

The application uses RSpec for testing. To run the test suite:

```bash
bundle exec rspec
```

## Testing Update

During initial database setup, executing rails db:create led to several severe IDE crashes, including one instance of a Blue Screen of Death. Despite these technical challenges, testing will continue, and this README will be updated accordingly to document any persistent issues or workarounds discovered. The development environment stability is currently being investigated.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
