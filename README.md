<h1 align="center">
  <img src="https://raw.githubusercontent.com/ITISEnricoFermi/archivio-digitale-client/81041b2932b032ead156777a6927efe1925b52ca/static/shortcut/safari-pinned-tab.svg?sanitize=true" height="100"><br>
  🤖 Fermibot 🤖
</h1>
<p align="center">
  Bot Telegram dell'ITIS Enrico Fermi.
</p>

# Getting Started

Prima di avviare il bot è necessario impostare alcune variabili d'ambiente.

|Variabile|Default    |Descrizione               |
|---------|-----------|--------------------------|
|TOKEN    |token      |Il token Telegram del bot.|
|CHANNEL  |@itisfermi |L'ID del canale Telegram al quale inviare i messaggi.|
|PORT     |3000       |La porta del server per le API.|
|API      |https://itisfermi.edu.it | Il sito Wordpress da cui reperire le informazioni.|
|EMOJI    |🏫         |L'emoji che compare all'inizio del messaggio.|

***env.example.json***

```json
{
  "TOKEN": "token",
  "CHANNEL": "@itisfermi",
  "PORT": 3000,
  "API": "https://itisfermi.edu.it/",
  "EMOJI": "🏫"
}
```

## Authors

* **Riccardo Sangiorgio** - [Richard1984](https://github.com/Richard1984/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
