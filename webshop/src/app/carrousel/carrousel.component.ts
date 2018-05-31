import { Component, OnInit, AfterViewInit } from "@angular/core";
import {movieData} from '../model/data';
import { DataCloudService } from '../services/data-cloud.service';


@Component({
  selector: "app-carrousel",
  templateUrl: "./carrousel.component.html",
  styleUrls: ["./carrousel.component.css"]
})
export class CarrouselComponent implements AfterViewInit {
  constructor(public dataCloudService: DataCloudService) {}

  slideIndex = 1;
  movies: movieData[];
  moviesDOTD: movieData[];

  ngOnInit() {
   
  }

  ngAfterViewInit() {
    this.dataCloudService.getMovie().subscribe(Moviedata => {
      this.movies = Moviedata; 
    });
    console.log(this.movies);

    this.showSlides(1);
  }

  currentSlide(n: number) {
    this.slideIndex = n;
    this.showSlides(this.slideIndex);
  }

  plusSlides(n: number) {
    this.slideIndex += n;
    this.showSlides(this.slideIndex);
  }

  showSlides(n: number) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].setAttribute("style", "display: none;");
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[this.slideIndex - 1].setAttribute("style", "display: block");
    dots[this.slideIndex - 1].className += " active";
  }
}
