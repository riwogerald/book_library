# Add seed data
puts "Creating sample data..."

# Create users
user1 = User.create!(
  email: 'john@example.com',
  password: 'password123'
)

user2 = User.create!(
  email: 'jane@example.com',
  password: 'password123'
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
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '9780061120084',
    description: 'A novel about racial injustice and childhood in the American South.',
    category: 'Fiction'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '9780141439518',
    description: 'A romantic novel about manners and marriage.',
    category: 'Romance'
  }
]

books.each do |book_data|
  Book.create!(book_data)
end

puts "Sample data created successfully!"
puts "Created #{User.count} users and #{Book.count} books"