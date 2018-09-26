import { ElementRef } from '@angular/core';

export namespace app {
  export interface ImgurGalleryItem {
    'id': string;
    'title': string;
    'description': null;
    'datetime': Date;
    'type': string;
    'animated': true;
    'width': number;
    'height': number;
    'size': number;
    'views': number;
    'bandwidth': number;
    'favorite': boolean;
    'nsfw': boolean;
    'section': string;
    'account_url': string;
    'account_id': string;
    'is_ad': boolean;
    'in_most_viral': boolean;
    'has_sound': boolean;
    'tags': string [];
    'ad_type': number;
    'ad_url': string;
    'in_gallery': boolean;
    'link': string;
    'mp4_size': number;
    'mp4': string;
    'gifv': string;
    'comment_count': number;
    'favorite_count': number;
    'score': number;
    'is_album': boolean;
  }
  export enum TileShape {
    circle = 'circle',
    rect = 'rect'
  }
  export interface MosaicServiceOptions {
    imageUrl: string;
    iWidth: number;
    iHeight: number;
    tileHeight: number;
    tileWidth: number;
    noOfVerticalTiles: 1;
    noOfHorizontalTiles: 1;
    canvasRef: ElementRef;
    tileShape?: TileShape;
    opacity?: number;
  }

  export interface Color {
    r: number;
    g: number;
    b: number;
  }
  export interface MatPage {
    pageIndex: number;
    pageSize: number;
    length: number;
    previousPageIndex: number;
  }
  export namespace ImageApi {
    export namespace GET {
      export interface Request {
        subreddit: string;
        pageId: number;
      }
      export interface Response {
        data: ImgurGalleryItem [];
        success: boolean;
      }
    }
    export namespace POST {
      export interface Response {
        data: ImgurGalleryItem;
        success: boolean;
      }
    }
  }
}

