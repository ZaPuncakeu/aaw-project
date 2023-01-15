export const middleNav = [
    {
        icon: "home",
        title: "Home",
        link: "/"
    },
    {
        icon: "paw",
        title: "Our animals",
        link: "species"
    },
    {
        icon: "gamepad",
        title: "Attractions & activities",
        link: "activities",
    }/*,
    {
        icon: "shield",
        title: "Animals protection",
        link: "protection"
    }*/
]

export const rightNav = {
    "unauthenticated": [
        {
            icon: "sign-in",
            title: "Sign in",
            link: 'sign-in'
        },
        {
            icon: "user-plus",
            title: "Sign up",
            link: 'sign-up'
        }
    ],
    "user": [
        {
            icon: "heart",
            title: "Favourites",
            link: 'favourites'
        },
        {
            icon: "user",
            title: "Profile",
            link: 'profile'
        },
        {
            icon: "power-off",
            link: 'logout'
        }
    ],
    "admin": [
        {
            icon: "user-with-cog",
            title: "Admin",
            link: 'admin'
        },
        {
            icon: "power-off",
            link: 'logout'
        }
    ]
}