import fs from 'fs'

export default class CharacterService {
    private baseUrl = 'https://character-service.dndbeyond.com/character/v3/character/'

    public async get(playerId: string): Promise<any> {
        if (process.env.NODE_ENV === 'development') {
            const testFile = require('../../test/fixtures/shad.json')
            return Promise.resolve(testFile)
        } else {
            const response = await fetch(`${this.baseUrl}${playerId}`);
            console.log(response.status);
            if (response.ok) {
                return await response.json();
            }
        }
    }
}
