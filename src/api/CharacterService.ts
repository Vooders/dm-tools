
export default class CharacterService {
    private baseUrl = 'https://character-service.dndbeyond.com/character/v3/character/'

    public async get(playerId: string): Promise<any> {
        console.log(`CharacterService: getting ${playerId}`)

            const response = await fetch(`https://character-service.dndbeyond.com/character/v3/character/${playerId}`);
            console.log(response.status);
            if (response.ok) {
                return await response.json();
            }
        
    }
}
