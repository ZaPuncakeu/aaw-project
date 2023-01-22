import Card from "../Card"
import EditableCard from "../EditableCard";
import RoundedCard from "../RoundedCard"
import './Grid.scss'
export default function Grid({
    data,
    id,
    style='normal',
    editable=false,
    imageKey= 'image',
    deleteAction,
    titleKey='title'
}){
    
    return(
        <div className="collection-container">
            {
                data.map((e, i) => {
                    return(
                        <div key={id+"-"+i} className={style}>
                            {
                                style !== 'rounded' ?
                                    editable ?
                                    <EditableCard
                                        title={e[titleKey]}
                                        image={e[imageKey]}
                                        key={id+'-card-'+i}
                                        imageKey={imageKey}
                                        deleteAction={deleteAction}
                                        index={i}
                                        slug={e.slug ? e.slug : e.species_slug}
                                    />
                                    : 
                                    <Card
                                        title={e[titleKey]}
                                        image={e.image}
                                        count={e.count}
                                        link={e.link}
                                        text={e.text}
                                        key={id+'-card-'+i}
                                    />
                                :
                                    <RoundedCard
                                        title={e.title}
                                        image={e.image}
                                        link={e.link}
                                        key={id+'-card-'+i}
                                    />
                            }
                            
                        </div>
                    )
                })
            }
        </div>
    )
}