import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from '../image-uploader/image-uploader'; // שים לב לנתיב אצלך

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ImageUploaderComponent],
  templateUrl: './home.html'
})
export class HomeComponent {
  userFile: File | null = null;
  garmentFile: File | null = null;
  isLoading: boolean = false;

  onUserImage(file: File) {
    this.userFile = file;
    console.log('User image uploaded:', file.name);
  }

  onGarmentImage(file: File) {
    this.garmentFile = file;
    console.log('Garment image uploaded:', file.name);
  }

  startMagic() {
    if (!this.userFile || !this.garmentFile) return;

    this.isLoading = true;
    
    // סימולציה של עבודה מול הסוכן (לבינתיים)
    console.log('Sending to AI Agent...', {
      person: this.userFile.name,
      clothing: this.garmentFile.name
    });

    setTimeout(() => {
      this.isLoading = false;
      alert('התמונות נקלטו בהצלחה! בשלב הבא נחבר אותן למודל הבינה המלאכותית.');
    }, 2000);
  }
}