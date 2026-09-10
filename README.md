# KERNL Archives
_**KERNL Archives** is a personal website for archiving projects!_

<p align=center>
    <img height="150" src="./src/assets/preview_home.png">
    <img height="150" src="./src/assets/preview_projects.png">
    <img height="150" src="./src/assets/preview_about.png">
</p>


<p align=center>
    <a href="https://www.buymeacoffee.com/kernl" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="28"></a>
</p>

> [!CAUTION]
> This project is open-sourced for **transparency**, not for reuse or recreation. You're welcome to look through the code to see how things are built, but it's not intended as a template or starter kit for your own version of this site.

## History
This project started originally as a shop ecommerce website practice copy inspired from [ARKE Keycaps website](https://arke.gumroad.com/). I really loved its simple black and white design! So I repurposed its original code to be transformed into this archive and also ported it into React.js from vanilla HTML.

## Message for the visitors
This project has been a fun one to do since it's my first time using React.js to an actual project that has full functionality rather than a experimental type of a project. Devlogs is still being gathered before I input them into the database and cleanup redundancy so stay tuned!

## Features

- **Project archive cards** - browse past and future projects
- **Devlogs** - log progress/updates tied to each project (Depends if i I did actually had a devlog somewhere)
- **Admin dashboard** - create, edit, delete Projects and Devlogs Lists. Accessible only to KERNL
- **Admin login** - authenticated route at _/login_, gated so only KERNL can access the dashboard
- **Image support** - attaching of a cover image to each project card
- **Persistent backend** - all project & devlog data stored and synced via Supabase
- **Session handling** - login persists across visits until logout

## Technologies

- Framework: [React.js](https://react.dev) + Vite
- Styling: Vanilla CSS
- Backend: [Supabase](https://supabase.com)

## Roadmap

- [x] Images on each card
- [x] Dashboard for managing Projects and Devlogs
- [x] Admin Login on (/login)
- [ ] Viewing more detail on each card
- [ ] Markdown support for viewing cards
- [ ] Card routes (still working on it & gathering devlogs)

## AI Usage

AI usage in this project is limited and only used for cleaning up/creating new code since I had never tried TypeScript before in a web project, and for fixing styling issues. Rest assured that the project has seen human intervention.

## Reach me!

If you want to contact me or have questions, reach me out here:

Discord: [nbit.main](https://discord.com/users/489963091019169802)\
Email: [kernl.main@gmail.com](mailto:kernl.main@gmail.com)

## License
This project is __PERSONALY FOR__ KERNL only!

See license: `LICENSE`