import { Component, ViewChild, OnDestroy } from '@angular/core';

import { DatasService } from '../_services';

@Component({
  moduleId: module.id,
  templateUrl: 'camera.component.html',
  styleUrls: ['camera.component.css']
})
export class CameraComponent implements OnDestroy {

  @ViewChild('canvas') canvas:any; 

  constructor(public datasService: DatasService) {
    
  }

  ngAfterViewInit() {
    var width = 640;
    var height = 480;

    let ctx = this.canvas.nativeElement.getContext('2d');

    this.datasService.joinRoom('camera');

    this.datasService.getUpdates('camera', '')
    .subscribe(data => {
        try {
          var context = this.canvas.nativeElement.getContext('2d');
          var imageObject = new Image();

          imageObject.src = 'data:image/jpeg;base64,' + data.buffer;
          imageObject.onload = function(){
            context.height = imageObject.height;
            context.width = imageObject.width;
            context.drawImage(imageObject,0,0,context.width,context.height);
          }
        
        } catch(e){
          console.log(e); 
        }
      });
  }

  ngOnDestroy() {
    this.datasService.leaveRoom('camera');
  }
}