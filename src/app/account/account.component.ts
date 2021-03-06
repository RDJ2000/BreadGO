import { Component, OnInit } from '@angular/core';
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
  constructor(public LS:LoginService) { }

  ngOnInit(): void {
    this.userDetails=this.LS.getUser().subscribe(user=>{
       this.phoneNumber= user?.phoneNumber
    })
    console.log(this.userDetails);

  }



}
