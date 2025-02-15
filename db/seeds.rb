# Add seed data
# db/seeds.rb
puts "Creating sample data..."

# Create users
user1 = User.create!(
  email: 'john@example.com',
  password: 'password123',
  name: 'John Doe'
)

user2 = User.create!(
  email: 'jane@example.com',
  password: 'password123',
  name: 'Jane Smith'
)

# Create books
books = [
  {
    title: '1984',
    author: 'George Orwell',
    isbn: '9780451524935',
    description: 'A dystopian social science fiction novel.',
    category: 'Fiction'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '9780547928227',
    description: 'A fantasy novel about the adventures of Bilbo Baggins.',
    category: 'Fantasy'
  }
  # Add more books as needed
]

books.each do |book_data|
  Book.create!(book_data)
end

puts "Sample data created successfully!"
