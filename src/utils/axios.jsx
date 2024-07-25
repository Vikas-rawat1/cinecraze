import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTQzZTBhNmFkNjdmMmUzYTE3YTU1Y2FjYWRiYTRmNyIsIm5iZiI6MTcyMTkzMzc0OC41NTQ1MDksInN1YiI6IjY2YTI5YzUwZTczMWQ3MDQxMTI1YWZiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5RbE3RceT8D2UCY0vRdFgbT6hFtmhyJ3jl-zC-Ff1XQ",
  },
});
export default instance;
