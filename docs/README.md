# ArtNook
## Pola Dudek, 22.01.2026

ArtNook to aplikacja webowa umożliwiająca rezerwację miejsc na seansje kina studyjnego. System posiada część użytkownika oraz panel administratora, który pozwala zarządzać filmami i seansami. 

## Wymagania

- Node.js (v24.12.0)
- MySQL (lokalnie lub w Dockerze)
- npm

## Użyte biblioteki

- Express – framework serwera HTTP
- bcrypt – haszowanie haseł
- jsonwebtoken – obsługa tokenów JWT
- dotenv – ładowanie zmiennych środowiskowych
- cors – obsługa CORS (backend i frontend działają na różnych portach)

## Instalacja

1. Przejdź do katalogu projektu:

   ```bash
   cd ArtNook
   ```

2. Zainstaluj wymagane zależności:

   ```bash
   npm install
   ```

3. Uruchom bazę danych w Dockerze (MySQL):

   * Upewnij się, że masz plik docker-compose.yml w katalogu projektu

     ```bash
     docker-compose up -d
     ```
Kontener uruchomi MySQL i automatycznie załaduje strukturę bazy z pliku schema.sql.

4. Konfiguracja zmiennych środowiskowych:

   * Utwórz plik `.env` w katalogu głównym projektu
   * Uzupełnij dane dostępowe do bazy danych:

     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASS=super_tajne_haslo
     DB_NAME=cinema
     ```

## Uruchomienie aplikacji

Aby uruchomić aplikację w trybie deweloperskim:

```bash
npm run dev
```

Serwer uruchomi się pod adresem `http://localhost:3000`.

## Struktura projektu

```
ArtNook/
├── server.js              – główny plik aplikacji
├── package.json           – konfiguracja projektu i zależności
├── .env                   – zmienne środowiskowe
├── schema.sql             – schemat bazy danych
├── config/
│   └── db.js              – konfiguracja połączenia z MySQL
├── middleware/
│   └── auth.js            – obsługa autoryzacji JWT
├── routes/                – definicje endpointów API
├── controllers/           – logika kontrolerów
├── services/              – logika biznesowa
├── models/                – komunikacja z bazą danych
└── views/                 – pliki frontendowe (HTML, CSS)

```

## Funkcjonalności

Użytkownik:

* rejestracja i logowanie
* przeglądanie repertuaru
* rezerwacja miejsc na seanse
* podgląd własnych rezerwacji

Administrator:
Tak jak użytkownik oraz:
* dodawanie, edycja i usuwanie filmów
* dodawanie i uwuwanie seansów

## API – główne endpointy:

Filmy:

* GET /api/movies
* POST /api/movies (admin)
* PUT /api/movies/:id (admin)
* DELETE /api/movies/:id (admin)

Seanse:

* GET /api/screenings
* GET /api/screenings/full/:movieId
* POST /api/screenings (admin)

Rezerwacje:

* POST /api/bookings
* GET /api/bookings/mine
* DELETE /api/bookings/:id

Użytkownicy:

* POST /api/register
* POST /api/login
* GET /api/me

## Dane początkowe

Baza danych inicjalizowana na podstawie pliku `schema.sql` zawiera:

* trzy sale kinowe (A-1, A-2, A-3)
* podstawową strukturę umożliwiającą dodawanie filmów i seansów

## Testowanie

1. Rejestracja użytkownika: `/views/register.html`
2. Logowanie: `/views/login.html`
3. Przegląd seansów: `/views/screenings.html`
4. Rezerwacja miejsca
5. Podgląd rezerwacji: `/views/user.html`

