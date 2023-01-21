import './SetAnimal.scss';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function SetAnimal({
    type
})
{
    const [aliases, setAliases] = useState([]);
    function editAlias(e, index)
    {
        let alias = aliases;
        alias[index] = e.target.value;
        setAliases(alias);
    }

    return(
        <div id="set-animal">
            <div>
                <TextField name='name' label="Outlined" variant="outlined" />
                {
                    aliases.map((_, index) => {
                        return <TextField onChange={e => editAlias(e, index)} label="Outlined" variant="outlined" />
                    })
                }
                <Button><i className='fa fa-plus'></i> &nbsp;Add an alias</Button>
            </div>
        </div>
    )
}