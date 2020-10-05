import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-photo-base64-upload',
  templateUrl: './photo-base64-upload.component.html',
  styleUrls: ['./photo-base64-upload.component.css']
})
export class PhotoBase64UploadComponent implements OnInit {

  /*
  * properties for image upload and concert it to base64 before send it to the server
  */

  @Input() public isImageSaved: boolean;

  @Input() public parentForm: FormGroup;

  constructor(private toast: ToastrService) {
  }

  ngOnInit(): void {
  }

  fileChangeEvent(fileInput: any): boolean {
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const maxSize = 20971520;
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
      const maxHeight = 15200;
      const maxWidth = 25600;

      if (fileInput.target.files[0].size > maxSize) {
        this.toast.error('Maximum size allowed is ' + maxSize / 1000 + 'Mb', 'Error');

        return false;
      }
      if (!allowedTypes.includes(fileInput.target.files[0].type)) {
        this.toast.error('Only Images are allowed ( JPG | PNG | GIF | JPEG )', 'Error');
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgHeight = rs.currentTarget['height'];
          const imgWidth = rs.currentTarget['width'];

          if (imgHeight > maxHeight && imgWidth > maxWidth) {
            this.toast.error('Maximum dimentions allowed ' + maxHeight + '*' + maxWidth + 'px', 'Error');
            return false;
          } else {
            this.cover = e.target.result;
            this.isImageSaved = true;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  set cover(cover: string) {
    this.parentForm.get('cover').setValue(cover);
  }

  get cover(): string {
    return this.parentForm.get('cover').value;
  }

  removeImage(): void {
    this.cover = '';
    this.isImageSaved = false;
  }

}
