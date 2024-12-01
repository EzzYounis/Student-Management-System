import { Course } from "./Course.js"
import { Student } from "./Student.js"
import { Course_Student } from "./Course-student.js"
document.getElementById("start-now").addEventListener("click",menuclick)
const menubottun = document.querySelector(".menu-button")
const sidebar = document.querySelector(".sidebar-hidden")
function menuclick (){
    menubottun.classList.remove("menu-button")
    menubottun.classList.add("hidden")
    sidebar.classList.remove("sidebar-hidden")
    sidebar.classList.add("sidebar-opened")

}
const closearrow= document.querySelector("#close-nav")
closearrow.addEventListener("click",close_nav)
    function close_nav(){
    sidebar.classList.add("sidebar-hidden")
    sidebar.classList.remove("sidebar-opened")
    menubottun.classList.add("menu-button")
    menubottun.classList.remove("hidden")
}
menubottun.addEventListener("click",menuclick)
// ========================Course List==================================
//This is an initial data for the page
let Courses=[];
Courses.push(new Course(33,"Web Development",7))
Courses.push(new Course(34,"Artificial Inteligence",7))
Courses.push(new Course(35,"Database management",7))
Courses.push(new Course(36,"Mobile Development",7))
let Students=[]
Students.push(new Student(1000,"Ezzaldeen","Younis"));
Students.push(new Student(1001,"mohammed","ali"));
Students.push(new Student(1002,"emre","yilmaz"));
Students.push(new Student(1004,"ali","khalid"));
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
// =======================================================================

// Creates a notification
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
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
// function to check if the course list is empty
function checkEmpty(){
    if(Courses.length ===0){
        
    Coursesbox.innerHTML=`<div id="nocourses"><p >No Courses Yet </p>
    <button> Add Course</button> </div>`

    }}
//  Coures list page    
const listcoursepage=document.querySelector("#List-course-nav")
listcoursepage.addEventListener("click",(event)=>{
    close_nav()
    const displayed=document.querySelector("#displayed-part");
    displayed.innerHTML=`<div class="Course-list"> <ul></ul></div>`; 


    const Coursesbox = document.querySelector(".Course-list")
    
    if(Courses.length ===0){
        
    Coursesbox.innerHTML=`<div id="nocourses"><p >No Courses Yet </p>
    <button> Add Course</button> </div>`

    }
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
    // function to rebulid the page to make updates
    function reset(){
        Courselist.innerHTML=""
        Courses.forEach(course =>{
            console.log(course)
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
        activatebtn();
        checkEmpty();
    }



    function deletecourse(event){
        const id = parseInt(event.target.getAttribute("data-id"))
        
        const index = Courses.findIndex(course => course.id===id)
        const course=Courses[index].Studentlist.forEach(std=>std.removecourse(id)) //removes the course from the students
        Courses.splice(index,1)
        event.target.parentElement.parentElement.remove();
        checkEmpty();
    }



// add student to the course implementation
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
    confirmbtn.addEventListener("click",confirm)
        function confirm(){
        let stdid=parseInt(document.querySelector(`#Student-id[data-id="${id}"]`).value.trim());
        let midgrade=parseInt(document.querySelector(`#mid-grade[data-id="${id}"]`).value.trim());
        let finalgrade=parseInt(document.querySelector(`#final-grade[data-id="${id}"]`).value.trim());

        const addedstudent=Students.find(std => std.id===stdid);
        console.log(midgrade)
        console.log(0<=midgrade<=100)
        if(addedstudent===undefined){
            createToast("Student Does not exist")
            document.querySelector(`#Student-id[data-id="${id}"]`).value="";
            document.querySelector(`#mid-grade[data-id="${id}"]`).value="";
            document.querySelector(`#final-grade[data-id="${id}"]`).value="";
            return;
        }else if(course.Studentlist.find(std=>std.id===addedstudent.id)!==undefined){
            createToast("Student already exists")
            document.querySelector(`#Student-id[data-id="${id}"]`).value="";
            document.querySelector(`#mid-grade[data-id="${id}"]`).value="";
            document.querySelector(`#final-grade[data-id="${id}"]`).value=""
        }else if(0<=midgrade && midgrade<=100 && 0<=finalgrade &&midgrade<=100 ){
            addedstudent.courses.push(new Course_Student(stdid,id,midgrade,finalgrade,course.PointScale))
            createToast("Student Added to the Course")
            course.addStudent(addedstudent)
            addedstudent.calculateCGPA();
            course.calculateaverage();
            reset();
        }
        else{
            
            createToast("Unacceptable Values")
            document.querySelector(`#Student-id[data-id="${id}"]`).value="";
            document.querySelector(`#mid-grade[data-id="${id}"]`).value="";
            document.querySelector(`#final-grade[data-id="${id}"]`).value=""
            
        }
        
        
    }

    }
    

    function course_more (event){
        const id = parseInt(event.target.getAttribute("data-id"))
        const coursebox=document.querySelector(`.Course-box[data-id="${id}"]`)
        const editsection=document.createElement("div")
        editsection.innerHTML=`<div class="Course-box-second" data-id=${id}>
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
        event.target.disabled=true;
    }


// ====this function to list student after clicking more for the course===
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
                console.log(Students)
            
            const stdbox=document.createElement("div");
            

            stdbox.innerHTML=`
            <span>Name: ${std.name}</span>
            <span>Surname: ${std.surname}</span>
            <span>Mid Grade: ${crs.mid}</span>
            <span>Final Grade: ${crs.final}</span>
            <span>Note: ${crs.grade}</span>
            <button class="remove-student-fromcourse" data-stdid="${std.id}">remove</button>
            `
            studentboxcontainer.appendChild(stdbox);
            })
            coursebox.append(studentboxcontainer)
            const btns=document.querySelectorAll(".remove-student-fromcourse")
            
            btns.forEach(btn=>btn.addEventListener("click",(event)=>{
                const id =parseInt(event.target.getAttribute("data-stdid"));
                const std=Students.find(std=>std.id===id)
                console.log(std)
                console.log(std)
                std.removecourse(courseid)
                course.removestudent(id)
                console.log(course)
                console.log(std)
                reset();
            }))
            
        }else if(condition==="Passed"){
            course.Studentlist.forEach(std=>{
                const crs=std.courses.find(coursestd=>coursestd.Courseid===courseid)
                if(crs.grade!=="F"){
                const stdbox=document.createElement("div");
                stdbox.classList.add("listedStd")
                stdbox.innerHTML=`
                <span>Name: ${std.name}</span>
                <span>Surname: ${std.surname}</span>
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
                <span>Surname: ${std.surname}</span>
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
    close_nav()
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
        
    }else{
        createToast("Course Added Successfully")
        Courses.push(new Course(newid,newname,newpointScale))

        
    }
    })
    
})
// =========================List Student============================
function activateStdBtn(){
    document.querySelectorAll(".Delete-btn").forEach(button => {
        button.addEventListener("click" , deletestudent)
    })
    //.Edit-btn to .more-btn
    document.querySelectorAll(".more-btn").forEach(button => {
        button.addEventListener("click" , student_more)
    })
}
const liststdpage=document.getElementById("List-student-nav");
function createstudentbox(student){
    
    const studentbox = document.createElement("div")
        studentbox.classList.add("Student-box")
        const std_first=document.createElement("div");
        std_first.classList.add("std-list-first")
        studentbox.setAttribute("data-stdid",`${student.id}`)
        
        std_first.innerHTML = `
            <span>Student ID: ${student.id}</span>
            <span>Name: ${student.name}</span>
            <span>Surname: ${student.surname}</span>
            <span>CGPA: ${student.CGPA}</span>
            <button class="Delete-btn" data-stdid="${student.id}"> Delete</button>
            <button class="more-btn" data-stdid="${student.id}"> More</button></div>
    `;
    studentbox.appendChild(std_first)
    return studentbox;
}
function deletestudent(event){
    const id= parseInt(event.target.getAttribute("data-stdid"))
    const index = Students.findIndex(std=>std.id===id)
    Courses.forEach(Crs=>{
        Crs.removestudent(id);
        
    })

    Students.splice(index,1)
    liststudent();


}
function student_more(event){
    const id = parseInt(event.target.getAttribute("data-stdid"))
    const studentbox=document.querySelector(`.Student-box[data-stdid="${id}"]`)
    const morebox=document.createElement("div")
    morebox.classList.add("std-more-box")
    const student=Students.find(std=>std.id===id)
    console.log(Students)
    console.log(student)
    student.courses.forEach(crs=>
        {
            const stdCourse=document.createElement("div")
            stdCourse.innerHTML=`
            <span>Course ID: ${crs.Courseid}</span>
            <span>Mid Grade: ${crs.mid}</span>
            <span>Final Grade: ${crs.final}</span>
            <span>Note: ${crs.grade}</span>
            `
            morebox.appendChild(stdCourse)
        })
        studentbox.appendChild(morebox);
        event.target.disabled=true;
}

liststdpage.addEventListener("click",liststudent)
    function liststudent(){
        close_nav()
    const displayed = document.getElementById("displayed-part");
    displayed.innerHTML="";
    const studentlistbox=document.createElement("div");
    studentlistbox.classList.add("Student-list-box")
    if(Students.length ===0){
        
        studentlistbox.innerHTML=`<div id="studentcourses"><p >No Courses Yet </p>
        <button id="addpagebtn"> Add Course</button> </div>`
        displayed.appendChild(studentlistbox);
        document.getElementById("addpagebtn").addEventListener("click",load_add_student_page)
        return;
        }

    Students.forEach(student=>{
    studentlistbox.appendChild(createstudentbox(student));
    })
   
    displayed.appendChild(studentlistbox);
        activateStdBtn();
        
    }
    


// =============================Add new Student========================
const addStdPage=document.getElementById("Add-student-nav");
addStdPage.addEventListener("click",load_add_student_page)
    function load_add_student_page(){
        close_nav()
    const displayed = document.getElementById("displayed-part");
    displayed.innerHTML="";
    const studentaddbox=document.createElement("div");
    studentaddbox.classList.add("student-add-box")
        studentaddbox.innerHTML = `
            <div><label for="student-id">ID:</label> <input type="text" id="student-id" placeholder="Enter student ID"></div>
    <div><label for="student-name">Name</label> <input type="text" id="student-name" placeholder="Enter student Name"></div>
    <div><label for="student-surname">Surname</label> <input type="text" id="student-surname" placeholder="Enter student Surname"></div>
    <button id="add-student-btn">Add</button>
    `;
    
    displayed.appendChild(studentaddbox);
    const addbtn=document.getElementById("add-student-btn");
    addbtn.addEventListener("click" ,()=>{
        console.log("event started")
        const newname=document.getElementById("student-name").value;
        const newsurname=document.getElementById("student-surname").value;
        const newid=parseInt(document.getElementById("student-id").value);
        
        console.log(Students.find(std=>std.id===newid))
    if(newname===""||newid===""||newsurname===""){
        createToast("Please Fill all the boxes")
        
        
    }else if(Students.find(std=>std.id===newid)!==undefined){
        createToast("The Student already exists")
        
        
    }else{
        Students.push(new Student(newid,newname,newsurname))
        createToast("The Student added Successfully")
        document.getElementById("student-name").value="";
        document.getElementById("student-surname").value="";
        document.getElementById("student-id").value="";
    }
    })
    
}
// ================Search Student===================
const searchstd=document.getElementById("search-student-nav");
searchstd.addEventListener("click",searchstudent)

    function searchstudent(){
    const displayed = document.getElementById("displayed-part");
    displayed.innerHTML="";
    const studentsearchbox=document.createElement("div");
    studentsearchbox.classList.add("student-search-box")
        studentsearchbox.innerHTML = `
    <div id="search-container"><label for="student-name-search">Name</label> <input type="text" id="student-name-search" placeholder="Enter student Name"></div>
    <button id="search-student-btn">Search</button>
    `;
    displayed.appendChild(studentsearchbox);
    const searchbtn=document.getElementById("search-student-btn").addEventListener("click",()=>{
        const stdname=document.getElementById("student-name-search").value;
    const searchedstd=Students.find(std=>std.fullname===stdname)
    console.log(searchedstd.fullname.toLowerCase())
    if(searchedstd ===undefined){
        studentsearchbox.innerHTML = `
    <p>Student not Found</p>
    <button id="search-again"> Search For Another Student</button>
    `;
    document.getElementById("search-again").addEventListener("click",searchstudent)
    }else{
        studentsearchbox.innerHTML = `
    <button id="search-student-btn">Search For Another Student</button>
    `;
    studentsearchbox.appendChild(createstudentbox(searchedstd));}
    document.getElementById("search-student-btn").addEventListener("click",searchstudent)
    activateStdBtn();
    })
    

}
