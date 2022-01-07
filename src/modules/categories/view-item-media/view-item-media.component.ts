import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AppDriveService } from 'src/services/app-drive.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-item-media',
  templateUrl: './view-item-media.component.html',
  styleUrls: ['./view-item-media.component.scss']
})
export class ViewItemMediaComponent implements OnInit {
  mediaType = ""
  mediaId = ""
  imageDetails = {height:800,width:800}
  loadMediaContent = ""
  constructor(private location: Location,
    public appDriveService: AppDriveService,
    public changeDetectorRef: ChangeDetectorRef,
    public router: Router
  ) { }

  ngOnInit(): void {
    let state: any = this.location.getState()
    this.mediaId = state?.id?.split('item')[1]
    if (state?.id && this.mediaId) {
      console.log(state, "state")
      this.appDriveService.getFileById(this.mediaId).subscribe((media: any) => {
        console.log(media, "mediafile")
        const imagetypes = ["image/jpeg","image/jpg","image/png"]
        if(imagetypes.includes(media.mimeType)){
          this.mediaType ="image"
          // this.imageDetails = media.imageMediaMetadata
        }else{
          this.mediaType ="doc"
        }
        this.loadMediaContent = media.webContentLink;
        this.changeDetectorRef.detectChanges()
      })
    } else {
      this.router.navigate([''])
    }
  }

}
