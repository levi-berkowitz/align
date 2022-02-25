import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {ImageData} from "../../models/image-data";
import {ImagesService} from "../../services/images.service";

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit, OnDestroy {
  readonly maxThumbnailStartIndex = 2;
  componentSubscriptions: Subscription[]
  imagesData!: ImageData[];
  selectedImageData!: ImageData;
  thumbnailStartIndex!: number;
  isInitialized = false;

  @ViewChild('selectedImageSection') selectedImageSectionElementRef!: ElementRef<HTMLElement>;

  constructor(private imagesService: ImagesService) {
    this.componentSubscriptions = [];
  }

  ngOnInit(): void {
    this.componentSubscriptions.push(
      this.imagesService.get().subscribe(next => {
        this.imagesData = next;
        this.selectedImageData = this.imagesData[2];
        this.thumbnailStartIndex = 1;
        this.isInitialized = true;
      })
    );
  }

  ngOnDestroy(): void {
    this.componentSubscriptions.forEach(x => x.unsubscribe());
  }

  getSmallImageSrc = (id?: number) => `https://picsum.photos/id/${id}/250/250`;

  getImageSrc(imageData?: ImageData) {
    const imageContainerElement = this.selectedImageSectionElementRef.nativeElement;
    const width = imageContainerElement.clientWidth;
    const height = imageContainerElement.clientHeight;
    return `https://picsum.photos/id/${imageData?.id}/${width}/${height}`;
  };

  get selectedImageSrc() {
    return this.getImageSrc(this.selectedImageData);
  }

  get thumbnailImagesData() {
    return this.imagesData.slice(this.thumbnailStartIndex, this.thumbnailStartIndex + 3);
  }

  handleImageClick(imageData: ImageData) {
    this.selectedImageData = imageData;
  }

  onRightArrowClicked() {
    if (this.thumbnailStartIndex < this.maxThumbnailStartIndex) {
      this.thumbnailStartIndex++;
    }
  }

  onLeftArrowClicked() {
    if (this.thumbnailStartIndex > 0) {
      this.thumbnailStartIndex--;
    }
  }
}
