###############
#Enumerables!
###############



# Arrays



arr1 = ["a", "b", "c", "d", "e", "f"]



# example 1
# arr1.each do |el|
#   puts el
# end

# example 2 (one liner)
# new_arr = []
# [1, 2, 3, 4, 5].each { |element| new_arr << (element * 2)}

# p new_arr


# {} can ONLY do one line
# do blocks are more flexible


# [].each.with_index do |variable, index|
#   p "el #{variable} at index #{index}"
# end

# arr1.each.with_index { |el,idx| puts "index #{idx} contains #{el}" }


# strings

# str = "jumpstart"


# str.each_char do |char|
#   p char
# end

# str.each_char.with_index do |el,idx| 
#   puts "#{el} at #{idx}" }
# end

# str1 = "aabcdeef"

# def output_repeating_char(str)
# end


# output_repeating_char(str1)


# number
# number.times

# arr = []

# 5.times do |time|
#   arr << [] 
# end








# ranges
# (start..end) inclusive
# (start...end) exclusive


# alphabet = "abcedfghijklmnopqrstuvwxyz"

# use ranges now!
# alphabet = ("a".."z")
# p alphabet.include?("b")









###############
# PROBLEMS
###############


# Define a method that, given an array of numbers, returns another array with
# each of the argument's numbers multiplied by two. Do not modify the original array.


# def array_times_two(arr)
# end

# p array_times_two([1, 5, 9])






# Define a method that reverses the digits of its argument and returns the
# resulting number.

# def reverse_digits(int)
# end

# p reverse_digits(1234) # => 4321
# p reverse_digits(456785432) # => 234587654





# Define a method that returns the longest word in its argument.

# def longest_word(str)
# end



# p longest_word("is erica nicer") #erica
# p longest_word("is nick a genius") #genius








# The Fibonacci Sequence follows a simple rule: the next number in the sequence
# is the sum of the previous two. The sequence begins with [0, 1]. One computes
# the third number by summing the first and  second (0 + 1 == 1),
# yielding [0, 1, 1], one computes the fourth number by summing the second and
# the third, yielding [0, 1, 1, 2], and so on.

# Define a method, #fibs, that accepts an integer as an argument. The method should return an array of the first n Fibonacci numbers.
# fibs(1) => [0]
# fibs(2) => [0, 1]
# fibs(3) => [0, 1, 1]
# fibs(6) => [0, 1, 1, 2, 3, 5] 8 13 21 34
# def fibs(n)

# end
# puts "Fibs\n\n"
# p fibs(1)
# p fibs(2)
# p fibs(3)
# p fibs(6)
# p fibs(9)



# write a method longest_pause(string) that takes a string and counts the
# longest "ummmm". For example:
# longest_pause("ummmmmmm") => 8

# def longest_pause(sentence)
# end

# puts longest_pause("ummmmmmm")
# puts longest_pause("Hi there, I'm um here for the interview")
# puts longest_pause("um I'm uum not sure.")
# puts longest_pause("ummmmm, I'm umm not sure.")





# A magic number is a number whose digits, when added together, sum
# to 7, e.g., 34. Define a method that returns an array of the first n magic
# numbers. You may wish to write a helper method that returns a boolean
# indicating whether a number is magic.
# magic_numbers(3) => [7, 16, 25]

# def magic_number?(n)

# end

# def magic_numbers(n)
# end

# puts "Magic Number\n\n"
# p magic_numbers(3)


# Write a method - five_ws, that takes one or more sentences and
# returns them as questions if they contain the words: why, what, where,
# who,  when.

# def five_ws(string)
# end



# puts five_ws("Where can I find new shoes. I'm missing my favorite pair.") == "Where can I find new shoes? I'm missing my favorite pair."
# puts five_ws("Who is at the door.") == "Who is at the door?"
# puts five_ws("Whenever you are ready I'll meet you at the shop.") == "Whenever you are ready I'll meet you at the shop."
# puts five_ws("Who. What. Where. When.") == "Who? What? Where? When?"


