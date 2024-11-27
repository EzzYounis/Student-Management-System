export class Course {
    constructor(id,name,max,ps){
        this.name=name;
        this.id=id;
        this.PointScale=ps;
        this.numberofStudent=0;
        this.max=max
        this.Average=0;
        this.Studentlist=[]
    }
    
    addStudent(student){
        this.Studentlist.push(student);
        this.numberofStudent=this.Studentlist.length;
    }
}