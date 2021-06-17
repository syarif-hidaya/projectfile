import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  loading:boolean=true;
  constructor(
    public api:ApiService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin()
  {
    this.loading=false;
    this.api.get('perpustakaans').subscribe(res=>{
      return;
    },error=>{
      this.loading=false;
     this.router.navigate(['/login']);
    });
  }

  

  logout()
  {
    let conf=confirm('Keluar aplikasi?');
    if (conf){
      localStorage.removeItem('appToken');
      window.location.reload();
      
    }
  }



  menu=[
    {
      name:'Dashboard',
      icon:'dashboard',
      url:'/admin/dashboard'
    },
    {
      group:'Menu Group',
      children:[
        {
          name:'Buku',
          icon:'library_books',
          url:'/admin/wallpaper'
        }
      ]
    }
  ];

}
