export const getFilms = (page, sort) =>
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=04f06ba746e804208bf86d672e2ce8e4&language=ru&sort_by=${sort}&page=${page}`).then((responce) =>
  responce.json()
);

export const getFilmPage = (id) =>
  fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=04f06ba746e804208bf86d672e2ce8e4&language=ru`).then((responce) =>
  responce.json()
);

export const getGenres = () =>
  fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=04f06ba746e804208bf86d672e2ce8e4&language=ru`).then((responce) =>
  responce.json()
);

export const getVideos = (id) =>
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=04f06ba746e804208bf86d672e2ce8e4&language=en`).then((responce) =>
  responce.json()
);
