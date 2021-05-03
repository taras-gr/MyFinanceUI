import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseApiUri = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.baseApiUri = environment.baseApiUri;  
  }

  userForRegistrationModel = this.fb.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  });

  userForLoginModel = this.fb.group({    
    Email: ['', Validators.email],
    Password: ['', Validators.email]
  });

  expenseToAddModel = this.fb.group({
    Title: ['', Validators.required],
    ExpenseDate: ['', Validators.required],
    Category: ['', Validators.required],
    Cost: ['', Validators.required]
  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      FirstName: this.userForRegistrationModel.value.FirstName,
      LastName: this.userForRegistrationModel.value.LastName,
      UserName: this.userForRegistrationModel.value.UserName,
      Email: this.userForRegistrationModel.value.Email,
      Password: this.userForRegistrationModel.value.Passwords.Password
    };
    return this.http.post(this.baseApiUri + '/auth/Register', body);
  }

  async login() {
    var user = await Auth.signIn(this.userForLoginModel.value.Email, 
    this.userForLoginModel.value.Password);

    var tokens = user.signInUserSession;

    user.getUserData(function(err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        localStorage.setItem('userName', result.Username);
    });

    localStorage.setItem('token', tokens.idToken.jwtToken);
    return tokens.idToken.jwtToken;
  }

  userProfile() {
    return this.http.get(this.baseApiUri + '/UserProfile');
  }
}