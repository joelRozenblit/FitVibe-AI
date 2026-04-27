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

  // הזרקה של ה-ChangeDetector
  constructor(private cdr: ChangeDetectorRef) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileSelected.emit(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        // עדכון המשתנה
        this.previewUrl = reader.result as string;
        
        // כאן הקסם קורה: אנחנו מכריחים את אנגולר לרענן את התצוגה
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.previewUrl = null;
    this.cdr.detectChanges(); // גם כאן כדאי להוסיף כדי שה-X יעבוד מיד
  }
}