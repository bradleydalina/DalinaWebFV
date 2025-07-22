# DalinaWebFV

DalinaWebFV is a lightweight JavaScript library for simple client-side validation of HTML forms.

## Features

- Easy to use and integrate  
- Validate required fields, email, numbers, and more  
- Custom validation messages  
- Minimal dependencies

## Installation

Simply include the `dalinawebfv.js` file in your HTML:

```html
<script src="dalinawebfv.js"></script>
```

## Basic Usage
1. Add validation attributes to your form fields

```html
<form id="myForm">
  <input type="text" name="username" data-validate="required" placeholder="Username" />
  <input type="email" name="email" data-validate="required|email" placeholder="Email" />
  <input type="number" name="age" data-validate="number" placeholder="Age" />
  <button type="submit">Submit</button>
</form>
<div id="form-errors"></div>
```

2. Initialize the validator in your JS
```html
// Assuming DalinaWebFV is the class name
const form = document.getElementById('myForm');
const errorsDiv = document.getElementById('form-errors');

const validator = new DalinaWebFV(form, {
  onError: (errors) => {
    errorsDiv.innerHTML = errors.join('<br>');
  },
  onSuccess: () => {
    errorsDiv.innerHTML = 'Form is valid!';
    // You can submit the form or handle data here
  }
});
```   
3. Available Validation Rules
   
required — field must not be empty
email — must be a valid email address
number — must be a valid number
minlen:X — minimum length X (e.g., minlen:5)
maxlen:X — maximum length X (e.g., maxlen:10)
regex:/pattern/ — custom regex pattern
Example:
data-validate="required|email|minlen:5"

4. Custom Messages
You can configure custom error messages when initializing:
```html
const validator = new DalinaWebFV(form, {
  messages: {
    required: 'This field is required.',
    email: 'Please enter a valid email address.',
    // etc.
  }
```
});
