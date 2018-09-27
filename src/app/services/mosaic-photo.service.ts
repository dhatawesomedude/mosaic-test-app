import { ElementRef, EventEmitter, Injectable, Renderer2 } from '@angular/core';
import { app } from '../models/app.model';

@Injectable()
export class PhotoMosaicService {
  private iWidth = 500;
  private iHeight = 500;
  private readonly tileHeight: number;
  private readonly tileWidth: number;
  private noOfVerticalTiles = 1;
  private noOfHorizontalTiles = 1;
  private readonly imageUrl: string;
  public readonly onComplete = new EventEmitter<void>();
  private canvasRef: ElementRef;
  private tileShape = app.TileShape.circle;
  private readonly opacity: number = 1;
  constructor (options: app.MosaicServiceOptions) {
    this.imageUrl = options.imageUrl;
    this.iWidth = options.iWidth;
    this.iHeight = options.iHeight;
    this.tileHeight = options.tileHeight;
    this.tileWidth = options.tileWidth;
    this.noOfHorizontalTiles = options.noOfHorizontalTiles;
    this.noOfVerticalTiles = options.noOfVerticalTiles;
    this.canvasRef = options.canvasRef;
    this.opacity = options.opacity || this.opacity;
  }
  public setupMosaic(): void {
    this.drawImage((context: CanvasRenderingContext2D) => this.tileCanvas(context));
  }
  private drawImage (done: Function): void {
    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.beginPath();
    ctx.rect(0, 0, this.iWidth, this.iHeight);
    ctx.closePath();
    ctx.fill();
    const image = new Image();
    image.onload = () => {
      this.resize(image.height, image.width);
      ctx.drawImage(image, 0, 0, this.iWidth, this.iHeight);
      done(ctx);
    };
    image.crossOrigin = 'Anonymous';
    image.src = this.imageUrl;
  }
  private resize (height: number, width: number): void {
    this.canvasRef.nativeElement.height = 500;
    this.canvasRef.nativeElement.width = 500;
    this.iWidth = 500;
    this.iHeight = 500;
    this.noOfHorizontalTiles = Math.floor(this.iWidth / this.tileWidth);
    this.noOfVerticalTiles = Math.floor(this.iHeight / this.tileHeight);
  }
  // Returns the average color of the canvas.
  private findAverageColour (data: any[]): app.Color {
    let i = -4, count = 0;
    const pixelInterval = 5,
      rgb = {
        r: 0,
        g: 0,
        b: 0
      },
      length = data.length;

    while ((i += pixelInterval * 4) < length) {
      count++;
      rgb.r += data[i];
      rgb.g += data[i + 1];
      rgb.b += data[i + 2];
    }

    // floor the average values to give correct rgb values
    rgb.r = Math.floor(rgb.r / count);
    rgb.g = Math.floor(rgb.g / count);
    rgb.b = Math.floor(rgb.b / count);

    return rgb;
  }
  // Divides the whole canvas into smaller tiles and finds the average
  // colour of each block. After calculating the average colour, it stores
  // the data into an array.
  private tileCanvas (context: CanvasRenderingContext2D): void {
    const originalImageData: ImageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    for (let i = 0; i < this.noOfVerticalTiles; i++) {
      for (let j = 0; j < this.noOfHorizontalTiles; j++) {
        const x = j * this.tileWidth, y = i * this.tileHeight;
        const imageData = this.getImageData(x, y, this.iWidth, originalImageData);
        const averageColor = this.findAverageColour(imageData);
        const color = 'rgba(' + averageColor.r + ',' + averageColor.g + ',' + averageColor.b + ',' + this.opacity + ')';
        context.fillStyle = color;
        this.createMosaic(x, y, context);
      }
    }
    this.onComplete.emit();
  }
  // Creates an array of the image data of the tile from the data of whole image
  private getImageData (startX: number, startY: number, width: number, originalImageData: ImageData) {
    const data = [];
    for (let x = startX; x < (startX + this.tileWidth); x++) {
      const xPos = x * 4;
      for (let y = startY; y < (startY + this.tileHeight); y++) {
        const yPos = y * width * 4;
        data.push(
          originalImageData.data[xPos + yPos + 0],
          originalImageData.data[xPos + yPos + 1],
          originalImageData.data[xPos + yPos + 2],
          originalImageData.data[xPos + yPos + 3]
        );
      }
    }
    return data;
  }
  // Creates a block of the mosaic. This is called (noOfVerticalTiles * noOfVerticalTiles)  times to create all blocks
  private createMosaic (x: number, y: number, context: CanvasRenderingContext2D): void {
    if (this.tileShape === app.TileShape.circle) {
      const centerX = x + this.tileWidth / 2;
      const centerY = y + this.tileHeight / 2;
      const radius = Math.min(this.tileWidth, this.tileHeight) / 2;
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
    } else if (this.tileShape === app.TileShape.rect) {
      context.beginPath();
      context.rect(x, y, this.tileWidth, this.tileHeight);
      context.closePath();
      context.fill();
    }
  }
}
