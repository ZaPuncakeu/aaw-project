import { useEffect, useState } from "react";
export const getAttractions = () => 
{
    const [loading, setLoading] = useState(true);
    const [attractions, setAttractions] = useState([]);
    const [error, setError] = useState(null)
    useEffect(() => 
    {
        (async () => {
            try
            {
                setTimeout(() => {
                    setAttractions(attractions_db);
                    setLoading(false);
                }, 2000);
            }catch(err)
            {
                setError(err);
            }
        })();
    }, [])

    return [
        attractions.map(a => ({...a, link: `/activities/${a.slug}`})), 
        loading,
        error
    ];
}

export const getAttractionBySlug = (slug) => 
{
    console.log("getAttractionBySlug: ", slug);
    const [loading, setLoading] = useState(true);
    const [attraction, setAttraction] = useState({});
    const [error, setError] = useState(null)
    useEffect(() => 
    {
        (async () => {
            try
            {
                setTimeout(() => {
                    setAttraction(attractions_db[0]);
                    setLoading(false);
                }, 2000);
            }catch(err)
            {
                setError(err);
            }
        })();
    }, [])

    return [
        attraction, 
        loading, 
        error
    ];
}

const attractions_db = [{
    "image": '/images/home/attraction.webp',
    "title": 'Ferri wheel',
    "slug": 'ferri-wheel',
    "description": 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
},
{
    "image": '/images/home/attraction.webp',
    "title": 'Ferri wheel',
    "slug": 'ferri-wheel',
    "description": 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
},
{
    "image": '/images/home/attraction.webp',
    "title": 'Ferri wheel',
    "slug": 'ferri-wheel',
    "description": 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
},
{
    "image": '/images/home/attraction.webp',
    "title": 'Ferri wheel',
    "slug": 'ferri-wheel',
    "description": 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
}]