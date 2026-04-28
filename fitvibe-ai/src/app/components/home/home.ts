import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from '../image-uploader/image-uploader';
import { AiAgentService } from '../../services/ai-agent';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ImageUploaderComponent],
  templateUrl: './home.html',
})
export class HomeComponent {
  userFile: File | null = null;
  garmentFile: File | null = null;
  isLoading: boolean = false;
  resultImage: string | null = null;

  constructor(
    private aiService: AiAgentService,
    private cdr: ChangeDetectorRef,
  ) {}

  onUserImage(file: File) {
    this.userFile = file;
  }

  onGarmentImage(file: File) {
    this.garmentFile = file;
  }

  async startMagic() {
    if (!this.userFile || !this.garmentFile) return;
    this.isLoading = true;
    this.resultImage = null;
    this.cdr.detectChanges(); // רענון למצב טעינה

    try {
      const userBase64 = await this.fileToBase64(this.userFile);
      const garmentBase64 = await this.fileToBase64(this.garmentFile);

      const res = await this.aiService.processTryOn(userBase64, garmentBase64);
      console.log('AI Generation Success:', res);

      if (res && res.imageUrl) {
        this.resultImage = res.imageUrl;
      } else {
        throw new Error('Image URL not found in response');
      }
    } catch (error) {
      console.error('Error details:', error);
      alert('שגיאה ביצירת התמונה.');
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }
}
