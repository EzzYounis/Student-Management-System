export class Student{
    constructor(id,name){
        this.id=id;
        this.name=name;
        this.courses=[];
        this.CGPA=0;
    }
    calculateCGPA(){
        if(this.courses.length=0){
            this.CGPA=0
        }
        else{
            
        }
    }
}