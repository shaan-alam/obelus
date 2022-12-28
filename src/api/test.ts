
const persons: {[s: string]: string | number}[] = [{
  name: 'Shaan Alam',
  age: 20,
  city: 'delhi',
  country: 'india'
},{
  name: 'Shaan Alam',
  age: 20,
  city: 'delhi',
  country: 'india'
}]

const fields = ['name', 'age'];

const newarr = persons.map(p => {
  const object = {} as { [s: string]: string | number };

  fields.forEach(field => {
    object[field] = p[field]
  })

  return object
})

export {}