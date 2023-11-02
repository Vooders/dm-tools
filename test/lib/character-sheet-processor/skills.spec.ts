import AbilitiesBuilder from "../../builders/AbilitiesBuilder"
import skills from "../../../src/lib/character-sheet-processor/skills"

describe('Skills', () => {
    it('should return an array of length 18 or greater', () => {
        const abilities = new AbilitiesBuilder().build()
        const length = skills(abilities, [], [], [], 0).length
        const result = length > 17

        result.should.equal(true)
    })
})