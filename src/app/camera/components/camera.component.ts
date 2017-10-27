import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements AfterViewInit, OnDestroy {

  @ViewChild('canvas')
  public canvas: any;

  public loading: boolean = true;

  constructor(public dataService: DataService) {
  }

  /**
   * Init WS
   */
  ngAfterViewInit() {
    const width = 640;
    const height = 480;

    const ctx = this.canvas.nativeElement.getContext('2d');

    this.dataService.joinRoom('camera');

    this.dataService.getUpdates('camera', '')
      .subscribe(data => {
        this.loading = false;

        try {
          const imageObject = new Image();

          imageObject.src = 'data:image/jpeg;base64,' + data.buffer;
          imageObject.onload = () => {
            ctx.height = imageObject.height;
            ctx.width = imageObject.width;
            ctx.drawImage(imageObject, 0, 0, ctx.width, ctx.height);
          };
        } catch (e) {
          console.log(e);
        }
      });
  }

  /**
   * Leave socket on destroy
   */
  ngOnDestroy() {
    this.dataService.leaveRoom('camera');
  }

}
