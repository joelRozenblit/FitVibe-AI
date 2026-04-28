import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core'; // ייבוא של ChangeDetectorRef
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-uploader.html'
})
export class ImageUploaderComponent {
  @Input() label: string = '';
  @Output() fileSelected = new EventEmitter<File>();

  previewUrl: string | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileSelected.emit(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
        
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.previewUrl = null;
    this.cdr.detectChanges();
  }
}