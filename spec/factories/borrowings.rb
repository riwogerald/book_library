FactoryBot.define do
  factory :borrowing do
    user
    book
    due_date { 2.weeks.from_now }
    returned_at { nil }
  end
end
