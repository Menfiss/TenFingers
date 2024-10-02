
interface props{
    consistencyArray:number[]
    mean:number
}
const ConsistencyCalculator = (props:props) => {
    
    const variance = props.consistencyArray
    .map(value => Math.pow(value - props.mean, 2))
    .reduce((sum, value) => sum + value, 0) / props.consistencyArray.length;
    const stdDev = Math.sqrt(variance);

    const consistencyPercentage = 100 * (1 - (stdDev / props.mean));
    console.log(props.mean);
    console.log(stdDev);
    console.log(consistencyPercentage);
    return (
        <>
            
        </>
    )
}

export default ConsistencyCalculator;