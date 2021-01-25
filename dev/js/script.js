let number=3;

let numbers=[1,2,3,4,5,6];

let suma=numbers.reduce((a,b)=>a+b);

class person
{
    constructor(name, age)
    {
        this.name=name;
        this.age=age
    }
    get name()
    {
        return this.name
    }
}