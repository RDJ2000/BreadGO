import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

LoginService
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  userDetails:any
  phoneNumber:any
  constructor(public LS:LoginService,public router:Router) { }

  ngOnInit(): void {
    this.userDetails=this.LS.getUser().subscribe(user=>{
       this.phoneNumber= user?.phoneNumber
    })
    console.log(this.userDetails);

  }
  doLogOut(){
    this.LS.logOutUser();
    this.router.navigate(['']);


  }

}
