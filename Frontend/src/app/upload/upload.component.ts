import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'] // Corrected property name
})
export class UploadComponent implements OnInit {
  imageUrl: string | undefined;

  constructor(private httpClient: HttpClient) {}

  upload(event: any) {
    const file = event.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    this.httpClient.post('http://localhost:3000/api/upload', formData).subscribe((d) => {
      console.log();
    }, error => {
      console.error(error);
    });
  }

  fetchImage() {
    const filename = 'Salaar.png'; // Replace with the actual filename of the image
    this.httpClient.get('http://localhost:3000/api/upload/' + filename, { responseType: 'blob' })
      .subscribe((blob: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imageUrl = reader.result as string;
        };
        reader.readAsDataURL(blob);
      }, error => {
        console.error('Error fetching image:', error);
      });
  }
  

  ngOnInit() {
    this.fetchImage();
  }
}
