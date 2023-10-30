import SkillBuilder from "../../../test/builders/SkillBuilder"
import passiveSkills from "../../../src/lib/character-sheet-processor/passiveSkills"
import ModifierBuilder from "../../../test/builders/ModifierBuilder"

describe('Passive Skills', () => {
    it("should return an array of length 3", () => {
        const skills = skillsBuilder()
        const bonus = [new ModifierBuilder().build()]

        const length = passiveSkills(skills, bonus).length
        length.should.equal(3)
    })

    const testArray = [
        { args: 'Perception', expected: 'WIS' },
        { args: 'Investigation', expected: 'INT' },
        { args: 'Insight', expected: 'WIS' }
    ]

    testArray.forEach((test) => {
        it(`${test.args}'s modifier should be ${test.expected}`, () => {
            const skills = skillsBuilder()
            const bonus = [new ModifierBuilder().build()]

            const modifier = passiveSkills(skills, bonus).find(skill => skill.name === test.args).mod
            modifier.should.equal(test.expected)
        })
    })

    testArray.forEach((test) => {
        it(`${test.args}'s unmodified score should be 10`, () => {
            const skills = skillsBuilder()
            const bonus = [new ModifierBuilder().build()]

            const score = passiveSkills(skills, bonus).find(skill => skill.name === test.args).score
            score.should.equal(10)
        })
    })
})

function skillsBuilder() {
    return [
        new SkillBuilder().withName('Perception').build(),
        new SkillBuilder().withName('Investigation').build(),
        new SkillBuilder().withName('Insight').build()
    ]
}
