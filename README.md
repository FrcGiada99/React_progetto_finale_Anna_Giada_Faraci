## Descrizione

Gameverse è un'applicazione sviluppata con react che consente agli utenti non autenticati di poter navigare attraverso le pagine di dettaglio di ogni videogioco, cercare attraverso i filtri per genere e piattaforme, di cercare i giochi attraverso la barra di ricerca e potersi registrare inserendo nome, cognome, email e password. Gli utenti autenticati, una volta effettuato l'accesso, possono aggiungere i giochi nei preferiti, usare la chat all'interno della pagina di dettaglio di ogni gioco per interagire con gli altri utenti e visualizzare il proprio account con la lista dei giochi preferiti.

## API

E' stata utilizzata la API del sito di RAWG per poter ricavare le informazioni e le immagini dei giochi presenti sul sito: https://rawg.io/

## Stile

Per stilizzare il progetto Gameverse sono state utilizzate librerie come Bootstrap, Css e Material-UI

## Pagine

Le pagine visitabili sono:

- Home page che permette di visualizzare le card dei videogiochi, la sidebar con i filtri per genere e piattaforma, la barra di ricerca e la possibilità di accedere, autenticarsi o visualizzare il proprio account;
- Pagina dettaglio prodotto che permette di visualizzare l'immagine, le informazioni riguardo il videogioco e la chat
- Pagina Registrazione utente permette all'utente di registrarsi attraverso un form
  -Filtri per piattaforma e genere per poter visualizzare i giochi attraverso il genere e la console che si cerca

## Context

SessionContext permette di gestire le informazioni degli utenti autenticati come l'ID, il nome utente e la sessione. Il FavContext permette di gestire i file preferiti dell'utente in modo da pemettergli di aggiungerli alla lista dei preferiti.

## Deployment

[GameVerse](https://gameverseprogettoreact.vercel.app)
