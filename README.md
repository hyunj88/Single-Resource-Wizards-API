# Wizards API

This api will allow the users of our react front-end application to CRUD wizards and their wands.

This application uses token authentication of sessions.

## Resources

### Wizards

###### Routes Table
| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET    | `/wizards`             | `wizards#index`   |
| GET    | `/wizards/:id`         | `wizards#show`    |
| POST   | `/wizards`             | `wizards#create`  |
| PATCH  | `/wizards/:id`         | `wizards#update`  |
| DELETE | `/wizards/:id`         | `wizards#deletee` |

### Users

###### Routes Table
| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/`    | `users#changepw`  |
| DELETE | `/sign-out/`           | `users#signout`   |

