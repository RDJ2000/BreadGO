import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import {ToastrService} from 'ngx-toastr';
declare let L: { map: (arg0: string) => { (): any; new(): any; setView: { (arg0: any[], arg1: number): any; new(): any; }; }; tileLayer: (arg0: string, arg1: { attribution: string; maxZoom: number; id: string; tileSize: number; zoomOffset: number; accessToken: string; }) => { (): any; new(): any; addTo: { (arg0: any): void; new(): any; }; }; marker: (arg0: any[]) => { (): any; new(): any; addTo: { (arg0: any): any; new(): any; }; }; };
@Component({
  selector: 'app-do-charity',
  templateUrl: './do-charity.component.html',
  styleUrls: ['./do-charity.component.scss']
})
export class DoCharityComponent implements OnInit {


  quantity:any
  timeOfPickup:any
  address:any
  status: any;
  date:any
  contactNo:any
  constructor(public fireStore:AngularFirestore,private datePipe: DatePipe,public TS:ToastrService) {
    this.date=new Date()
    this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
  }




  location(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }


  }
  showPosition(position: { coords: { latitude: any; longitude: any; }; }) {
    console.log(position.coords.latitude,position.coords.longitude);
    var mymap = L.map('mapid').setView([position.coords.latitude,position.coords.longitude], 13);
this.address
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmRqIiwiYSI6ImNrbHY3NWRpZDI2Zm4yb253ZXNyYzloZGwifQ.7S3p4r_V8eW6uQRB6B0-wg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);
var marker = L.marker([position.coords.latitude,position.coords.longitude]).addTo(mymap);
    }


    SubmitPost(){
      this.fireStore.collection('PickupOrders').add({
        ContactNo:this.contactNo,
        quantity: this.quantity,
        Date: this.date,
        pickUpTime: this.timeOfPickup,
        address:this.address,
        status: 'pending',
       }
      )
      .then(res=>{
        this.status = "Success"
        console.log(res)
        this.TS.success('Message is recorded')
        this.TS.info('Will Contact You Soon!')

      })
      .catch(error=>{
        console.log(error)
      })

    }


}
