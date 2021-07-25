import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //inisial untuk data formulir
  user:any={};
  hide: boolean = true;
  //constructor
  constructor(
    public router:Router,
    public auth: AngularFireAuth
  ) { }
    //fungsi inisial, dijalankan ketika class ini dipanggil
  ngOnInit(): void { 
  }
  
  //form validation
  email = new FormControl('', [Validators.required, Validators.email]);
  password=new FormControl('', [Validators.required]);

  //register
  loading: boolean | undefined;
  login()
  {
    this.loading=true;

    this.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(res=>{
      this.loading=false;
      this.router.navigate(['admin/dashboard']);
    }).catch(err=>{
      this.loading=false;
      alert('Tidak dapat login');
    })

    
      
  }

}
