import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geofence } from 'ionic-native';
import { RequestToApi } from '../providers/request-to-api';
import { Observable } from '@angular2/core';

/*
  Class for the GeofenceService provider.
 @Author: Niels Bekkers
*/
@Injectable()
export class GeofenceService {

  //*******************  Geofence staat ingesteld op thuisadres Niels Bekkers  *******************//
  public latitude = 51.055774;
  public longitude = 5.287059;
  public radius = 50;
  //**********************************************************************************************//

  constructor(public http: Http, public requestToApi: RequestToApi) {
    console.log('Hello GeofenceService Provider');
  }

  AddZones(){
    Geofence.addOrUpdate({
      id:             this.EnterID(), //A unique identifier of geofence
      latitude:       this.latitude, //Geo latitude of geofence
      longitude:      this.longitude, //Geo longitude of geofence
      radius:         this.radius, //Radius of geofence in meters
      transitionType: Geofence.TransitionType.ENTER, //Type of transition 1 - Enter, 2 - Exit, 3 - Both
      notification: {         //Notification object
        id:             1, //optional should be integer, id of notification
        title:          "Welkom op ons bedrijf", //Title of notification
        text:           "Welkom op ons bedrijf, Vergeet jezelf niet aan te melden! Hierna kan je aan de slag voor vandaag!", //Text of notification
        smallIcon:      String, //Small icon showed in notification area, only res URI
        icon:           String, //icon showed in notification drawer
        openAppOnClick: true,//is main app activity should be opened after clicking on notification
        data:           Object  //Custom object associated with notification
      }
    }).then(function () {
      console.log('Geofence successfully added');
    }, function (reason) {
      console.log('Adding geofence failed', reason);
    });

    Geofence.onTransitionReceived().subscribe((data) =>{
      console.log(data);
    });

  /*.then(function(geof){
      function test(geofences){
        geofences.forEach(function (geo) {
          console.log('Geofence transition detected', geo);
        });
      }
    });*/


      Geofence.addOrUpdate({
      id:             this.LeaveID(), //A unique identifier of geofence
      latitude:       this.latitude, //Geo latitude of geofence
      longitude:      this.longitude, //Geo longitude of geofence
      radius:         this.radius, //Radius of geofence in meters
      transitionType: Geofence.TransitionType.EXIT, //Type of transition 1 - Enter, 2 - Exit, 3 - Both
      notification: {         //Notification object
        id:             2, //optional should be integer, id of notification
        title:          "U verlaat ons bedrijf", //Title of notification
        text:           "U verlaat ons bedrijf, Vergeet jezelf niet af te melden! Tot de volgende keer! ", //Text of notification
        smallIcon:      String, //Small icon showed in notification area, only res URI
        icon:           String, //icon showed in notification drawer
        openAppOnClick: true,//is main app activity should be opened after clicking on notification
        data:           Object  //Custom object associated with notification
      }
    }).then(function () {
      console.log('Geofence successfully added');
    }, function (reason) {
      console.log('Adding geofence failed', reason);
    });

  }
  EnterID(){
    return "Binnenkomen zone";
  }
  LeaveID(){
    return "Verlaten zone";
  }

}
