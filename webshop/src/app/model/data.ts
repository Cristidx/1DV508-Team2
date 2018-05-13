
   export interface categoriesData {
    id?:string;
    genre?:string;
  }

  export interface movieData {
    id?:string;
    title?:string;
    genre?:string;
    imageURL?:string;
    price?:number;
    year?:number;
    plot?:string;
    stock?:number;
    director?:string;
    dateAdded?:string;
    avgRating?:number;
    totalRatings?:number;
  }

  export interface starData {
    id?:string;
    movieId?:string;
    userId?:string;
    value?:number;
  }
