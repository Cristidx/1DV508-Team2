import { Pipe, PipeTransform } from "@angular/core";
import { DataCloudService } from "../services/data-cloud.service";
import { movieData } from "../model/data";

@Pipe({ name: "movie" })
export class FromIDToMoviePipe implements PipeTransform {
    constructor(private cloudService: DataCloudService) {

    }

    transform(value: string) {
        this.cloudService.getMovieFromIDs([value])
            .then((movies: movieData[]) => {
                return this.toString(movies[0]);
            })
        return "test";
    }

    toString(movie: movieData) {
        return "test";
    }
}
