# TinySlack

Bienvenus dans la partie front de notre projet de certification de la POEC Java proposée par M2iFormation.

Celle-ci a été créée dans le but de fournir une petite application de messagerie semblable à Slack, permettant aux utilisateurs de créer de nouveaux canaux de communication et de s'envoyer des messages sur chacun d'entre eux.

Vous retrouverez la partie back du projet ici => [Backend Tinyslack](https://github.com/EbrujAtlas/Projet_Jury)

![Illustration Slack](https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)

## Spécifications du projet demandé

### Le projet à réaliser
* Une application de tchat en ligne, en prenant exemple sur Slack.
* Pas d’authentification.
* Pas de sécurisation de l’API.
* Un seul espace de travail constitue la page d’accueil de l’application.
* Un canal général par défaut est actif. Il n’est pas possible de renommer ou supprimer
le canal général.
* L’utilisateur doit pouvoir ajouter, renommer ou supprimer un canal.
* Dans chaque canal, l’utilisateur doit pouvoir ajouter des messages au format texte
uniquement à l’aide d’un formulaire.
* Dans chaque canal, les messages s’affichent au format texte avec le nom d’un utilisateur statique, la date et l’heure à laquelle le message a été ajouté.
* Tous les canaux et leurs messages doivent être enregistrés en base de données.
* L’application doit être responsive.
* Le design de l’application est libre.

### Consignes et bonus
* L’API et l’application tournent en local sur les machines des stagiaires le jour de la présentation, il n’est pas demandé de les mettre en ligne.
* L'option multi-utilisateurs impliquant l’utilisation d’un Websocket pour le temps réel n’est pas demandée.
* L’utilisateur est créé côté Backend ou côté Frontend de manière statique dans le code.
* Toute fonctionnalité supplémentaire donnera lieu à des points bonus à l’ensemble du groupe.

### Aspects techniques
#### Backend
* Base de données : MySQL
* API : Spring

#### Frontend
* Angular & Bootstrap

### Réalisation du frontend
Ce projet a été généré à l'aide d'[Angular CLI](https://github.com/angular/angular-cli) version 16.2.0. et CSS.

## Utilisation de notre projet

1. Référez vous à la partie backend pour faire fonctionner l'API => [Backend Tinyslack](https://github.com/EbrujAtlas/Projet_Jury) 

2. Clonez le projet

```bash
  git clone https://github.com/EbrujAtlas/FrontEndCertif.git
```

3. Placez vous dans le projet

```bash
  cd FrontEndCertif
```

4. Lancez le serveur
```bash
  ng serve
```

---
## Axes d'amélioration
* Avoir des validations plus précises dans les différents formulaires, afin d'éviter des entrées en base qui ne sont pas adaptées aux données demandées

## Présentation de l'équipe

Pour réaliser ce projet, nous étions 4 :
* [Coralie Dubreuil](https://github.com/Ciyasan)
* [Ebru Jolivet](https://github.com/EbrujAtlas)
* [Florian Marchive](https://github.com/MarchiveFlorian)
* [Noellie Peuch](https://github.com/pandaka87)

Nous avons ainsi pu nous apporter nos compétences complémentaires et se diviser pour le travail en pair programming.