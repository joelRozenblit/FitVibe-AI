import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiAgentService {
  //=======================!!!!===========================
  //==== do not hardcode API keys in production code! ====
  //======================================================
  private apiKey = 'YOUR_API_KEY';
  //=======================!!!!===========================

  constructor(private http: HttpClient) {}

  async processTryOn(userImageBase64: string, garmentImageBase64: string): Promise<any> {
    const headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': this.apiKey,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });

    const url = '/api-pixazo/getImage/v1/getSDXLImage';

    const body = {
      prompt: 'High-resolution, realistic image of a professional fashion model wearing a luxury outfit, studio lighting, highly detailed, elegant style',
      negative_prompt: 'Low-quality, blurry image, distorted hands, watermark, cartoonish, harsh lighting',
      height: 1024,
      width: 1024,
      num_steps: 20,
      guidance_scale: 5,
      seed: 40,
    };

    return firstValueFrom(this.http.post(url, body, { headers }));
  }
}