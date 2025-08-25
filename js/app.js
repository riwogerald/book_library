// Book Library Management System - Portfolio Demo
// Simulating Rails backend functionality with JavaScript

class BookLibrary {
    constructor() {
        this.currentUser = null;
        this.books = [];
        this.borrowings = [];
        this.users = [];
        this.currentView = 'home';
        
        this.initializeData();
        this.bindEvents();
        this.updateUI();
        this.renderBooks();
    }

    initializeData() {
        // Sample users (simulating Rails User model)
        this.users = [
            {
                id: 1,
                email: 'alexandra.reynolds@bookworm.edu',
                password: 'LibraryScience2024!',
                name: 'Dr. Alexandra Reynolds',
                role: 'Professor of Literature',
                createdAt: new Date('2024-01-15')
            },
            {
                id: 2,
                email: 'marcus.chen@readingclub.org',
                password: 'BookLover789#',
                name: 'Marcus Chen',
                role: 'Senior Librarian',
                createdAt: new Date('2024-02-01')
            },
            {
                id: 3,
                email: 'elena.vasquez@literaturehub.com',
                password: 'PageTurner456*',
                name: 'Elena Vasquez',
                role: 'Research Assistant',
                createdAt: new Date('2024-03-10')
            }
        ];

        // Sample books (simulating Rails Book model)
        this.books = [
            {
                id: 1,
                title: "1984",
                author: "George Orwell",
                isbn: "9780451524935",
                description: "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism. Winston Smith works for the Ministry of Truth in London, chief city of Airstrip One. The story follows his struggle against the oppressive regime of Big Brother.",
                category: "Fiction"
            },
            {
                id: 2,
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                isbn: "9780547928227",
                description: "A fantasy novel about the adventures of Bilbo Baggins, a hobbit who embarks on an incredible journey with thirteen dwarves to reclaim their homeland from the dragon Smaug. This beloved tale is the prelude to The Lord of the Rings.",
                category: "Fantasy"
            },
            {
                id: 3,
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                isbn: "9780061120084",
                description: "A novel about racial injustice and childhood in the American South. The story is told through the eyes of Scout Finch, whose father Atticus defends a black man falsely accused of rape in 1930s Alabama.",
                category: "Fiction"
            },
            {
                id: 4,
                title: "Pride and Prejudice",
                author: "Jane Austen",
                isbn: "9780141439518",
                description: "A romantic novel about manners, marriage, and social expectations in Georgian England. The story follows Elizabeth Bennet as she navigates issues of class, marriage, and morality in 19th-century society.",
                category: "Romance"
            },
            {
                id: 5,
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                isbn: "9780743273565",
                description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, idealism, and moral decay. The story is narrated by Nick Carraway and centers on his mysterious neighbor Jay Gatsby.",
                category: "Fiction"
            },
            {
                id: 6,
                title: "Dune",
                author: "Frank Herbert",
                isbn: "9780441172719",
                description: "A science fiction epic set in the distant future amidst a feudal interstellar society. The story follows Paul Atreides as he navigates political intrigue and mystical powers on the desert planet Arrakis.",
                category: "Science Fiction"
            },
            {
                id: 7,
                title: "The Catcher in the Rye",
                author: "J.D. Salinger",
                isbn: "9780316769174",
                description: "A coming-of-age novel following Holden Caulfield, a teenager who has been expelled from prep school. The story captures his experiences in New York City over a few days, exploring themes of alienation and identity.",
                category: "Fiction"
            },
            {
                id: 8,
                title: "Harry Potter and the Philosopher's Stone",
                author: "J.K. Rowling",
                isbn: "9780747532699",
                description: "The first novel in the Harry Potter series, following a young wizard's journey as he discovers his magical heritage and attends Hogwarts School of Witchcraft and Wizardry.",
                category: "Fantasy"
            },
            {
                id: 9,
                title: "The Girl with the Dragon Tattoo",
                author: "Stieg Larsson",
                isbn: "9780307454546",
                description: "A psychological thriller combining murder mystery, family saga, love story, and financial intrigue. The story follows journalist Mikael Blomkvist and hacker Lisbeth Salander as they investigate a decades-old disappearance.",
                category: "Mystery"
            },
            {
                id: 10,
                title: "Sapiens: A Brief History of Humankind",
                author: "Yuval Noah Harari",
                isbn: "9780062316097",
                description: "A thought-provoking exploration of human history, from the Stone Age to the present. Harari examines how Homo sapiens came to dominate the world and what the future might hold for our species.",
                category: "Non-Fiction"
            }
        ];

        // Sample borrowings (simulating Rails Borrowing model)
        this.borrowings = [
            {
                id: 1,
                userId: 1,
                bookId: 3,
                dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
                borrowedAt: new Date(),
                returnedAt: null
            },
            {
                id: 2,
                userId: 2,
                bookId: 6,
                dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days overdue
                borrowedAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000),
                returnedAt: null
            },
            {
                id: 3,
                userId: 3,
                bookId: 8,
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
                borrowedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                returnedAt: null
            }
        ];

        // Load from localStorage if available
        const savedData = localStorage.getItem('bookLibraryDemo');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.borrowings = data.borrowings || this.borrowings;
            this.users = data.users || this.users;
        }
    }

    saveData() {
        // Simulate Rails database persistence with localStorage
        localStorage.setItem('bookLibraryDemo', JSON.stringify({
            borrowings: this.borrowings,
            users: this.users
        }));
    }

    bindEvents() {
        // Search functionality
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.filterBooks();
        });

        // Category filter
        document.getElementById('category-filter').addEventListener('change', (e) => {
            this.filterBooks();
        });

        // Form submissions
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('signup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup();
        });

        // Modal close on backdrop click
        document.getElementById('book-modal').addEventListener('click', (e) => {
            if (e.target.id === 'book-modal') {
                this.closeModal();
            }
        });
    }

    // Authentication methods (simulating Rails authentication)
    handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            this.showFlash('Logged in successfully!', 'success');
            this.showHome();
            this.updateUI();
        } else {
            this.showFlash('Invalid email or password', 'error');
        }
    }

    handleSignup() {
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const passwordConfirm = document.getElementById('signup-password-confirm').value;

        // Validation (simulating Rails validations)
        if (password !== passwordConfirm) {
            this.showFlash('Passwords do not match', 'error');
            return;
        }

        if (password.length < 6) {
            this.showFlash('Password must be at least 6 characters', 'error');
            return;
        }

        if (this.users.find(u => u.email === email)) {
            this.showFlash('Email already exists', 'error');
            return;
        }

        // Create new user
        const newUser = {
            id: this.users.length + 1,
            email: email,
            password: password,
            createdAt: new Date()
        };

        this.users.push(newUser);
        this.currentUser = newUser;
        this.saveData();

        this.showFlash('Welcome to the Book Library!', 'success');
        this.showHome();
        this.updateUI();
    }

    logout() {
        this.currentUser = null;
        this.showFlash('Logged out successfully!', 'success');
        this.showHome();
        this.updateUI();
    }

    // Book management methods (simulating Rails controllers)
    isBookAvailable(bookId) {
        return !this.borrowings.some(b => b.bookId === bookId && !b.returnedAt);
    }

    getCurrentBorrowing(bookId) {
        return this.borrowings.find(b => b.bookId === bookId && !b.returnedAt);
    }

    borrowBook(bookId) {
        if (!this.currentUser) {
            this.showFlash('You must be logged in to borrow books', 'error');
            return;
        }

        if (!this.isBookAvailable(bookId)) {
            this.showFlash('This book is already borrowed', 'error');
            return;
        }

        // Check if user already has this book
        const existingBorrowing = this.borrowings.find(b => 
            b.bookId === bookId && b.userId === this.currentUser.id && !b.returnedAt
        );

        if (existingBorrowing) {
            this.showFlash('You have already borrowed this book', 'error');
            return;
        }

        // Create new borrowing
        const newBorrowing = {
            id: this.borrowings.length + 1,
            userId: this.currentUser.id,
            bookId: bookId,
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks
            borrowedAt: new Date(),
            returnedAt: null
        };

        this.borrowings.push(newBorrowing);
        this.saveData();

        this.showFlash('Book was successfully borrowed!', 'success');
        this.renderBooks();
        this.closeModal();
    }

    returnBook(bookId) {
        const borrowing = this.borrowings.find(b => 
            b.bookId === bookId && b.userId === this.currentUser.id && !b.returnedAt
        );

        if (!borrowing) {
            this.showFlash('Unable to return book', 'error');
            return;
        }

        borrowing.returnedAt = new Date();
        this.saveData();

        this.showFlash('Book was successfully returned!', 'success');
        this.renderBooks();
        this.closeModal();
        
        // Update profile view if currently shown
        if (this.currentView === 'profile') {
            this.renderProfile();
        }
    }

    // UI methods
    updateUI() {
        const authButtons = document.getElementById('auth-buttons');
        const userMenu = document.getElementById('user-menu');
        const userGreeting = document.getElementById('user-greeting');

        if (this.currentUser) {
            authButtons.classList.add('hidden');
            userMenu.classList.remove('hidden');
            const displayName = this.currentUser.name ? this.currentUser.name.split(' ')[0] : this.currentUser.email.split('@')[0];
            userGreeting.textContent = `Hello, ${displayName}!`;
        } else {
            authButtons.classList.remove('hidden');
            userMenu.classList.add('hidden');
        }
    }

    showFlash(message, type) {
        const flashMessages = document.getElementById('flash-messages');
        const flashContent = document.getElementById('flash-content');
        
        flashContent.textContent = message;
        flashContent.className = `px-4 py-3 rounded-lg relative slide-up ${
            type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 
            'bg-red-100 border-red-400 text-red-700'
        }`;
        
        flashMessages.classList.remove('hidden');
        
        setTimeout(() => {
            flashMessages.classList.add('hidden');
        }, 5000);
    }

    showView(viewId) {
        // Hide all views
        ['home-view', 'login-view', 'signup-view', 'profile-view'].forEach(id => {
            document.getElementById(id).classList.add('hidden');
        });
        
        // Show selected view
        document.getElementById(viewId).classList.remove('hidden');
        this.currentView = viewId.replace('-view', '');
    }

    showHome() {
        this.showView('home-view');
        this.renderBooks();
    }

    showLogin() {
        this.showView('login-view');
    }

    showSignup() {
        this.showView('signup-view');
        // Clear form
        document.getElementById('signup-form').reset();
    }

    showProfile() {
        if (!this.currentUser) {
            this.showFlash('You must be logged in to view your profile', 'error');
            this.showLogin();
            return;
        }
        
        this.showView('profile-view');
        this.renderProfile();
    }

    renderBooks() {
        const booksGrid = document.getElementById('books-grid');
        const filteredBooks = this.getFilteredBooks();
        
        booksGrid.innerHTML = filteredBooks.map(book => {
            const isAvailable = this.isBookAvailable(book.id);
            const currentBorrowing = this.getCurrentBorrowing(book.id);
            const isUserBook = currentBorrowing && this.currentUser && currentBorrowing.userId === this.currentUser.id;
            
            return `
                <div class="book-card bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer" 
                     onclick="bookLibrary.showBookModal(${book.id})">
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                            <h3 class="text-lg font-semibold text-gray-800 line-clamp-2">${book.title}</h3>
                            <span class="px-2 py-1 rounded-full text-xs font-semibold text-white ${
                                isAvailable ? 'status-available' : 'status-borrowed'
                            }">
                                ${isAvailable ? 'Available' : 'Borrowed'}
                            </span>
                        </div>
                        
                        <p class="text-gray-600 mb-2">by ${book.author}</p>
                        <p class="text-sm text-gray-500 mb-3">ISBN: ${book.isbn}</p>
                        <p class="text-sm text-gray-700 mb-4 line-clamp-3">${book.description}</p>
                        
                        <div class="flex justify-between items-center">
                            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                ${book.category}
                            </span>
                            <button class="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                View Details →
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    getFilteredBooks() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const categoryFilter = document.getElementById('category-filter').value;
        
        return this.books.filter(book => {
            const matchesSearch = !searchTerm || 
                book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm) ||
                book.description.toLowerCase().includes(searchTerm);
            
            const matchesCategory = !categoryFilter || book.category === categoryFilter;
            
            return matchesSearch && matchesCategory;
        });
    }

    filterBooks() {
        this.renderBooks();
    }

    showBookModal(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (!book) return;

        const modal = document.getElementById('book-modal');
        const isAvailable = this.isBookAvailable(bookId);
        const currentBorrowing = this.getCurrentBorrowing(bookId);
        const isUserBook = currentBorrowing && this.currentUser && currentBorrowing.userId === this.currentUser.id;

        // Populate modal content
        document.getElementById('modal-title').textContent = book.title;
        document.getElementById('modal-author').textContent = book.author;
        document.getElementById('modal-isbn').textContent = book.isbn;
        document.getElementById('modal-description').textContent = book.description;
        document.getElementById('modal-category').textContent = book.category;
        
        const statusElement = document.getElementById('modal-status');
        statusElement.textContent = isAvailable ? 'Available' : 'Borrowed';
        statusElement.className = `px-3 py-1 rounded-full text-sm font-semibold text-white ${
            isAvailable ? 'status-available' : 'status-borrowed'
        }`;

        // Populate action buttons
        const actionsContainer = document.getElementById('modal-actions');
        let actionsHTML = '';

        if (this.currentUser) {
            if (isAvailable) {
                actionsHTML = `
                    <button onclick="bookLibrary.borrowBook(${bookId})" 
                            class="btn-primary text-white px-6 py-3 rounded-lg font-semibold">
                        Borrow Book
                    </button>
                `;
            } else if (isUserBook) {
                actionsHTML = `
                    <button onclick="bookLibrary.returnBook(${bookId})" 
                            class="btn-success text-white px-6 py-3 rounded-lg font-semibold">
                        Return Book
                    </button>
                `;
            } else {
                actionsHTML = `
                    <p class="text-gray-600 italic">This book is currently borrowed by another user.</p>
                `;
            }
        } else {
            actionsHTML = `
                <p class="text-gray-600">
                    <button onclick="bookLibrary.showLogin()" class="text-blue-600 hover:text-blue-700 font-semibold">
                        Log in
                    </button> to borrow books
                </p>
            `;
        }

        actionsContainer.innerHTML = actionsHTML;
        modal.classList.remove('hidden');
    }

    closeModal() {
        document.getElementById('book-modal').classList.add('hidden');
    }

    renderProfile() {
        if (!this.currentUser) return;

        document.getElementById('user-email').textContent = this.currentUser.email;
        document.getElementById('user-name').textContent = this.currentUser.name || 'Not specified';
        document.getElementById('user-role').textContent = this.currentUser.role || 'Library Member';
        document.getElementById('member-since').textContent = this.currentUser.createdAt.toLocaleDateString();

        const userBorrowings = this.borrowings.filter(b => 
            b.userId === this.currentUser.id && !b.returnedAt
        );

        document.getElementById('borrowed-count').textContent = `${userBorrowings.length} book${userBorrowings.length !== 1 ? 's' : ''}`;

        const borrowedBooksContainer = document.getElementById('borrowed-books');
        
        if (userBorrowings.length === 0) {
            borrowedBooksContainer.innerHTML = `
                <p class="text-gray-600 italic">You haven't borrowed any books yet.</p>
            `;
        } else {
            borrowedBooksContainer.innerHTML = userBorrowings.map(borrowing => {
                const book = this.books.find(b => b.id === borrowing.bookId);
                const isOverdue = new Date() > new Date(borrowing.dueDate);
                
                return `
                    <div class="border rounded-lg p-4 ${isOverdue ? 'border-red-200 bg-red-50' : 'border-gray-200'}">
                        <div class="flex justify-between items-start">
                            <div class="flex-1">
                                <h4 class="text-lg font-semibold text-gray-800">${book.title}</h4>
                                <p class="text-gray-600">by ${book.author}</p>
                                <p class="text-sm text-gray-500 mt-2">
                                    Due date: ${new Date(borrowing.dueDate).toLocaleDateString()}
                                    ${isOverdue ? '<span class="text-red-600 font-semibold overdue">(Overdue)</span>' : ''}
                                </p>
                            </div>
                            
                            <button onclick="bookLibrary.returnBook(${book.id})" 
                                    class="btn-success text-white px-4 py-2 rounded-lg font-medium ml-4">
                                Return Book
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.bookLibrary = new BookLibrary();
});

// Global functions for onclick handlers
function showHome() {
    window.bookLibrary.showHome();
}

function showLogin() {
    window.bookLibrary.showLogin();
}

function showSignup() {
    window.bookLibrary.showSignup();
}

function showProfile() {
    window.bookLibrary.showProfile();
}

function logout() {
    window.bookLibrary.logout();
}

function closeModal() {
    window.bookLibrary.closeModal();
}