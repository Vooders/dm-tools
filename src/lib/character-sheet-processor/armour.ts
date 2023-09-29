
export default function armour(dndBeyondJson: any) {
    const dex = dndBeyondJson.data.stats[1].value
    
    return Math.floor((dex - 10) / 2) + 10
}
