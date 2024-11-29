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
Courses.push(new Course(33,"Ai",7))
Courses.push(new Course(34,"Adfsddddd",7))
Courses.push(new Course(35,"Adfs",7))
Courses.push(new Course(36,"Agg",7))
let Students=[]
Students.push(new Student(1000,"Ezzaldeen"));
Students.push(new Student(1001,"mohammed"));
Students.push(new Student(1002,"ali"));
Students.push(new Student(1004,"ahmet"));
Students[0].courses.push(new Course_Student(1000 ,33,90,95,7))
Students[0].courses.push(new Course_Student(1000 ,34,96,95,7))
Students[1].courses.push(new Course_Student(1001 ,33,10,45,7))
Students[2].courses.push(new Course_Student(1002 ,33,40,95,7))

Courses[0].addStudent(Students[0])
Courses[0].addStudent(Students[1])
Courses[0].addStudent(Students[2])
Courses[1].addStudent(Students[0])
Students[0].calculateCGPA();
Students[1].calculateCGPA();
Students[2].calculateCGPA();
Courses[0].calculateaverage();
Courses[1].calculateaverage();



function createToast(message){
    const toast = document.createElement("div");
    document.body.appendChild(toast);
    console.log(toast.parentElement)
    toast.classList.add("toastbox")
    toast.innerHTML=`
    <p>
    ${message}
    </p>
    `
    
    
}

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
            console.log(course)
            const item=document.createElement("li")
            item.classList.add(`Course-box`)
            item.setAttribute("data-id",course.id)
            item.innerHTML=` <div class= "Course-box-first"><span> Course id:${course.id} </span>
            <span> Name:${course.name} </span>
            <span> Students:${course.numberofStudent} </span> 
            <span> Average:${course.Average} </span>
            <span> PointScale:${course.PointScale} </span>
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
        if(document.querySelector(".listedStd")!==null){
            document.querySelector(".listedStd").remove();
        }else if(document.querySelector(".addstdToCrsbox")!==null){
            document.querySelector(".addstdToCrsbox").remove();
        }
        const addstdToCrsbox=document.createElement("div")
        addstdToCrsbox.classList.add("addstdToCrsbox")
        addstdToCrsbox.innerHTML=`
        <div><label for="Student-id">Student ID</label> <input type="number" id="Student-id"   placeholder="Student ID" data-id = "${id}"></div>
    <div><label for="mid-grade">MidTerm Grade</label> <input type="number" min="0"  max="100" id="mid-grade" placeholder="MidTerm Grade" data-id = ${id}></div>
    <div><label for="final-grade">FinalExam Grade</label> <input type="number" min="0"  max="100" id="final-grade" placeholder="FinalExam Grade" data-id = ${id}></div>
    <button id="Confirm-btn" data-id = ${id}>Confirm</button>
    `;
    coursebox.appendChild(addstdToCrsbox);
    const confirmbtn=document.querySelector(`#Confirm-btn[data-id="${id}"]`)
    confirmbtn.addEventListener("click",()=>{
        const stdid=parseInt(document.querySelector(`#Student-id[data-id="${id}"]`).value);
        const midgrade=document.querySelector(`#mid-grade[data-id="${id}"]`).value;
        const finalgrade=document.querySelector(`#final-grade[data-id="${id}"]`).value;

        const addedstudent=Students.find(std => std.id===stdid);
        console.log(stdid)
        console.log(addedstudent)
        if(addedstudent!==undefined && 0<=midgrade<=100 && 0<=finalgrade<=100 ){
            addedstudent.courses.push(new Course_Student(stdid,id,midgrade,finalgrade,course.PointScale))
            course.addStudent(addedstudent)
            addedstudent.calculateCGPA();
            course.calculateaverage();
            console.log(addedstudent)
        }else{
            console.log("adding Failed")
            return addstdToCourse(event);
        }
        reset();
        
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
        <button class="add-student-course" data-id="${id}">add student to the course</button>
        </div>
        `

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
        const course = Courses.find(coursee=>coursee.id===courseid)
        if(document.querySelector(".listedStd")!==null){
            document.querySelector(".listedStd").remove();
        }else if(document.querySelector(".addstdToCrsbox")!==null){
            document.querySelector(".addstdToCrsbox").remove();
        }
        const studentboxcontainer=document.createElement("div")
            studentboxcontainer.classList.add("listedStd")
        if(condition==="All"){
            
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
            })
            coursebox.append(studentboxcontainer)
            
        }else if(condition==="Passed"){
            course.Studentlist.forEach(std=>{
                const crs=std.courses.find(coursestd=>coursestd.Courseid===courseid)
                if(crs.grade!=="F"){
                const stdbox=document.createElement("div");
                stdbox.classList.add("listedStd")
                stdbox.innerHTML=`
                <span>Name: ${std.name}</span>
            <span>Mid Grade: ${crs.mid}</span>
            <span>Final Grade: ${crs.final}</span>
            <span>Note: ${crs.grade}</span>
                `
                studentboxcontainer.appendChild(stdbox);
                }
                coursebox.append(studentboxcontainer)
            })
        }else if(condition==="Failed"){
            course.Studentlist.forEach(std=>{
                const crs=std.courses.find(coursestd=>coursestd.Courseid===courseid)
                if(crs.grade==="F"){
                const stdbox=document.createElement("div");
                stdbox.classList.add("listedStd")
                stdbox.innerHTML=`
                <span>Name: ${std.name}</span>
            <span>Mid Grade: ${crs.mid}</span>
            <span>Final Grade: ${crs.final}</span>
            <span>Note: ${crs.grade}</span>
                `
                studentboxcontainer.appendChild(stdbox);
                }
                coursebox.append(studentboxcontainer)
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
function CheckCouresExists(courseId){
    Course
}
const addcoursepage=document.querySelector("#Add-course-nav")
addcoursepage.addEventListener("click",(event)=>{
    const displayed=document.querySelector("#displayed-part");
    displayed.innerHTML=""; 
    const courseaddbox=document.createElement("div")
    courseaddbox.classList.add("course-add-box")
    courseaddbox.innerHTML=`<div><label for="course-id">ID:</label> <input type="number" id="course-id" placeholder="Enter Course ID"></div>
    <div><label for="course-name">Name</label> <input type="text" id="course-name" placeholder="Enter Course Name"></div>
    
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
        console.log("event started")
        const newname=document.getElementById("course-name").value;
        const newid=parseInt(document.getElementById("course-id").value);
        const newpointScale=parseInt(document.getElementById("course-pointscale").value)
        console.log(Courses.find(crs=>crs.id===newid))
    if(newname===""||newid===""){
        createToast("Please Fill all the boxes")
        return;
        console.log("did leave")
    }else if(Courses.find(crs=>crs.id===newid)!==undefined){
        createToast("The Course alredy exists")
        return;
        console.log("did leavee2")
    }else{
        Courses.push(new Course(newid,newname,newpointScale))
        console.log(Courses)
        
    }
    })
    
})
// =========================List Student============================
const liststdpage=document.getElementById("List-student-nav");
function createstudentbox(student){
    const studentbox = document.createElement("div")
        studentbox.classList.add("Student-box")
        studentbox.innerHTML = `
            <span>Course ID: ${student.id}</span>
            <span>Name: ${student.name}</span>
            <span>Average: ${student.CGPA}</span>
            <button class="Delete-btn" data-stdid="${student.id}"> Delete</button></div>
    `;
    return studentbox;
}

liststdpage.addEventListener("click",()=>{
    const displayed = document.getElementById("displayed-part");
    displayed.innerHTML="";
    const studentlistbox=document.createElement("div");
    studentlistbox.classList.add("Student-list-box")
    Students.forEach(student=>{
        
    studentlistbox.appendChild(createstudentbox(student));
    
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
    const addbtn=document.getElementById("add-student-btn");
    addbtn.addEventListener("click" ,()=>{
        console.log("event started")
        const newname=document.getElementById("student-name").value;
        const newid=parseInt(document.getElementById("student-id").value);
        
        console.log(Students.find(std=>std.id===newid))
    if(newname===""||newid===""){
        createToast("Please Fill all the boxes")
        return;
        console.log("did leave")
    }else if(Students.find(std=>std.id===newid)!==undefined){
        createToast("The Course alredy exists")
        return;
        console.log("did leavee2")
    }else{
        Students.push(new Student(newid,newname))
        
        
    }
    })
    
})
// ================Search Student===================
const searchstd=document.getElementById("search-student-nav");
searchstd.addEventListener("click",()=>{
    const displayed = document.getElementById("displayed-part");
    displayed.innerHTML="";
    const studentsearchbox=document.createElement("div");
    studentsearchbox.classList.add("student-search-box")
        studentsearchbox.innerHTML = `
    <div><label for="student-name-search">Name</label> <input type="text" id="student-name-search" placeholder="Enter student Name"></div>
    <button id="search-student-btn">Search</button>
    `;
    displayed.appendChild(studentsearchbox);
    const searchbtn=document.getElementById("search-student-btn").addEventListener("click",()=>{
        const stdname=document.getElementById("student-name-search").value;
    const searchedstd=Students.find(std=>std.name===stdname)
    studentsearchbox.appendChild(createstudentbox(searchedstd));

    })
    

})
