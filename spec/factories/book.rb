FactoryBot.define do
  factory :book do
    title { Faker::Book.title }
    author { Faker::Book.author }
    isbn { Faker::Number.unique.number(digits: 13).to_s }
    description { Faker::Lorem.paragraph }
    category { Faker::Book.genre }
  end
end
