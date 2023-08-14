var express = require("express");
var app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );  
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  next();
});
const port= process.env.PORT||2450;

customers = [
  {custId: 1,name: "ABC",password: "abc1234",role: "admin",email: "abc@gmail.com"},
  {custId: 2,name: "Willie",password: "willie1234",role: "student",email: "willie@gmail.com"},
  {custId: 3,name: "Jack",password: "jack1234",role: "faculty",email: "jack@gmail.com"},
  {custId: 4,name: "James",password: "james1234",role: "student",email: "james@gmail.com"},
  {custId: 5,name: "Harry",password: "harry1234",role: "faculty",email: "harry@gmail.com"},
  {custId: 6,name: "Tia",password: "tia1234",role: "student",email: "tia@gmail.com"},
  {custId: 7,name: "Aditya",password: "aditya123",role: "faculty",email: "aditya@gmail.com"},
  {custId: 8,name: "Sonu",password: "sonu1234",role: "student",email: "sonu@gmail.com"},
  {custId: 9,name: "Ellie",password: "ellie1234",role: "student",email: "ellie@gmail.com"},
  {custId: 10,name: "Gia",password: "gia1234",role: "faculty",email: "gia@gmail.com"}
];
courses = [
  {courseId: 1,name: "ANGULAR",code: "ANG97",description: "All fundamentals of Angular 7",faculty: ["Daniel", "Jack"],students: ["Sam"]},
  {courseId: 2,name: "JAVASCRIPT",code: "JS124",description: "Intoduction to javascript",faculty: ["Aditya"],students: ["James", "Joy", "Monu", "Rita"]},
  {courseId: 3,name: "REACT",code: "RCT56",description: "React Javascript library",faculty: ["Jack", "Gia"],students: ["Raima", "Rita", "Sonu", "James"]},
  {courseId: 4,name: "BOOTSTRAP",code: "BS297",description: "Bootstrap Designing Framework",faculty: [],students: ["James", "Tia", "Ellie"]},
  {courseId: 5,name: "CSS",code: "CS365",description: "Basic stylesheet language",faculty: [],students: ["James", "Rita", "Monica"]},
  {courseId: 6,name: "REST AND MICROSERVICES",code: "RM392",description: "Introduction to Microservices",faculty: [],students: ["Sam"]},
  {courseId: 7,name: "NODE",code: "ND725",description: "Introduction to Node",faculty: ["Sonia"],students: ["Saransh", "Shrey", "Monica"]}
];
faculties = [
  { id: 5, name: "Daniel", courses: ["ANGULAR"] },
  { id: 4, name: "Sonia", courses: ["NODE"] },
  { id: 3, name: "Jack", courses: ["REACT", "ANGULAR"] },
  { id: 2, name: "Gia", courses: ["REACT"] },
  { id: 1, name: "Aditya", courses: ["ANGULAR"] }
];
classes = [
  {classId: 1,course: "REACT",time: "07:45",endTime: "08:45",topic: "Redux",facultyName: "Jack"},
  {classId: 2,course: "ANGULAR",time: "15:45",endTime: "17:40",topic: "Component",facultyName: "Jack"},
  {classId: 3,course: "JAVASCRIPT",time: "15:45",endTime: "17:40",topic: "Component",facultyName: "Aditya"}
];
students = [
  {id: 16,name: "Willie",dob: "31-July-1997",gender: "male",about: "Pursuing Graduation",courses: ["ANGULAR", "NODE"]},
  {id: 15,name: "Tia",dob: "30-July-1997",gender: "male",about: "Pursuing Graduation",courses: []},
  {id: 14,name: "Apoorv",dob: "31-August-1998",gender: "male",about: "Want to learn new technologies",courses: []},
  {id: 13,name: "Joy",dob: "31-July-1997",gender: "male",about: "Pursuing Graduation",courses: ["JAVASCRIPT"]},
  {id: 12,name: "Rachel",dob: "31-August-1998",gender: "female",about: "Pursuing Graduation",courses: []},
  {id: 11,name: "Monica",dob: "30-July-1997",gender: "female",about: "Want to learn new technologies",courses: ["CSS", "NODE"]},
  {id: 10,name: "Monu",dob: "12-May-1997",gender: "male",about: "Pursuing Graduation",courses: ["JAVASCRIPT"]},
  {id: 9,name: "Sonu",dob: "12-May-1997",gender: "male",about: "Pursuing Graduation",courses: ["REACT"]},
  {id: 8,name: "Raima",dob: "30-July-1997",gender: "female",about: "Want to learn new technologies",courses: ["REACT"]},
  {id: 7,name: "Rita",dob: "31-August-1998",gender: "female",about: "Pursuing Graduation",courses: ["JAVASCRIPT", "REACT", "CSS"]},
  {id: 6,name: "Shrey",dob: "12-May-1997",gender: "male",about: "Pursuing Graduation",courses: ["NODE"]},
  {id: 5,name: "Saransh",dob: "31-July-1997",gender: "male",about: "Want to learn new technologies",courses: ["NODE"]},
  {id: 4,name: "Sanya",dob: "31-July-1997",gender: "male",about: "Want to learn new technologies",courses: []},
  {id: 3,name: "James",dob: "12-July-1994",gender: "male",about: "Pursuing Graduation",courses: ["JAVASCRIPT", "BOOTSTRAP", "CSS", "REACT"]},
  {id: 2,name: "Sam",dob: "12-July-1994",gender: "male",about: "Pursuing Graduation",courses: ["ANGULAR", "REST AND MICROSERVICES"]},
  {id: 1,name: "Ellie",dob: "12-June-1992",gender: "female",about: "Want to learn new technologies",courses: ["BOOTSTRAP"]}
];

app.post("/login",function(req,res){
  const email = req.body.email;
  const password = req.body.password;  
  const cust = customers.find(cus=>cus.email==email&&cus.password==password);
  const custRec = cust?{
    name : cust.name,
    email : cust.email,
    role : cust.role
  }:null;
  //if null then send error
  res.send(custRec);
})

app.post("/register",function(req,res){
  let newid = customers.reduce((acc,curr)=>curr.custId>acc?curr.custId:acc,0)
  let body = req.body;
  let newcust = {custId: newid+1,...body};
  console.log(newcust);
  customers.push(newcust);
  if(body.role=="student"){
    const id = students.reduce((acc,curr)=>curr.id>acc?curr.id:acc,0); 
    students.unshift({
      id:id+1,
      name:body.name,
      dob: "",
      gender : "",
      about : "",
      courses: []
    });
  }
  else{
    const id = faculties.reduce((acc,curr)=>curr.id>acc?curr.id:acc,0);
    faculties.unshift({
      id:id+1,
      name:body.name,
      courses : []
    });
  }
  const custRec = {
    name : newcust.name,
    role : newcust.role,
    email : newcust.email
  }
  res.send(custRec);
})

app.get("/getStudentNames",function(req,res){
  const studentNames = students.map(st=>st.name);
  res.send(studentNames);
})

app.get("/getFacultyNames",function(req,res){
  const facultyNames = faculties.map(ft=>ft.name);
  res.send(facultyNames);
})

app.get("/getCourses",function(req,res){
  res.send(courses);
})

app.put("/putCourse",function(req,res){
  const body = req.body;
  const index = courses.findIndex(c=>c.courseId===body.courseId);
  courses[index] = body;
  students.map(s=>{
    if(body.students.includes(s.name)){
      if(!s.courses.includes(body.name)){
        s.courses.push(body.name);
      }
    }
  });
  faculties.map(f=>{
    if(body.faculty.includes(f.name)){
      if(!f.courses.includes(body.name)){
        f.courses.push(body.name);
      }
    }
  });
  res.send(body);
})

app.get("/getStudents",function(req,res){
  const {page, course=null} = req.query;
  let result = students;
  // result.sort((n1,n2)=>n1.id-n2.id);
  if(course != null){
    result = result.filter(r=>r.courses.find(c=>course.includes(c)));
  }
  let resArr = pagination(result, parseInt(page));
  res.json({
    page: parseInt(page),
    items: resArr,
    totalItems: resArr.length,
    totalNum: result.length
  });
})

app.get("/getFaculties",function(req,res){
  const {page, course=null} = req.query;
  let result = faculties;
  // result.sort((n1,n2)=>n1.id-n2.id);
  if(course != null){
    result = result.filter(r=>r.courses.find(c=>course.includes(c)));
  }
  let resArr = pagination(result, parseInt(page));
  res.json({
    page: parseInt(page),
    items: resArr,
    totalItems: resArr.length,
    totalNum: result.length
  });
})

app.post("/postStudentDetails",function(req,res){
  let body = req.body;
  const {name="", dob="", gender="", about=""} = body;
  let index = students.findIndex(s=>s.name===name);
  // let newid = students.reduce((acc,curr)=>curr.id>acc?curr.id:acc,0);
  // let newStudent = {id: newid+1,name: name,dob: dob,gender: gender,about: about,courses: courses};
  // students.unshift(newStudent);
  students[index].name=name;
  students[index].dob=dob;
  students[index].gender=gender;
  students[index].about=about;
  // res.send(newStudent);
  res.send(students[index]);
})

app.get("/getStudentDetails/:name",function(req,res){
  const name = req.params.name;
  let exist = students.find(st=>st.name===name);
  let sendRes = {id:exist.id,name:exist.name,dob:exist.dob,gender:exist.gender,about:exist.about};
  res.send(sendRes);
})

app.get("/getStudentCourse/:name",function(req,res){
  const name = req.params.name;
  let exist = courses.filter((c)=>c.students.includes(name));
  let sendRes = exist?exist.map(e=>{return {courseId:e.courseId,name:e.name,code:e.code,description:e.description}}):exist;
  res.send(sendRes);
})

app.get("/getStudentClass/:name",function(req,res){
  const name = req.params.name;
  let exist = courses.filter((c)=>c.students.includes(name));
  let course = exist?exist.map(e=>e.name):null;
  let classs = course?classes.filter(c=>course.includes(c.course)):null;
  console.log(classs);
  res.send(classs);
})

app.get("/getFacultyCourse/:name",function(req,res){
  const name = req.params.name;
  let exist = courses.filter(c=>c.faculty.includes(name));
  let sendRes = exist?exist.map(e=>{return {courseId:e.courseId,name:e.name,code:e.code,description:e.description}}):exist;
  res.send(sendRes);
})

app.get("/getFacultyClass/:name",function(req,res){
  const name = req.params.name;
  let exist = classes.filter(c=>c.facultyName===name);
  res.send(exist);
})

app.post("/postClass",function(req,res){
  let newid = classes.reduce((acc,curr)=>curr.classId>acc?curr.classId:acc,0);
  let newClass = {classId:newid+1,...req.body};
  classes.push(newClass);
  res.send(newClass);
})

app.put("/postClass/:classId",function(req,res){
  let classId = +req.params.classId;
  let index = classes.findIndex(c=>c.classId==classId);
  if(index>=0){
    classes[index]={classId:classId,...req.body}
  }
  res.send(classes[index]);
})

function pagination(obj, page) {
  var resArr = obj;
  resArr = resArr.slice(page * 3 - 3, page * 3);
  return resArr;
}

app.listen(port, () => console.log(`Node app listening on port ${port}!`));