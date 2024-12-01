import { Student } from "./Student.js";
import { Course_Student } from "./Course-student.js";
export class Course {
    constructor(id,name,ps){
        this.name=name;
        this.id=id;
        this.PointScale=ps;
        this.numberofStudent=0;
        
        this.Average=0;
        this.Studentlist=[]
    }
    
    addStudent(student){
        this.Studentlist.push(student);
        this.numberofStudent=this.Studentlist.length;
    }
    calculateaverage(){
        const numberofstudents=this.Studentlist.length;
        let total=0;
        if(numberofstudents!==0){
            this.Studentlist.forEach(std=>{
                const crsofstudent= std.courses.find(crs=>crs.Courseid===this.id)
                total+=(crsofstudent.mid*0.4+crsofstudent.final*0.6)
            })
            this.Average=(total/numberofstudents).toFixed(2)
        }else{
            this.Average=0;
        }
    }
    
    removestudent(stdid){
        const index= this.Studentlist.findIndex(std=>std.id===stdid);
        if(index!==-1){
            this.Studentlist.splice(index,1)
            this.numberofStudent=this.Studentlist.length;
            this.calculateaverage();
        }
    }
}