export function handleSubmit(e, callback) 
{
    e.preventDefault();
    let data = {};
    for(let input of e.target)
    {
        if(input.name) data[input.name] = input.value;
    }

    callback(data);
}

export function errorSignal(error, input)
{
    return error && (error["input"] === "all" || error["input"] == input);
}

export function errorText(error, input)
{
    return (error && error["input"] === input) ? error["message"] : ""
}