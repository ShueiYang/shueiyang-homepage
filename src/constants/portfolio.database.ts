
export interface PortfolioProps {
    id: string;
    title: string;
    desc: string;
    images: string[];
    url?: string;
    stack: string[];
    source: string,
    content?: string;
};    


export const projectsData: PortfolioProps[] = [
    {
        id: "coffee-connaisseur",
        title: "Discovery Coffee Shop",
        images: ["coffeeshop.jpg"],
        desc: `Un simple site pour découvrir quelques magasins de cafés/thé à Paris et localiser 
        ceux à proximité selon notre position.`,
        url: "https://discovery-coffee-shop.vercel.app",
        stack: ["Nextjs", "Reactjs", "Airtable"],
        source: "https://github.com/ShueiYang/Discovery-coffee-shop",
        content: `Coffee connaisseur est un projet où j'utilise pour la 1ere fois le framework Nextjs pour créer
        un site en anglais que l'on puisse découvrir le café / salon the thé à Paris, on peut meme utiliser 
        la localisation pour voir les magasins à proximité selon notre emplacement avec la localisation de google, 
        les datas exploités sont ceux du Foursquare API, qui est une service de gestion des données géospatiales, 
        cette service est gratuite à une certaine limite, et on peut voir certains tips uploaded par les utilisateurs,
        mais je n'ai malheureusement pas encore implementé ce type de service, et le upvote manque encore de restriction.
        Les datas qui sont trouvés sont stocké sur une base de donnée Airtable afin de garder l'acces pour les partages
        de lien sur les routes dynamiques.`
    },
    {
        id: "smartbrain",
        title: "Smartbrain Faces Detect App",
        images: ["smartbrain.jpg"],
        desc: "Une simple application qui peut détecter les visages humains si on soumet l'url d'une image!",
        url: "https://smartbrain-api-shueiyang.netlify.app",
        stack: ["Javascript", "React", "Nodejs", "Expressjs", "Postgresql"],
        source: "https://github.com/ShueiYang/smartbrain-api",
        content: `C'est une simple application que j'ai reproduit lors de ma formation en autodicdacte, avec quelques petites amélioration
        en fonctionnalité notamment pour détecter plusieurs visages. Cette appli utilise un API d'intelligence artificielle (Clarifai)
        et en soumettant l'URL d'une image, le model utilisé serait capable de détecter des visages humains, c'est le 1er projet où j'ai construit
        à la fois au Frontend, puis le Backend avec une base de données Postgres, on peut donc login sur la base de donnée avec
        une autorisation en créant un compte, et j'ai implementé plus tard la possibilité de s'inscrire avec un compte google (Oauth2.0) qui permet
        l'acces avec une authentification. Sinon le source code pour le coté Frondend est sur Readme.`
    },
    {
        id: "todolistv2",
        title: "ToDoList App",
        images: ["todolist.jpg"],
        desc: "Une simple todolist utilisant le stack MERN",
        url: "https://todolistv2.fly.dev",
        stack: ["MongoDB", "Expressjs", "Reactjs", "Nodejs"],
        source: "https://github.com/ShueiYang/todolistv2-api",
        content: `Une todolist app basique que j'ai reproduit sur un model utilisant seulement le server rendering avec le template EJS et Node/Express,
        et je l'ai reconverti pour la pratique, avec le stack MERN (MongoDB, Express, React, Node) 
        et qui me permet d'entrainer cette fois-ci à utiliser Mongoose et MongoDB pour la persistance des données des 
        listes créées sur cette application, j'ai aussi amélioré l'interface avec Bootstrap pour la barre de navigation,
        et les modals.`
    },
    {
        id: "nasa-project",
        title: "Nasa Mission Control Panel",
        images: ["nasa-panel.jpg"],
        desc: "Une interface de control de mission virtuelle de la Nasa",
        url: "https://nasa-project.fly.dev",
        stack: ["MongoDB", "Expressjs", "Nodejs"],
        source: "https://github.com/ShueiYang/Nasa-project",
        content: `Un projet où j'ai surtout travaillé en Backend, en récupérant les données des exoplanetes de la NASA,
        et en exploitant le REST Api du SpaceX pour le calendrier des lancements, j'ai donc reconstruit l'Api
        afin de pouvoir le connecter au front. Le frontend a été importé et utilise une UI framework Arwes basé 
        sur React, j'ai mis à jour le React Router, par contre le framework est 'deprecated' et la nouvelle version étant
        toujours en cours de développement, je n'ai pas pu la mettre à jour, et afin c'est aussi dans ce projet où j'ai 
        pratiqué la 1ere fois le end-to-end test avec Jest et Supertest.`
    },
    {
        id: "pokedex",
        title: "Web Pokedex",
        images: ["pokemon.jpg"],
        desc: "Un Pokedex avec Reactjs utilisant le célébre RESTful Pokemon API!",
        url: "https://shueiyang.github.io/pokemons",
        stack: ["Javascript", "Reactjs"],
        source: "https://github.com/ShueiYang/pokemons",
        content: `Mon tout premier projet avec Reactjs où j'ai construit un Pokedex, en
        utilisant le célébre RESTful API de Pokemon, conçu spécifiquement
        pour afficher les informations de jeu Pokemon. C'est de loin la plus 
        grande base de données d'informations de Pokemon et l'API est
        entièrement gratuite.`
    },
  
]