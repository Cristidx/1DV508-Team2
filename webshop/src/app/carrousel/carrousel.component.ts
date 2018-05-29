import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {

  constructor() { }

  slideIndex =1;

  ngOnInit() {
    this.showSlides(1);
    
  }

  d
  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  plusSlides(n:number) {
    this.showSlides(this.slideIndex += n);
  }

  showSlides(n) {
    var i;
   var slides: HTMLCollection = document.getElementsByClassName("mySlides");
   var dots: HTMLCollection = document.getElementsByClassName("dot");
   if(n> slides.length) {
     this.slideIndex = 1;  //we make it return to the beginning
    }
   if(n <1) {
     this.slideIndex = slides.length;
   }
    for (i = 0; i < slides.length; i++) {
      let elementSlides: HTMLElement = slides[i] as HTMLElement;
      
      elementSlides.style.display = "none";
      
    }

   for(i = 0; i < dots.length; i++) {
     let elementDot: string = dots[i].className;
     console.log(elementDot);
      elementDot.replace(" active", "");
    } 
    console.log(this.slideIndex);
    let slideMinusOne: HTMLElement = slides[this.slideIndex-1] as HTMLElement;
    console.log(slideMinusOne);
   slideMinusOne.style.display = "block";

   let dotsMinusOne: HTMLElement = dots[this.slideIndex-1] as HTMLElement;
   dotsMinusOne.className += " active";
  
  }
}
