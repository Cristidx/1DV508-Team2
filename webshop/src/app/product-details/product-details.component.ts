import { Component, OnInit } from '@angular/core';
import {Movie} from './movie';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  movie: Movie = {
    genre: 'Genre',
    price: 'Price ($)',
    price2: 99.99 ,
    year: 'Year',
    year2: 1960,
    details: 'Psycho (1960) was directed by Alfred Hitchcock and starred Anthony Perkins, Vera Miles,' +
    ' John Gavin, and Janet Leigh. The screenplay is by Joseph Stefano. Running time: 109 minutes.\n' +
    '    In Psycho, Alfred Hitchcock not only created a blazing masterpiece and spawned a new cinematic genre – the slasher.' +
    ' He also delivered one of the boldest blows in screen history. ' +
    'It was not just how he killed Janet Leigh\'s Marion Crane, astonishing though that was – it was when.\n' +
    '    The film is 109 minutes long, but he offs his heroine, the glamorous miscreant with whom he\'s made us identify, after just 47.' +
    ' In 1960, this generated, by all accounts, an unprecedented sense of careering into uncharted and terrifying territory:' +
    ' what the hell would happen next? Even now, it\'s distinctly unnerving.\n' +
    '    That said, Marion Crane\'s now-famous end in the shower ' +
    '– made up of 70 camera set-ups and 78 pieces of film, with no actual shot of the knife piercing flesh ' +
    '– is very nearly matched for shock value by the later dispatching of Detective Arbogast as he explores the motel on ' +
    'Marion\'s trail.' +
    ' And, although the trick is simpler here, it\'s no less powerful.\n' +
    '    As soon as the policeman reaches the top of the stairs, ' +
    'Hitchcock cuts disorientatingly to a bird\'s-eye view of the landing,' +
    ' and then, before we\'ve had even a second to get our bearings,' +
    ' a figure darts into view from the right of the screen, knife raised. ' +
    'No matter how prepared you are, how many times you see it, it\'s almost impossible not to flinch.',
    genre1: 'Horror',
    genre2: 'Action',
    genre3: 'Thriller',
    name: 'Psycho',
  };
  items = [this.movie.genre1, this.movie.genre2, this.movie.genre3];
  constructor() { }
  ngOnInit() {
  }

}
