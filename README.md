# MGB Library

[MGB Library Website](https://thainge.github.io/movies-games-books/)

Online library that allows users to login with a google account and query multiple API for information about all movies, games, and books. This information from the APIs is submitted by users and pushed into a collection owned by the user, which can be shared to others.

## Development Explanation
### Data Modeling
- users, database which holds all users that have signed in and their user accounts.
- movies, database which holds all movies that a user has added to their library.
- games, database which holds all games that a user has added to their library.
- books, database which holds all books that a user has added to their library.
### Server Queries
- Multiple API queries for creating, updating, and deleting all of the data above.
### External APIs used
- IMDB API
- TMDB API
- Steamworks API
- Google Books API
### Web Pages
- Home
- Movies/Games/Books Home
- Movies/Games/Books Collection

CopyRight 2022 Tobey Hainge