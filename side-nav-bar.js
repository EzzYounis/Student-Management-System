import { Course } from "./Course.js"
import { Student } from "./Student.js"
import { Course_Student } from "./Course-student.js"
const menubottun = document.querySelector(".menu-button")
const sidebar = document.querySelector(".sidebar-hidden")
function menuclick (){
    menubottun.classList.remove("menu-button")
    menubottun.classList.add("hidden")
    sidebar.classList.remove("sidebar-hidden")
    sidebar.classList.add("sidebar-opened")

}
const closearrow= document.querySelector("#close-nav")
closearrow.addEventListener("click",(event)=>{
    sidebar.classList.add("sidebar-hidden")
    sidebar.classList.remove("sidebar-opened")
    menubottun.classList.add("menu-button")
    menubottun.classList.remove("hidden")
})
menubottun.addEventListener("click",menuclick)
// ========================Course List==================================

let Courses=[];
Courses.push(new Course(33,"Ai",50,7))
Courses.push(new Course(34,"Adfsddddd",50,7))
Courses.push(new Course(35,"Adfs",50,7))
Courses.push(new Course(36,"Agg",50,7))
let Students=[]
Students.push(new Student(1000,"Ezzaldeen"));
Students.push(new Student(1001,"mohammed"));
Students.push(new Student(1002,"ali"));
Students.push(new Student(1004,"ahmet"));
const listcoursepage=document.querySelector("#List-course-nav")
listcoursepage.addEventListener("click",(event)=>{
    const displayed=document.querySelector("#displayed-part");
    displayed.innerHTML=`<div class="Course-list"> <ul></ul></div>`; 


    const Coursesbox = document.querySelector(".Course-list")
    function checkEmpty(){
    if(Courses.length ===0){
        
    Coursesbox.innerHTML=`<div id="nocourses"><p >No Courses Yet </p>
    <button> Add Course</button> </div>`

    }}
    checkEmpty();
    const Courselist = document.querySelector(".Course-list ul")
    Courses.forEach(course =>{
        const item=document.createElement("li")
        item.classList.add("Course-box")
        item.setAttribute("data-id",course.id)
        item.innerHTML=` <div class= "Course-box-first"><span> Course id:${course.id} </span>
        <span> Name:${course.name} </span>
        <span> Students:${course.numberofStudent} </span> 
        <span> Average:${course.Average} </span>
        <span> PointScale:${course.PointScale} </span>
            <button class="more-btn" data-id="${course.id}"> more</button>
            <button class="Delete-btn" data-id="${course.id}"> Delete</button></div>`
        Courselist.appendChild(item)
    })
    function reset(){
        Courselist.innerHTML=""
        Courses.forEach(course =>{
            
            const item=document.createElement("li")
            item.classList.add(`Course-box`)
            item.setAttribute("data-id",course.id)
            item.innerHTML=` <div class= "Course-box-first"><span> Course id:${course.id} </span>
            <span> Name:${course.name} </span>
            <span> Students:${course.student} </span> 
            <span> Average:${course.Average} </span>
            <span> PointScale:${course.pointScale} </span>
                <button class="more-btn" data-id="${course.id}"> More</button>
                <button class="Delete-btn" data-id="${course.id}"> Delete</button></div>`
            Courselist.appendChild(item)
        })
        activatebtn();
        checkEmpty();
    }



    function deletecourse(event){
        const id = parseInt(event.target.getAttribute("data-id"))
        const index = Courses.findIndex(course => course.id===id)
        Courses.splice(index,1)
        event.target.parentElement.parentElement.remove();
        checkEmpty();
    }




    function addstdToCourse(event){
        const id = parseInt(event.target.getAttribute("data-id"))
        const course =Courses.find(crs=>crs.id===id);
        const coursebox=document.querySelector(`.Course-box[data-id="${id}"]`)
        const addstdToCrsbox=document.createElement("div")
        addstdToCrsbox.innerHTML=`
        <div><label for="Student-id">Student ID</label> <input type="number" id="Student-id"   placeholder="Student ID" data-id = "${id}"></div>
    <div><label for="mid-grade">MidTerm Grade</label> <input type="number" min="0"  max="100" id="mid-grade" placeholder="MidTerm Grade" data-id = ${id}></div>
    <div><label for="final-grade">FinalExam Grade</label> <input type="number" min="0"  max="100" id="final-grade" placeholder="FinalExam Grade" data-id = ${id}></div>
    <button id="Confirm-btn" data-id = ${id}>Confirm</button>
    `;
    coursebox.appendChild(addstdToCrsbox)
    

    const confirmbtn=document.querySelector(`#Confirm-btn[data-id="${id}"]`)
    confirmbtn.addEventListener("click",()=>{
        const stdid=parseInt(document.querySelector(`#Student-id[data-id="${id}"]`).value);
        const midgrade=document.querySelector(`#mid-grade[data-id="${id}"]`).value
        const finalgrade=document.querySelector(`#final-grade[data-id="${id}"]`).value

        const addedstudent=Students.find(std => std.id===stdid)
        console.log(stdid)
        console.log(addedstudent)
        if(addedstudent!==undefined && 0<=midgrade<=100 && 0<=finalgrade<=100 ){
            addedstudent.courses.push(new Course_Student(stdid,id,midgrade,finalgrade,course.PointScale))
            course.addStudent(addedstudent)
            console.log(addedstudent)
        }else{
            console.log("adding Failed")
            return addstdToCourse(event);
        }
        
    })

    }
    

    function course_more (event){
        
        const id = parseInt(event.target.getAttribute("data-id"))
        const coursebox=document.querySelector(`.Course-box[data-id="${id}"]`)
        const editsection=document.createElement("div")
        //Edit-course to course-more
        editsection.innerHTML=`<div class="Course-box-second">
        <button class="all-std-btn" data-id = ${id}>All Student</button> 
        <button class="Passed-std-btn" data-id = ${id}>Passed Student</button>
        <button class="Failed-std-btn" data-id = ${id}>Failed Student</button>
        </div>
        <button class="add-student-course" data-id="${id}">add student to the course</button>`

        coursebox.appendChild(editsection)
        const allstdbtn=document.querySelector(`.all-std-btn[data-id="${id}"]`)
        const passedstdbtn=document.querySelector(`.Passed-std-btn[data-id="${id}"]`)
        const failedstdbtn=document.querySelector(`.Failed-std-btn[data-id="${id}"]`)
        const addstudentcourse=document.querySelector(`.add-student-course[data-id="${id}"]`)
        allstdbtn.addEventListener("click",()=>liststd(event,id,"All"));
        passedstdbtn.addEventListener("click",()=>liststd(event,id,"Passed"));
        failedstdbtn.addEventListener("click",()=>liststd(event,id,"Failed"));
        addstudentcourse.addEventListener("click",()=>addstdToCourse(event))
    }
    function liststd(event,courseid,condition){
        const coursebox=document.querySelector(`.Course-box[data-id="${courseid}"]`)
        console.log(coursebox)
        const course = Courses.find(coursee=>coursee.id===courseid)
        
        if(condition==="All"){
            console.log("hi")
            const studentboxcontainer=document.createElement("div")
            course.Studentlist.forEach(std=>{
                const crs=std.courses.find(crs=>crs.Courseid===courseid)
                console.log(crs)
            
            const stdbox=document.createElement("div");
            stdbox.innerHTML=`
            <span>Name: ${std.name}</span>
            <span>Mid Grade: ${crs.mid}</span>
            <span>Final Grade: ${crs.final}</span>
            <span>Note: ${crs.grade}</span>
            `
            studentboxcontainer.appendChild(stdbox);
            console.log("gggg")
            })
            coursebox.append(studentboxcontainer)
            
        }else if(condition==="Passed"){
            course.Studentlist.forEach(std=>{
                const stdcourse=std.courses.find(coursestd=>coursestd.id===courseid)
                if(stdcourse.grade!=="F"){
                const stdbox=document.createElement("div");
                stdbox.innerHTML=`<span>Course ID: ${student.id}</span>
                <span>Name: ${student.name}</span>
                `
                coursebox.appendChild(stdbox)
                }
 
            })
        }else if(condition==="Failed"){
            course.Studentlist.forEach(std=>{
                const stdcourse=std.courses.find(coursestd=>coursestd.id===courseid)
                if(stdcourse.grade==="F"){
                const stdbox=document.createElement("div");
                stdbox.innerHTML=`<span>Course ID: ${student.id}</span>
                <span>Name: ${student.name}</span>
                `
                coursebox.appendChild(stdbox)
                }
 
            })
        }
    }
    
    
    function activatebtn(){
        document.querySelectorAll(".Delete-btn").forEach(button => {
            button.addEventListener("click" , deletecourse)
        })
        //.Edit-btn to .more-btn
        document.querySelectorAll(".more-btn").forEach(button => {
            button.addEventListener("click" , course_more)
        })
        
    }

    activatebtn();
});
// ===================Add Course ======================
const addcoursepage=document.querySelector("#Add-course-nav")
addcoursepage.addEventListener("click",(event)=>{
    const displayed=document.querySelector("#displayed-part");
    displayed.innerHTML=""; 
    const courseaddbox=document.createElement("div")
    courseaddbox.classList.add("course-add-box")
    courseaddbox.innerHTML=`<div><label for="course-id">ID:</label> <input type="text" id="course-id" placeholder="Enter Course ID"></div>
    <div><label for="course-name">Name</label> <input type="text" id="course-name" placeholder="Enter Course Name"></div>
    <div><label for="course-capacity">Capacity</label> <input type="number" min="1" id="course-capacity" placeholder="Enter Course Capasity"></div>
    <div>
    <label for="course-pointscale">PointScale<label>
       <div>
       <select id="course-pointscale">
        <option value="10">10</option>
        <option value="7">7</option>
        </select>
        </div>
    </div>
    <button id="add-course-btn">Add</button>`
    displayed.appendChild(courseaddbox);
    
    const addbtn=document.getElementById("add-course-btn")
    addbtn.addEventListener("click" ,()=>{
    if(true){
        const newname=document.getElementById("course-name").value;
        const newid=document.getElementById("course-id").value;
        const newcapacity= parseInt(document.getElementById("course-capacity").value);
        const newpointScale=parseInt(document.getElementById("course-pointscale").value)
        Courses.push(new Course(newid,newname,newcapacity,newpointScale))
    }})
    
})
// =========================List Student============================
const liststdpage=document.getElementById("List-student-nav");

liststdpage.addEventListener("click",()=>{
    const displayed = document.getElementById("displayed-part");
    displayed.innerHTML="";
    const studentlistbox=document.createElement("div");
    studentlistbox.classList.add("Student-list-box")
    Students.forEach(student=>{
        const studentbox = document.createElement("div")
        studentbox.classList.add("Student-box")
        studentbox.innerHTML = `
            <span>Course ID: ${student.id}</span>
            <span>Name: ${student.name}</span>
            <span>Average: ${student.CGPA}</span>
            <button class="Edit-btn" data-stdid="${student.id}"> Edit</button>
            <button class="Delete-btn" data-stdid="${student.id}"> Delete</button></div>
    `;
    studentlistbox.appendChild(studentbox);
    
    })
    displayed.appendChild(studentlistbox);
    
})
// =============================Add new Student========================
const addStdPage=document.getElementById("Add-student-nav");
addStdPage.addEventListener("click",()=>{
    const displayed = document.getElementById("displayed-part");
    displayed.innerHTML="";
    const studentaddbox=document.createElement("div");
    studentaddbox.classList.add("student-add-box")
        studentaddbox.innerHTML = `
            <div><label for="student-id">ID:</label> <input type="text" id="student-id" placeholder="Enter student ID"></div>
    <div><label for="student-name">Name</label> <input type="text" id="student-name" placeholder="Enter student Name"></div>
    <button id="add-student-btn">Add</button>
    `;
    displayed.appendChild(studentaddbox);
    
})