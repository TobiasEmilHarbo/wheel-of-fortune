import { ElementRef, Injectable } from '@angular/core';

const _window = (): Window => {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class WebcamService {

  private window = _window();
  private mediaDevices: MediaDevices;
  private videoElement!: HTMLMediaElement;

  constructor() {
    this.mediaDevices = this.window.navigator.mediaDevices;

  }

  public async getWebcams(): Promise<Array<MediaDeviceInfo>> {
    const webcams = this.mediaDevices.enumerateDevices().then((devices) => {
      return devices.filter((device) => device.kind == "videoinput")
    })

    return webcams;
  }

  public async setCamera(webcamId: string): Promise<void> {
    return this.setMediaStream(webcamId);
  }

  public async openWebcamStream(videoElement: HTMLMediaElement, deviceId?: string): Promise<void> {
    this.videoElement = videoElement;
    return this.setMediaStream(deviceId);
  }

  public async setMediaStream(deviceId?: string): Promise<void> {
    return this.mediaDevices.getUserMedia({
      audio: false,
      video: {
        deviceId
      }
    }).then((videoStream) => {
      this.videoElement.srcObject = videoStream;
    })
  }
}
