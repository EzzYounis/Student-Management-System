import { Course_Student } from "./Course-student.js";
export class Student{
    constructor(id,name,surname){
        this.id=id;
        this.name=name;
        this.surname=surname;
        this.courses=[];
        this.CGPA=0;
        this.fullname=name+" "+surname
    }
    calculateCGPA(){
        const numberofcourses=this.courses.length
        let total=0;
        if(numberofcourses!==0){
            this.courses.forEach(crs=>{
                if(crs.grade=="A"){
                    total+=4;
                }else if (crs.grade=="B"){
                    total+=3
                }else if (crs.grade=="C"){
                    total+=2
                }else if (crs.grade=="D"){
                    total+=1
                }else if (crs.grade=="F"){
                    total+=0
                }
            })
            this.CGPA=total/numberofcourses;
        }
        else{
            this.CGPA=0;
        }
    }
    removecourse(id){
       const index= this.courses.findIndex(crs=>crs.Courseid===id)
       this.courses.splice(index,1)
        this.calculateCGPA();
    }
    
}