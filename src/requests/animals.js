import { useState, useEffect } from 'react';

export const getAnimalsOfSpecie = (specie) => 
{
    console.log("getAnimalsOfSpecie "+specie);
    const [loading, setLoading] = useState(true);
    const [animals, setAnimals] = useState([]);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState(null);
    useEffect(() => 
    {
        (async () => {
            try
            {
                setTimeout(() => {
                    setAnimals(animals_db.db);
                    setTitle(animals_db.title);
                    setLoading(false);
                }, 2000);
            }catch(err)
            {
                setError(err);
            }
        })();
    }, [])

    return [
        animals.map(a => ({...a, "link": `/animal/${a.slug}`})), 
        loading, 
        error,
        title
    ];
}

export const getAnimalBySlug = (slug) => 
{
    console.log("getAnimalsBySlug "+slug);
    const [loading, setLoading] = useState(true);
    const [animal, setAnimal] = useState({});
    const [error, setError] = useState(null)
    useEffect(() => 
    {
        (async () => {
            try
            {
                setTimeout(() => {
                    setAnimal(animal_info);
                    setLoading(false);
                }, 2000);
            }catch(err)
            {
                setError(err);
            }
        })();
    }, [])

    return [
        animal, 
        loading, 
        error
    ];
}

const animals_db = {
    'title': "Dogs",
    db: [{
        "name": "NORTHERN CARDINAL",
        "image": "/images/home/animal.jpg",
        "text": "Male Northern cardinals are unmistakable in their vibrant red plumage. Females of this species are not so bright but are also attractive being reddish olive in color. These birds have distinctive crests on their heads and masks on their faces which are black in the males and gray in the females. Did you know that the plumage color of the males is produced from carotenoid pigments in the diet? Coloration is produced from both red pigments and",
        "slug": "northern-cardinal"
    },
    {
        "name": "NORTHERN CARDINAL",
        "image": "/images/home/animal.jpg",
        "text": "Male Northern cardinals are unmistakable in their vibrant red plumage."
    },
    {
        "name": "NORTHERN CARDINAL",
        "image": "/images/home/animal.jpg",
        "text": "Male Northern cardinals are unmistakable in their vibrant red plumage. Females of this species are not so bright but are also attractive being reddish olive in color. These birds have distinctive crests on their heads and masks on their faces which are black in the males and gray in the females. Did you know that the plumage color of the males is produced from carotenoid pigments in the diet? Coloration is produced from both red pigments and  being reddish olive in color. These birds have distinctive crests on their heads and masks on their faces which are black in the males and gray in the females. Did you know that the plumage color of the males is produced from carotenoid pigments in the diet? Coloration is produced from both red pigments and  being reddish olive in color. These birds have distinctive crests on their heads and masks on their faces which are black in the males and gray in the females. Did you know that the plumage color of the males is produced from carotenoid pigments in the diet? Coloration is produced from both red pigments and",
        "slug": "northern-cardinal"
    },
    {
        "name": "NORTHERN CARDINAL",
        "image": "/images/home/animal.jpg",
        "text": "Male Northern cardinals are unmistakable in their vibrant red plumage. Females of this species are not so bright but are also attractive being reddish olive in color. These birds have distinctive crests on their heads and masks on their faces which are black in the males and gray in the females. Did you know that the plumage color of the males is produced from carotenoid pigments in the diet? Coloration is produced from both red pigments and",
        "slug": "northern-cardinal"
    }]
}

const animal_info = {
    "name": "NORTHERN CARDINAL",
    "photos": [
        '/images/home/animal.jpg',
        '/images/home/animal.jpg',
        '/images/home/animal.jpg',
        '/images/home/animal.jpg',
        '/images/home/animal.jpg',
        '/images/home/animal.jpg',
        '/images/home/animal.jpg',
        '/images/home/animal.jpg',
        '/images/home/animal.jpg',
        '/images/home/animal.jpg',
        '/images/home/animal.jpg',
        '/images/home/animal.jpg',
        '/images/home/animal.jpg',
        '/images/home/animal.jpg',
        '/images/home/animal.jpg'
    ],
    "aliases": [
        "Bruh",
        "Moment",
        "Shkoupi"
    ],
    "continent": ["North America"],
    "countries": [
        "Central America",
        "Caribbean Islands"
    ],
    "description": "The Northern cardinal is a medium-sized very popular songbird of North America. Seven eastern states have it as their official state bird. The male is perhaps most responsible for their popularity, being the perfect combination of conspicuousness, familiarity, and style, featuring a very appealing shade of red. The brown females even have a sharp crest and red accents. These birds do not migrate and they do not molt to a dull plumage, so in the winter snow, they still look stunning. In summer, one of the earliest sounds in the morning is their sweet whistling.",
    "origin_description": "Northern cardinals are common throughout central and eastern North America, and south from Florida and Mexico down to Belize and Guatemala. This species has also been introduced to Bermuda, California, and Hawaii. They inhabit woodland edges, streamside thickets, wetlands, shrublands, gardens, and vegetation near houses in suburban and urban areas.",
    "lifestyle": `This species is not migratory but is a year-round resident within its range. During the day, these birds are active, especially in the morning and evening. In winter they feed in large flocks of as many as 60 to 70, mainly in open thickets on the ground, but they also forage in bushes and trees. In winter, most will roost and flock together. Males are very territorial and will defend their territory from other males. If they see their own reflection, they may attempt to fight this intruder. These birds primarily use physical displays and vocalizations to communicate. Both male and female cardinals sing, with beautiful, loud whistled phrases, sounding like "whacheer whacheer" and "whoit whoit whoit". They sing for courtship and to defend territories. "Chips" is their contact call or alarm. They also use many visual displays for signaling alarm, including "tail-flicks" and lifting and lowering their crest.`,
    "nutrition": `Northern cardinals are herbivores (granivores); they eat the seeds of grasses and corn, fruit (grapes and berries), buds, sunflower seeds, and insects. Sometimes they will drink maple sap out of sapsucker holes.`,
    "diet": ["Herbivore", "Granivore"],
    "species": "Cardinalis cardinalis",
    "species_slug": "cardinalis-cardinalis",
    "life_span": 15,
    "weight": [33.6, 33.65],
    "length": [21, 23.5]
}