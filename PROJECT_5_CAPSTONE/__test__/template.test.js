const template = require('../src/client/js/result-template')
test('testing Template', function(){
    const mockData = {subjectivity:'no', irony:'oppose', confidence:'certain'}
    const result = template.default(mockData)
    expect(result).toMatch(/oppose/)
    expect(result).toMatch(/no/)
    expect(result).toMatch(/certain/)
})