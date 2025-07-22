"use strict";
class DalinaWebFV {
      constructor(form) {
        this.id = form.replace(/#/g, '');
        this.form = document.getElementById(this.id);    
        this.debug = true;
        this.config = {
            method: "POST",
            action: "/",
            headers: {}
          };
        this.validateCallback = null;
        this.beforeSubmitCallback = null;
        this.submitCallback = null;
        this.afterSubmitCallback = null;
        this.onErrorCallback = null;
        this.onSuccessCallback = null;
        this.button = null;
        this.style = null;
        this.buttonText =null;
        this.themeColor='#1ab394';

        if (this.form && this.form instanceof HTMLFormElement) {
            this.init();
          }
          else{
          throw new Error(`Invalid HTMLFormElement, please check this id "#${form}" if it exists and constitute a valid form element.`);
          }
          }
      init() {   
          if(!window.DalinaWebFV){
              window.DalinaWebFV = this;
            }
          this.appendStyle();
          this.form.addEventListener("submit", (e) => {
              e.preventDefault();
            });

          this.button = this.form.querySelector("button[type='submit']") || this.form.querySelector("input[type='submit']") || null;

          if (this.button instanceof HTMLElement && this.button.type === "submit") {
              this.buttonText = this.button.innerText;
              this.button.addEventListener("click", (e) => {
                  e.preventDefault();
                  this.config.method = this.form.getAttribute('method') || this.config.method;
                  this.config.action = this.form.getAttribute('action') || this.config.action;
                  this.button.classList.add('loading');
                  this.button.setAttribute("disabled", "disabled");
                  this.formSubmit();
                })
            }        
          }
      appendStyle(style = null) {
          if (document.getElementById('DalinaWebFV-CSS')) {
            return this;
          }

          let cssText = `          
              #${this.id} .invalid{
                    border: solid 1px #ff0000 !important;
                    padding-right: calc(1.5em + .75rem);
                    background-color: white;
                    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
                    background-repeat: no-repeat;
                    background-position: right calc(.375em + .1875rem) center;
                    background-size: calc(.75em + .375rem) calc(.75em + .375rem);
                    appearance: none;
                    -webkit-appearance: none;
                  }
              #${this.id} .valid{
                  padding-right: calc(1.5em + .75rem);
                  background-color: white;
                  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='green'%3E%3Cpath d='M6.003 11.803l-3.5-3.5 1.414-1.414L6 8.973l6.086-6.086 1.414 1.414-7.497 7.502z'/%3E%3C/svg%3E");
                  background-repeat: no-repeat;
                  background-position: right calc(.375em + .1875rem) center;
                  background-size: calc(.75em + .375rem) calc(.75em + .375rem);
                  appearance: none;
                  -webkit-appearance: none;
                }
              #${this.id} input:not([type="button"]):not([type="submit"]):not(.invalid):focus,
              #${this.id} textarea:not(.invalid):focus,
              #${this.id} select:not(.invalid):focus{
                  border:solid 1px ${this.themeColor} !important;            
                }
              #${this.id} button[type='submit'], #${this.id} input[type='submit']{
                  position:relative;
                  padding-right:.75rem;
                  transition: padding 250ms linear 0ms;
                }  
              #${this.id} button[type='submit'].loading, #${this.id} input[type='submit'].loading{
                  position:relative;
                  padding-right:40px;
                  transition: padding 250ms linear 0ms;
                }
              #${this.id} button[type='submit'].loading::after, #${this.id} input[type='submit'].loading::after{
                  content:'';
                  opacity:0;
                  display:block;
                  width:20px;
                  height:20px;
                  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 50 50'%3E%3Ccircle cx='25' cy='25' r='20' fill='none' stroke='%23ffffff' stroke-width='4' stroke-linecap='round' stroke-dasharray='90' stroke-dashoffset='60'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 25 25' to='360 25 25' dur='1s' repeatCount='indefinite'/%3E%3C/circle%3E%3C/svg%3E");
                  position:absolute;
                  right:10px;
                  top:0;
                  bottom:0;
                  margin:auto;
                  animation: spinner-button 250ms linear 250ms;
                  animation-fill-mode: forwards; 
                }
              @keyframes spinner-button {
                  0%   {opacity: 0;}
                  50%  {opacity: 1;}
                  100%  {opacity: 1;}
                }         
              #${this.id} input[type='text'].invalid::placeholder,
              #${this.id} input[type='search'].invalid::placeholder,
              #${this.id} input[type='number'].invalid::placeholder,
              #${this.id} input[type='email'].invalid::placeholder,
              #${this.id} input[type='password'].invalid::placeholder,
              #${this.id} input[type='date'].invalid::placeholder{
                  color:#ff0000;
                  font-size:12px;
                  font-weight:400;
                  vertical-align:middle;            
                  display:flex;
                  align-items:center;
                  justify-content:center;
                }
              #${this.id} input{height:40px; line-height:40px;}
              #${this.id} input::placeholder{
                  color:#d1d1d1;
                  font-size:12px !important;
                  font-weight:400;
                  vertical-align:middle;            
                  display:block;
                  align-items:center;
                  justify-content:center;
                  justify-items:center;
                  align-content:center;
                  line-height:32px;            
                  }
            `;
          
          cssText+= style || '';  

          const DalinaWebFVCSS = document.createElement('style');
          DalinaWebFVCSS.setAttribute('type', 'text/css');
          DalinaWebFVCSS.setAttribute('id', 'DalinaWebFV-CSS');
          DalinaWebFVCSS.appendChild(document.createTextNode(cssText));
          document.head.appendChild(DalinaWebFVCSS);

          return this;
        }
      formSubmit(callback = null) {
            const self = this;
            this.config.method = this.form.getAttribute('method') || this.config.method;
            this.config.action = this.form.getAttribute('action') || this.config.action;
            if (!this.validate()) {
              setTimeout(() => {
                this.button.removeAttribute('disabled');
                this.button.classList.remove('loading');
              }, 500);
              if (this.debug)
                console.log(`Form validation failed.`);
              return false;
            }
            if (this.beforeSubmitCallback) {
              try {
                this.beforeSubmitCallback();
              } catch (e) {
                this.button.removeAttribute('disabled');
                this.button.classList.remove('loading');
                throw new Error(e.message);
              }
            }
            if (typeof callback === 'function') {
              this.submitCallback() = callback;
              try {
                this.submitCallback();
              } catch (e) {
                this.button.removeAttribute('disabled');
                this.button.classList.remove('loading');
                throw new Error(e.message);
              }
            }
            else if (callback !== null) {
              this.button.removeAttribute('disabled');
              this.button.classList.remove('loading');
              throw new Error(`FormSubmit callback is not a valid function and cannot be executed: "${typeof callback}".`);
            }
            const formData = new FormData(this.form);
            const xhr = new XMLHttpRequest();
            xhr.open(this.config.method, this.config.action, true);
            for (const header in this.config.headers) {
                xhr.setRequestHeader(header, this.config.headers[header]);
              }
            xhr.onload = function () {
              if (xhr.readyState === 4) {
                  if (xhr.status >= 200 && xhr.status < 300) {
                    if (self.debug) {
                      console.log(xhr.responseType);
                      console.log(`Form submitted successfully: ${xhr.responseType === 'json' ? xhr.responseText : 'HTML Response'}.`);
                    }
                    if (self.onSuccessCallback) {
                      try {
                        self.onSuccessCallback(JSON.parse(xhr.response));
                      } catch (e) {
                        self.onSuccessCallback(xhr.response);
                      }
                    }
                    //self.form.reset();
                  } else {
                    if (self.debug) {
                      console.error(`${xhr.status} Form submission failed at ${xhr.statusText ? xhr.statusText : xhr.responseURL}.`);
                      console.log(xhr);
                    }
                    if (self.onErrorCallback) {
                      self.onErrorCallback({ "error": true, "title": `${xhr.status} ${xhr.statusText}`, "message": xhr.responseURL });
                    }
                  }
                setTimeout(() => {
                  self.button.classList.remove('loading');
                  self.button.removeAttribute('disabled');
                }, 1000);    
                if (self.afterSubmitCallback) {
                  self.afterSubmitCallback();
                }
              }
            }
            xhr.onerror = function () {
              if (self.onErrorCallback) {
                self.onErrorCallback({ "error": true, "title": `${xhr.status} ${xhr.statusText}`, "message": xhr.responseURL });
              }
              if (self.afterSubmitCallback) {
                self.afterSubmitCallback();
              }
              setTimeout(() => {
                  self.button.classList.remove('loading');
                  self.button.removeAttribute('disabled');
                }, 1000);  
              throw new Error('Network error occurred during form submission.');
            }
            xhr.send(formData);
            return this;
          }
      validate() {
            let isValid = true;
            let firstEmpty = null;
            let inputCounter = 0;
            let errorCounter = 0;
            let inputLabels = [];
            
            const inputs = this.form.elements;    
            if (this.debug) { 
              console.time('Validation');
              console.group('Form Validation'); 
            }
            
            for (let input of inputs) {
              inputCounter++;
              input.addEventListener('input', function (e) {
                input.classList.remove('invalid','valid');
                input.setAttribute('placeholder', (input.getAttribute('id') || input.getAttribute('name')) || '');
              });
              if (input.hasAttribute('required')) {
                if (!input.value.trim() && input.value.trim().length == 0) {
                  let fieldName = input.name || input.id;
                      fieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1).toLowerCase();
                  let defaultName = 'Input field';
                  let inputName = fieldName || defaultName;
                    input.setAttribute('placeholder', `"${inputName}" is required.`);
                    if (this.debug) {
                      console.error(`"${inputName}" is required.`);
                    }
                  
                  errorCounter++;
                  if (errorCounter === 1) {
                    firstEmpty = input;
                  }
                  isValid = false;
                  input.value="";
                  input.classList.add('invalid');
                }
                else{
                  input.classList.add('valid');
                }
              }
            }
            if (this.debug) { 
              console.groupEnd(); 
              console.timeEnd('Validation');
            } 
            if (firstEmpty) {
              if (this.validateCallback && typeof this.validateCallback === "function") {
                try {
                  this.validateCallback(isValid);
                } catch (e) {
                  if(this.debug===true){
                    throw new Error(e.message);
                  }
                }
              }
              firstEmpty.focus();
            }
            return isValid;
          }
      setConfig(config = null) {
            if (typeof config === 'object' && 'method' in config && 'action' in config) {
              this.config = { ...this.config, ...config };
            } else if (config !== null && this.debug===true) {
              throw new Error('Invalid config object');
            }
            return this;
          }
      onValidation(callback = null) {
            if (typeof callback === "function") {
              this.validateCallback = callback;
            }
            else if (callback !== null && this.debug===true) {
              throw new Error(`Validation callback is not a valid function and cannot be executed: "${typeof callback}".`);
            }
            return this;
          }
      beforeSubmit(callback = null) {
            if (typeof callback === "function") {
              this.beforeSubmitCallback = callback;
            }
            else if (callback !== null && this.debug===true) {
              throw new Error(`BeforeSubmit callback is not a valid function and cannot be executed: "${typeof callback}".`);
            }
            return this;
          }
      afterSubmit(callback = null) {
            if (typeof callback === "function") {
              this.afterSubmitCallback = callback;
            }
            else if (callback !== null && this.debug===true) {
              throw new Error(`AfterSubmit callback is not a valid function and cannot be executed: "${typeof callback}".`);
            }
            return this;
          }
      onSuccess(callback = null && this.debug===true) {
            if (typeof callback === "function") {
              this.onSuccessCallback = callback;
            }
            else if (callback !== null) {
              throw new Error(`OnSuccess callback is not a valid function and cannot be executed: "${typeof callback}".`);
            }
            return this;
          }
      onError(callback = null) {
            if (typeof callback === "function") {
              this.onErrorCallback = callback;
            }
            else if (callback !== null && this.debug===true) {
              throw new Error(`OnError callback is not a valid function and cannot be executed: "${typeof callback}".`);
            }
            return this;
          }
      destroy() {
            document.getElementById('DalinaWebFV-CSS').remove();
            this.button.removeEventlistener('click', this.formSubmit());
            this.form.removeEventListener('submit');

            this.id = null;
            this.form = null;    
            this.debug = true;
            this.config = {
                method: "POST",
                action: "/",
                headers: {}
              };
            this.validateCallback = null;
            this.beforeSubmitCallback = null;
            this.submitCallback = null;
            this.afterSubmitCallback = null;
            this.onErrorCallback = null;
            this.onSuccessCallback = null;
            this.button = null;
            this.style = null;
            this.buttonText =null;
            this.themeColor='#1ab394';

            delete window.DalinaWebFV;
          }
    }

//new DalinaWebFV('form');
