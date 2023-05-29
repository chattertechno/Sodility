
export const getDateandTime = (unformattedDate: Date) => {

    const timestamp = unformattedDate;
    const date = new Date(timestamp);
    
    const options:any = { month: "short", day: "numeric", year: "numeric" };
    
    const formattedDate = date.toLocaleDateString("en-US", options);
    
    const timeOptions:any = { hour: "numeric", minute: "numeric", hour12: true };
    
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
    
    const formattedDateTime = `${formattedDate} AT ${formattedTime}`;
    
    if (formattedDate !== 'Invalid Date' || formattedTime !== 'Invalid Date') 
        return formattedDateTime;
    else return null;

}