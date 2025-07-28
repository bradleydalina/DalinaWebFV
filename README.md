# DalinaWebFV

DalinaWebFV is a lightweight JavaScript library for simple client-side validation of HTML forms.

## Features

- Easy to use and integrate  
- Validate required fields 
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
  <input type="text" name="username" required placeholder="Username" />
  <input type="email" name="email" required placeholder="Email" />
  <input type="number" name="age" placeholder="Age" />
  <button type="submit">Submit</button>
</form>
```

2. Initialize the validator in your JS
```script
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

Add id to the form element
add "required" attribute to the input field so it will validated   
add name to each input element
required — field must not be empty

Example:
```html
<form id="myForm">
  <input type="text" name="username" required placeholder="Username" />
</form>
```

4. Custom Messages
You can configure custom error messages when initializing:
```script
const validator = new DalinaWebFV(formElementID);
```
});
