export class Course_Student {
    constructor(stdid ,courseid,mid,final,pointscale){
        this.stdid=stdid;
        this.Courseid=courseid;
        this.mid=mid.toFixed(2);
        this.final=final.toFixed(2);
        this.pointscale=pointscale;
        this.grade=this.calculategrade();
        
    }
    calculategrade(){
        const totalgrade=0.4*this.mid +0.6*this.final;
        if(this.pointscale===7){
            if(totalgrade>=93){
                return "A"
            }else if(totalgrade>=85){
                return "B"
            }else if(totalgrade>=77){
                return "C"
            }else if(totalgrade>=70){
                return "D"
            }else{
                return "F"
            }
        }else{
            if(totalgrade>=90){
                return "A"
            }else if(totalgrade>=80){
                return "B"
            }else if(totalgrade>=70){
                return "C"
            }else if(totalgrade>=60){
                return "D"
            }else{
                return "F"
            }
        }
       
    }
}