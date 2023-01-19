import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebcamService } from 'src/app/services/webcam.service';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnInit {

  constructor(
    private template: ElementRef,
    private webcamService: WebcamService) { }

  public ngOnInit(): void {
    const videoElement: HTMLMediaElement = this.template.nativeElement.querySelector('video');
    this.webcamService.openWebcamStream(videoElement);
  }
}
