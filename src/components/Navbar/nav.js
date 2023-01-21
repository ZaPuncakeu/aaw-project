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
        icon: "search",
        title: "Search for an animal",
        link: "search"
    }
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
            icon: "power-off",
            link: 'logout'
        }
    ],
    "admin": [
        {
            icon: "user-with-cog",
            title: "Admin",
            link: 'admin/animals'
        },
        {
            icon: "power-off",
            link: 'logout'
        }
    ]
}