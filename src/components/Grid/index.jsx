import Card from "../Card"
import RoundedCard from "../RoundedCard"
import './Grid.scss'
export default function Grid({
    data,
    id,
    style='normal'
}){
    console.log(data);
    return(
        <div className="collection-container">
            {
                data.map((e, i) => {
                    return(
                        <div key={id+"-"+i} className={style}>
                            {
                                style !== 'rounded' ?
                                    <Card
                                        title={e.title}
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