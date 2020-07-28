# Custom validator
def must_not_be_blank(data):
    if not data:
        raise ValidationError('This field cannot be blank')

# Custom validator to check password length
def pw_length(password):
    if len(password) < 6:
        raise ValidationError('Password must be longer than 6 characters')